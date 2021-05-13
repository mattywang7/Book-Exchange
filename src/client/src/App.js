import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import {Provider} from "react-redux";
import store from './store'
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Guest from "./components/book/Guest";
import ViewBook from "./components/book/ViewBook";

// check localStorage for token to keep user logged in until they log out or the token expires
// if (localStorage.jwtToken) {
//     const token = localStorage.jwtToken
//     setAuthToken(token)
//     // decode token and get user info and exp
//     const decoded = jwtDecode(token)
//     // set user and isAuthenticated
//     store.dispatch(setCurrentUser(decoded))
//
//     // check for expired token
//     const currentTime = Date.now() / 1000  // ms
//     if (decoded.exp < currentTime) {
//         // token expired, logout user
//         store.dispatch(logoutUser())
//         // need login, redirect to login
//         window.location.href = './login'
//     }
// }

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className={'App'}>
                        <Navbar />
                        <Route exact path={'/'} component={Guest} />
                        <Route exact path={'/search/:type/:keyword'} component={Guest} />
                        <Route exact path={'/books/:id'} component={ViewBook} />
                        <Route exact path={'/home'} component={Landing} />
                        <Route exact path={'/register'} component={Register} />
                        <Route exact path={'/login'} component={Login} />
                        <Switch>
                            <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;
