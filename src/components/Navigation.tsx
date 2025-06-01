import React from 'react';
import { motion } from 'framer-motion';
import { useSubscription } from '../contexts/SubscriptionContext';

export type ViewType = 'oracle' | 'paywall' | 'scan' | 'mind' | 'quantum' | 'marquee';

interface NavigationProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  const { currentTier } = useSubscription();
  const isSubscribed = currentTier !== 'observer';

  const navItems = [
    { id: 'oracle', label: 'Oracle', requiresSubscription: false },
    { id: 'mind', label: 'Mind State', requiresSubscription: true },
    { id: 'quantum', label: 'Timeline Manager', requiresSubscription: true },
    { id: 'scan', label: 'Identity Scan', requiresSubscription: true },
    { id: 'marquee', label: 'Tech Showcase', requiresSubscription: false },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Subscription Status */}
          <div className="flex justify-center items-center py-2 border-b border-gray-800">
            <div className={`text-sm font-medium ${isSubscribed ? 'text-green-400' : 'text-yellow-400'}`}>
              {isSubscribed ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Subscribed
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  Free User
                </span>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  if (item.requiresSubscription && !isSubscribed) {
                    onViewChange('paywall');
                  } else {
                    onViewChange(item.id);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group ${
                  activeView === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                } ${!isSubscribed && item.requiresSubscription ? 'opacity-50' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!isSubscribed && item.requiresSubscription}
              >
                {item.label}
                {!isSubscribed && item.requiresSubscription && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Requires Subscription
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 