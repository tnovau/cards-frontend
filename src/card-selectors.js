export const selectCards = state => state.cards.cards;

export const selectCardById = id => state => selectCards(state).filter(card => card.id === id)[0];

export const selectSortInAscendingOrder = state => state.cards.sortInAscendingOrder;
