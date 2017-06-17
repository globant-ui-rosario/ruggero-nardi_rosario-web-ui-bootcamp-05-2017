import React, { Component } from 'react';
import { connect } from 'react-redux';

class RealmStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      realms: null
    }

  }


  componentDidMount() {
    let component = this;
    if (this.props.region) {
      console.log(this.props.region);
      let url = 'https://'+this.props.region[0]+'.api.battle.net/wow/realm/status?locale=en_US&apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte';
      let method = 'GET';
      let config = {
        url: url,
        method: method
      }
      let realms = this.loadRealms(config);
      realms.then(function (result) {
        let data = JSON.parse(result.responseText);
        component.setState({realms: data.realms});
      })
        .catch(function (err) {
          console.log(err);
        })
    }
  }


  loadRealms(config) {
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

  listRealms(){
    return this.state.realms.map(realm => {
      return <li key={realm.name}>{realm.name} - {realm.status} - {realm.type} - {realm.locale}</li>
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
          <p>PLEASE SELECT REGION</p>
        </div>
      );
    }
    return newRender;
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region
});

export default connect(mapStateToProps)(RealmStatus);