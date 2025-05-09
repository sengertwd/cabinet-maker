import React from 'react';
import { Ruler, Settings, Save, Folder } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ruler className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Cabinet Cut List Tool</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <Folder className="h-4 w-4 mr-1" />
              <span>Open</span>
            </button>
            
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <Save className="h-4 w-4 mr-1" />
              <span>Save</span>
            </button>
            
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <Settings className="h-4 w-4 mr-1" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;