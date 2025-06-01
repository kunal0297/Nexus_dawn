import React, { createContext, useContext, useEffect, useState } from 'react';
import Purchases from '@revenuecat/purchases-react-native';

interface SubscriptionContextType {
  currentTier: 'observer' | 'synth' | 'architect' | null;
  isLoading: boolean;
  error: string | null;
  checkSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SUBSCRIPTION_TIERS = {
  OBSERVER: 'observer',
  SYNTH: 'synth',
  ARCHITECT: 'architect',
} as const;

export const SUBSCRIPTION_FEATURES = {
  [SUBSCRIPTION_TIERS.OBSERVER]: {
    name: 'Observer',
    price: 'Free',
    features: [
      'Basic Oracle access',
      'Limited voice commands',
      'Standard response time',
    ],
  },
  [SUBSCRIPTION_TIERS.SYNTH]: {
    name: 'Synth',
    price: '$9.99/month',
    features: [
      'Advanced voice interface',
      'AI-powered responses',
      'Priority processing',
      'Custom voice synthesis',
    ],
  },
  [SUBSCRIPTION_TIERS.ARCHITECT]: {
    name: 'Architect',
    price: '$29.99/month',
    features: [
      'Everything in Synth',
      'Full API access',
      'Custom AI training',
      'Priority support',
      'Advanced analytics',
    ],
  },
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTier, setCurrentTier] = useState<'observer' | 'synth' | 'architect' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeRevenueCat = async () => {
      try {
        await Purchases.configure({
          apiKey: process.env.REACT_APP_REVENUECAT_API_KEY || '',
          appUserID: undefined, // RevenueCat will generate a random ID
        });
        await checkSubscription();
      } catch (err) {
        setError('Failed to initialize subscription system');
        console.error('RevenueCat initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeRevenueCat();
  }, []);

  const checkSubscription = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const entitlements = customerInfo.entitlements.active;

      if (entitlements['architect']) {
        setCurrentTier('architect');
      } else if (entitlements['synth']) {
        setCurrentTier('synth');
      } else {
        setCurrentTier('observer');
      }
    } catch (err) {
      setError('Failed to check subscription status');
      console.error('Subscription check error:', err);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        currentTier,
        isLoading,
        error,
        checkSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}; 