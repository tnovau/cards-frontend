import { v4 } from 'uuid';
import { ADD_CARD } from './card-actions';

/** @type {import('redux').Middleware} */
export const cardMiddleware = () => next => action => {
  if (action.type === ADD_CARD) {
    return next({
      ...action,
      payload: {
        ...action.payload,
        id: v4()
      }
    })
  }
  next(action);
}