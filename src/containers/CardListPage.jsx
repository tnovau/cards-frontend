import React from 'react';
import { AddCardButton } from '../components/AddCardButton';

/** @type {import('react').FC<{ onAddCardButtonClick: () => void }>} */
export const CardListPage = ({
  onAddCardButtonClick
}) => {
  return (
    <>
      <AddCardButton onClick={onAddCardButtonClick} />
    </>
  )
};
