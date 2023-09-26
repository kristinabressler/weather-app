import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './Home'
import RestaurantDetail from './components/restaurant-detail'
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={props=> (<Home {...props} />)}  />
          <Route exact path="/restaurant-detail/:restaurantId" render={props => (<RestaurantDetail {...props} />)}  />
      </Switch>
      </div>
    )
  }
}
