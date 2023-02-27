import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';

export function mount(id) {
  if (!document.getElementById(id)) {
    const div = Object.assign(document.createElement('div'), { id });
    document.body.appendChild(div);
    createRoot(div).render(<div style={{ height: 100, left:0, right: 0, width: '100%', background: 'red' }}></div>);
  }
}
