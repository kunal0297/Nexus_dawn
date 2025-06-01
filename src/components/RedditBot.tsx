import React, { useState, useEffect } from 'react';
import { createRedditService } from '../services/RedditService';

interface RedditBotProps {
  config: {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
    subreddit: string;
  };
}

export const RedditBot: React.FC<RedditBotProps> = ({ config }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastActivity, setLastActivity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redditService = createRedditService(config);
    
    const startBot = async () => {
      try {
        setError(null);
        await redditService.startMonitoring();
        setIsRunning(true);
        setLastActivity('Bot started successfully');
      } catch (err) {
        setError('Failed to start bot: ' + (err as Error).message);
        setIsRunning(false);
      }
    };

    const stopBot = () => {
      redditService.stopMonitoring();
      setIsRunning(false);
      setLastActivity('Bot stopped');
    };

    if (isRunning) {
      startBot();
    }

    return () => {
      stopBot();
    };
  }, [config, isRunning]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">DAWN.Oracle Reddit Bot</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-gray-300">
            {isRunning ? 'Monitoring r/DAWNOracle' : 'Bot is stopped'}
          </span>
        </div>

        {lastActivity && (
          <div className="text-sm text-gray-400">
            Last activity: {lastActivity}
          </div>
        )}

        {error && (
          <div className="text-sm text-red-400">
            Error: {error}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg ${
              isRunning
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white transition-colors`}
          >
            Start Bot
          </button>
          
          <button
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
            className={`px-4 py-2 rounded-lg ${
              !isRunning
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            } text-white transition-colors`}
          >
            Stop Bot
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">How to Use</h3>
          <p className="text-gray-300 text-sm">
            Post in r/DAWNOracle with one of these phrases:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1">
            <li>"Summon my interdimensional self"</li>
            <li>"Summon my parallel self"</li>
            <li>"Summon my alternate self"</li>
            <li>"Show me my other self"</li>
          </ul>
          <p className="text-gray-300 text-sm mt-2">
            The bot will respond with your cosmic avatar and voice!
          </p>
        </div>
      </div>
    </div>
  );
}; 