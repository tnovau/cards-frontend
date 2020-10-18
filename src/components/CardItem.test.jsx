import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CardItem } from './CardItem';

describe('[CardItem]', () => {
  const MOCKED_TITLE = 'Some title';
  const MOCKED_DESCRIPTION = 'Some description';
  const MOCKED_ID = '2';
  const MOCKED_IMAGE_URL = 'http://localhost:3000';

  const CARD_MEDIA_ID = 'card-item-2-media';
  const CARD_TITLE_ID = 'card-item-2-title';
  const CARD_DESCRIPTION_ID = 'card-item-2-description';
  const CARD_EDIT_BUTTON_ID = 'card-item-2-edit-button';
  const CARD_DELETE_BUTTON_ID = 'card-item-2-delete-button';

  const renderCardItem = (onDelete = jest.fn(), onEdit = jest.fn()) => render(
    <CardItem
      title={MOCKED_TITLE}
      description={MOCKED_DESCRIPTION}
      id={MOCKED_ID}
      imageUrl={MOCKED_IMAGE_URL}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );

  it('should render correctly', () => {
    const { getByTestId } = renderCardItem();

    expect(getByTestId(CARD_MEDIA_ID).src).toBe(MOCKED_IMAGE_URL + "/");
    expect(getByTestId(CARD_TITLE_ID).textContent).toBe(MOCKED_TITLE);
    expect(getByTestId(CARD_DESCRIPTION_ID).textContent).toBe(MOCKED_DESCRIPTION);
    expect(getByTestId(CARD_EDIT_BUTTON_ID)).toBeInTheDocument();
    expect(getByTestId(CARD_DELETE_BUTTON_ID)).toBeInTheDocument();
  });

  it('should call onDelete with the id on DELETE button click', () => {
    const onDelete = jest.fn();
    const { getByTestId } = renderCardItem(onDelete);

    fireEvent.click(getByTestId(CARD_DELETE_BUTTON_ID));

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(MOCKED_ID);
  });

  it('should call onDelete with the id on DELETE button click', () => {
    const onEdit = jest.fn();
    const { getByTestId } = renderCardItem(jest.fn(), onEdit);

    fireEvent.click(getByTestId(CARD_EDIT_BUTTON_ID));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(MOCKED_ID);
  });
});