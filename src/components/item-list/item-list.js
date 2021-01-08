import React, { Component } from "react";
import Spinner from "../spinner";
import "./item-list.css";

export default class ItemList extends Component {
  state = {
    itemList: null,
  };

  componentDidMount() {
    const { getData } = this.props;

    // лучшее место для вызова API, чем через constructor
    // означает что компонент уже полностью проинициализирован
    getData().then((itemList) => {
      this.setState({ itemList });
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;

      // this.props.children - обращение к тому
      // что передали в теле компонента
      const label = this.props.children(item);

      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }

    const items = this.renderItems(itemList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
