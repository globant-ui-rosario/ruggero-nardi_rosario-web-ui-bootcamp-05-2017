import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import CharacterSearch from './Components/CharacterSearch';
import GuildSearch from './Components/GuildSearch';
import PvpLeaderboardsNav from './Components/PvpLeaderboardsNav';
import PvpLeaderboard from './Components/PvpLeaderboard';
import RegionPick from './Components/RegionPick';
import RealmHome from './Components/RealmHome';
import ChallengeLeaderboardMaps from './Components/ChallengeLeaderboardMaps';
import ChallengeLeaderboard from './Components/ChallengeLeaderboard';
import CharacterDetails from './Components/CharacterDetails';
import GuildDetails from './Components/GuildDetails';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <header className="header text-center hidden-xs">
            </header>
          </div>
          <div className="main-content row">
              <NavigationBar />
              <Route exact path={'/'} component={RegionPick} />
              <Route path={'/Required'} component={RegionPick} />
              <Route path={'/RealmRequired'} component={Home} />
              <Route path={'/Realm/:realmId'} component={RealmHome} />
              <Route path={'/Home'} component={Home} />
              <Route path={'/CharacterSearch'} component={CharacterSearch} />
              <Route path={'/CharacterSearch/:characterId'} component={CharacterDetails} />
              <Route path={'/GuildSearch'} component={GuildSearch} />
              <Route path={'/GuildSearch/:guildId'} component={GuildDetails} />
              <Route path={'/Leaderboards'} component={PvpLeaderboardsNav} />
              <Route path={'/Leaderboards/:leaderboardId'} component={PvpLeaderboard} />
              <Route path={'/Leaderboard/Challenge'} component={ChallengeLeaderboardMaps} />
              <Route path={'/Leaderboard/Challenge/:challengeId'} component={ChallengeLeaderboard} />
            </div>
          </div>
      </Router>
        );
  }
}

export default App;
