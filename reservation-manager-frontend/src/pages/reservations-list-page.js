
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import FlashMessage, { flashErrorMessage } from '../components/flash-message';
import ReservationList from '../components/reservation-list';
import { ReservationsContext } from '../context/reservations-context';


export default function ReservationListPage() {
  const [state, dispatch] = useContext(ReservationsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3030/reservations');
        dispatch({
          type: 'FETCH_RESERVATIONS',
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>List of reservations</h1>
      {state.message.content && <FlashMessage message={state.message} />}
      <ReservationList reservations={state.reservations} />
    </div>
  );
}
