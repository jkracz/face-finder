import './App.css';
import React from 'react';
import Navigation from './compnents/Navigation/Navigation';
import Logo from './compnents/Logo/Logo';
import ImageLinkForm from './compnents/ImageLinkForm/ImageLinkForm';
import Rank from './compnents/Rank/Rank';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognizer /> */}
    </div>
  );
}

export default App;
