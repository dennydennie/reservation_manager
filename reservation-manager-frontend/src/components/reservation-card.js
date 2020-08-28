import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';
import  axios  from  'axios';
import  {  ReservationsContext  }  from  '../context/reservations-context';
import  {  flashErrorMessage  }  from  './flash-message';

const  {  useContext  }  =  React;

export default function ReservationCard({ reservations}) {

   // eslint-disable-next-line no-unused-vars
   const [state, dispatch] = useContext(ReservationsContext);

   const deleteReservation = async id => {
     try {
       const response = await axios.delete(
         `http://localhost:3030/reservations/${id}`,
       );
       dispatch({
         type: 'DELETE_RESERVATIONS',
         payload: response.data,
       });
     } catch (error) {
       flashErrorMessage(dispatch, error);
     }
   };

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user circle outline" /> {reservations.customer_id}
        </Card.Header>
        <Card.Description>
          <p> <Icon name="user md" /> {reservations.hairdresser_id} </p>
          <p> <Icon name="smile outline" /> {reservations.hairstyle}</p>
          <p> <Icon name="calendar outline" /> {reservations.date_of_reservation} </p>
          <p> <Icon name="hourglass outline" /> {reservations.timeslot} </p>
          <p> <Icon name="comment outline" /> {reservations.comments} </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            as={Link}
            to={`/reservations/edit/${reservations._id}`}
          >
            Edit
          </Button>
          <Button basic color="red" onClick={() => deleteReservation(reservations._id)}>
        Delete
      </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

