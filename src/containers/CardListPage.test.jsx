import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CardListPage } from './CardListPage';

describe('[CardListPage]', () => {
  const ADD_CARD_BUTTON_ID = 'add-card-button';

  const renderCardListPage = (onAddCardButtonClick = jest.fn()) => render(
    <CardListPage onAddCardButtonClick={onAddCardButtonClick} />
  )

  it('should render a button to create a claim', () => {
    const { getByTestId } = renderCardListPage();

    expect(getByTestId(ADD_CARD_BUTTON_ID)).toBeInTheDocument();
  });

  it('should call "onAddCardButtonClick" on button to create a claim click', () => {
    const onAddCardButtonClick = jest.fn();
    const { getByTestId } = renderCardListPage(onAddCardButtonClick);

    fireEvent.click(getByTestId(ADD_CARD_BUTTON_ID));

    expect(onAddCardButtonClick).toHaveBeenCalledTimes(1);
  });
});