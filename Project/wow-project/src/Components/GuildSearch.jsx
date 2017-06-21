import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

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
        newRender = (<p>Searching Guild in {this.props.realm.name}</p>);
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
        <Link to={`${this.props.match.url}/` + this.state.search}>
          <button>
            Search
          </button>
        </Link>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.requireCheck()}
        <input placeholder='Guild Name here...' onChange={(event) => { this.setState({ search: event.target.value }) }} type="text" />
        {this.validateSearch()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm
});

export default connect(mapStateToProps)(GuildSearch);