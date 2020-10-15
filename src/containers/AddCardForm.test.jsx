import React from 'react';
import { render } from '@testing-library/react';
import { AddCardForm } from './AddCardForm';

describe('[AddCardForm]', () => {
  const CARD_FORM_HEADING_ID = 'card-form-heading';
  const CARD_FORM_HEADING_TEXT = 'Nueva tarjeta';

  const CARD_FORM_BUTTON_TEST_ID = 'card-form-button';
  const CARD_FORM_BUTTON_TEXT = 'Añadir';

  const renderCardForm = () => render(<AddCardForm />);

  describe('UI', () => {
    it.each([
      [CARD_FORM_HEADING_TEXT, CARD_FORM_HEADING_ID],
      [CARD_FORM_BUTTON_TEXT, CARD_FORM_BUTTON_TEST_ID]
    ])('should show the user %s in %s element', (text, id) => {
      const { getByTestId } = renderCardForm();

      expect(getByTestId(id).textContent).toBe(text);
    });
  });
});