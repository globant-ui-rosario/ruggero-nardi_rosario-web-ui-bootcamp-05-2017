import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { setPvpLeaderboard } from '../Actions/setPvpLeaderboard';

class PvpLeaderboard extends Component {


  componentDidMount() {
    this.props.setPvpLeaderboard(null);
    this.fetchLeaderboardData();
  }


  componentDidUpdate(prevProps, PrevState) {
    if (prevProps.match.params.leaderboardId !== this.props.match.params.leaderboardId) {
      this.props.setPvpLeaderboard(null);
      this.fetchLeaderboardData();
    }


  }

  fetchLeaderboardData() {
    if (this.props.leaderboard) {
      let url = 'https://' + this.props.region.url + '.api.battle.net/wow/leaderboard/' + this.props.match.params.leaderboardId + '?&apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte';
      fetch(url).then((response) => {
        return response.json();
      }).then((data) => {
        let top10 = data.rows.slice(0, 10);
        this.props.setPvpLeaderboard(top10);
      }).catch((error) => {
        this.props.setPvpLeaderboard('ERROR');
      })
    }
  }

  retryFetch() {
    this.props.setPvpLeaderboard(null);
    this.fetchLeaderboardData();
  }

  listTop10() {
    return this.props.leaderboard.pvpList.map(player => {
      return (
        <li key={Math.random()}>
          {player.ranking} -<NavLink to={'/CharacterSearch/' + player.name}>{player.name}</NavLink>- {player.realmName}
        </li>)
    });
  }

  render() {
    let newRender = null;
    if (this.props.leaderboard) {
      if (this.props.leaderboard.pvpList === 'ERROR') {
        newRender = (
          <div>
            <p>Unexpected ERROR!</p>
            <button onClick={() => { this.retryFetch() }}>RETRY</button>
          </div>
        );
      } else if (this.props.leaderboard.pvpList) {
        newRender = (
          <div>
            <p>This is a {this.props.match.params.leaderboardId} Leaderboard</p>
            {this.listTop10()}
          </div>
        );
      } else {
        newRender = (
          <p>LOADING LEADERBOARD</p>
        );
      }
    }
    return newRender;
  }
}



const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm,
  leaderboard: state.leaderboard
});

export default connect(mapStateToProps, { setPvpLeaderboard })(PvpLeaderboard);