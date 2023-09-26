import React, { Component } from 'react'

export class DollarRate extends Component {

  showDollarSign = () => {
    let signs = this.props.children;
    let filledArray = new Array(signs).fill('$');
    return filledArray;
  }

  render() {
    return (
      <span>
        {this.showDollarSign()}
      </span>
    )
  }
}

export default DollarRate
