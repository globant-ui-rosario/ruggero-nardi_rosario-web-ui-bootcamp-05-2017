import React, { Component } from 'react';
import { connect } from 'react-redux';


class characterDetails extends Component {
  constructor() {
    super();
    this.state = {
      character: null
    }
  }

  componentDidMount() {
    this.fetchCharacterData();
  }

  componentDidUpdate(prevProps, PrevState) {
    if (prevProps.match.params.characterId !== this.props.match.params.characterId) {
      this.setState({ character: null });
      this.fetchCharacterData();
    }
  }

  fetchCharacterData() {
    if (this.props.region && this.props.realm) {
      let url = 'https://' + this.props.region.url + '.api.battle.net/wow/character/' + this.props.realm.slug + '/' + this.props.match.params.characterId + '?fields=pvp&fields=guild&fields=stats&fields=items&apikey=xqm23bcpb3jubkxt3mjd9v5mnzb9xcte';
      fetch(url).then((response) => {
        return response.json();
      }).then((data) => {
        return this.replaceNumbersForProperStrings(data)
      }).catch((error) => {
        return this.setState({ character: 'ERROR' });
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
    this.setState({ character: data });
  }

  setBackgroundImage() {
    if (this.state.character.thumbnail) {
      const profileImg = this.state.character.thumbnail.replace('-avatar.jpg', '-profilemain.jpg');
      const divStyle = {
        backgroundImage: 'url(http://render-' + this.props.region.url + '.worldofwarcraft.com/character/' + profileImg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        maxWidth: '740px',
        height: '500px'
      }
      return divStyle;
    } else {
      return null;
    }
  }

  displayProperQualityName(quality) {
    const stringQualityData = {
      0: 'Poor',
      1: 'Common',
      2: 'Uncommon',
      3: 'Rare',
      4: 'Epic',
      5: 'Legendary',
      6: 'Artifact',
      7: 'Heirloom',
      8: 'WoW-Token'
    }
    return stringQualityData[quality];
  }

  setTable() {
    const slots = ['mainHand', 'offHand', 'back', 'chest', 'feet', 'finger1', 'finger2', 'hands', 'head', 'legs', 'neck', 'shoulder', 'trinket1', 'trinket2', 'waist', 'wrist'];
    return slots.map((slot) => {
      let newTable;
      if (this.state.character.items[slot]) {
        const src = 'http://media.blizzard.com/wow/icons/36/' + this.state.character.items[slot].icon + '.jpg';
        const quality = this.displayProperQualityName(this.state.character.items[slot].quality);
        newTable = (
          <tr className="search-table" key={this.state.character.items[slot].id}>
            <td>{slot}</td>
            <td><img className="item-icon" src={src} alt='Item icon' /></td>
            <td>{this.state.character.items[slot].name}</td>
            <td>{this.state.character.items[slot].itemLevel}</td>
            <td className={quality.toLowerCase()}>{quality}</td>
          </tr>
        )
      } else newTable = null;
      return newTable;
    });
  }

  guildCheck() {
    let guildCheck;
    if (this.state.character.guild) {
      guildCheck = this.state.character.guild.name
    } else {
      guildCheck = 'NO GUILD'
    }
    return guildCheck;
  }

  render() {
    let newRender;
    if (this.state.character === 'ERROR') {
      newRender = (
        <div className="text-center">
          <h2 className="loading">Error: Character Not Found</h2>
          <button onClick={() => { this.fetchCharacterData() }}>Retry?</button>
        </div>
      );
    } else if (this.state.character) {
      newRender = (
        <div className="container">
          <div className="second-image">
            <div style={this.setBackgroundImage()} className="player-details">
              <div>
                <h2 className="text-center character-tittle">"{this.state.character.name}" (Level {this.state.character.level}) - {this.state.character.faction}</h2>
                <h3 className="text-center guild-tittle">Guild: {this.guildCheck()}</h3>
              </div>
              <ul className="basic-info-list">
                <li className="basic-info-item">Race: {this.state.character.race}</li>
                <li className="basic-info-item">Class: {this.state.character.class}</li>
                <li className="basic-info-item">Gender: {this.state.character.gender}</li>
                <li className="basic-info-item">Battlegroup: {this.state.character.battlegroup}</li>
                <li className="basic-info-item">Achievement Points: {this.state.character.achievementPoints}</li>
              </ul>
              <ul className="stats-info-list">
                <li className="stats-info-item">Health: {this.state.character.stats.health} HP</li>
                <li className="stats-info-item">Power Type: {this.state.character.stats.powerType}</li>
                <li className="stats-info-item">Power: {this.state.character.stats.power}</li>
                <li className="stats-info-item">Strength: {this.state.character.stats.str}</li>
                <li className="stats-info-item">Agility: {this.state.character.stats.agi}</li>
                <li className="stats-info-item">Inteligence: {this.state.character.stats.int}</li>
                <li className="stats-info-item">Stamina: {this.state.character.stats.sta}</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="tittle-character-detail text-center">Equipped Items</h2>
            <h3 className="tittle-average-item text-center">Avarage Item lvl: {this.state.character.items.averageItemLevel}</h3>
            <h3 className="tittle-average-item text-center">Avarage Equipped Item lvl: {this.state.character.items.averageItemLevelEquipped}</h3>
            <div className="table-responsive text-center">
              <table className="realm-table table table-hover table-bordered">
                <thead className="search-table table-head">
                  <tr>
                    <th>Slot</th>
                    <th>Icon</th>
                    <th>Item</th>
                    <th>Item Level</th>
                    <th>Quality</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {this.setTable()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      newRender = (
        <div className="text-center">
          <h2 className="loading">Searching Character...</h2>
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

export default connect(mapStateToProps)(characterDetails);