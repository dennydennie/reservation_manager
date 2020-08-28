// src/App.js

import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ReservationList from './pages/reservations-list-page';
import ReservationForm from './pages/reservation-form-page';

const App = () => {
  return (
    <Container>
      <div className="ui two item menu">
        <NavLink className="item" activeClassName="active" exact to="/reservations/">
        Reservations List
        </NavLink>
        <NavLink
          className="item"
          activeClassName="active"
          exact
          to="/reservations/new/"
        >
          Add Reservation
        </NavLink>
      </div>
      <Route exact path="/reservations/" component={ReservationList} />
      <Route path="/reservations/new/" component={ReservationForm} />
      <Route path="/reservations/edit/:_id" component={ReservationForm} />
    </Container>
  );
};

export default App;