import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRegion } from '../Actions/setRegion';


class RegionPick extends Component {

  setRegion(url, name) {
    const region = {
      name: name,
      url: url
    }
    this.props.setRegion(region);
    this.props.history.push('/Home');
  }


  checkRequire() {
    if (this.props.location.pathname === '/Required') {
      return (
        <p className="tittle-region">Please Pick a Region to continue</p>
      );
    }
  }

  render() {
    return (
      <div>
        {this.checkRequire()}
        <div className="fill col-sm-0 col-md-12"></div>
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <button onClick={() => this.setRegion('us', 'Americas')} className="button text-center">Americas</button>
            </div>
            <div className="fill col-sm-12 col-md-4"></div>
            <div className="col-sm-12 col-md-4">
              <button onClick={() => this.setRegion('eu', 'Europe')} className="button text-center">Europe</button>
            </div>
          </div>
          <div className="fill col-sm-12 col-md-0"></div>
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <button onClick={() => this.setRegion('tw', 'Taiwan')} className="button text-center">Taiwan</button>
            </div>
            <div className="fill col-sm-12 col-md-4"></div>
            <div className="col-sm-12 col-md-4">
              <button onClick={() => this.setRegion('kr', 'Korea')} className="button text-center">Korea</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  region: state.region
});

export default connect(mapStateToProps, { setRegion })(RegionPick);