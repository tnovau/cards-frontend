import React from 'react';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';

/** @type {import('react').FC<import('@material-ui/core/ButtonBase').ButtonBaseProps & { sortInAscendingOrder: boolean }>} */
export const SortCardButton = ({ sortInAscendingOrder, ...props }) => {
  return (
    <Button
      data-testid="sort-cards-button"
      color="primary"
      {...props}
      endIcon={
        sortInAscendingOrder
          ? <ArrowUpward data-testid="sort-arrow-up"/>
          : <ArrowDownward data-testid="sort-arrow-down" />
      }
    >
      Sort
    </Button>
  );
};