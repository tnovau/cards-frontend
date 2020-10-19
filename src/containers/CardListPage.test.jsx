import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import { CardListPage } from './CardListPage';

describe('[CardListPage]', () => {
  const ADD_CARD_BUTTON_ID = 'add-card-button';
  const NO_CARDS_MESSAGE_ID = 'no-cards-message';
  const NO_CARDS_MESSAGE_TEXT = 'Nothing here. Add a card!';
  const CARDS_GRID_ID = 'cards-grid';
  const CARDS_GRID_ITEM_ID = 'cards-grid-item-';

  const renderCardListPage = (cards = [], memoryHistory = createMemoryHistory()) => render(
    <Provider store={{
      dispatch: jest.fn(),
      getState: () => ({ cards: { cards } }),
      subscribe: jest.fn()
    }}>
      <Router history={memoryHistory}>
        <CardListPage />
      </Router>
    </Provider>
  )

  describe('UI', () => {
    it('should render a button to create a card', () => {
      const { getByTestId } = renderCardListPage();

      expect(getByTestId(ADD_CARD_BUTTON_ID)).toBeInTheDocument();
    });

    it('should render a message to inform that there are not cards', () => {
      const { getByTestId } = renderCardListPage();

      expect(getByTestId(NO_CARDS_MESSAGE_ID).textContent).toBe(NO_CARDS_MESSAGE_TEXT);
    });

    it('should render a cards grid when there are cards', () => {
      /** @type {import('../card').Card} */
      const mockCard = {
        description: 'Some description',
        id: '2',
        imageUrl: '',
        title: 'Some title'
      };
      const { queryByTestId, getByTestId } = renderCardListPage([mockCard]);

      expect(queryByTestId(NO_CARDS_MESSAGE_ID)).toBeNull();
      expect(getByTestId(CARDS_GRID_ID)).toBeInTheDocument();
      expect(getByTestId(`${CARDS_GRID_ITEM_ID}${mockCard.id}`)).toBeInTheDocument();
    });
  });

  it('should redirect to "/add" on button to create a card click', () => {
    const memoryHistory = createMemoryHistory();
    const { getByTestId } = renderCardListPage(undefined, memoryHistory);

    fireEvent.click(getByTestId(ADD_CARD_BUTTON_ID));

    expect(memoryHistory.location.pathname).toBe("/add");
  });
});