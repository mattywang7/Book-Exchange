import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import {Provider} from "react-redux";
import store from './store'
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import ViewBook from "./components/book/ViewBook";
import AddNewBook from "./components/book/AddNewBook";
import GuestIndex from "./components/book/GuestIndex";
import SearchedBooks from "./components/book/SearchedBooks";

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
                        <Route exact path={'/'} component={GuestIndex} />
                        <Route exact path={'/search/:type/:keyword'} component={SearchedBooks} />
                        <Route exact path={'/books/:id'} component={ViewBook} />
                        <Route exact path={'/home'} component={Landing} />
                        <Route exact path={'/register'} component={Register} />
                        <Route exact path={'/login'} component={Login} />
                        <Switch>
                            <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
                            <PrivateRoute exact path={'/add-for-sale'} component={AddNewBook} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;
