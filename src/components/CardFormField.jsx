import React from 'react';
import TextField from '@material-ui/core/TextField';

/** @type {import('react').FC<import('@material-ui/core/TextField').TextFieldProps>} */
export const CardFormField = ({
  id,
  ...rest
}) => (
  <TextField
    data-testid={id}
    id={id}
    name={id}
    {...rest}
  />
);
