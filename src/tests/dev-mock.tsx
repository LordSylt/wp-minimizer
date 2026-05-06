// main.tsx (or dev-test.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import VerticalToggleButtons from '../OneHotButtons';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <VerticalToggleButtons />
    </React.StrictMode>
);