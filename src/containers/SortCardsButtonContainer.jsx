import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSortCards } from '../card-actions';
import { selectSortInAscendingOrder } from '../card-selectors';
import { SortCardButton } from '../components/SortCardsButton';

/** @type {import('react').FC<{}>} */
export const SortCardButtonContainer = () => {
  const sortInAscendingOrder = useSelector(selectSortInAscendingOrder);
  const dispatch = useDispatch();

  return (
    <SortCardButton
      onClick={() => {
        dispatch(toggleSortCards());
      }}
      sortInAscendingOrder={sortInAscendingOrder}
    />
  );
};