import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cardReducer } from './card-reducer';
import { cardMiddleware } from './card-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer({
  key: 'cards',
  storage
}, combineReducers({
  cards: cardReducer
}));

export const createCardsFrontendStore = () => {
  let store = createStore(
    persistedReducer,
    {
      cards: { cards: [], sortInAscendingOrder: true }
    },
    composeEnhancers(
      applyMiddleware(cardMiddleware)
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
