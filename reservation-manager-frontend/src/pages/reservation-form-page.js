import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReservationForm from '../components/reservation-form';
import { flashErrorMessage } from '../components/flash-message';
import { ReservationsContext } from '../context/reservations-context';

export default function ReservationFormPage({ match }) {
  const [state, dispatch] = useContext(ReservationsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { _id } = match.params; // Grab URL _id
    if (_id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3030/reservations/${_id}`,
          );
          dispatch({
            type: 'FETCH_RESERVATION',
            payload: response.data,
          });
          setLoading(false);
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [match.params, dispatch]);

  if (loading) {
    return <p>Please wait...</p>;
  }

  return (
    <div>
      <ReservationForm reservation={state.reservation} />
    </div>
  );
}