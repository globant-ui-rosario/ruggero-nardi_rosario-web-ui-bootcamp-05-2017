import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class GuildSearch extends Component {

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
        newRender = (<h2 className="tittle-region">Searching Guild in {this.props.realm.name}</h2>);
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
        <button className="search-button" onClick={() => this.props.history.push(`${this.props.match.url}/` + this.state.search)}></button>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="container">
        {this.requireCheck()}
        <input className="form-control" placeholder='Enter Guild Name here...' onChange={(event) => { this.setState({ search: event.target.value }) }} type="text" />
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

export default connect(mapStateToProps)(GuildSearch);