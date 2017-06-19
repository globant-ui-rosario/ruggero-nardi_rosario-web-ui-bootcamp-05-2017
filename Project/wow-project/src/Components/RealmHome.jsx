import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { setRealm } from '../Actions/setRealm';

class RealmHome extends Component {


  requireCheck() {
    let newRender;
    if (this.props.region) {
      if (this.props.realm) {
        newRender = (<p>Welcome to {this.props.realm.name}</p>);
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