import './App.css';
import { Component, React } from 'react';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognizer from './components/FaceRecognizer/FaceRecognizer';

import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai'

const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

const app = new Clarifai.App({
  apiKey: "08e81ce8f9e34023b240c6b7595bf067"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        console.log(err);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognizer imageUrl={this.state.imageUrl} />
        <ParticlesBg type="square" bg={true} />
      </div>
    );
  }
}

export default App;
