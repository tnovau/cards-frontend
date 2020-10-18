import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  goBackButton: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2)
  }
}));

/** @type {import('react').FC<import('@material-ui/core/IconButton').IconButtonProps>} */
export const GoBackButton = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { goBackButton } = useStyles();

  return <>
    {
      location.pathname !== "/" ?
        <IconButton
          className={goBackButton}
          data-testid="go-back-button"
          onClick={() => history.push("/")}
          color="primary"
          {...props}
        >
          <ArrowBackIcon />
        </IconButton> :
        undefined
    }
  </>;
};
