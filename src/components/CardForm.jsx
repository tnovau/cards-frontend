import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { CardFormField } from './CardFormField';

const INITIAL_FIELD_VALUE = '';
const INITIAL_ERROR_VALUE = '';
const TITLE_REQUIRED_ERROR = 'Debes especificar un título.';
const DESCRIPTION_REQUIRED_ERROR = 'Debes especificar una descripción.';

const calculateTitleError = titleArg => !titleArg ? TITLE_REQUIRED_ERROR : INITIAL_ERROR_VALUE;
const calculateDescriptionError = descriptionArg => !descriptionArg ? DESCRIPTION_REQUIRED_ERROR : INITIAL_ERROR_VALUE;

/** @type {import('react').FC<{
 *  buttonText: string,
 *  headingText: string,
 *  onFormSubmit: ({ title: string, description: string, imageUrl: string }) => void
 * }>} */
export const CardForm = ({
  buttonText,
  headingText,
  onFormSubmit
}) => {
  const [title, setTitle] = useState(INITIAL_FIELD_VALUE);
  const [description, setDescription] = useState(INITIAL_FIELD_VALUE);
  const [imageUrl, setImageUrl] = useState(INITIAL_FIELD_VALUE);

  const [titleError, setTitleError] = useState(INITIAL_ERROR_VALUE);
  const [descriptionError, setDescriptionError] = useState(INITIAL_ERROR_VALUE);

  return (
    <form
      data-testid="card-form"
      onSubmit={ev => {
        ev.preventDefault();

        const titleErrorCalculated = calculateTitleError(title);
        const descriptionErrorCalculated = calculateDescriptionError(description);
        if (titleErrorCalculated) setTitleError(titleErrorCalculated);
        if (descriptionErrorCalculated) setDescriptionError(descriptionErrorCalculated);

        if (titleErrorCalculated || descriptionErrorCalculated) return;

        onFormSubmit({
          title,
          description,
          imageUrl
        });

        setTitle(INITIAL_FIELD_VALUE);
        setDescription(INITIAL_FIELD_VALUE);
        setImageUrl(INITIAL_FIELD_VALUE);
        setTitleError(INITIAL_ERROR_VALUE);
        setDescriptionError(INITIAL_ERROR_VALUE);
      }}
      noValidate
    >
      <Typography data-testid="card-form-heading">
        {headingText}
      </Typography>
      <CardFormField
        id="card-form-title"
        label="Título"
        required
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        onFocus={() => setTitleError(INITIAL_ERROR_VALUE)}
        onBlur={ev => setTitleError(calculateTitleError(ev.target.value))}
        error={!!titleError}
        helperText={titleError}
      />
      <CardFormField
        id="card-form-description"
        label="Descripción"
        required
        value={description}
        onChange={ev => setDescription(ev.target.value)}
        onFocus={() => setDescriptionError(INITIAL_ERROR_VALUE)}
        onBlur={ev => setDescriptionError(calculateDescriptionError(ev.target.value))}
        error={!!descriptionError}
        helperText={descriptionError}
      />
      <CardFormField
        id="card-form-image-url"
        label="Imagen (Url)"
        value={imageUrl}
        onChange={ev => setImageUrl(ev.target.value)}
      />
      <Button data-testid="card-form-button" type="submit">
        {buttonText}
      </Button>
    </form>
  )
};
