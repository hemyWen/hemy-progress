import HemyProgress from '../src';
import React, { useState, useEffect } from 'react';
const slot = (
  <div style={{ textAlign: 'center' }}>
    <img src="./assets/react.png" style={{ width: '30%', height: '30%' }} />
  </div>
);
export default function Demo() {
  return <HemyProgress type="line" percentage={60} />;
}
