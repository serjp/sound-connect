import React from 'react';
import DevTools from 'mobx-react-devtools';
import { observer, Provider } from 'mobx-react';
import key from 'keymaster';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from './AppBar';
import Player from './Player';

import viewStore from '../stores/view-store';
import playerStore from '../stores/player-store';
import sessionStore from '../stores/session-store';
import { isDev } from '../config';

class App extends React.Component {
  componentWillMount() {
    injectTapEventPlugin();
  }

  componentDidMount() {
    key('space', (e) => { e.preventDefault(); playerStore.playTrack() });
    key('right', () => playerStore.stepForward());
    key('left', () => playerStore.stepBackward());
    key('shift+right', () => playerStore.playNext());
    key('shift+left', () => playerStore.playPrev());
    key('shift+up', () => { playerStore.increaseVolume(); this.showVolumeControl(); });
    key('shift+down', () => { playerStore.decreaseVolume(); this.showVolumeControl(); });
    key('shift+l', () => playerStore.toggleLoop());
    key('m', () => { playerStore.toggleMuted(); this.showVolumeControl(); });
    key('s', () => playerStore.toggleShuffle());
    key('l', () => sessionStore.toggleLike(playerStore.track));
    key('p', () => viewStore.togglePlaylist());
  }

  showVolumeControl() {
    if (!viewStore.volumeControlOpen)
      viewStore.setVolumeControlOpen(true);

    clearTimeout(this._timerId);
    this._timerId = setTimeout(() => viewStore.setVolumeControlOpen(false), 1000);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Provider playerStore={playerStore} viewStore={viewStore} sessionStore={sessionStore}>
          <div>
            <AppBar router={this.props.router} />
            {this.props.children}
            <Player />
            {isDev ? <DevTools /> : null}
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default observer(App);
