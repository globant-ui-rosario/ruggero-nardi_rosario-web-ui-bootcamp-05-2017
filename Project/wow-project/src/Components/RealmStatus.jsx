import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRealms } from '../Actions/setRealms';

class RealmStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      realms: null
    }
  }


  componentDidMount() {
    if (this.props.region) {
      let url = 'https://' + this.props.region.url + '.api.battle.net/wow/realm/status?locale=en_US&apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte';
      let method = 'GET';
      let config = {
        url: url,
        method: method
      }
      let realms = this.fetchRealms(config);
      realms.then((result) => {
        let data = JSON.parse(result.responseText);
        this.setState({ realms: data.realms });
        this.props.setRealms(data);
      })
        .catch(function (err) {
          console.log('ERROR: ', err);
        })
    }
  }


  fetchRealms(config) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.onload = function () {
        resolve(this);
      };
      request.onerror = reject;
      request.open(config.method, config.url, true);
      request.send();
    });
  }

  listRealms() {
    return this.state.realms.map(realm => {
      let status;
      if (realm.status) {
        status = 'ONLINE';
      } else {
        status = 'OFFLINE';
      }
      return <li key={realm.name}>{status} - {realm.name} - {realm.type} - {realm.population} - {realm.locale}</li>
    });
  }



  render() {
    let newRender;
    if (this.state.realms) {
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
    return newRender;
  }
}

const mapStateToProps = (state) => ({
  region: state.region
});

export default connect(mapStateToProps, { setRealms })(RealmStatus);