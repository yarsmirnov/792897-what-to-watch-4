import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";

import {compose, createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import history from "./history.js";

import {AppRoute} from "./const/const.js";
import {createAPI} from "./api.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";


const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  return history.push(AppRoute.LOGIN);
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);


store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadPromoMovie());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
