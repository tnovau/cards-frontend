import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CardForm } from './CardForm';

describe('[CardForm]', () => {
  const CARD_FORM_HEADING_ID = 'card-form-heading';
  const CARD_FORM_HEADING_TEXT = 'HEADING MOCKED TEXT';

  const CARD_TITLE_ID = 'card-form-title';
  const CARD_TITLE_TEXT = 'Título *';
  const CARD_TITLE_ERROR_MESSAGE = 'Debes especificar un título.';

  const CARD_DESCRIPTION_ID = 'card-form-description';
  const CARD_DESCRIPTION_TEXT = 'Descripción *';
  const CARD_DESCRIPTION_ERROR_MESSAGE = 'Debes especificar una descripción.';

  const CARD_IMAGE_URL_ID = 'card-form-image-url';
  const CARD_IMAGE_URL_TEXT = 'Imagen (Url)';

  const CARD_FORM_BUTTON_ID = 'card-form-button';
  const CARD_FORM_BUTTON_TEXT = 'BUTTON MOCKED TEXT';

  const CARD_FORM_ID = 'card-form';

  const renderCardForm = (onFormSubmit = jest.fn()) => render(
    <CardForm
      buttonText={CARD_FORM_BUTTON_TEXT}
      headingText={CARD_FORM_HEADING_TEXT}
      onFormSubmit={onFormSubmit}
    />
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

  /**
   * @param {import('@testing-library/react').RenderResult['getByLabelText']} getByLabelText
   * @param {string} labelText
   */
  const focusAndBlurInput = (getByLabelText, labelText) => {
    const input = getByLabelText(labelText);
    fireEvent.focus(input);
    fireEvent.blur(input);
  }

  describe('UI', () => {
    it('should render the card form', () => {
      const { getByTestId } = renderCardForm();

      expect(getByTestId(CARD_FORM_ID)).toBeInTheDocument();
    });

    it.each([
      [CARD_FORM_HEADING_TEXT, CARD_FORM_HEADING_ID],
      [CARD_FORM_BUTTON_TEXT, CARD_FORM_BUTTON_ID]
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

      const input = getByLabelText(text);

      expect(input.id).toBe(id);
      expect(input.name).toBe(id);
    });

    it.each([
      [CARD_TITLE_TEXT, CARD_TITLE_ERROR_MESSAGE],
      [CARD_DESCRIPTION_TEXT, CARD_DESCRIPTION_ERROR_MESSAGE]
    ])('should show error message when text field is empty on blur', (labelText, errorMessage) => {
      const { getByLabelText, getByText } = renderCardForm();

      focusAndBlurInput(getByLabelText, labelText);

      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('Submit', () => {
    it('should fill all the fields on the form and call onFormSubmit after clicking in submit button', () => {
      const titleValue = 'Some title';
      const desciptionValue = 'Some description';
      const imageUrlValue = 'http://localhost:3000';
      const onFormSubmit = jest.fn();

      const { getByLabelText, getByTestId } = renderCardForm(onFormSubmit);

      fillInputWithValue(getByLabelText, CARD_TITLE_TEXT, titleValue);
      fillInputWithValue(getByLabelText, CARD_DESCRIPTION_TEXT, desciptionValue);
      fillInputWithValue(getByLabelText, CARD_IMAGE_URL_TEXT, imageUrlValue);

      fireEvent.click(getByTestId(CARD_FORM_BUTTON_ID));

      expect(onFormSubmit).toHaveBeenCalledTimes(1);
      expect(onFormSubmit).toHaveBeenCalledWith({
        title: titleValue,
        description: desciptionValue,
        imageUrl: imageUrlValue
      });
    });

    it('should fill all the fields on the form and call onFormSubmit after clicking in submit button', () => {
      const onFormSubmit = jest.fn();

      const { getByTestId, getByText } = renderCardForm(onFormSubmit);

      fireEvent.click(getByTestId(CARD_FORM_BUTTON_ID));

      expect(onFormSubmit).toHaveBeenCalledTimes(0);
      expect(getByText(CARD_TITLE_ERROR_MESSAGE)).toBeInTheDocument();
      expect(getByText(CARD_DESCRIPTION_ERROR_MESSAGE)).toBeInTheDocument();
    });
  });
});
