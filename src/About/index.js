/*import React, { useState } from 'react';
import './styles.css';


export default function About (){

    return(
      <div className="about-wrapper">
        <div className="about-text">
          <div className={className}>
            <h3>Title</h3>
            <p>This is a text that will appear.</p>
          </div>
         </div>
      </div>
     )
   
}*/

import React, { Component } from 'react';
import './styles.css';
class About extends Component {
  render() {
    return(
      <div className="about-wrapper">
        <div className="about-text">
          <div className={this.props.className}>
            <h3>Title</h3>
            <p>This is a text that will appear.</p>
          </div>
         </div>
      </div>
     )
   }
}
export default About;
