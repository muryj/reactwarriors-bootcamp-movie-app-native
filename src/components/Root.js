import React from "react";
import { Provider } from "mobx-react";
import { moviesPageStore } from "../stores/moviesPageStore";
import MoviesScreen from "./screens/MoviesScreen";

class Root extends React.Component {
  render() {
    return (
      <Provider moviesPageStore={moviesPageStore}>
        <MoviesScreen />
      </Provider>
    );
  }
}

export default Root;

