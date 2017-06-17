import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RealmStatus from './RealmStatus';
import { Link } from 'react-router-dom';

class Home extends Component {

  regionName() {
    if (this.props.region) {
      return ("Realms Status for " + this.props.region.name + " Region.");
    } else {
      return <Redirect to='/Require'/>;
    }

  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">{this.regionName()}</h2>
        <Link to={'/'}>{'CHANGE REGION'}</Link>
        <div>
          <RealmStatus />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  region: state.region
});

export default connect(mapStateToProps)(Home);