(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],{18:function(e,t,a){e.exports=a.p+"static/media/sunnyloading.b0bb43cd.gif"},19:function(e,t,a){e.exports=a.p+"static/media/restaurant-thumbnail.9cf78a2e.jpg"},40:function(e,t,a){e.exports=a(77)},46:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(35),i=a.n(s),c=a(6),l=a(7),o=a(9),u=a(8),h=a(10),m=a(13),d=a(39),p=(a(45),a(46),a(21)),E=a.n(p),g=a(15),f=a.n(g),v=a(18),y=a.n(v),w=a(19),b=a.n(w),C=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.children/5*100,t="".concat(10*Math.round(e/10),"%");return r.a.createElement("span",{className:"stars-outer"},r.a.createElement("span",{className:"stars-inner",style:{width:"".concat(t)}}))}}]),t}(n.Component),N=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).showDollarSign=function(){var e=a.props.children;return new Array(e).fill("$")},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("span",null,this.showDollarSign())}}]),t}(n.Component),k=a(14),x=a(17),S=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).getTheCoords=function(){f.a.get("https://ipapi.co/json").then((function(e){var t=e.data;a.setState({theLocation:t,theLatitude:t.latitude,theLongitude:t.longitude,theCity:t.city,theRegion:t.region,theCountry:t.country},(function(){a.getTheWeather()}))}))},a.getTheWeather=function(){var e="https://api.darksky.net/forecast/".concat("2420d30b631f01c154df2fc4a4e10379","/").concat(a.state.theLatitude,",").concat(a.state.theLongitude);f.a.get("https://cors-anywhere.herokuapp.com/"+e).then((function(e){console.log("this is weather ",e.data);var t=e.data;a.setState({theCurrentWeatherArr:t.currently,theForecastArr:t.daily.data},(function(){console.log("this is currently ",a.state.theCurrentWeatherArr),console.log("this is daily ",a.state.theForecastArr),a.getTheCuisines(),a.backgroundWeather()}))})).catch((function(e){console.log(e)}))},a.showForecast=function(){var e=Object(d.a)(a.state.theForecastArr);return e.shift(),e.map((function(e,t){var a=e.icon||"cloudy",n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=e.time,i=n[new Date(1e3*s).getDay()];(new Date).getDay()+1===n.indexOf(i)&&(i="Tomorrow");var c=Math.round(e.apparentTemperatureHigh),l=Math.round(e.apparentTemperatureLow);return r.a.createElement("div",{className:"daycard",key:t},r.a.createElement("h2",null,i),r.a.createElement("div",{className:"fdetails"},r.a.createElement(E.a,{name:"darksky",iconId:a}),r.a.createElement("h3",null,r.a.createElement("span",{id:"highlowtemp"},c)," / ",r.a.createElement("span",{id:"highlowtemp"},l))))}))},a.getTheCuisines=function(){f()({method:"GET",url:"https://developers.zomato.com/api/v2.1/cuisines?lat=".concat(a.state.theLatitude,"&lon=").concat(a.state.theLongitude),headers:{"user-key":"18c3615da2cae631992b35ca96a70f86","content-type":"application/json"}}).then((function(e){var t=e.data.cuisines;a.setState({theCuisinesList:t}),a.filterTheCuisines()})).catch((function(e){console.log(e)}))},a.filterTheCuisines=function(){var e=["Beverages","Bubble Tea","Drinks Only","Frozen Yogurt","Ice Cream","Israeli","Juices","Peruvian","Salad","Seafood","Sushi","Tea"],t=["BBQ","Beverages","Cajun","Coffee and Tea","Crepes","Dim Sum","Drinks Only","Grill","Indian","Mexican","Pizza","Ramen","Seafood","Tea","Thai"],n=[];n=a.state.theCurrentWeatherArr.temperature>=80?a.state.theCuisinesList.filter((function(t){return e.includes(t.cuisine.cuisine_name)})):a.state.theCuisinesList.filter((function(e){return t.includes(e.cuisine.cuisine_name)})),a.setState({thefilteredCuisineList:n}),a.getRandomCuisine()},a.getRandomCuisine=function(){var e=Math.floor(Math.random()*a.state.thefilteredCuisineList.length),t=a.state.thefilteredCuisineList[e].cuisine;a.setState({randomCuisine:t}),a.getRestaurants()},a.getRestaurants=function(){var e=a.state.randomCuisine.cuisine_id;f()({method:"GET",url:"https://developers.zomato.com/api/v2.1/search?count=".concat(3,"&lat=").concat(a.state.theLatitude,"&lon=").concat(a.state.theLongitude,"&radius=").concat(10,"&cuisines=").concat(e,"&sort=real_distance&order=desc"),headers:{"user-key":"18c3615da2cae631992b35ca96a70f86","content-type":"application/json"}}).then((function(e){a.setState({getRestaurantList:e.data.restaurants,loading:!1})})).catch((function(e){console.log(e)}))},a.showRestaurants=function(){return a.state.getRestaurantList.map((function(e,t){return r.a.createElement(k.b,{className:"card",key:t,to:"/restaurant-detail/".concat(e.restaurant.id)},r.a.createElement("div",{className:"restaurantimg"},r.a.createElement("img",{src:""===e.restaurant.thumb?b.a:e.restaurant.thumb,alt:""})),r.a.createElement("div",{className:"restaurant-details"},r.a.createElement("h2",null,e.restaurant.name," ",r.a.createElement(C,null,e.restaurant.user_rating.aggregate_rating),r.a.createElement("span",{className:"ratingtext"},"(",e.restaurant.user_rating.rating_text,")")),r.a.createElement("h3",null,e.restaurant.location.address),r.a.createElement("h4",null,r.a.createElement(N,null,e.restaurant.price_range))))}))},a.handleClick=function(){a.setState({showfahrenheit:!a.state.showfahrenheit})},a.backgroundWeather=function(){var e=a.state.theCurrentWeatherArr.icon||"cloudy";"cloudy"===e?a.setState({weatherBkgd:"cloudy"}):"rain"===e?a.setState({weatherBkgd:"rain"}):"clear-day"===e?a.setState({weatherBkgd:"clear-day"}):"clear-night"===e?a.setState({weatherBkgd:"clear-night"}):"snow"===e?a.setState({weatherBkgd:"snow"}):"sleet"===e?a.setState({weatherBkgd:"sleet"}):"strong-wind"===e?a.setState({weatherBkgd:"strong-wind"}):"fog"===e?a.setState({weatherBkgd:"fog"}):"partly-cloudy-day"===e?a.setState({weatherBkgd:"partly-cloudy-day"}):"partly-cloudy-night"===e?a.setState({weatherBkgd:"partly-cloudy-night"}):"hail"===e?a.setState({weatherBkgd:"hail"}):"tornado"===e?a.setState({weatherBkgd:"tornado"}):"thunderstorm"===e&&a.setState({weatherBkgd:"thunderstorm"})},a.state={theLocation:null,theLatitude:null,theLongitude:null,theCity:null,theRegion:null,theCountry:null,theTemperature:null,theCurrentWeatherArr:[],theForecastArr:[],showfahrenheit:!1,loading:!0,theCuisinesList:[],thefilteredCuisineList:[],randomCuisine:[],getRestaurantList:[],weatherBkgd:null,showRestaurantImage:""},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getTheCoords()}},{key:"render",value:function(){var e=Math.round(this.state.theCurrentWeatherArr.temperature),t=Math.round(5*(e-32)/9),a=this.state.theCurrentWeatherArr.icon||"cloudy",n=(new Date).toDateString(),s=100*this.state.theCurrentWeatherArr.humidity,i=Math.round(.03*this.state.theCurrentWeatherArr.pressure);return this.state.loading?r.a.createElement("div",{className:"loading"},r.a.createElement("h2",null,"Local Weather"),r.a.createElement("img",{src:y.a,alt:""})):r.a.createElement("div",{className:"wrapper ".concat(this.state.weatherBkgd)},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"weatherbox"},r.a.createElement("div",{className:"temperaturebox"},r.a.createElement("div",{className:"locationbox"},r.a.createElement("div",{className:"datebox"},r.a.createElement("h3",null,n)),r.a.createElement("div",{className:"locactioninfobox"},r.a.createElement("div",{className:"cityarea"},r.a.createElement("h2",{id:"cityname"},this.state.theCity)),r.a.createElement("div",{className:"countryarea"},r.a.createElement("h3",{id:"state"},this.state.theRegion),r.a.createElement("h3",{id:"country"},this.state.theCountry)))),r.a.createElement("div",{className:"temperaturearea"},r.a.createElement("div",{className:"toptempbox"},r.a.createElement("div",{className:"tempbox"},r.a.createElement("span",{id:"temp"},this.state.showfahrenheit?t:e)),r.a.createElement("div",{className:"wconditionsbox"},r.a.createElement("span",{id:"wparameter"},r.a.createElement(E.a,{name:"darksky",iconId:a})),r.a.createElement("span",{id:"wdescription"},this.state.theCurrentWeatherArr.summary))),r.a.createElement("div",{className:"weather main-toggle"},r.a.createElement("span",null,"F"),r.a.createElement("button",{id:"unit-switch",onClick:this.handleClick},r.a.createElement("span",{id:"unit-toggle",className:this.state.showfahrenheit?"toggle":""})),r.a.createElement("span",null,"C")))),r.a.createElement("div",{className:"forecastbox"},r.a.createElement(x.d,null,r.a.createElement(x.b,null,r.a.createElement(x.a,null,"Today's Overview"),r.a.createElement(x.a,null,"7 Days Forecast")),r.a.createElement(x.c,null,r.a.createElement("div",{className:"woverviewbox"},r.a.createElement("div",{className:"weatherd"},r.a.createElement("h2",null,s,"%"),r.a.createElement("h3",null,"Humidity")),r.a.createElement("div",{className:"weatherd"},r.a.createElement("h2",null,this.state.theCurrentWeatherArr.windSpeed,r.a.createElement("span",null,"mph")),r.a.createElement("h3",null,"Wind")),r.a.createElement("div",{className:"weatherd"},r.a.createElement("h2",null,this.state.theCurrentWeatherArr.precipIntensity),r.a.createElement("h3",null,"Precipitation")),r.a.createElement("div",{className:"weatherd"},r.a.createElement("h2",null,i,r.a.createElement("span",null,"in")),r.a.createElement("h3",null,"Pressure")),r.a.createElement("div",{className:"weatherd"},r.a.createElement("h2",null,this.state.theCurrentWeatherArr.visibility,r.a.createElement("span",null,"mi")),r.a.createElement("h3",null,"Visibility")),r.a.createElement("div",{className:"weatherd"},r.a.createElement("h2",null,this.state.theCurrentWeatherArr.uvIndex),r.a.createElement("h3",null,"UV Index")))),r.a.createElement(x.c,null,this.showForecast()))))),r.a.createElement("div",{className:"cuisine-suggestion"},r.a.createElement("h3",{className:"cuisine-text"},e>=80?"Keep cool with ":"Stay warm with ",r.a.createElement("span",null,this.state.randomCuisine.cuisine_name)," ?"),r.a.createElement("div",{className:"restaurant-box"},r.a.createElement("h4",{className:"radius-text"},"Within 10 miles"),this.showRestaurants())))}}]),t}(n.Component),j=a(24),O=a.n(j),L=a(38),R=f.a.create({baseURL:"https://developers.zomato.com/api/v2.1",headers:{"user-key":"18c3615da2cae631992b35ca96a70f86"}}),W=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e)))._goToLocation=function(){window.open("https://www.google.com/maps/search/?api=1&query=".concat(a.state.specificRestaurant.name))},a.state={specificRestaurant:{},loading:!0},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=Object(L.a)(O.a.mark((function e(){var t,a,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.match.params.restaurantId,e.next=3,R.get("/restaurant?res_id=".concat(t));case 3:a=e.sent,n=a.data,this.setState({specificRestaurant:n,loading:!1});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.loading?r.a.createElement("div",{className:"loading"},r.a.createElement("h2",null,"Local Weather"),r.a.createElement("img",{src:y.a,alt:""})):r.a.createElement("div",{className:"wrapper2 restaurantbkgd"},r.a.createElement(k.b,{className:"homeback",to:"/"},r.a.createElement("i",{className:"fa fa-arrow-circle-left","aria-hidden":"true"})," Home"),r.a.createElement("div",{className:"container2"},r.a.createElement("div",{className:"restaurantbox"},r.a.createElement("div",{className:"restaurantimg"},r.a.createElement("img",{src:""===this.state.specificRestaurant.thumb?b.a:this.state.specificRestaurant.thumb,alt:""})),r.a.createElement("div",{className:"single-restaurant-details"},r.a.createElement("h2",null,this.state.specificRestaurant.name," ",r.a.createElement(C,null,this.state.specificRestaurant.user_rating.aggregate_rating),r.a.createElement("span",{className:"ratingtext"},"(",this.state.specificRestaurant.user_rating.rating_text,")")),r.a.createElement("h3",{className:"raddress"},this.state.specificRestaurant.location.address),r.a.createElement("div",{className:"restaurant-labels"},r.a.createElement("div",{className:"rbox rphone"},r.a.createElement("h3",null,r.a.createElement("strong",null,"Phone")),r.a.createElement("a",{href:"tel:".concat(this.state.specificRestaurant.phone_numbers)},this.state.specificRestaurant.phone_numbers)),r.a.createElement("div",{className:"rbox rprice"},r.a.createElement("h3",null,r.a.createElement("strong",null,"Price")),r.a.createElement("h3",null,r.a.createElement("span",null,r.a.createElement(N,null,this.state.specificRestaurant.price_range)))),r.a.createElement("div",{className:"rbox rcuisines"},r.a.createElement("h3",null,r.a.createElement("strong",null,"Cuisines")),r.a.createElement("h3",null,this.state.specificRestaurant.cuisines))),r.a.createElement("div",{className:"rlinks"},r.a.createElement("div",{className:"rlinkbox directionbtn"},r.a.createElement("h3",null,r.a.createElement("strong",null,"Find Direction")),r.a.createElement("button",{onClick:this._goToLocation},"Find Directions")),r.a.createElement("div",{className:"rlinkbox zomatobtn"},r.a.createElement("h3",null,r.a.createElement("strong",null,"More Details")),r.a.createElement("a",{href:this.state.specificRestaurant.url,target:"_blank",rel:"noopener noreferrer"},"Open in Zomato")))))))}}]),t}(n.Component),T=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(m.c,null,r.a.createElement(m.a,{exact:!0,path:"/",render:function(e){return r.a.createElement(S,e)}}),r.a.createElement(m.a,{exact:!0,path:"/restaurant-detail/:restaurantId",render:function(e){return r.a.createElement(W,e)}})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(76);i.a.render(r.a.createElement(k.a,null,r.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[40,1,2]]]);
//# sourceMappingURL=main.8981206d.chunk.js.map