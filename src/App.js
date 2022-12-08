import './App.css';
import { Component, React, useState } from 'react';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognizer from './components/FaceRecognizer/FaceRecognizer';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import ParticlesBg from 'particles-bg'

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  onButtonSubmit = () => {
    setImageUrl(input);
    fetch("https://face-finder-api.onrender.com/image", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch("https://face-finder-api.onrender.com/image", {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          
          this.setState(Object.assign(this.state.user, {entries: count.entries}));
        })
        .catch(err => console.log(err));
      }
      displayFaceBox(calculateFaceLocation(response));
    })
    .catch(err => console.log(err));
  }

}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = initialState;
//   }

//   loadUser = (data) => {
//     this.setState({user: {
//       id: data.id,
//       name: data.name,
//       email: data.email,
//       entries: data.entries,
//       joined: data.joined
//     }})
//   }

//   calculateFaceLocation = (data) => {
//     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
//     const image = document.getElementById("inputimage");
//     const width = Number(image.width);
//     const height = Number(image.height);
//     return {
//       leftCol: clarifaiFace.left_col * width,
//       topRow: clarifaiFace.top_row * height,
//       rightCol: width - (clarifaiFace.right_col * width),
//       bottomRow: height - (clarifaiFace.bottom_row * height),
//     }
//   }

//   displayFaceBox = (box) => {
//     this.setState({box: box});
//   }

//   onInputChange = (event) => {
//     this.setState({input: event.target.value});
//   }

//   onButtonSubmit = () => {
//     this.setState({imageUrl: this.state.input});
//     fetch("https://face-finder-api.onrender.com/image", {
//       method: "post",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify({
//         input: this.state.input
//       })
//     })
//     .then(response => response.json())
//     .then(response => {
//       if (response) {
//         fetch("https://face-finder-api.onrender.com/image", {
//           method: "put",
//           headers: {"Content-Type": "application/json"},
//           body: JSON.stringify({
//             id: this.state.user.id
//           })
//         })
//         .then(response => response.json())
//         .then(count => {
//           this.setState(Object.assign(this.state.user, {entries: count.entries}));
//         })
//         .catch(err => console.log(err));
//       }
//       this.displayFaceBox(this.calculateFaceLocation(response));
//     })
//     .catch(err => console.log(err));
//   }

//   onRouteChange = (route) => {
//     if (route === "signout") {
//       this.setState(initialState);
//     } else if (route === "home") {
//       this.setState({isSignedIn: true});
//     }
//     this.setState({route: route});
//   }

//   render() {
//     return (
//       <div className="App">
//         <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
//         { this.state.route === "home"
//           ? <div>
//               <Logo />
//               <Rank name={this.state.user.name} entries={this.state.user.entries} />
//               <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
//               <FaceRecognizer box={this.state.box} imageUrl={this.state.imageUrl} />
//             </ div>
//           : (
//             this.state.route === "signin"
//             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
//             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
//           )
//         }
//         <ParticlesBg type="square" bg={true} />
//       </div>
//     );
//   }
// }

export default App;
