import React, { Component } from 'react';
import { connect } from 'react-redux';
import RealmStatus from './RealmStatus';

class Home extends Component {

  regionName() {
    if (this.props.region) {
      return ("Realms Status for " + this.props.region[1] + " Region.");
    } else {
      return "Select a Region first"
    }

  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">{this.regionName()}</h2>
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