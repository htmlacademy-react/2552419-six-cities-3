import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { MOCK_OFFERS } from './mocks/offers';
import { OFFERS_COUNT } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_COUNT} offers={MOCK_OFFERS} />
  </React.StrictMode>
);
