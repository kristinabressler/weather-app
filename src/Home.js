import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import WeatherIcon from 'react-icons-weather';
import axios from 'axios';
import loadinggif from './images/sunnyloading.gif';
import restaurantthumb from './images/restaurant-thumbnail.jpg';
import Rating from './components/rating';
import DollarRate from './components/dollarrate';
import {Link} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import RestaurantDetail from './components/restaurant-detail';

// console.log("zomato secret key ",process.env.REACT_APP_ZOMATO_API_KEY);
// console.log("dark sky secret key ",process.env.REACT_APP_DARKSKY_API_KEY);

class Home extends Component {
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
    theForecastArr:[],
    showfahrenheit: false,
    loading: true,
    theCuisinesList: [],
    thefilteredCuisineList: [],
    randomCuisine: [],
    getRestaurantList: [],
    weatherBkgd: null,
    showRestaurantImage: ""
  };
  // console.log("Latitude: " + this.state.theLatitude);
  // console.log("Longitude: " + this.state.theLongitude);
}

 componentDidMount() {

  this.getTheCoords();
}


getTheCoords = () => {
  axios
  .get("https://ipapi.co/json")
  .then(theLocation => {
    // console.log(theLocation.data);
    let x = theLocation.data;
    this.setState({
      theLocation: x,
      theLatitude: x.latitude,
      theLongitude: x.longitude,
      theCity: x.city,
      theRegion: x.region,
      theCountry: x.country
      }, ()=>{
        this.getTheWeather();
      })
    })
}

getTheWeather = () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const urldarksky = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_API_KEY}/${this.state.theLatitude},${this.state.theLongitude}`;
  axios
  .get(proxyurl + urldarksky)
    .then((theWeather)=>{
      console.log("this is weather ",theWeather.data);
      let w = theWeather.data;
      this.setState({
        theCurrentWeatherArr: w.currently,
        theForecastArr: w.daily.data
    }, ()=>{
      console.log("this is currently ",this.state.theCurrentWeatherArr)
      console.log("this is daily ",this.state.theForecastArr)
      this.getTheCuisines();
      this.backgroundWeather();
    });
  })
    .catch((error)=>{
      console.log(error)
    })
}
showForecast = () => {
  let newFArr = [...this.state.theForecastArr];
  newFArr.shift();
  return newFArr.map((eachDay, i) => {
    // console.log(eachDay)
    let fweathericon = eachDay.icon || 'cloudy';
    let day_arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let timecode = eachDay.time;
    let datetime = new Date(timecode*1000);
    let currentday =  day_arr[datetime.getDay()];

    if(new Date().getDay() + 1 === day_arr.indexOf(currentday)){
      currentday = 'Tomorrow'
    }
    let hightemfahrenheit = Math.round(eachDay.apparentTemperatureHigh);
    let lowtemfahrenheit = Math.round(eachDay.apparentTemperatureLow);
    return (<div className="daycard" key={i}>
      <h2>{currentday}</h2>
      <div className="fdetails">
      <WeatherIcon name="darksky" iconId={fweathericon} />
      <h3><span id="highlowtemp">{hightemfahrenheit}</span> / <span id="highlowtemp">{lowtemfahrenheit}</span></h3>
      </div>
      </div>
    )
  })
}

getTheCuisines = () => {
    axios({
      method: "GET",
      url: `https://developers.zomato.com/api/v2.1/cuisines?lat=${this.state.theLatitude}&lon=${this.state.theLongitude}`,
      headers: {
        "user-key": process.env.REACT_APP_ZOMATO_API_KEY,
        "content-type": "application/json"
      }
    })
    .then((theCuisines)=>{
      // console.log("this is cuisines ", theCuisines.data.cuisines);
      let cuisineList = theCuisines.data.cuisines;
      // let foodname = theCuisines.data.cuisines.map(food => food.cuisine.cuisine_name);
      // console.log("this is cuisines name Array ", foodid);
      this.setState({
        theCuisinesList: cuisineList
    })
    this.filterTheCuisines();
    }).catch((error)=>{
      console.log(error)
    })
    // console.log("Cuisine List ", this.state.theCuisinesList);
    // this.getRandomCuisine();
  }

  filterTheCuisines = () => {
    let coldFoodArr=["Beverages", "Bubble Tea", "Drinks Only", "Frozen Yogurt", "Ice Cream", "Israeli", "Juices", "Peruvian", "Salad", "Seafood", "Sushi", "Tea"];
    let hotFoodArr=["BBQ", "Beverages", "Cajun", "Coffee and Tea", "Crepes", "Dim Sum", "Drinks Only", "Grill", "Indian", "Mexican", "Pizza", "Ramen", "Seafood", "Tea", "Thai"];
    let temperature = this.state.theCurrentWeatherArr.temperature;
    let filteredCuisines = [];

    if (temperature >= 80) {
      filteredCuisines =  this.state.theCuisinesList.filter((filtereditem) => coldFoodArr.includes(filtereditem.cuisine.cuisine_name));
    } else {
      filteredCuisines =  this.state.theCuisinesList.filter((filtereditem) => hotFoodArr.includes(filtereditem.cuisine.cuisine_name));
    }
    this.setState({
      thefilteredCuisineList: filteredCuisines
    });
    // console.log("filtered list", this.state.thefilteredCuisineList);
    this.getRandomCuisine();
  }

  getRandomCuisine = () => {
    let randomNum = Math.floor(Math.random() * this.state.thefilteredCuisineList.length);
    let randomCuisineId = this.state.thefilteredCuisineList[randomNum].cuisine;
    // console.log("Random Number ", randomNum);
    this.setState( { randomCuisine: randomCuisineId } );
    this.getRestaurants();
  }

  getRestaurants = () => {
    let count = 3;
    let foodid = this.state.randomCuisine.cuisine_id;
    // let foodname = this.state.randomCuisine.cuisine_name;
    let radius = 10;
    axios({
      method: "GET",
      url: `https://developers.zomato.com/api/v2.1/search?count=${count}&lat=${this.state.theLatitude}&lon=${this.state.theLongitude}&radius=${radius}&cuisines=${foodid}&sort=real_distance&order=desc`,
      headers: {
        "user-key": process.env.REACT_APP_ZOMATO_API_KEY,
        "content-type": "application/json"
      }
    })
    .then((theRestaurants)=>{
      // console.log("this is restaurant list ", theRestaurants.data.restaurants);
      this.setState({
        getRestaurantList: theRestaurants.data.restaurants,
        loading: false
    })
    }).catch((error)=>{
      console.log(error)
    })
    // console.log("Cuisine List ", this.state.getRestaurantList);
  }

  showRestaurants = () => {
    return this.state.getRestaurantList.map((eachRestaurant, i) => {
      return (<Link className="card" key={i} to={`/restaurant-detail/${eachRestaurant.restaurant.id}`}>
        <div className="restaurantimg">
          <img src={eachRestaurant.restaurant.thumb === "" ? restaurantthumb : eachRestaurant.restaurant.thumb} alt="" />
        </div>
        <div className="restaurant-details">
          <h2>{eachRestaurant.restaurant.name} <Rating>{eachRestaurant.restaurant.user_rating.aggregate_rating}</Rating><span className="ratingtext">({eachRestaurant.restaurant.user_rating.rating_text})</span></h2>
          <h3>{eachRestaurant.restaurant.location.address}</h3>
          <h4><DollarRate>{eachRestaurant.restaurant.price_range}</DollarRate></h4>
        </div>
        </Link>
      )
    })
  }

  handleClick = () => {
    this.setState( { showfahrenheit: !this.state.showfahrenheit } );
  }

  backgroundWeather = () => {
    let weathericon = this.state.theCurrentWeatherArr.icon || 'cloudy';
    if(weathericon === "cloudy") {
      this.setState({weatherBkgd: "cloudy"})
    } else if(weathericon === "rain") {
      this.setState({weatherBkgd: "rain"})
    } else if(weathericon === "clear-day") {
      this.setState({weatherBkgd: "clear-day"})
    } else if(weathericon === "clear-night") {
      this.setState({weatherBkgd: "clear-night"})
    } else if(weathericon === "snow") {
      this.setState({weatherBkgd: "snow"})
    } else if(weathericon === "sleet") {
      this.setState({weatherBkgd: "sleet"})
    } else if(weathericon === "strong-wind") {
      this.setState({weatherBkgd: "strong-wind"})
    } else if(weathericon === "fog") {
      this.setState({weatherBkgd: "fog"})
    } else if(weathericon === "partly-cloudy-day") {
      this.setState({weatherBkgd: "partly-cloudy-day"})
    } else if(weathericon === "partly-cloudy-night") {
      this.setState({weatherBkgd: "partly-cloudy-night"})
    } else if(weathericon === "hail") {
      this.setState({weatherBkgd: "hail"})
    } else if(weathericon === "tornado") {
      this.setState({weatherBkgd: "tornado"})
    } else if(weathericon === "thunderstorm") {
      this.setState({weatherBkgd: "thunderstorm"})
    }
  }

  render () {
    let temfahrenheit = Math.round(this.state.theCurrentWeatherArr.temperature);
    let temcelcius = Math.round((temfahrenheit - 32) * 5/9);
    let weathericon = this.state.theCurrentWeatherArr.icon || 'cloudy';
    // console.log("weather icon", weathericon);
    // let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // let day_arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    // let timecode = this.state.theCurrentArr.time;
    // let datetime = new Date(timecode*1000);
    // let yeartime = datetime.getFullYear();
    // let monthtime = months_arr[datetime.getMonth()];
    // var daytime = datetime.getDate();
    let date = new Date();
    let currentdate = date.toDateString();
    let humiditydata = this.state.theCurrentWeatherArr.humidity * 100;
    let inHg = Math.round(this.state.theCurrentWeatherArr.pressure * 0.030);
    // let currentday = day_arr[date.getDay()];
    // let currentMonth = months_arr[date.getMonth()];
    // let currentYear = date.getFullYear();


    // console.log("This is date " +  currentdate);
    // console.log("Cuisine List ", this.state.theCuisinesList.length);
    // console.log("random cuisine", this.state.randomCuisine.cuisine_name);

  return (
    
     this.state.loading ?
        <div className="loading"><h2>Local Weather</h2><img src={loadinggif} alt="" /></div> :
    <div className={`wrapper ${this.state.weatherBkgd}`}>
      <div className="container">
        <div className="weatherbox">
        <div className="temperaturebox">
          <div className="locationbox">
            <div className="datebox">
                <h3>{currentdate}</h3>
            </div>
            <div className="locactioninfobox">
              <div className="cityarea">
                <h2 id="cityname">{this.state.theCity}</h2>
              </div>
              <div className="countryarea">
                <h3 id="state">{this.state.theRegion}</h3>
                <h3 id="country">{this.state.theCountry}</h3>
              </div>
            </div>
          </div>
          <div className="temperaturearea">
          <div className="toptempbox">
            <div className="tempbox">
              <span id="temp">{this.state.showfahrenheit ? temcelcius : temfahrenheit }</span>
            </div>
            <div className="wconditionsbox">
              <span id="wparameter"><WeatherIcon name="darksky" iconId={weathericon} /></span>
              <span id="wdescription">{this.state.theCurrentWeatherArr.summary}</span>
            </div>
          </div>
          <div className="weather main-toggle">
            <span>F</span>
            <button id="unit-switch" onClick = {this.handleClick}><span id="unit-toggle" className= {this.state.showfahrenheit ? "toggle" : "" }></span></button>
            <span>C</span>
          </div>
        </div>
        </div>
        <div className="forecastbox">
        <Tabs>
          <TabList>
            <Tab>Today's Overview</Tab>
            <Tab>7 Days Forecast</Tab>
          </TabList>
          <TabPanel>
            <div className="woverviewbox">
              <div className="weatherd">
                <h2>{humiditydata}%</h2>
                <h3>Humidity</h3>
              </div>
              <div className="weatherd">
                <h2>{this.state.theCurrentWeatherArr.windSpeed}<span>mph</span></h2>
                <h3>Wind</h3>
              </div>
              <div className="weatherd">
                <h2>{this.state.theCurrentWeatherArr.precipIntensity}</h2>
                <h3>Precipitation</h3>
              </div>
              <div className="weatherd">
                <h2>{inHg}<span>in</span></h2>
                <h3>Pressure</h3>
              </div>
              <div className="weatherd">
                <h2>{this.state.theCurrentWeatherArr.visibility}<span>mi</span></h2>
                <h3>Visibility</h3>
              </div>
              <div className="weatherd">
                <h2>{this.state.theCurrentWeatherArr.uvIndex}</h2>
                <h3>UV Index</h3>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            {this.showForecast()}
          </TabPanel>
        </Tabs>
        </div>
      </div>
    </div>
    <div className="cuisine-suggestion">
      <h3 className="cuisine-text">{temfahrenheit >= 80 ? "Keep cool with " : "Stay warm with " }<span>{this.state.randomCuisine.cuisine_name}</span> ?</h3>
      <div className="restaurant-box">
      <h4 className="radius-text">Within 10 miles</h4>
      {this.showRestaurants()}
      </div>
  </div>

  </div>
     
  );
}
}

export default Home;
