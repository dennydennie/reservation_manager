import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ReservationsContext} from '../context/reservations-context';
import { flashErrorMessage } from './flash-message';

export default function ReservationForm( {reservation}) {
  const [state, dispatch] = useContext(ReservationsContext);
   const { register, errors, handleSubmit } = useForm({
    defaultValues: reservation,
  });
  const [redirect, setRedirect] = useState(false);

  const updateReservation = async data => {
    try {
      const response = await axios.patch(`http://localhost:3030/reservations/${reservation._id}`, data);
      dispatch({
        type: 'UPDATE_RESERVATIONS',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async data => {
    if (reservation._id) {
      await updateReservation (data);
    } else {
      await createReservation(data);
    }
  };
  

  const createReservation = async data => {
    try {
      const response = await axios.post('http://localhost:3030/reservations/', data);
      dispatch({
        type: 'CREATE_RESERVATION',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

   if (redirect) {
    return <Redirect to="/reservations/" />;
  }

  return (    
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: "1em" }}>      {reservation._id ? "Edit Reservation" : "Create Reservation"}</h1>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
          
        <Form.Field className={classnames({ error: errors.hairstyle })}>
            <label htmlFor="customer_id">
              Customer Name
              <input
                id="customer_id"
                name="customer_id"
                type="text"
                placeholder="Customer Details"
                ref={register({
                  required: true,
                                  })}
              />
            </label>
            <span className="error">
              {errors.customer_id &&
                errors.customer_id.type === 'required' &&
                'You need to provide a customer name'}
            </span>
            
          </Form.Field>

          <Form.Field className={classnames({ error: errors.hairstyle })}>
            <label htmlFor="hairstyle">
              Hair Style
              <input
                id="hairstyle"
                name="hairstyle"
                type="text"
                placeholder="hairstyle"
                ref={register({
                  required: true,
                                  })}
              />
            </label>
            <span className="error">
              {errors.hairstyle &&
                errors.hairstyle.type === 'required' &&
                'You need to provide a hairstyle'}
            </span>
            
          </Form.Field>
          <Form.Field className={classnames({ error: errors.date_of_reservation })}>
            <label htmlFor="date_of_reservation">
              Date Reservation
              <input
                id="date_of_reservation"
                name="date_of_reservation"
                type="date"
                placeholder="Date of reservation"
                ref={register({
                  required: true,
                  
                })}
              />
            </label>
            <span className="error">
              {errors.date_of_reservation &&
                errors.date_of_reservation.type === 'required' &&
                'You need to provide a reservation date'}
            </span>
            
          </Form.Field>
          <Form.Field className={classnames({ error: errors.timeslot })}>
            <label htmlFor="timeslot">
              Timeslot
              <input
                id="timeslot"
                name="timeslot"
                type="text"
                placeholder="Choose ya timeslot"
                ref={register({
                  required: true,
                  
                })}
              />
            </label>
            <span className="error">
              {errors.timeslot &&
                errors.timeslot.type === 'required' &&
                'You need to select a timeslot'}
            </span>
            
          </Form.Field>

          <Form.Field className={classnames({ error: errors.hairdresser })}>
            <label htmlFor="hairdresser_id">
              Hair Dresser
              <input
                id="hairdresser_id"
                name="hairdresser_id"
                type="text"
                placeholder="Choose your favourite hairdresser"
                ref={register({
                  required: true,
                  
                })}
              />
            </label>
            <span className="error">
              {errors.hairdresser_id &&
                errors.hairdresser_id.type === 'required' &&
                'You need to select one hairdresser'}
            </span>
            
          </Form.Field>

          <Form.Field className={classnames({ error: errors.comments })}>
            <label htmlFor="comments">
              Comments
              <input
                id="comments"
                name="comments"
                type="text"
                placeholder="Place any other information here"
                ref={register({
                  required: true,
                  
                })}
              />
            </label>
            <span className="error">
              {errors.comments &&
                errors.comments.type === 'required' &&
                'Please provide a few details'}
            </span>
            
          </Form.Field>
          <Button primary type="submit">
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  )
}
