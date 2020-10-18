import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { removeCard } from '../card-actions'
import { selectCards } from '../card-selectors';
import { AddCardButton } from '../components/AddCardButton';
import { CardItem } from '../components/CardItem';

const useStyles = makeStyles(() => ({
  gridContainer: {
    width: 'calc(100% - 24px)',
  }
}))

/** @type {import('react').FC<{}>} */
export const CardListPage = () => {
  const cards = useSelector(selectCards);
  const { gridContainer } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      {cards.length ?
        <div className={gridContainer}>
          <Grid
            spacing={3}
            container
            direction="row"
            justify="center"
            data-testid="cards-grid"
          >
            {cards.map(card => (
              <Grid
                item
                key={card.id}
                data-testid={`cards-grid-item-${card.id}`}
              >
                <CardItem
                  {...card}
                  onDelete={id => {
                    dispatch(removeCard(id));
                  }}
                  onEdit={id => {
                    history.push(`/edit/${id}`);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div> :
        <Typography variant="h2" data-testid="no-cards-message">
          Nothing here. Add a card!
        </Typography>}
      <AddCardButton onClick={() => history.push('/add')} />
    </>
  )
};
