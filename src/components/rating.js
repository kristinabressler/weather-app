import React, { Component } from 'react'

export class Rating extends Component {
  

  render() {
    const starTotal = 5;
    let starPercentage = (this.props.children / starTotal) * 100;
    // console.log("rating", this.props.children);
    // console.log("percentage rating", starPercentage);
    let starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    // console.log("percentage rounded rating", starPercentageRounded);
  
    return (
      <span className="stars-outer">
          <span className="stars-inner" style={{width: `${starPercentageRounded}`}} ></span>
        </span>
    )
  }
}



export default Rating


