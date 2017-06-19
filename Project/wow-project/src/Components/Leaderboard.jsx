import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPvpLeaderboard } from '../Actions/setPvpLeaderboard';

class Leaderboard extends Component {

  // componentDidMount() {
  //   console.log('IN LB: ',this.props);
  //   if (this.props.leaderboard) {
  //     let url = 'https://' + this.props.regionUrl + '.api.battle.net/wow/leaderboard/' + this.props.leaderboard.name + '?apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte';
  //     if (this.props.leaderboard === 'Challenge') { url = 'https://' + this.props.regionUrl + '.api.battle.net/wow/challenge/' + this.props.realmName + '?apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte'; }
  //     fetch(url).then((response) => {
  //       return response.json();
  //     }).then((data) => {
  //       this.props.setLeaderboard(data);
  //     }).catch((error) => {
  //       console.log('Leaderboard: ', error);
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        <p>RENDER BOARD HERE</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  regionUrl: state.region.url,
  leaderboard: state.leaderboard
});

export default connect(mapStateToProps)(Leaderboard);