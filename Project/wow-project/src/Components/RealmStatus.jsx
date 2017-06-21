import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setRealms } from '../Actions/setRealms';
import { setRealm } from '../Actions/setRealm';

class RealmStatus extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  componentDidMount() {
    this.fetchRealmsData();
  }

  fetchRealmsData() {
    if (this.props.region) {
      let url = 'https://' + this.props.region.url + '.api.battle.net/wow/realm/status?locale=en_US&apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte';
      fetch(url).then((response) => {
        return response.json();
      }).then((data) => {
        this.props.setRealms(data.realms)
      }).catch((error) => {
        this.props.setRealms('ERROR');
      })
    }
  }

  listRealms() {
    if (this.props.region.realms === 'ERROR') {
      return (
        <tr>
          <td>Unexpected Error!</td>
          <td colSpan="3"><button onClick={() => this.fetchRealmsData()}>RETRY</button></td>
        </tr>
      );
    } else {
      return this.props.region.realms.map(realm => {
        if (realm.name.toLowerCase().startsWith(this.state.search.toLowerCase())) {
          let status;
          let colorClass;
          if (realm.status) {
            status = 'ONLINE';
            colorClass = 'green'
          } else {
            status = 'OFFLINE';
            colorClass = 'red';
          }
          return (
            <tr key={realm.name}>
              <td>{status}</td>
              <td>
                <NavLink to={'/Realm/' + realm.name} onClick={() => this.props.setRealm(realm)} >
                  {realm.name}
                </NavLink>
              </td>
              <td>{realm.type}</td>
              <td>{realm.population}</td>
            </tr>
          );
        }
      });
    }
  }



  render() {
    let newRender = null;
    if (this.props.region) {
      if (this.props.region.realms) {
        newRender = (
          <div className='container'>
            <input placeholder="Search Realm..." type="text" onChange={(event) => this.setState({ search: event.target.value })} />
            <div className="table-responsive">
              <table className='table table-striped table-bordered'>
                <thead>
                  <tr>
                    <th>STATUS</th>
                    <th>REALM</th>
                    <th>TYPE</th>
                    <th>POPULATION</th>
                  </tr>
                </thead>
                <tbody>
                  {this.listRealms()}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else {
        newRender = (
          <div>
            <p>Loading Realms States</p>
          </div>
        );
      }
    }
    return newRender;
  }
}

const mapStateToProps = (state) => ({
  region: state.region
});

export default connect(mapStateToProps, { setRealms, setRealm })(RealmStatus);