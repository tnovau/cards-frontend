import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import App from './App';

jest.mock('./containers/AddCardForm', () => ({
  __esModule: true,
  AddCardForm: () => (<button data-testid="card-form">Mock button</button>)
}));

jest.mock('./containers/CardListPage', () => ({
  __esModule: true,
  CardListPage: () => (
    <button data-testid="add-card-button">
      Mock add card button
    </button>
  )
}));

jest.mock('./containers/EditCardForm', () => ({
  __esModule: true,
  EditCardForm: () => (
    <button data-testid="card-form">
      Mock edit card button
    </button>
  )
}));

describe('[App]', () => {
  const ADD_CARD_BUTTON_ID = 'add-card-button';

  const renderApp = () => render(
    <Router history={createMemoryHistory()}>
      <App />
    </Router>
  );

  it('should renders "cardList"', () => {
    const { getByTestId } = renderApp();
    const addCardButton = getByTestId(ADD_CARD_BUTTON_ID);
    expect(addCardButton).toBeInTheDocument();
  });
});
