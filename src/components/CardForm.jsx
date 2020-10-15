import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { CardFormField } from './CardFormField';

export const CardForm = ({
  headingText,
  buttonText
}) => {
  return <>
    <Typography data-testid="card-form-heading">
      {headingText}
    </Typography>
    <CardFormField
      id="card-form-title"
      label="Título"
      required
    />
    <CardFormField
      id="card-form-description"
      label="Descripción"
      required
    />
    <CardFormField
      id="card-form-image-url"
      label="Imagen (Url)"
    />
    <Button data-testid="card-form-button">
      {buttonText}
    </Button>
  </>
};
