import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import ItemDetails from "../item-details";

import "./app.css";

const Row = ({ left, right }) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">{left}</div>
      <div className="col-md-6">{right}</div>
    </div>
  );
};

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedPerson: 5,
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {(i) => <span>{i.name}</span>}
      </ItemList>
    );

    const itemDetails = <ItemDetails personId={this.state.selectedPerson} />;
    return (
      <div>
        <Header />
        <RandomPlanet />
        <Row left={itemList} right={itemDetails} />
      </div>
    );
  }
}
