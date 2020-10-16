import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { AddCardForm } from './AddCardForm';
import { addCard } from '../card-actions';

describe('[AddCardForm]', () => {
  const CARD_FORM_HEADING_ID = 'card-form-heading';
  const CARD_FORM_HEADING_TEXT = 'Nueva tarjeta';

  const CARD_FORM_BUTTON_TEST_ID = 'card-form-button';
  const CARD_FORM_BUTTON_TEXT = 'Añadir';

  const CARD_TITLE_TEXT = 'Título *';
  const CARD_DESCRIPTION_TEXT = 'Descripción *';
  const CARD_IMAGE_URL_TEXT = 'Imagen (Url)';

  /** @returns {import('redux').Store} */
  const getMockStore = (dispatch = jest.fn()) => ({
    dispatch,
    getState: jest.fn(),
    subscribe: jest.fn()
  })

  const renderCardForm = (store = getMockStore(), onFormSubmitFinished = jest.fn()) => render(
    <Provider store={store}>
      <AddCardForm onFormSubmitFinished={onFormSubmitFinished} />
    </Provider>
  );

  /**
   * @param {import('@testing-library/react').RenderResult['getByLabelText']} getByLabelText
   * @param {string} labelText
   * @param {string} inputValue
   */
  const fillInputWithValue = (getByLabelText, labelText, inputValue) => {
    const input = getByLabelText(labelText);
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: inputValue } });
    fireEvent.blur(input);
  }

  describe('UI', () => {
    it.each([
      [CARD_FORM_HEADING_TEXT, CARD_FORM_HEADING_ID],
      [CARD_FORM_BUTTON_TEXT, CARD_FORM_BUTTON_TEST_ID]
    ])('should show the user %s in %s element', (text, id) => {
      const { getByTestId } = renderCardForm();

      expect(getByTestId(id).textContent).toBe(text);
    });
  });

  describe('onFormSubmit', () => {
    it('should dispatch add card action', () => {
      const dispatch = jest.fn();
      const onFormSubmitFinished = jest.fn();
      const mockedStore = getMockStore(dispatch);

      const titleValue = 'Some title';
      const descriptionValue = 'Some description';
      const imageUrlValue = 'Some description';

      const { getByLabelText, getByTestId } = renderCardForm(mockedStore, onFormSubmitFinished);

      fillInputWithValue(getByLabelText, CARD_TITLE_TEXT, titleValue);
      fillInputWithValue(getByLabelText, CARD_DESCRIPTION_TEXT, descriptionValue);
      fillInputWithValue(getByLabelText, CARD_IMAGE_URL_TEXT, imageUrlValue);

      fireEvent.click(getByTestId(CARD_FORM_BUTTON_TEST_ID));

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(addCard({
        title: titleValue,
        description: descriptionValue,
        imageUrl: imageUrlValue
      }))
      expect(onFormSubmitFinished).toHaveBeenCalledTimes(1);
    });
  });
});