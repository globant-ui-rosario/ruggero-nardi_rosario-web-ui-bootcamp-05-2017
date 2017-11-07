import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    let newList;
    if (this.props.region.realms === 'ERROR') {
      newList = (
        <tr>
          <td>Unexpected Error!</td>
          <td colSpan="3"><button onClick={() => this.fetchRealmsData()}>RETRY</button></td>
        </tr>
      );
    } else {
      newList = this.props.region.realms.map(realm => {
        if (realm.name.toLowerCase().startsWith(this.state.search.toLowerCase())) {
          let status;
          let colorClass;
          if (realm.status) {
            status = 'ONLINE';
            colorClass = 'online'
          } else {
            status = 'OFFLINE';
            colorClass = 'offline';
          }
          newList = (
            <tr key={realm.name} onClick={() => this.setSelectedRealm(realm)}>
              <td className={colorClass}>{status}</td>
              <td>{realm.name}</td>
              <td>{realm.type}</td>
              <td>{realm.population}</td>
            </tr>
          );
        } else newList = null;
        return newList;
      });
      return newList;
    }
  }

  setSelectedRealm(realm) {
    this.props.setRealm(realm);
    this.props.history.push('/Realm/' + realm.name);
  }


  render() {
    let newRender = null;
    if (this.props.region) {
      if (this.props.region.realms) {
        newRender = (
          <div className='container'>
            <input className="form-control" placeholder="Search Realm..." type="text" onChange={(event) => this.setState({ search: event.target.value })} />
            <div className="table-responsive">
              <table className="realm-table table table-hover table-bordered">
                <thead className="table-head">
                  <tr>
                    <th>STATUS</th>
                    <th>REALM</th>
                    <th>TYPE</th>
                    <th>POPULATION</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {this.listRealms()}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else {
        newRender = (
          <div>
            <p className="loading">LOADING REALM STATUS...</p>
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

export default withRouter(connect(mapStateToProps, { setRealms, setRealm })(RealmStatus));