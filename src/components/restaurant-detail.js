import React, { Component } from 'react';
import loadinggif from '../images/sunnyloading.gif';
import {Link} from 'react-router-dom';
import zomato from '../api/zomato';
import restaurantthumb from '../images/restaurant-thumbnail.jpg';
import Rating from './rating';
import DollarRate from './dollarrate';
// import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
// import Map from './Map';

// const MapLoader = withScriptjs(Map);

export class RestaurantDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specificRestaurant: {},
      loading: true,
    }
  }
  async componentDidMount() {
    const restaurantId = this.props.match.params.restaurantId;
    // console.log("detail restaurant: ", restaurantId);
    // "zomato://restaurant/16937130"
    const {data} = await zomato.get(`/restaurant?res_id=${restaurantId}`)
    this.setState({
      specificRestaurant: data,
      loading: false
    })
  }

  _goToLocation = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${this.state.specificRestaurant.name}`)
    
    //${this.state.specificRestaurant.location.latitude},${this.state.specificRestaurant.location.longitude}`)
  }
  render() {
    // console.log("detail state restaurant: ", this.state.specificRestaurant);
    return (
      this.state.loading ?
        <div className="loading"><h2>Local Weather</h2><img src={loadinggif} alt="" /></div> :
        <div className="wrapper2 restaurantbkgd">
      <Link className="homeback" to="/"><i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Home</Link>
      <div className="container2">
      <div className="restaurantbox">
        <div className="restaurantimg">
          <img src={this.state.specificRestaurant.thumb === "" ? restaurantthumb : this.state.specificRestaurant.thumb} alt="" />
        </div>
        <div className="single-restaurant-details">
          <h2>{this.state.specificRestaurant.name} <Rating>{this.state.specificRestaurant.user_rating.aggregate_rating}</Rating><span className="ratingtext">({this.state.specificRestaurant.user_rating.rating_text})</span></h2>
          <h3 className="raddress">{this.state.specificRestaurant.location.address}</h3>
          <div className="restaurant-labels">
            <div className="rbox rphone">
              <h3><strong>Phone</strong></h3>
              <a href={`tel:${this.state.specificRestaurant.phone_numbers}`}>{this.state.specificRestaurant.phone_numbers}</a>
            </div>
            <div className="rbox rprice">
              <h3><strong>Price</strong></h3>
              <h3><span><DollarRate>{this.state.specificRestaurant.price_range}</DollarRate></span></h3>
            </div>
            <div className="rbox rcuisines">
              <h3><strong>Cuisines</strong></h3>
              <h3>{this.state.specificRestaurant.cuisines}</h3>
            </div>
          </div>
          <div className="rlinks">
            <div className="rlinkbox directionbtn">
              <h3><strong>Find Direction</strong></h3>
              <button onClick={this._goToLocation}>Find Directions</button>
            </div>
            <div className="rlinkbox zomatobtn">
              <h3><strong>More Details</strong></h3>
              <a href={this.state.specificRestaurant.url} target="_blank" rel="noopener noreferrer">Open in Zomato</a>
            </div>
          </div>
          {/* <MapLoader
              googleMapURL="https://maps.googleapis.com/maps/api/js?key="
              loadingElement={<div style={{ height: `100%` }} />}
            /> */}
        </div>
        </div>
      </div>
      </div>
      
    )
  }
}

export default RestaurantDetail
