import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RealmStatus from './RealmStatus';

class Home extends Component {

  regionPickControl() {
    let validationControl;
    if (this.props.region) {
      if (this.props.match.url === '/RealmRequired') {
        validationControl = (<h2 className="text-center tittle-region">Please Select a Realm to Continue</h2>);
      } else if (this.props.realm) {
        validationControl = (
          <Redirect to={'/Realm/' + this.props.realm.name} />
        );
      }
      validationControl = (<h2 className="text-center tittle-region">Realms Status for {this.props.region.name} Region</h2>);
    } else {
      validationControl = <Redirect to='/Required' />;
    }
    return validationControl;
  }

  render() {
    return (
      <div className="container text-center">
        {this.regionPickControl()}
        <button className="btn btn-warning region-button" onClick={() => this.props.history.push('/')}>
        
        CHANGE REGION
        
        </button>
        <RealmStatus />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  region: state.region,
  realm: state.realm
});

export default connect(mapStateToProps)(Home);