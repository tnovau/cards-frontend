import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

/** @type {import('react').FC<import('@material-ui/core/Fab').FabProps>} */
export const AddCardButton = (props) => {
  const { fab } = useStyles();
  return (
    <Fab
      color="secondary"
      aria-label="add"
      data-testid="add-card-button"
      className={fab}
      {...props}
    >
      <AddIcon />
    </Fab>
  );
};
