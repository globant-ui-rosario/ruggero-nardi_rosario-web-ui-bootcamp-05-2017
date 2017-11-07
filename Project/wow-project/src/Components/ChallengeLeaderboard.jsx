import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChallengeLeaderboard extends Component {


  renderTop10() {
    let newRender;
    if (this.props.challenge) {
      let top10 = this.props.challenge.groups.slice(0, 10);
      newRender = (
        <ul className="list-group">
          {top10.map(map => {
            return newRender = (
              <li className="list-group-item" key={map.ranking}>
                {map.ranking} - {map.date} - {map.faction}
                <ul className="list-group">
                  {map.members.map(member => {
                    if (member.character) {
                      newRender = (<li className="list-group-item" key={member.character.name} >{member.character.name}</li>);
                    } else {
                      newRender = null;
                    } return newRender;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      );
    }
    return newRender
  }

  render() {
    let newRender;
    if (this.props.challenge) {
      newRender = (
        <div>
          <h2 className="tittle-region">{this.props.challenge.map.name}</h2>
          <h3 className="tittle-region">{this.props.challenge.realm.name}</h3>
          <div className="container text-center">
            {this.renderTop10()}
          </div>
        </div>
      );
    } else {
      newRender = null;
    }
    return newRender;
  }
}

const mapStateToProps = (state, ownProps) => ({
  challenge: state.selectedChallenge
});

export default connect(mapStateToProps)(ChallengeLeaderboard);