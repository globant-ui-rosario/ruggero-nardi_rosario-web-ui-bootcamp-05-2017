import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { setRealm } from '../Actions/setRealm';

class RealmHome extends Component {


  requireCheck() {
    let newRender;
    if (this.props.region) {
      if (this.props.realm) {
        newRender = (<h2>Welcome to {this.props.realm.name}</h2>);
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
        <div>
          <NavLink to='/Home' onClick={() => this.props.setRealm(null)}>
            Check Other Realm
          </NavLink>
          <div>
            <NavLink to={'/CharacterSearch'}>Search Character in {this.props.realm.name}</NavLink>
          </div>
          <div>
            <NavLink to={'/GuildSearch'}>Search Guild in {this.props.realm.name}</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm
});

export default connect(mapStateToProps, { setRealm })(RealmHome);