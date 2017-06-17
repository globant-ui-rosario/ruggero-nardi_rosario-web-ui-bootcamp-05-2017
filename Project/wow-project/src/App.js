import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import PlayerSearch from './Components/PlayerSearch';
import GuildSearch from './Components/GuildSearch';
import Leaderboards from './Components/Leaderboards';
import RegionPick from './Components/RegionPick';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route exact path={'/'} component={RegionPick} />
          <Route path={'/Require'} component={RegionPick}/>
          <Route path={'/Home'} component={Home} />
          <Route path={'/PlayerSearch'} component={PlayerSearch} />
          <Route path={'/GuildSearch'} component={GuildSearch} />
          <Route path={'/Leaderboards'} component={Leaderboards} />
        </div>
      </Router>
    );
  }
}

export default App;
