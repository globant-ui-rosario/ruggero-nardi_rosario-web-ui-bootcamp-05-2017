import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
        <tr key={player.ranking}>
          <td>{player.ranking}</td>
          <td>{player.name}</td>
          <td>{player.realmName}</td>
        </tr>
      );
    });
  }

  render() {
    let newRender = null;
    if (this.props.leaderboard) {
      if (this.props.leaderboard.pvpList === 'ERROR') {
        newRender = (
          <div className="container text-center">
            <p className="loading">Unexpected ERROR!</p>
            <button onClick={() => { this.retryFetch() }}>RETRY</button>
          </div>
        );
      } else if (this.props.leaderboard.pvpList) {
        newRender = (
          <div className="container text-center">
            <p className="tittle-region">{this.props.match.params.leaderboardId} Leaderboard</p>
            <div className="table-responsive text-center">
              <table className="realm-table table table-hover table-bordered">
                <thead className="search-table table-head">
                  <tr>
                    <th>Ranking</th>
                    <th>Member</th>
                    <th>Realm</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {this.listTop10()}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else {
        newRender = (
          <div className="container text-center">
            <p className="loading">LOADING LEADERBOARD...</p>
          </div>
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

export default withRouter(connect(mapStateToProps, { setPvpLeaderboard })(PvpLeaderboard));