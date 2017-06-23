import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { setChallengeLeaderboard } from '../Actions/setChallengeLeaderboard';
import { setChallenge } from '../Actions/setChallenge';

class ChallengeLeaderboardMaps extends Component {

  componentDidMount() {
    this.fetchLeaderboardData();
  }

  fetchLeaderboardData() {
    if (this.props.region && this.props.realm) {
      const url = 'https://' + this.props.region.url + '.api.battle.net/wow/challenge/' + this.props.realm.name + '?locale=' + this.props.realm.locale + '&apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte';
      fetch(url).then((response) => {
        return response.json();
      }).then((data) => {
        this.props.setChallengeLeaderboard(data.challenge);
      }).catch((error) => {
        this.props.setChallengeLeaderboard('ERROR');
      })
    }
  }

  resetLeaderboard() {
    this.props.setChallengeLeaderboard(null);
    this.fetchLeaderboardData();
  }

  renderChallengeMaps() {
    let render = null;
    if (this.props.challenge === 'ERROR') {
      render = (
        <div>
          <p>Unexpected ERROR!</p>
          <button onClick={() => this.resetLeaderboard()}>RETRY</button>
        </div>
      );
    } else {
      render = (
        <div className="container">
          <ul className="list-group">
            {this.listChallengeMaps()}
          </ul>
        </div>
      );
    }
    return render;
  }

  listChallengeMaps() {
    return this.props.challenge.map(challenge => {
      return (
        <li className="list-group-item" key={this.props.challenge.indexOf(challenge)} onClick={() => {this.setSelectedChallenge(challenge)}}> <NavLink to={`${this.props.match.url}/` + challenge.map.slug}>{challenge.map.name}</NavLink></li>
      );
    });
  }

  setSelectedChallenge(challenge) {
    this.props.setChallenge(challenge);
  }

  requireCheck() {
    let redirect;
    if (this.props.region) {
      if (this.props.realm) {
        redirect = null;
      } else {
        redirect = <Redirect to='/RealmRequired' />
      }
    } else {
      redirect = <Redirect to='/Required' />
    }
    return redirect;
  }

  render() {
    let newRender = null;
    if (this.props.challenge) {
      newRender = (
        <div>
          {this.requireCheck()}
          <h2 className="text-center tittle-region">Select Challenge</h2>
          <div>
            {this.renderChallengeMaps()}
          </div>
        </div>
      );
    } else {
      newRender = (
        <div>
          {this.requireCheck()}
          <div className="container text-center">
            <p className="loading">LOADING CHALLENGES...</p>
          </div>
        </div>
      );
    }
    return newRender;
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm,
  challenge: state.challenge
});

export default connect(mapStateToProps, { setChallengeLeaderboard, setChallenge })(ChallengeLeaderboardMaps);