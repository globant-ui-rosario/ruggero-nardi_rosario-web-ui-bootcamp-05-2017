import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setRealm } from '../Actions/setRealm';

class RealmHome extends Component {

  resetRealm() {
    this.props.setRealm(null);
    this.props.history.push('/Home');
  }

  requireCheck() {
    let newRender;
    if (this.props.region) {
      if (this.props.realm) {
        newRender = (
          <div className="container realm-home">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="tittle-region">Welcome to {this.props.realm.name}</h2>
              </div>
            </div>
            <div className="row justify-content-between">
              <div className="col-sm-12 col-md-6">
                <button onClick={() => this.props.history.push('/CharacterSearch')} className="character-search-icon">
                </button>
              </div>
              <div className="col-sm-12 col-md-6">
                <button onClick={() => this.props.history.push('/GuildSearch')} className="guild-search-icon">
                </button>
              </div>
            </div>
            <button className="realms-list-button" onClick={() => this.resetRealm()}></button>
          </div>
        );
      } else {
        newRender = <Redirect to='/realmRequired' />
      }
    } else {
      newRender = <Redirect to='/Required' />
    }
    return newRender;
  }

  render() {
    return (
      <div>
        {this.requireCheck()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm
});

export default connect(mapStateToProps, { setRealm })(RealmHome);