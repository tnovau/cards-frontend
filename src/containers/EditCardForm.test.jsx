import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import { EditCardForm } from './EditCardForm';

describe('[EditCardForm]', () => {
  const CARD_FORM_HEADING_ID = 'card-form-heading';
  const CARD_FORM_HEADING_TEXT = 'Editar tarjeta';

  const CARD_FORM_BUTTON_TEST_ID = 'card-form-button';
  const CARD_FORM_BUTTON_TEXT = 'Editar';

  const renderCardForm = () => render(
    <Provider store={{
      dispatch: jest.fn(),
      getState: () => ({ cards: { cards: [] } }),
      subscribe: jest.fn()
    }}>
      <Router history={createMemoryHistory()}>
        <EditCardForm />
      </Router>
    </Provider>
  );

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