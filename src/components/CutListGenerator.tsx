import React, { useState, useEffect } from 'react';
import { useCabinet } from '../contexts/CabinetContext';
import { CutItem } from '../types/cabinet';
import { generateCutList } from '../utils/cabinetCalculations';

const CutListGenerator: React.FC = () => {
  const { cabinet } = useCabinet();
  const [cutList, setCutList] = useState<CutItem[]>([]);
  const [sortBy, setSortBy] = useState<keyof CutItem>('material');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  useEffect(() => {
    // Generate cut list based on cabinet configuration
    const newCutList = generateCutList(cabinet);
    setCutList(newCutList);
  }, [cabinet]);
  
  const handleSort = (column: keyof CutItem) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  const sortedCutList = [...cutList].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const getTotalBoardFeet = () => {
    return cutList.reduce((total, item) => {
      return total + ((item.width * item.length * item.thickness) / 144) * item.quantity;
    }, 0).toFixed(2);
  };
  
  const exportCutList = () => {
    // Create CSV content
    let csvContent = "Name,Quantity,Width,Length,Thickness,Material,Grain,Notes\n";
    
    sortedCutList.forEach(item => {
      csvContent += `${item.name},${item.quantity},${item.width},${item.length},${item.thickness},${item.material},${item.grain || 'none'},${item.notes || ''}\n`;
    });
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'cabinet_cut_list.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Cut List</h2>
        
        <div className="flex space-x-3">
          <button 
            onClick={exportCutList}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Export CSV
          </button>
          
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Print
          </button>
        </div>
      </div>
      
      <div className="mt-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Board Feet:</span> {getTotalBoardFeet()} bdft
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-medium">Sort by:</span>
            <select
              className="text-sm border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as keyof CutItem)}
            >
              <option value="material">Material</option>
              <option value="name">Name</option>
              <option value="width">Width</option>
              <option value="length">Length</option>
              <option value="thickness">Thickness</option>
              <option value="quantity">Quantity</option>
            </select>
            
            <button 
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="text-gray-500 hover:text-gray-700"
            >
              {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Width (in)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Length (in)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thickness (in)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grain
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCutList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.width}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.length}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.thickness}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.material}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.grain || 'none'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.notes || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CutListGenerator;