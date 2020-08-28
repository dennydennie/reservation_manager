import React, { useReducer, createContext } from 'react';

export const ReservationsContext = createContext();

const initialState = {
  reservations: [],
  reservation: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_RESERVATIONS': {
      return {
        ...state,
        reservations: action.payload,
        reservation: {},
      };
      
    }
    case 'DELETE_RESERVATIONS': {
      const { _id } = action.payload;
      return {
        ...state,
        reservations: state.reservations.filter(item => item._id !== _id),
        message: {
          type: 'success',
          title: 'Delete Successful',
          content: `Reservations"${_id}" has been deleted!`,
        },
      };
    }
  
    case 'FETCH_RESERVATION': {
      return {
        ...state,
        reservations: action.payload,
        message: {},
      };
    }
    case 'UPDATE_RESERVATIONS': {
      const reservation = action.payload;
      return {
        ...state,
        reservations: state.reservations.map(item =>
          item._id === reservation._id ? reservation : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `Reservation "${reservation._id}" has been updated!`,
        },
      };
    }
    case 'CREATE_RESREVATION': {
      return {
  
        ...state,
        reservations: [...state.reservations, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New Reservation created!',
        },
      };
    }

    case 'FLASH_MESSAGE': {
        return {
          ...state,
          message: action.payload,
        };
    }
    default:
      throw new Error();
  }
}


export const ReservationsContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <ReservationsContext.Provider value={[state, dispatch]}>
      {children}
    </ReservationsContext.Provider>
  );
};