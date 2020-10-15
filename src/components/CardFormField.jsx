import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * @param {import('@material-ui/core/TextField').TextFieldProps} param0
 */
export const CardFormField = ({
  id,
  ...rest
}) => {
  return <TextField
    data-testid={id}
    id={id}
    name={id}
    {...rest}
  />
}
