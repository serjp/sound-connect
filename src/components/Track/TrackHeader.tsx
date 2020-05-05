import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../app-context';
import { Track } from '../../models/track';
import { formatDuration, formatNumber, fromNow } from '../../utils';
import { Bullet } from '../Bullet';
import TrackImage from './TrackImage';

const useStyles = makeStyles((theme) => ({
  root: {
    background: grey[100],
  },
}));

const TrackHeader = ({ track }: { track: Track }) => {
  const classes = useStyles();
  const { sessionStore } = useContext(AppContext);
  const { user } = track;
  const isLiked = sessionStore.isLiked(track);

  return (
    <Box py={3} mb={3} className={classes.root}>
      <Container>
        <Grid container alignItems="center" spacing={3}>
          <Hidden xsDown>
            <Grid item sm={3}>
              <TrackImage track={track} />
            </Grid>
          </Hidden>

          <Grid item xs>
            <Typography variant="h5">Single</Typography>
            <Typography variant="h4" gutterBottom>
              {track.title}
            </Typography>
            <Typography variant="body1" display="inline">
              by{' '}
            </Typography>
            <Link to={`/users/${user.permalink}`}>
              <Typography
                variant="body1"
                color="primary"
                display="inline"
                gutterBottom
              >
                {user.username}
              </Typography>
            </Link>
            <Typography variant="body2" gutterBottom>
              added {fromNow(track.created_at)}
              <Bullet />
              {formatDuration(track.duration)}
              <Bullet />
              {formatNumber(track.playback_count)} plays
              <Bullet />
              {formatNumber(track.favoritings_count)} likes
              {/*<span className="bullet">&bull;</span>*/}
              {/*{formatNumber(track.reposts_count)} reposts{' '}*/}
            </Typography>
            <Button
              variant="contained"
              color={isLiked ? 'default' : 'primary'}
              onClick={() => sessionStore.toggleLike(track)}
            >
              {isLiked ? 'Unlike' : 'Like'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default observer(TrackHeader);
