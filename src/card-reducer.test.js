import { addCard, editCard, removeCard } from './card-actions';
import { cardReducer } from './card-reducer';

describe('[card-reducer]', () => {
  /** @returns {import('./card').Card} */
  const getMockedCard = (id = '1', description = 'Some description') => ({
    description,
    title: 'Some title',
    imageUrl: 'http://localhost:3000',
    id
  });

  it('should return an empty array by default', () => {
    const cards = cardReducer(undefined, {});

    expect(cards).toEqual([]);
  });

  it('should add a card', () => {
    const mockedCard = getMockedCard();

    const [newCard] = cardReducer([], addCard(mockedCard));

    expect(newCard).toEqual(mockedCard);
  });

  it('should edit a card', () => {
    const mockedCard1 = getMockedCard();
    const mockedCard2Id = '2';
    const mockedCard3 = getMockedCard('3');
    const firstState = cardReducer([], addCard(mockedCard1));
    const secondState = cardReducer(firstState, addCard(getMockedCard(mockedCard2Id)));
    const thirdState = cardReducer(secondState, addCard(mockedCard3));

    const editedCard2 = getMockedCard(mockedCard2Id, 'Edited Description');
    const [firstCard, secondCard, thirdCard] = cardReducer(thirdState, editCard(editedCard2));

    expect(firstCard).toEqual(mockedCard1);
    expect(editedCard2).toEqual(secondCard);
    expect(mockedCard3).toEqual(thirdCard);
  });

  it('should remove a card', () => {
    const mockedCard = getMockedCard();

    const mockedCard2Id = '2';
    const mockedCard2 = getMockedCard(mockedCard2Id);

    const firstState = cardReducer([], addCard(mockedCard));
    const secondState = cardReducer(firstState, addCard(mockedCard2));
    const finalState = cardReducer(secondState, removeCard(mockedCard2Id));

    expect(finalState).toHaveLength(1);
    expect(finalState[0]).toEqual(mockedCard);
  });
});