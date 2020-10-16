const CARD_FEATURE = 'card'

export const ADD_CARD = `${CARD_FEATURE}/ADD`;
export const EDIT_CARD = `${CARD_FEATURE}/EDIT`;
export const REMOVE_CARD = `${CARD_FEATURE}/REMOVE`;

/**
 * @param {import('./card').Card} payload
 */
export const addCard = payload => ({
  type: ADD_CARD,
  payload
});

/**
 * @param {import('./card').Card} payload
 */
export const editCard = payload => ({
  type: EDIT_CARD,
  payload
});

/**
 * @param {string} id
 */
export const removeCard = id => ({
  type: REMOVE_CARD,
  payload: {
    id
  }
});
