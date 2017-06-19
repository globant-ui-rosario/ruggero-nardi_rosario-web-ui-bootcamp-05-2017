import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setRealms } from '../Actions/setRealms';
import { setRealm } from '../Actions/setRealm';

class RealmStatus extends Component {


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
        <div>
          <p>Unexpeted Error!</p>
          <button onClick={() => this.fetchRealmsData()}>RETRY</button>
        </div>
      );
    } else {
      return this.props.region.realms.map(realm => {
        let status;
        if (realm.status) {
          status = 'ONLINE';
        } else {
          status = 'OFFLINE';
        }
        return (
          <li key={realm.name}  >
            <NavLink to={'/Realm/' + realm.name} onClick={() => this.props.setRealm(realm)} >
              {status} - {realm.name} - {realm.type} - {realm.population} - {realm.locale}
            </NavLink>
          </li>
        );
      });
    }
  }



  render() {
    let newRender = null;
    if (this.props.region) {
      if (this.props.region.realms) {
        newRender = (
          <div>
            <ul>
              {this.listRealms()}
            </ul>
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