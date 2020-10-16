import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';

jest.mock('./containers/AddCardForm', () => ({
  __esModule: true,
  AddCardForm: ({onFormSubmitFinished}) => (<button onClick={onFormSubmitFinished} data-testid="card-form">Mock button</button>)
}))

describe('[App]', () => {
  const ADD_CARD_BUTTON_ID = 'add-card-button';
  const CARD_FORM_ID = 'card-form';

  const renderApp = () => render(
    <Provider store={createStore((state, _action) => state, {})}>
      <App />
    </Provider>
  );

  it('should renders "cardList"', () => {
    const { getByTestId } = renderApp();
    const addCardButton = getByTestId(ADD_CARD_BUTTON_ID);
    expect(addCardButton).toBeInTheDocument();
  });

  it('should show add card form on "button to add a card" click', () => {
    const { getByTestId, queryByTestId } = renderApp();

    const addCardButton = getByTestId(ADD_CARD_BUTTON_ID);
    fireEvent.click(addCardButton);

    expect(getByTestId(CARD_FORM_ID)).toBeInTheDocument();
    expect(queryByTestId(ADD_CARD_BUTTON_ID)).toBeNull();
  });

  it('should show "cardList" on add card form submit finished', () => {
    const { getByTestId, queryByTestId } = renderApp();

    fireEvent.click(getByTestId(ADD_CARD_BUTTON_ID));
    fireEvent.click(getByTestId(CARD_FORM_ID));

    expect(queryByTestId(CARD_FORM_ID)).toBeNull();
    expect(getByTestId(ADD_CARD_BUTTON_ID)).toBeInTheDocument();
  });
});
