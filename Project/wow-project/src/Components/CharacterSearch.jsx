import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

class PlayerSearch extends Component {

  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  requireCheck() {
    let newRender;
    if (this.props.region) {
      if (this.props.realm) {
        newRender = (<p>Searching character in {this.props.realm.name}</p>);
      } else {
        newRender = <Redirect to='/RealmRequired' />
      }
    } else {
      newRender = <Redirect to='/Required' />
    }
    return newRender;
  }


  validateSearch() {
    if (this.state.search) {
      return (
        <button>
          <NavLink to={`${this.props.match.url}/` + this.state.search}>Search</NavLink>
        </button>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.requireCheck()}
        <input placeholder='Character Name here...' onChange={(event) => { this.setState({ search: event.target.value }) }} type="text" />
        {this.validateSearch()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm
});

export default connect(mapStateToProps)(PlayerSearch);