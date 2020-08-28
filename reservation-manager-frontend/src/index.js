import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ReservationsContextProvider } from './context/reservations-context';
import 'fomantic-ui-css/semantic.min.css';
import './index.css';


ReactDOM.render(
  <ReservationsContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReservationsContextProvider>,
  document.getElementById('root')
);