import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addCard } from '../card-actions';
import { CardForm } from '../components/CardForm';

/** @type {import('react').FC<{}>} */
export const AddCardForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return <CardForm
    buttonText="Añadir"
    headingText="Nueva tarjeta"
    onFormSubmit={result => {
      dispatch(addCard(result));
    }}
    onFormSubmitFinished={() => {
      history.push('/');
    }}
  />;
};
