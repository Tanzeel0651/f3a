import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import { Login } from '@/components/Login';


// Enable Mock Server
if (import.meta.env.DEV && new URLSearchParams(location.search).has('mock'))
  (await import('@/services/mock/mockServer')).createMockServer();

ReactDOM.createRoot(document.querySelector('body')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
