import React, { useState, useEffect } from 'react';
import { personalityShardService } from '../services/PersonalityShardService';
import { PersonalityShard, PersonalityEvolution } from '../types/personality';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  username: string;
}

export const PersonalityShardViewer: React.FC<Props> = ({ username }) => {
  const [shard, setShard] = useState<PersonalityShard | null>(null);
  const [evolution, setEvolution] = useState<PersonalityEvolution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadShard();
  }, [username]);

  const loadShard = async () => {
    try {
      setLoading(true);
      setError(null);
      const userShard = await personalityShardService.retrievePersonalityShard(username);
      setShard(userShard);
    } catch (err) {
      setError('Failed to load personality shard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEvolve = async () => {
    try {
      setLoading(true);
      setError(null);
      const newActivity = await personalityShardService.fetchUserActivity(username);
      const evolvedShard = await personalityShardService.evolvePersonalityShard(username, newActivity);
      
      if (shard) {
        const changes = Object.entries(evolvedShard.weights).map(([dimension, newValue]) => ({
          dimension: dimension as keyof typeof evolvedShard.weights,
          oldValue: shard.weights[dimension as keyof typeof shard.weights],
          newValue,
          percentageChange: ((newValue - shard.weights[dimension as keyof typeof shard.weights]) / 
            shard.weights[dimension as keyof typeof shard.weights]) * 100
        }));

        setEvolution({
          previousShard: shard,
          newShard: evolvedShard,
          changes
        });
      }
      
      setShard(evolvedShard);
    } catch (err) {
      setError('Failed to evolve personality shard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (!shard) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
        No personality shard found for {username}
      </div>
    );
  }

  const chartData = {
    labels: Object.keys(shard.weights),
    datasets: [
      {
        label: 'Personality Weights',
        data: Object.values(shard.weights),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Personality Dimensions'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1
      }
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Personality Shard: {username}
        </h2>
        <button
          onClick={handleEvolve}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Evolve Shard
        </button>
      </div>

      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>

      {evolution && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">
            Evolution Changes
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {evolution.changes.map((change) => (
              <div
                key={change.dimension}
                className="p-3 bg-white rounded-lg shadow"
              >
                <div className="font-medium text-gray-700">
                  {change.dimension}
                </div>
                <div className="text-sm text-gray-500">
                  {change.percentageChange > 0 ? '+' : ''}
                  {change.percentageChange.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Shard Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Version</div>
            <div className="font-medium">{shard.version}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Last Updated</div>
            <div className="font-medium">
              {new Date(shard.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 