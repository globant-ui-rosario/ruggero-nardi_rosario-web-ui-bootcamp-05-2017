import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class PlayerSearch extends Component {

  requireCheck() {
    console.log('THIS.PROPS', this.props);
    let newRender;
    if (this.props.region) {
      if (this.props.realm) {
        newRender = (<p>THIS IS WORKING in {this.props.realm.name}</p>);
      } else {
        newRender = <Redirect to='/RealmRequired' />
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

export default connect(mapStateToProps)(PlayerSearch);