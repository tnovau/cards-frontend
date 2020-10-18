export const selectCards = state => state.cards;

export const selectCardById = id => state => state.cards.filter(card => card.id === id)[0];