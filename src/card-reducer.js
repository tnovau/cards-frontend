import { ADD_CARD, EDIT_CARD, REMOVE_CARD } from './card-actions';

/**
 * @param {import('./card').Card[]} state
 * @param {{ type: string, payload: import('./card').Card }} action
 */
export const cardReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CARD:
      return [...state, action.payload];

    case EDIT_CARD:
      return state.map(card => card.id !== action.payload.id ? card : action.payload);

    case REMOVE_CARD:
      return state.filter(card => card.id !== action.payload.id);

    default:
      return state;
  }
};
