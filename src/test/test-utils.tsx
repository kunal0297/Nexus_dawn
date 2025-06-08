import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createRoot } from 'react-dom/client';

function render(ui: React.ReactElement, options = {}) {
  const container = document.createElement('div');
  const root = createRoot(container);
  
  const utils = rtlRender(ui, {
    container,
    ...options,
  });

  return {
    ...utils,
    container,
    root,
  };
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { render }; 