import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { selectCardById } from '../card-selectors';
import { editCard } from '../card-actions';
import { CardForm } from '../components/CardForm';

/** @type {import('react').FC<{}>} */
export const EditCardForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const card = useSelector(selectCardById(id));
  return <CardForm
    buttonText="Editar"
    headingText="Editar tarjeta"
    {...card}
    onFormSubmit={({
      description,
      imageUrl,
      title
    }) => {
      dispatch(editCard({
        description,
        imageUrl,
        title,
        id
      }))
    }}
    onFormSubmitFinished={() => history.push("/")}
  />;
};
