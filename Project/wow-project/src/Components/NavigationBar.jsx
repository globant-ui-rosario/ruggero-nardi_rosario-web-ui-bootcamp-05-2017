import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink className="navbar-brand" to={'/Home'}>World Of Warcraft STATS</NavLink>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li><NavLink to='/Home'>HOME</NavLink></li>
              <li><NavLink to='/RegionPick'>REGION PICK</NavLink></li>
              <li><NavLink to="/PlayerSearch">PLAYER SEARCH</NavLink></li>
              <li><NavLink to="/GuildSearch">GUILD SEARCH</NavLink></li>
              <li><NavLink to="/Leaderboards">LEEADERBOARDS</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;