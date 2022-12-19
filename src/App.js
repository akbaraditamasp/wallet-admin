import { useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Layout, { WebContext } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import service from "./service";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "ACTIVE":
      return {
        ...state,
        active: action.payload,
      };
    case "TITLE":
      return {
        ...state,
        title: action.payload,
      };
    default:
      return { ...state };
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    active: "Dashboard",
    title: "Dashboard",
    loading: false,
  });

  const setLoading = (value) => {
    dispatch({ type: "LOADING", payload: value });
  };

  const setTitle = (title) => {
    dispatch({
      type: "TITLE",
      payload: title,
    });
  };

  const setActive = (active) => {
    dispatch({
      type: "ACTIVE",
      payload: active,
    });
  };

  return (
    <WebContext.Provider
      value={{
        state,
        setTitle,
        setActive,
        setLoading,
      }}
    >
      <div
        className={
          "transition-all duration-500 fixed top-0 right-0 border-t-2 border-primary-600 w-full flex justify-end px-5 z-50 transform " +
          (state.loading ? "translate-y-0" : "-translate-y-full")
        }
      >
        <div className="bg-primary-100 border-r border-b border-l flex items-center py-1 px-3 border-primary-600 rounded-b text-gray-700">
          Loading
          <div className="lds-dual-ring ml-1"></div>
        </div>
      </div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Layout active={state.active} pageTitle={state.title}>
              <Switch>
                <Route path="/dashboard" exact>
                  <Dashboard />
                </Route>
                <Route path="/dashboard/transaction">
                  <Transaction />
                </Route>
              </Switch>
            </Layout>
          </Route>
          <Route path="*">404 Not Found</Route>
        </Switch>
      </BrowserRouter>
    </WebContext.Provider>
  );
}
