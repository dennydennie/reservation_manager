// src/components/creservations-list.js

import React from 'react';
import { Card } from 'semantic-ui-react';
import ReservationCard from './reservation-card';

export default function ReservationList({ reservations }) {
    const cards = () => {

    return reservations.map(reservations => {
      return (
        <ReservationCard key={reservations.ObjectId}  reservations= {reservations}/>
      );
    });
  };
  return <Card.Group>{cards()}</Card.Group>;
}