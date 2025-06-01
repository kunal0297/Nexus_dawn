import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { MindStateMap } from './components/MindStateMap';
import { CosmicModeToggle } from './components/CosmicModeToggle';
import { CognitiveFusionInterface } from './components/CognitiveFusionInterface';
import { MultiversalForkNavigator } from './components/MultiversalForkNavigator';
import { NeuropunkMoodDesigner } from './components/NeuropunkMoodDesigner';
import { EventHorizonProtocol } from './components/EventHorizonProtocol';
import { CosmicCompressionEngine } from './components/CosmicCompressionEngine';
import { MirrorOfBecoming } from './components/MirrorOfBecoming';
import { QuantumIntuitionPulse } from './components/QuantumIntuitionPulse';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">NEXUS.DAWN</h1>
          <CosmicModeToggle />
        </header>
        
        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6">
            <EventHorizonProtocol
              roomName="nexus-dawn"
              token={process.env.REACT_APP_LIVEKIT_TOKEN || ''}
            />
            <NeuropunkMoodDesigner />
            <MultiversalForkNavigator />
            <CognitiveFusionInterface />
            <CosmicCompressionEngine />
            <MirrorOfBecoming />
            <QuantumIntuitionPulse />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App; 