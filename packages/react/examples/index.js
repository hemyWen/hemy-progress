import React from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
import './index.css';

import Demo from './demo'
const App = () => (
  <div className="App">
    <div className="line container">
      <div className="item">
        <Demo />
      </div>
    </div>
  </div>
);
root.render(<App />);
