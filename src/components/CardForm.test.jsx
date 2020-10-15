import React from 'react';
import { render } from '@testing-library/react';
import { CardForm } from './CardForm';

describe('[CardForm]', () => {
  const CARD_FORM_HEADING_ID = 'card-form-heading';
  const CARD_FORM_HEADING_TEXT = 'HEADING MOCKED TEXT';

  const CARD_TITLE_ID = 'card-form-title';
  const CARD_TITLE_TEXT = 'Título *';

  const CARD_DESCRIPTION_ID = 'card-form-description';
  const CARD_DESCRIPTION_TEXT = 'Descripción *';

  const CARD_IMAGE_URL_ID = 'card-form-image-url';
  const CARD_IMAGE_URL_TEXT = 'Imagen (Url)';

  const CARD_FORM_BUTTON_TEST_ID = 'card-form-button';
  const CARD_FORM_BUTTON_TEXT = 'BUTTON MOCKED TEXT';

  const renderCardForm = () => render(
    <CardForm
      buttonText={CARD_FORM_BUTTON_TEXT}
      headingText={CARD_FORM_HEADING_TEXT}
    />
  );

  describe('UI', () => {
    it.each([
      [CARD_FORM_HEADING_TEXT, CARD_FORM_HEADING_ID],
      [CARD_FORM_BUTTON_TEXT, CARD_FORM_BUTTON_TEST_ID]
    ])('should show the user %s in %s element', (text, id) => {
      const { getByTestId } = renderCardForm();

      expect(getByTestId(id).textContent).toBe(text);
    });

    it.each([
      [CARD_TITLE_TEXT, CARD_TITLE_ID],
      [CARD_DESCRIPTION_TEXT, CARD_DESCRIPTION_ID],
      [CARD_IMAGE_URL_TEXT, CARD_IMAGE_URL_ID],
    ])(`should ask the user for a "${CARD_TITLE_TEXT}"`, (text, id) => {
      const { getByLabelText } = renderCardForm();

      const titleInput = getByLabelText(text);

      expect(titleInput.id).toBe(id);
      expect(titleInput.name).toBe(id);
    });
  });
});