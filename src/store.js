import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { cardReducer } from './card-reducer';
import { cardMiddleware } from './card-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createCardsFrontendStore = () => createStore(
  combineReducers({
    cards: cardReducer
  }), {
    cards: []
  },
  composeEnhancers(
    applyMiddleware(cardMiddleware)
  ));
