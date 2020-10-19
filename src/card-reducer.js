import { ADD_CARD, EDIT_CARD, REMOVE_CARD, TOGGLE_SORT_CARD } from './card-actions';

const sortAsc = (a, b) => ("" + a).localeCompare(b);
const sortDesc = (a, b) => sortAsc(b, a);

/**
 * @param {{ cards: import('./card').Card[], sortInAscendingOrder: boolean }} state
 * @param {{ type: string, payload: import('./card').Card }} action
 */
export const cardReducer = (state = { cards: [], sortInAscendingOrder: true }, action) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload]
      };

    case EDIT_CARD:
      return {
        ...state,
        cards: state.cards.map(card => card.id !== action.payload.id ? card : action.payload)
      };

    case REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload.id)
      };

    case TOGGLE_SORT_CARD:
      return {
        ...state,
        cards: [...state.cards]
          .sort((a, b) => !state.sortInAscendingOrder
            ? sortAsc(a.title, b.title)
            : sortDesc(a.title, b.title)),
        sortInAscendingOrder: !state.sortInAscendingOrder
      };

    default:
      return state;
  }
};
