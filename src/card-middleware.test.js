import { ADD_CARD, addCard } from './card-actions';
import { cardMiddleware } from './card-middleware';

describe('[cardMiddleware]', () => {
  it(`should add an id to the card payload in ${ADD_CARD}`, () => {
    const next = jest.fn();
    const action = addCard({
      description: 'Some description',
      imageUrl: 'http://localhost:3000',
      title: 'Some title'
    });

    cardMiddleware()(next)(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].payload.id).toBeDefined();
  });

  it('should handle any other action', () => {
    const next = jest.fn();
    const action = {
      type: 'ANY_ACTION'
    };

    cardMiddleware()(next)(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
});