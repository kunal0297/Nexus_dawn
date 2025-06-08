import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevenueCatService } from '../services/revenuecat';

interface SubscriptionPackagesProps {
  onPackageSelect?: (packageId: string) => void;
}

export const SubscriptionPackages: React.FC<SubscriptionPackagesProps> = ({
  onPackageSelect,
}) => {
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const packageList = await RevenueCatService.getInstance().getPackages();
      setPackages(packageList);
    } catch (err) {
      setError('Failed to load subscription packages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePackageSelect = async (packageId: string) => {
    try {
      setIsPurchasing(true);
      setError(null);
      setSelectedPackage(packageId);

      const success = await RevenueCatService.getInstance().purchasePackage(packageId);
      if (success) {
        onPackageSelect?.(packageId);
      } else {
        setError('Purchase failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to purchase package');
      console.error(err);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestorePurchases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const success = await RevenueCatService.getInstance().restorePurchases();
      if (success) {
        // Handle successful restoration
      } else {
        setError('No previous purchases found');
      }
    } catch (err) {
      setError('Failed to restore purchases');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="subscription-packages">
      <div className="header">
        <h2>Emotional Growth Modules</h2>
        <p className="subtitle">Choose your path to emotional well-being</p>
      </div>

      {isLoading ? (
        <div className="loading">Loading subscription packages...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`package-card ${selectedPackage === pkg.id ? 'selected' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="package-content">
                <h3>{pkg.title}</h3>
                <p className="price">{pkg.price}</p>
                <p className="description">{pkg.description}</p>
                <ul className="features">
                  {pkg.features.map((feature: string, index: number) => (
                    <li key={index}>
                      <span className="check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePackageSelect(pkg.id)}
                  disabled={isPurchasing}
                  className={`purchase-button ${
                    selectedPackage === pkg.id ? 'selected' : ''
                  }`}
                >
                  {isPurchasing && selectedPackage === pkg.id
                    ? 'Processing...'
                    : 'Subscribe Now'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="restore-section">
        <button
          onClick={handleRestorePurchases}
          disabled={isLoading}
          className="restore-button"
        >
          Restore Previous Purchases
        </button>
      </div>

      <style>
        {`
          .subscription-packages {
            padding: 2rem;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
          }

          .header {
            text-align: center;
            margin-bottom: 2rem;
            color: white;
          }

          .header h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          .subtitle {
            opacity: 0.7;
            font-size: 1.1rem;
          }

          .loading,
          .error {
            text-align: center;
            padding: 2rem;
            color: white;
          }

          .error {
            color: #ff4444;
          }

          .packages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
          }

          .package-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .package-card.selected {
            border: 2px solid #4a90e2;
          }

          .package-content {
            padding: 2rem;
            color: white;
          }

          .package-content h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }

          .price {
            font-size: 2rem;
            font-weight: bold;
            color: #4a90e2;
            margin-bottom: 1rem;
          }

          .description {
            margin-bottom: 1.5rem;
            line-height: 1.5;
            opacity: 0.8;
          }

          .features {
            list-style: none;
            padding: 0;
            margin: 0 0 2rem;
          }

          .features li {
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
          }

          .check {
            color: #4a90e2;
            margin-right: 0.5rem;
          }

          .purchase-button {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 0.5rem;
            background: #4a90e2;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .purchase-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .purchase-button.selected {
            background: #2ecc71;
          }

          .restore-section {
            text-align: center;
            margin-top: 2rem;
          }

          .restore-button {
            padding: 0.75rem 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 2rem;
            background: transparent;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .restore-button:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          .restore-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}
      </style>
    </div>
  );
}; 