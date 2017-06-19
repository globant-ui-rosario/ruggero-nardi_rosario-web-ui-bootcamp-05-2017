import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RealmStatus from './RealmStatus';
import { Link } from 'react-router-dom';

class Home extends Component {

  regionPickControl() {
    if (this.props.region) {
      if (this.props.match.url === '/RealmRequired') {
        return (<h2>Please Select a Realm to access search and leaderboards</h2>);
      } else if (this.props.realm) {
        return (
          <Redirect to={'/Realm/'+this.props.realm.name} />
        );
      }
      return (<h2>"Realms Status for {this.props.region.name} Region."</h2>);
    } else {
      return <Redirect to='/Required' />;
    }

  }

  render() {
    return (
      <div className="container">
        {this.regionPickControl()}
        <Link to={'/'}>{'CHANGE REGION'}</Link>
        <div>
          <RealmStatus />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  region: state.region,
  realm: state.realm
});

export default connect(mapStateToProps)(Home);