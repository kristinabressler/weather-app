import React, { Component } from "react";
import "./App.css";
import WeatherIcon from "react-icons-weather";
import axios from "axios";
import loadinggif from "./images/sunnyloading.gif";
// import {Link} from 'react-router-dom';

// console.log("zomato secret key ",process.env.REACT_APP_ZOMATO_API_KEY);
// console.log("dark sky secret key ",process.env.REACT_APP_DARKSKY_API_KEY);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theLocation: null,
      theLatitude: null,
      theLongitude: null,
      theCity: null,
      theRegion: null,
      theCountry: null,
      theTemperature: null,
      theCurrentWeatherArr: [],
      showfahrenheit: false,
      loading: true,
      theCuisinesList: [],
      thefilteredCuisineList: [],
      randomCuisine: [],
      getRestaurantList: [],
      weatherBkgd: null,
    };
    // console.log("Latitude: " + this.state.theLatitude);
    // console.log("Longitude: " + this.state.theLongitude);
  }

  componentDidMount() {
    this.getTheCoords();
  }

  getTheCoords = () => {
    axios.get("https://ipapi.co/json").then((theLocation) => {
      // console.log(theLocation.data);
      let x = theLocation.data;
      this.setState(
        {
          theLocation: x,
          theLatitude: x.latitude,
          theLongitude: x.longitude,
          theCity: x.city,
          theRegion: x.region,
          theCountry: x.country,
        },
        () => {
          this.getTheWeather();
        }
      );
    });
  };

  getTheWeather = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_API_KEY}/${this.state.theLatitude},${this.state.theLongitude}`
      )
      .then((theWeather) => {
        // console.log("this is weather ",theWeather.data) // its because when you do the plus sign its trying to concatenate a string with an object
        let w = theWeather.data;
        this.setState(
          {
            theCurrentWeatherArr: w.currently,
          },
          () => {
            console.log("this is currently ", this.state.theCurrentWeatherArr);
            this.getTheCuisines();
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTheCuisines = () => {
    axios({
      method: "GET",
      url: `https://developers.zomato.com/api/v2.1/cuisines?lat=${this.state.theLatitude}&lon=${this.state.theLongitude}`,
      headers: {
        "user-key": process.env.REACT_APP_ZOMATO_API_KEY,
        "content-type": "application/json",
      },
    })
      .then((theCuisines) => {
        console.log("this is cuisines ", theCuisines.data.cuisines);
        let cuisineList = theCuisines.data.cuisines;
        // let foodname = theCuisines.data.cuisines.map(food => food.cuisine.cuisine_name);
        // console.log("this is cuisines name Array ", foodid);
        this.setState({
          theCuisinesList: cuisineList,
        });
        this.filterTheCuisines();
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("Cuisine List ", this.state.theCuisinesList);
    // this.getRandomCuisine();
  };

  filterTheCuisines = () => {
    let coldFoodArr = [
      "Beverages",
      "Bubble Tea",
      "Drinks Only",
      "Frozen Yogurt",
      "Ice Cream",
      "Israeli",
      "Juices",
      "Peruvian",
      "Salad",
      "Seafood",
      "Sushi",
      "Tea",
    ];
    let hotFoodArr = [
      "BBQ",
      "Beverages",
      "Cajun",
      "Coffee and Tea",
      "Crepes",
      "Dim Sum",
      "Drinks Only",
      "Fondue",
      "Grill",
      "Indian",
      "Mexican",
      "Pizza",
      "Ramen",
      "Seafood",
      "Tea",
      "Thai",
    ];
    let temperature = this.state.theCurrentWeatherArr.temperature;
    let filteredCuisines = [];

    if (temperature >= 80) {
      filteredCuisines = this.state.theCuisinesList.filter((filtereditem) =>
        coldFoodArr.includes(filtereditem.cuisine.cuisine_name)
      );
    } else {
      filteredCuisines = this.state.theCuisinesList.filter((filtereditem) =>
        hotFoodArr.includes(filtereditem.cuisine.cuisine_name)
      );
    }
    this.setState({
      thefilteredCuisineList: filteredCuisines,
    });
    // console.log("filtered list", this.state.thefilteredCuisineList);
    this.getRandomCuisine();
  };

  getRandomCuisine = () => {
    let randomNum = Math.floor(
      Math.random() * this.state.thefilteredCuisineList.length
    );
    let randomCuisineId = this.state.thefilteredCuisineList[randomNum].cuisine;
    // console.log("Random Number ", randomNum);
    this.setState({ randomCuisine: randomCuisineId });
    this.getRestaurants();
  };

  getRestaurants = () => {
    let count = 3;
    let foodid = this.state.randomCuisine.cuisine_id;
    // let foodname = this.state.randomCuisine.cuisine_name;
    let radius = 8;
    axios({
      method: "GET",
      url: `https://developers.zomato.com/api/v2.1/search?count=${count}&lat=${this.state.theLatitude}&lon=${this.state.theLongitude}&radius=${radius}&cuisines=${foodid}&sort=real_distance&order=asc`,
      headers: {
        "user-key": process.env.REACT_APP_ZOMATO_API_KEY,
        "content-type": "application/json",
      },
    })
      .then((theRestaurants) => {
        // console.log("this is restaurant list ", theRestaurants.data.restaurants);
        this.setState({
          getRestaurantList: theRestaurants.data.restaurants,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("Cuisine List ", this.state.getRestaurantList);
  };

  showRestaurants = () => {
    return this.state.getRestaurantList.map((eachRestaurant, i) => {
      return (
        <div className="card" key={i}>
          <h2>{eachRestaurant.restaurant.name}</h2>
        </div>
      );
    });
  };

  handleClick = () => {
    this.setState({ showfahrenheit: !this.state.showfahrenheit });
  };

  backgroundWeather = () => {
    let weathericon = this.state.theCurrentWeatherArr.icon || "cloudy";
    if (weathericon == "cloudy") {
      this.setState({ weatherBkgd: "cloudy" });
    }
  };

  render() {
    let temfahrenheit = Math.round(this.state.theCurrentWeatherArr.temperature);
    let temcelcius = Math.round(((temfahrenheit - 32) * 5) / 9);
    let weathericon = this.state.theCurrentWeatherArr.icon || "cloudy";
    console.log("weather icon", weathericon);
    // let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // let day_arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    // let timecode = this.state.theCurrentArr.time;
    // let datetime = new Date(timecode*1000);
    // let yeartime = datetime.getFullYear();
    // let monthtime = months_arr[datetime.getMonth()];
    // var daytime = datetime.getDate();
    let date = new Date();
    let currentdate = date.toDateString();
    // let currentday = day_arr[date.getDay()];
    // let currentMonth = months_arr[date.getMonth()];
    // let currentYear = date.getFullYear();

    // console.log("This is date " +  currentdate);
    // console.log("Cuisine List ", this.state.theCuisinesList.length);
    // console.log("random cuisine", this.state.randomCuisine.cuisine_name);

    return (
      <div className="App">
        {this.state.loading ? (
          <div className="loading">
            <h2>Local Weather Testing</h2>
            <img src={loadinggif} alt="" />
          </div>
        ) : (
          <div className="wrapper">
            <div className="container">
              <div className="weatherbox">
                <div className="locationbox">
                  <div className="locactioninfobox">
                    <div className="cityarea">
                      <h2 id="cityname">{this.state.theCity}</h2>
                    </div>
                    <div className="countryarea">
                      <h3 id="state">{this.state.theRegion}</h3>
                      <h3 id="country">{this.state.theCountry}</h3>
                    </div>
                    <div className="countryarea">
                      <h3>{currentdate}</h3>
                    </div>
                  </div>
                </div>
                <div className="temperaturearea">
                  <div className="toptempbox">
                    <div className="tempbox">
                      <span id="temp">
                        {this.state.showfahrenheit ? temcelcius : temfahrenheit}
                      </span>
                    </div>
                    <div className="wconditionsbox">
                      <span id="wparameter">
                        <WeatherIcon name="darksky" iconId={weathericon} />
                      </span>
                      <span id="wdescription">
                        {this.state.theCurrentWeatherArr.summary}
                      </span>
                    </div>
                  </div>
                  <div className="weather main-toggle">
                    <span>F</span>
                    <button id="unit-switch" onClick={this.handleClick}>
                      <span
                        id="unit-toggle"
                        className={this.state.showfahrenheit ? "toggle" : ""}
                      ></span>
                    </button>
                    <span>C</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cuisine-suggestion">
              <h3>
                {temfahrenheit >= 80 ? "Keep cool with " : "Stay warm with "}
                <span>{this.state.randomCuisine.cuisine_name}</span>?
              </h3>
              <div>{this.showRestaurants()}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
