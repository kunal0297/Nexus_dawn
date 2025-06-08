import Purchases from 'react-native-purchases';
import { env } from '../config/env.validation';

interface SubscriptionPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
}

export class RevenueCatService {
  private static instance: RevenueCatService;
  private apiKey: string;

  private constructor() {
    this.apiKey = env.VITE_REVENUECAT_API_KEY;
    Purchases.configure({ apiKey: this.apiKey });
  }

  public static getInstance(): RevenueCatService {
    if (!RevenueCatService.instance) {
      RevenueCatService.instance = new RevenueCatService();
    }
    return RevenueCatService.instance;
  }

  public async getPackages(): Promise<SubscriptionPackage[]> {
    try {
      const offerings = await Purchases.getOfferings();
      const packages: SubscriptionPackage[] = [];

      if (offerings.current) {
        for (const pkg of offerings.current.availablePackages) {
          packages.push({
            id: pkg.identifier,
            title: pkg.product.title,
            description: pkg.product.description,
            price: pkg.product.priceString,
            features: this.getFeaturesForPackage(pkg.identifier),
          });
        }
      }

      return packages;
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  }

  public async purchasePackage(packageId: string): Promise<boolean> {
    try {
      const offerings = await Purchases.getOfferings();
      const pkg = offerings.current?.availablePackages.find(
        (p) => p.identifier === packageId
      );

      if (!pkg) {
        throw new Error('Package not found');
      }

      const { customerInfo } = await Purchases.purchasePackage(pkg);
      return customerInfo.entitlements.active['premium'] !== undefined;
    } catch (error) {
      console.error('Error purchasing package:', error);
      throw error;
    }
  }

  public async restorePurchases(): Promise<boolean> {
    try {
      const { customerInfo } = await Purchases.restorePurchases();
      return customerInfo.entitlements.active['premium'] !== undefined;
    } catch (error) {
      console.error('Error restoring purchases:', error);
      throw error;
    }
  }

  public async getCurrentSubscription(): Promise<string | null> {
    try {
      const { customerInfo } = await Purchases.getCustomerInfo();
      return customerInfo.entitlements.active['premium']?.productIdentifier || null;
    } catch (error) {
      console.error('Error getting current subscription:', error);
      throw error;
    }
  }

  private getFeaturesForPackage(packageId: string): string[] {
    const features: { [key: string]: string[] } = {
      'anxiety_healing': [
        'Guided meditation sessions',
        'Anxiety tracking tools',
        'Coping strategy library',
        'Progress visualization',
      ],
      'confidence_awakening': [
        'Confidence building exercises',
        'Positive affirmation generator',
        'Social interaction practice',
        'Achievement tracking',
      ],
      'self_love': [
        'Self-compassion exercises',
        'Gratitude journaling',
        'Boundary setting tools',
        'Personal growth tracking',
      ],
    };

    return features[packageId] || [];
  }
} 