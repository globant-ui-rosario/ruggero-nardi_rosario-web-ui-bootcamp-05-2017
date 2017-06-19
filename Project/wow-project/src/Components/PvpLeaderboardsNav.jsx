import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { showLeaderboard } from '../Actions/showLeaderboard';

class PvpLeaderboardsNav extends Component {

  requireCheck() {
    let newRender;
    if (this.props.region) {
        newRender = (<p>PvP Leaderboards</p>)
    } else {
      newRender = <Redirect to='/Required' />
    }
    return newRender;
  }

  render() {
    return (
      <div>
        {this.requireCheck()}
        <nav>
          <ul>
            <li><NavLink to={`${this.props.match.url}/2v2`} onClick={() => this.props.showLeaderboard('2v2')}>PvP 2v2</NavLink></li>
            <li><NavLink to={`${this.props.match.url}/3v3`} onClick={() => this.props.showLeaderboard('3v3')}>PvP 3v3</NavLink></li>
            <li><NavLink to={`${this.props.match.url}/rbg`} onClick={() => this.props.showLeaderboard('Battlegrounds')}>PvP Battlegrounds</NavLink></li>
          </ul>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  leaderboard: state.leaderboard
});

export default connect(mapStateToProps, { showLeaderboard })(PvpLeaderboardsNav);