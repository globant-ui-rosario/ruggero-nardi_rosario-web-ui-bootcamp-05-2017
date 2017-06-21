import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRegion } from '../Actions/setRegion';
import { NavLink } from 'react-router-dom';


class RegionPick extends Component {

  setRegion(url, name) {
    const region = {
      name: name,
      url: url
    }
    this.props.setRegion(region);
  }

  
  checkRequire() {
    if (this.props.location.pathname === '/Required') {
      return (<p>Please Pick a Region to continue</p>)
    }
  }
  

  render() {
    return (
      <div className="container">
        <div>
          {this.checkRequire()}
        </div>
        <NavLink onClick={() => this.setRegion('us', 'Americas')} to={"/Home"}>
          <button className="button col-xs-12 col-md-6 text-center btn-lg btn">Americas</button>
        </NavLink>
        <NavLink onClick={() => this.setRegion('eu', 'Europe')} to={"/Home"}>
          <button className="button col-xs-12 col-md-6 text-center btn-lg btn">Europe</button>
        </NavLink>
        <NavLink onClick={() => this.setRegion('tw', 'Taiwan')} to={"/Home"}>
          <button className="button col-xs-12 col-md-6 text-center btn-lg btn">Taiwan</button>
        </NavLink>
        <NavLink onClick={() => this.setRegion('kr', 'Korea')} to={"/Home"}>
          <button className="button col-xs-12 col-md-6 text-center btn-lg btn">Korea</button>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  region: state.region
});

export default connect(mapStateToProps, { setRegion })(RegionPick);