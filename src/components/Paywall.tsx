import React from 'react';
import { motion } from 'framer-motion';
import { useSubscription, SUBSCRIPTION_FEATURES, SUBSCRIPTION_TIERS } from '../contexts/SubscriptionContext';
import { Paywall as RevenueCatPaywall } from '@revenuecat/purchases-ui-react';

export const Paywall: React.FC = () => {
  const { currentTier } = useSubscription();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Choose Your Path
          </h1>
          <p className="text-gray-400 text-lg">
            Unlock the full potential of DAWN.Oracle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(SUBSCRIPTION_FEATURES).map(([tier, plan]) => (
            <motion.div
              key={tier}
              variants={cardVariants}
              whileHover="hover"
              className={`rounded-xl p-6 ${
                tier === currentTier
                  ? 'bg-purple-600'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {tier === currentTier ? (
                <button
                  disabled
                  className="w-full py-3 px-6 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : (
                <RevenueCatPaywall
                  offering={tier}
                  className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  {tier === SUBSCRIPTION_TIERS.OBSERVER
                    ? 'Start Free'
                    : `Upgrade to ${plan.name}`}
                </RevenueCatPaywall>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p>All plans include a 7-day free trial</p>
          <p className="text-sm mt-2">
            Cancel anytime. No questions asked.
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 