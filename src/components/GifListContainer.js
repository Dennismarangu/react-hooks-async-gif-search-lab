import React, { Component } from "react";
import GifList from "./GifList";
import GifSearch from "./GifSearch";

class GifListContainer extends Component {
  state = {
    gifs: [],
  };

  componentDidMount() {
    this.fetchGifs();
  }

  fetchGifs = (query = "dogs") => {
    const apiKey = "YOUR_API_KEY_HERE";
    const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&rating=g`;

    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => {
        const gifs = data.slice(0, 3).map((gif) => ({ id: gif.id, url: gif.images.original.url }));
        this.setState({ gifs });
      })
      .catch((err) => console.error(err));
  };

  handleSearchSubmit = (query) => {
    this.fetchGifs(query);
  };

  render() {
    return (
      <div>
        <GifSearch onSearchSubmit={this.handleSearchSubmit} />
        <GifList gifs={this.state.gifs} />
      </div>
    );
  }
}

export default GifListContainer;
