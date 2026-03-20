
import React from "react";

export default class SearchInput extends React.Component {
  state = { name: "" };

  onFormSubmit = (e) => {
    e.preventDefault();
    const trimmedName = this.state.name.trim();
    if (trimmedName !== '') {
      this.props.onSearchSubmit(trimmedName);
    }
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <div className="ui massive icon input">
              <input
                type="text"
                placeholder="Enter Movie/Series name"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <i className="search icon" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
