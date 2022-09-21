import './App.css';
import { Component, React } from 'react';

import Navigation from './compnents/Navigation/Navigation';
import Logo from './compnents/Logo/Logo';
import ImageLinkForm from './compnents/ImageLinkForm/ImageLinkForm';
import Rank from './compnents/Rank/Rank';
import Particle from './compnents/Particle/Particle';

import Clarifai from 'clarifai'

const MODEL_VERSION_ID = 'a403429f2ddf4b49b307e318f00e528b';    
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

const app = new Clarifai.App({
  apiKey: "08e81ce8f9e34023b240c6b7595bf067"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event);
  }

  onButtonSubmit = () => {
    console.log("click");
    app.models.predict(MODEL_VERSION_ID, IMAGE_URL).then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particle />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        {/* <FaceRecognizer /> */}
      </div>
    );
  }
}

export default App;
