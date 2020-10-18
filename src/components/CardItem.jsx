import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345
  },
  media: {
    heigth: 140
  }
}));

const FALLBACK_IMG = 'https://jmjung.com/wp-content/themes/koji/assets/images/default-fallback-image.png';

/** @type {import('react').FC<{
 *  title: string,
 *  description: string,
 *  imageUrl: string,
 *  id: string
 *  onDelete: (id: string) => void,
 *  onEdit: (id: string) => void
 * }>} */
export const CardItem = ({
  description,
  id,
  imageUrl,
  title,
  onDelete,
  onEdit
}) => {
  const { media, root } = useStyles();

  return (
    <>
      <Card className={root}>
        <CardMedia
          component="img"
          crossOrigin={null}
          title={title}
          className={media}
          image={imageUrl || FALLBACK_IMG}
          data-testid={`card-item-${id}-media`}
          onError={ev => {
            ev.target.src = FALLBACK_IMG;
          }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom component="h2" data-testid={`card-item-${id}-title`}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" data-testid={`card-item-${id}-description`}>
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            data-testid={`card-item-${id}-edit-button`}
            color="primary"
            onClick={() => onEdit(id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            data-testid={`card-item-${id}-delete-button`}
            color="primary"
            onClick={() => onDelete(id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  )
};
