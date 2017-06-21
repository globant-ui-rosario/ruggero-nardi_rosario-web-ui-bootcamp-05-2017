import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChallengeLeaderboard extends Component {


  renderTop10() {
    if (this.props.challenge) {
      let top10 = this.props.challenge.groups.slice(0, 10);
      return (
        <ul>
          {top10.map(map => {
            return (
              <li key={map.ranking}>
                {map.ranking} - {map.date} - {map.faction}
                <ul>
                  {map.members.map(member => {
                    if (member.character) {
                      return (<li key={member.character.name} >{member.character.name}</li>);
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </li>
              );
          })}
        </ul>
      );
    }
  }

  render() {
    if (this.props.challenge) {
      return (
        <div>
          <h2>{this.props.challenge.map.name}</h2>
          <h3>{this.props.challenge.realm.name}</h3>
          <div>
            {this.renderTop10()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  challenge: state.selectedChallenge
});

export default connect(mapStateToProps)(ChallengeLeaderboard);