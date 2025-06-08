import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  id: string;
  className?: string;
  buttonClassName?: string;
  isCosmicMode?: boolean;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  expanded,
  onToggle,
  children,
  id,
  className = '',
  buttonClassName = '',
  isCosmicMode = false,
}) => {
  const contentVariants = {
    expanded: { maxHeight: '1000px', opacity: 1 },
    collapsed: { maxHeight: '0px', opacity: 0 },
  };

  return (
    <div className={className}>
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full ${isCosmicMode ? 'bg-purple-600 text-white' : ''} ${buttonClassName}`}
        aria-expanded={expanded ? "true" : "false"}
        aria-controls={`${id}-content`}
      >
        {expanded ? `Hide ${title}` : `Show ${title}`}
      </button>

      <motion.div
        id={`${id}-content`}
        role="region"
        aria-label={title}
        initial={false}
        animate={expanded ? "expanded" : "collapsed"}
        variants={contentVariants}
        className="overflow-hidden"
      >
        {expanded && children}
      </motion.div>
    </div>
  );
}; 