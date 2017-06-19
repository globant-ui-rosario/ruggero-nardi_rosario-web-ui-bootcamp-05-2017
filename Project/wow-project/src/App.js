import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import PlayerSearch from './Components/PlayerSearch';
import GuildSearch from './Components/GuildSearch';
import PvpLeaderboardsNav from './Components/PvpLeaderboardsNav';
import PvpLeaderboard from './Components/PvpLeaderboard';
import RegionPick from './Components/RegionPick';
import RealmHome from './Components/RealmHome';
import ChallengeLeaderboardMaps from './Components/ChallengeLeaderboardMaps';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route exact path={'/'} component={RegionPick} />
          <Route path={'/Required'} component={RegionPick}/>
          <Route path={'/RealmRequired'} component={Home}/>
          <Route path={'/Realm/:realmId'} component={RealmHome}/>
          <Route path={'/Home'} component={Home} />
          <Route path={'/PlayerSearch'} component={PlayerSearch} />
          <Route path={'/GuildSearch'} component={GuildSearch} />
          <Route path={'/Leaderboards'} component={PvpLeaderboardsNav} />
          <Route path={'/Leaderboards/:leaderboardId'} component={PvpLeaderboard}/>
          <Route path={'/Leaderboard/Challenge'} component={ChallengeLeaderboardMaps}/>
        </div>
      </Router>
    );
  }
}

export default App;
