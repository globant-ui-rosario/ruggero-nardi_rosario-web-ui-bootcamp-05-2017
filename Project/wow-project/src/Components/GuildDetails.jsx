import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class GuildDetails extends Component {
  constructor() {
    super();
    this.state = {
      guild: null,
      members: []
    }
  }

  componentDidMount() {
    this.fetchGuildData();
  }

  componentDidUpdate(prevProps, PrevState) {
    if (prevProps.match.params.guildId !== this.props.match.params.guildId) {
      this.fetchGuildData();
    }
  }

  fetchGuildData() {
    if (this.props.region && this.props.realm) {
      let url = 'https://' + this.props.region.url + '.api.battle.net/wow/guild/' + this.props.realm.slug + '/' + this.props.match.params.guildId + '?fields=members&apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte';
      fetch(url).then((response) => {
        return response.json();
      }).then((guild) => {
        this.stateUpdate(guild);
      }).catch((error) => {
        this.setState({ guild: 'ERROR' });
      })
    }
  }

  stateUpdate(guild) {
    let members = guild.members.map(member => { return member.character });
    this.setState({ guild, members });
    console.log(guild);
  }

  listMembers() {
    return (
      <div>
        <ul>
          {
            this.state.members.map(member => {
              return (
                <li key={member.name}><NavLink to={'/CharacterSearch/' + member.name}>{member.name} - {member.level}</NavLink></li>
              );
            })
          }
        </ul>
      </div>
    )
  }

  render() {
    if (this.state.guild === 'ERROR') {
      return <p>GUILD NOT FOUND</p>
    } else if (this.state.guild) {
      return (
        <div>
          <div>
            <h2>{this.state.guild.name}</h2>
            <h3>Achivement Points:{this.state.guild.achievementPoints}</h3>
            <h3>Guild Level:{this.state.guild.level}</h3>
          </div>
          {this.listMembers()}
        </div>
      );
    } else {
      return <p>LOADING</p>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm,
});


export default connect(mapStateToProps)(GuildDetails);