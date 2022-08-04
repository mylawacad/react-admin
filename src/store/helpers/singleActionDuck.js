import { put, call, all } from "redux-saga/effects";

/*
  generates simple reducer with 2 actions: name() and nameReset()

  @name - name of the reducer and name of the action
  @apiUrl - complete url to the API
  @method - fetch method GET, POST, UPDATE, PUT, DELETE
  @sagaSetSuccess  - [optional] array of saga calls that overrides default saga call in success case
*/

const duck = (props) => {
  const { name, apiUrl, method, sagaSetSuccess } = props;

  //initialState
  const initialState = {
    status: "initial",
    data: {},
    included: [],
    meta: {},
  };

  // Actions
  const types = {
    ACTION: `store/${name}/REQUEST`,
    ACTION_SUCCESS: `store/${name}/SUCCESS`,
    ACTION_FAIL: `store/${name}/FAIL`,
    ACTION_ERROR: `store/${name}/ERROR`,
    ACTION_RESET: `store/${name}/RESET`,
  };

  // Reducer
  const reducers = {};
  reducers[name] = function (state = initialState, action) {
    const response = action.response;
    switch (action.type) {
      case types.ACTION:
        return { ...state, ...initialState, status: "loading" };
      case types.ACTION_SUCCESS:
        return {
          ...state,
          status: "success",
          data: response.data,
          included: response.included,
          meta: response.meta,
        };
      case types.ACTION_FAIL:
        return { ...state, status: "fail", data: response };
      case types.ACTION_ERROR:
        return { ...state, status: "error", data: response };
      case types.ACTION_RESET:
        return { ...state, ...initialState };
      default:
        return state;
    }
  };

  //Action creators
  const actions = {};
  actions[name] = (payload) => ({
    type: types.ACTION,
    payload,
    actionId: payload?.actionId ?? Date.now(),
  });
  actions[`${name}Reset`] = (payload) => ({
    type: types.ACTION_RESET,
    payload,
    actionId: payload?.actionId ?? Date.now(),
  });

  //Api endpoints
  const apiEndpoints = {};
  apiEndpoints[name] = (request) => {
    let url = `${apiUrl}${
      request?.payload?.id ? `/${request?.payload?.id}` : ""
    }`;
    let parameters = {
      method,
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
    };

    if (["GET", "DELETE"].includes(method)) {
      if (request?.payload?.data) {
        url = new URL(url);
        Object.keys(request.payload.data).forEach((key) =>
          url.searchParams.append(key, request.payload.data[key])
        );
      }
    }

    if (["POST", "PUT", "UPDATE"].includes(method)) {
      if (request?.payload?.data) {
        parameters.body = JSON.stringify(request.payload.data);
      }
      if (request?.payload?.searchParams) {
        url = new URL(url);
        Object.keys(request.payload.searchParams).forEach((key) =>
          url.searchParams.append(key, request.payload.searchParams[key])
        );
      }
    }

    if (request?.payload?.token) {
      parameters.headers["Authorization"] = `Bearer ${request.payload.token}`;
    }

    parameters = {
      ...parameters,
      ...(request?.payload?.parameters || {}),
    };

    return fetch(url, parameters)
      .then((response) => response.json())
      .then((result) => result);
  };

  //Sagas
  const sagas = {};
  sagas[name] = function* (action) {
    try {
      const response = yield call(apiEndpoints[name], action);
      if (response.data) {
        // sagaSetSuccess allows to override the original event
        if (sagaSetSuccess) {
          yield all(
            sagaSetSuccess.map((ss) =>
              put({
                actionId: action.actionId,
                type: ss.type,
                response: ss.formatter ? ss.formatter(response) : response,
              })
            )
          );
        } else {
          yield put({
            actionId: action.actionId,
            type: types.ACTION_SUCCESS,
            response,
          });
        }
      } else {
        yield put({
          actionId: action.actionId,
          type: types.ACTION_FAIL,
          response,
        });
      }
    } catch (error) {
      yield put({
        actionId: action.actionId,
        type: types.ACTION_ERROR,
        response: error,
      });
    }
  };

  //Selectors
  const selectors = {};

  //Rresult
  const result = {
    types,
    actions,
    apiEndpoints,
    reducers,
    sagas,
    selectors,
  };

  return result;
};

export default duck;
