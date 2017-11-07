import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
        newRender = (<p className="tittle-region">Searching character in {this.props.realm.name}</p>);
      } else {
        newRender = <Redirect to='/RealmRequired' />
      }
    } else {
      newRender = <Redirect to='/Required' />
    }
    return newRender;
  }


  validateSearch() {
    let validation;
    if (this.state.search) {
      validation = (
        <button className="search-button" onClick={() => this.props.history.push(`${this.props.match.url}/` + this.state.search)}></button>
      );
    } else {
      validation = null;
    }
    return validation;
  }

  render() {
    return (
      <div className="container">
        {this.requireCheck()}
        <input className="form-control" placeholder='Enter Character Name here...' onChange={(event) => { this.setState({ search: event.target.value }) }} type="text" />
        <div className="text-center">
          {this.validateSearch()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm
});

export default connect(mapStateToProps)(PlayerSearch);