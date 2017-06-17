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
    if (this.props.location.pathname === '/Require') {
      return (<p>Please Pick a Region</p>)
    }
  }
  

  render() {
    return (
      <div>
        <div>
          {this.checkRequire()}
        </div>
        <NavLink onClick={() => this.setRegion('us', 'Americas')} to={"/Home"}>
          <button className="col-xs-6 text-center btn-lg">Americas</button>
        </NavLink>
        <NavLink onClick={() => this.setRegion('eu', 'Europe')} to={"/Home"}>
          <button className="col-xs-6 text-center btn-lg">Europe</button>
        </NavLink>
        <NavLink onClick={() => this.setRegion('tw', 'Taiwan')} to={"/Home"}>
          <button className="col-xs-6 text-center btn-lg">Taiwan</button>
        </NavLink>
        <NavLink onClick={() => this.setRegion('kr', 'Korea')} to={"/Home"}>
          <button className="col-xs-6 text-center btn-lg">Korea</button>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  region: state.region
});

export default connect(mapStateToProps, { setRegion })(RegionPick);