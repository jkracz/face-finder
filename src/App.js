import './App.css';
import { React, useState } from 'react';

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
      setInput("");
      setImageUrl("");
      setBox({});
      setRoute("signin");
      setUser(
        {
          id: "",
          name: "",
          email: "",
          entries: 0,
          joined: ""
        }
      );
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch("https://face-finder-api.onrender.com/image", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        input: input
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
          setUser(Object.assign(user, count));
          console.log(user.entries)
        })
        .catch(err => console.log(err));
      }
      displayFaceBox(calculateFaceLocation(response));
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      { route === "home"
        ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
            <FaceRecognizer box={box} imageUrl={imageUrl} />
          </ div>
        : (
          route === "signin"
          ? <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
          : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )
      }
      <ParticlesBg type="square" bg={true} />
    </div>
  );

}

export default App;
