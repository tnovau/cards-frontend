import React from 'react';
import { useDispatch } from 'react-redux';

import { addCard } from '../card-actions';
import { CardForm } from '../components/CardForm';

/** @type {import('react').FC<{ onFormSubmitFinished: () => void }>} */
export const AddCardForm = ({
  onFormSubmitFinished
}) => {
  const dispatch = useDispatch();
  return <CardForm
    buttonText="Añadir"
    headingText="Nueva tarjeta"
    onFormSubmit={result => {
      dispatch(addCard(result));
    }}
    onFormSubmitFinished={onFormSubmitFinished}
  />;
};
