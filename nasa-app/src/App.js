//https://api.nasa.gov/planetary/apod?api_key=d4BMbv44w9zMCbCimhulRMPul0oROKmrGlefTQtE

import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  state = {
    userInput: '',
    data: []
  }


  //componentDidMount is a method that gets called after a component gets called to the DOM tree -- its like an even listener 
  // it is a life cycle method -- accessible to every single class component -- everything in function gets called 

  // componentDidMount() {

  //   //axios.get()  will return a Promise 

  //   axios.get('https://api.nasa.gov/planetary/apod?search?q=')
  //     // this link refrences the search query provided by nasa api site ""

  //     //No longer need to use json() bc axios does it for us
  //     //We can just access the response that we get after using then ()
  //     .then(response => console.log(response))
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // console.group(this.state.userInput)
    //axios will return a promise aka a response with some kind of data or error(fulfilled, rejected, pending)
    axios.get(`https://images-api.nasa.gov/search?q=${this.state.userInput}`)
      //whenever we get a response back, only then will then() run 
      //We no longer need to use json()
      .then(res => this.setState({
        data: res.data.collection.items
      }))
    // .then(data => this.setState({userInput: data}))
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        {/* Creating a form allows user to input text for the search query in the above link */}

        <form onSubmit={this.handleSubmit}>
          <label htmlFor='userInput'>Search: </label>
          <input
            type='text'
            id='userInput'
            name='userInput'
            onChange={this.handleChange}
            //  this tells where the data needs to be called from - the search box needs to be connected to the userInput 
            value={this.state.userInput}
          />

          <input type='submit' value='submit' />
        </form>

        <div>
          {
            // desc is the name of the arrow function . data references the array that stores all of the information. The 0 references the specific number of the array we want to access .title refers to the object within the array that we want to access
            this.state.data.map((desc) => {
              // console.log(desc.data[0].title)
              return(
                // They Key prop is to help differentiate and distinguish elements  from each other between the virtual and real DOM
                <div key={desc.data[0].nasa_id}>
                 <h3>{desc.data[0].title}</h3> 
                 <p>Location: {desc.data[0].location}</p> 
                 <p>Created: {desc.data[0].date_created}</p> 

                {/* You will see that data from APIs may not have data for every single object -- for example not all of the images (href) in this array have images - the if statement belows says that if there is an image then display it, if there is no image for the object then pass on an empty sting  -- you could also use <img src={desc.links?.[0].href} */}

                 <img src={desc.link ? desc.link[0].href : ''} alt=''></img>
                 <p>Description: {desc.data[0].description}</p> 
                </div>
              )
            })
          }

        </div>
      </div>
    );
  }
}

export default App;
