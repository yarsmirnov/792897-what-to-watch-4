import React from "react";
import renderer from "react-test-renderer";
import MoviePageDetails from "./movie-page-details.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {fullMoviesDescriptions} from "../../const/tests.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const movies = fullMoviesDescriptions;
const authorized = AuthorizationStatus.AUTH;
const unauthorized = AuthorizationStatus.NO_AUTH;
const mockHistory = {
  match: {
    params: {
      id: `1`,
    }
  }
};

describe(`<MoviePageDetails />`, () => {
  it(`Should Main render correctly`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <MoviePageDetails
              authorizationStatus={authorized}
              movies={movies}
              historyProps={mockHistory}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should Main render correctly`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <MoviePageDetails
              authorizationStatus={unauthorized}
              movies={movies}
              historyProps={mockHistory}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
