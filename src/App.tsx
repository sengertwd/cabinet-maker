import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import CabinetDesigner from './components/CabinetDesigner';
import CutListGenerator from './components/CutListGenerator';
import BuildSheet from './components/BuildSheet';
import SheetOptimization from './components/SheetOptimization';
import Header from './components/Header';
import { CabinetProvider } from './contexts/CabinetContext';

function App() {
  return (
    <CabinetProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Tabs defaultValue="designer" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="designer">Cabinet Designer</TabsTrigger>
              <TabsTrigger value="cutlist">Cut List</TabsTrigger>
              <TabsTrigger value="optimization">Sheet Optimization</TabsTrigger>
              <TabsTrigger value="buildsheet">Build Sheet</TabsTrigger>
            </TabsList>
            
            <TabsContent value="designer" className="mt-2">
              <CabinetDesigner />
            </TabsContent>
            
            <TabsContent value="cutlist" className="mt-2">
              <CutListGenerator />
            </TabsContent>
            
            <TabsContent value="optimization" className="mt-2">
              <SheetOptimization />
            </TabsContent>
            
            <TabsContent value="buildsheet" className="mt-2">
              <BuildSheet />
            </TabsContent>
          </Tabs>
        </main>
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            Kitchen Cabinet Cut List Tool © 2025
          </div>
        </footer>
      </div>
    </CabinetProvider>
  );
}

export default App;