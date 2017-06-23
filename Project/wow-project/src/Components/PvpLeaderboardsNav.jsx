import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { showLeaderboard } from '../Actions/showLeaderboard';

class PvpLeaderboardsNav extends Component {

  requireCheck() {
    let newRender;
    if (this.props.region) {
      newRender = (<h2 className="text-center tittle-region">PvP Leaderboards</h2>)
    } else {
      newRender = <Redirect to='/Required' />
    }
    return newRender;
  }

  setSelectedLeaderboard(leaderboard) {
    this.props.showLeaderboard(leaderboard);
    if (leaderboard === 'rbg') {
      this.props.history.push(`${this.props.match.url}/Battlegrounds`);
    } else {
      this.props.history.push(`${this.props.match.url}/` + leaderboard);
    }
  }

  render() {
    return (
      <div className="container">
        {this.requireCheck()}
        <div className="container text-center">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <button className="button-2v2" onClick={() => this.setSelectedLeaderboard('2v2')}></button>
            </div>
            <div className="col-xs-12 col-md-4">
              <button className="button-3v3" onClick={() => this.setSelectedLeaderboard('3v3')}></button>
            </div>
            <div className="col-xs-12 col-md-4">
              <button className="button-rbg" onClick={() => this.setSelectedLeaderboard('rbg')}></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  leaderboard: state.leaderboard
});

export default connect(mapStateToProps, { showLeaderboard })(PvpLeaderboardsNav);