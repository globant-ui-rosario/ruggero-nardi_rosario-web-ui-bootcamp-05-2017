import React, { Component } from 'react';
import { connect } from 'react-redux';

class GuildDetails extends Component {
  constructor() {
    super();
    this.state = {
      guild: null,
      members: [],
      search: ''
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

  replaceNumbersForProperStrings(data) {
    const stringFactionData = {
      0: 'Alliance',
      1: 'Horde',
      2: 'Neutral'
    }
    const stringGenderData = {
      0: 'Male',
      1: 'Female'
    }
    const stringRaceData = {
      1: 'Human',
      2: 'Orc',
      3: 'Dwarf',
      4: 'Night Elf',
      5: 'Undead',
      6: 'Tauren',
      7: 'Gnome',
      8: 'Troll',
      9: 'Goblin',
      10: 'Blood Elf',
      11: 'Draenei',
      22: 'Worgen',
      24: 'Neutral Pandaren',
      25: 'Alliance Pandaren',
      26: 'Horde Pandaren'
    }
    const stringClassData = {
      1: 'Warrior',
      2: 'Paladin',
      3: 'Hunter',
      4: 'Rogue',
      5: 'Priest',
      6: 'Death Knight',
      7: 'Shaman',
      8: 'Mage',
      9: 'Warlock',
      10: 'Monk',
      11: 'Druid',
      12: 'Demon Hunter'
    }
    data.faction = stringFactionData[data.faction];
    data.class = stringClassData[data.class];
    data.race = stringRaceData[data.race];
    data.gender = stringGenderData[data.gender];
    return data;
  }

  stateUpdate(guild) {
    let members = guild.members.map(member => { return this.replaceNumbersForProperStrings(member.character) });
    this.setState({ guild, members });
  }

  listMembers() {
    return (this.state.members.map(member => {
      let newList;
      if (member.name.toLowerCase().startsWith(this.state.search.toLowerCase())) {
        newList = (
          <tr className="search-table" key={member.name} onClick={() => { this.props.history.push('/CharacterSearch/' + member.name) }}>
            <td><img className="thumbnail" src={"http://render-" + this.props.region.url + ".worldofwarcraft.com/character/" + member.thumbnail} alt="Thumbnail" /></td>
            <td>{member.name}</td>
            <td>{member.class}</td>
            <td>{member.race}</td>
            <td>{member.level}</td>
          </tr>
        );
      } else {
        newList = null;
      }
      return newList;
    }));
  }

  render() {
    let newRender;
    if (this.state.guild === 'ERROR') {
      newRender = (
        <div className="text-center">
          <p className="loading">GUILD NOT FOUND</p>
        </div>);
    } else if (this.state.guild) {
      newRender = (
        <div className="container">
          <div className="text-center">
            <h2 className="guild-name">{this.state.guild.name}</h2>
            <h3 className="guild-subtittles">Achivement Points:{this.state.guild.achievementPoints}</h3>
            <h3 className="guild-subtittles">Guild Level:{this.state.guild.level}</h3>
          </div>
          <input className="form-control" placeholder="Search Character..." type="text" onChange={(event) => this.setState({ search: event.target.value })} />
          <div className="table-responsive text-center">
            <table className="realm-table table table-hover table-bordered">
              <thead className="search-table table-head">
                <tr>
                  <th>Thumbail</th>
                  <th>Member</th>
                  <th>Class</th>
                  <th>Race</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {this.listMembers()}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      newRender = (
        <div className="container text-center">
          <p className="loading">LOADING GUILD INFORMATION...</p>
        </div>
      )
    }
    return newRender;
  }
}

const mapStateToProps = (state, ownProps) => ({
  region: state.region,
  realm: state.realm,
});


export default connect(mapStateToProps)(GuildDetails);