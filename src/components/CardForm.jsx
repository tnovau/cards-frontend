import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { CardFormField } from './CardFormField';

const INITIAL_FIELD_VALUE = '';
const INITIAL_ERROR_VALUE = '';
const TITLE_REQUIRED_ERROR = 'Debes especificar un título.';
const DESCRIPTION_REQUIRED_ERROR = 'Debes especificar una descripción.';

const calculateTitleError = titleArg => !titleArg ? TITLE_REQUIRED_ERROR : INITIAL_ERROR_VALUE;
const calculateDescriptionError = descriptionArg => !descriptionArg ? DESCRIPTION_REQUIRED_ERROR : INITIAL_ERROR_VALUE;

const useStyles = makeStyles((theme) => ({
  cardForm: {
    display: 'flex',
    minWidth: '95vw',
    [theme.breakpoints.up("md")]: {
      minWidth: theme.breakpoints.width("md"),
    },
    flexDirection: 'column',
    '& .MuiTypography-root': {
      marginBottom: theme.spacing(2)
    },
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    '& .MuiButton-root': {
      marginTop: theme.spacing(2),
    },
    padding: theme.spacing(2)
  }
}));

/** @type {import('react').FC<{
 *  buttonText: string,
 *  headingText: string,
 *  onFormSubmit: ({ title: string, description: string, imageUrl: string }) => void,
 *  onFormSubmitFinished: () => void,
 *  title?: string,
 *  description?: string,
 *  imageUrl?: string
 * }>} */
export const CardForm = ({
  buttonText,
  headingText,
  onFormSubmit,
  onFormSubmitFinished,
  ...rest
}) => {
  const [title, setTitle] = useState(rest.title || INITIAL_FIELD_VALUE);
  const [description, setDescription] = useState(rest.description || INITIAL_FIELD_VALUE);
  const [imageUrl, setImageUrl] = useState(rest.imageUrl || INITIAL_FIELD_VALUE);

  const [titleError, setTitleError] = useState(INITIAL_ERROR_VALUE);
  const [descriptionError, setDescriptionError] = useState(INITIAL_ERROR_VALUE);

  const { cardForm } = useStyles();

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

        onFormSubmitFinished();
      }}
      noValidate
    >
      <Paper className={cardForm}>
        <Typography variant="h5" data-testid="card-form-heading">
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
        <Button data-testid="card-form-button" color="primary" variant="contained" type="submit">
          {buttonText}
        </Button>
      </Paper>
    </form>
  )
};
