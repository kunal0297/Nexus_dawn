import React, { useState, useEffect } from 'react';
import { timeLockedMessageService } from '../services/TimeLockedMessageService';
import { TimeLockedMessage, MessageFormData, MessageCountdown } from '../types/messages';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  currentUser: string;
}

export const TimeLockedMessageManager: React.FC<Props> = ({ currentUser }) => {
  const [messages, setMessages] = useState<TimeLockedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<MessageFormData>({
    message: '',
    unlockDate: new Date(),
    recipient: ''
  });

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [currentUser]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const pendingMessages = await timeLockedMessageService.getPendingMessages(currentUser);
      setMessages(pendingMessages);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await timeLockedMessageService.scheduleMessage(
        formData.message,
        formData.unlockDate.getTime(),
        formData.recipient
      );
      setFormData({
        message: '',
        unlockDate: new Date(),
        recipient: ''
      });
      await loadMessages();
    } catch (err) {
      setError('Failed to schedule message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateCountdown = (unlockTimestamp: number): MessageCountdown => {
    const now = Date.now();
    const diff = unlockTimestamp - now;
    
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false
    };
  };

  const [countdowns, setCountdowns] = useState<Record<string, MessageCountdown>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns: Record<string, MessageCountdown> = {};
      messages.forEach(message => {
        newCountdowns[message.encryptedMessage] = calculateCountdown(message.unlockTimestamp);
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Time-Locked Messages
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unlock Date
            </label>
            <input
              type="datetime-local"
              value={formData.unlockDate.toISOString().slice(0, 16)}
              onChange={e => setFormData({ ...formData, unlockDate: new Date(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient Address
            </label>
            <input
              type="text"
              value={formData.recipient}
              onChange={e => setFormData({ ...formData, recipient: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Schedule Message
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Pending Messages
          </h3>

          <AnimatePresence>
            {messages.map(message => {
              const countdown = countdowns[message.encryptedMessage];
              return (
                <motion.div
                  key={message.encryptedMessage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-500">
                        From: {message.sender}
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {new Date(message.createdAt).toLocaleString()}
                      </div>
                    </div>
                    {!countdown?.isExpired && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-purple-600">
                          Unlocks in:
                        </div>
                        <div className="text-sm text-gray-600">
                          {countdown?.days}d {countdown?.hours}h {countdown?.minutes}m {countdown?.seconds}s
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No pending messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 