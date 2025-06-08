import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlgorandService } from '../services/algorand';
import { useWallet } from '../hooks/useWallet';

interface EmotionalNFTGalleryProps {
  onNFTSelect?: (nft: any) => void;
}

export const EmotionalNFTGallery: React.FC<EmotionalNFTGalleryProps> = ({
  onNFTSelect,
}) => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNFT, setSelectedNFT] = useState<any | null>(null);
  const { address, isConnected } = useWallet();

  useEffect(() => {
    if (isConnected && address) {
      loadNFTs();
    }
  }, [isConnected, address]);

  const loadNFTs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const nftList = await AlgorandService.getInstance().getEmotionalNFTs(address);
      setNfts(nftList);
    } catch (err) {
      setError('Failed to load NFTs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNFTSelect = (nft: any) => {
    setSelectedNFT(nft);
    onNFTSelect?.(nft);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isConnected) {
    return (
      <div className="nft-gallery-connect">
        <p>Please connect your wallet to view your Emotional NFTs</p>
      </div>
    );
  }

  return (
    <div className="nft-gallery">
      {isLoading ? (
        <div className="loading">Loading your Emotional NFTs...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : nfts.length === 0 ? (
        <div className="empty-state">
          <p>No Emotional NFTs found</p>
          <p className="subtitle">Your emotional milestones will appear here</p>
        </div>
      ) : (
        <div className="nft-grid">
          {nfts.map((nft) => (
            <motion.div
              key={nft.id}
              className={`nft-card ${selectedNFT?.id === nft.id ? 'selected' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNFTSelect(nft)}
            >
              {nft.imageUrl && (
                <div className="nft-image">
                  <img src={nft.imageUrl} alt={nft.title} />
                </div>
              )}
              <div className="nft-content">
                <h3>{nft.title}</h3>
                <p className="date">{formatDate(nft.timestamp)}</p>
                <p className="description">{nft.description}</p>
                <div className="emotions">
                  <div className="emotion">
                    <span>Valence</span>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${nft.emotions.valence * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="emotion">
                    <span>Arousal</span>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${nft.emotions.arousal * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="emotion">
                    <span>Dominance</span>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${nft.emotions.dominance * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                {nft.journalEntry && (
                  <div className="journal-entry">
                    <h4>Journal Entry</h4>
                    <p>{nft.journalEntry}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style>
        {`
          .nft-gallery {
            padding: 2rem;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
          }

          .nft-gallery-connect {
            text-align: center;
            padding: 2rem;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 1rem;
            color: white;
          }

          .loading,
          .error,
          .empty-state {
            text-align: center;
            padding: 2rem;
            color: white;
          }

          .empty-state .subtitle {
            opacity: 0.7;
            font-size: 0.9rem;
          }

          .nft-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }

          .nft-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .nft-card.selected {
            border: 2px solid #4a90e2;
          }

          .nft-image {
            width: 100%;
            aspect-ratio: 1;
            overflow: hidden;
          }

          .nft-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .nft-content {
            padding: 1.5rem;
            color: white;
          }

          .nft-content h3 {
            margin: 0 0 0.5rem;
            font-size: 1.2rem;
          }

          .date {
            font-size: 0.9rem;
            opacity: 0.7;
            margin-bottom: 1rem;
          }

          .description {
            margin-bottom: 1.5rem;
            line-height: 1.5;
          }

          .emotions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }

          .emotion {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .emotion span {
            font-size: 0.9rem;
            opacity: 0.7;
          }

          .progress-bar {
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
          }

          .progress {
            height: 100%;
            background: #4a90e2;
            transition: width 0.3s ease;
          }

          .journal-entry {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 1rem;
          }

          .journal-entry h4 {
            margin: 0 0 0.5rem;
            font-size: 1rem;
            opacity: 0.9;
          }

          .journal-entry p {
            font-size: 0.9rem;
            line-height: 1.5;
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  );
}; 