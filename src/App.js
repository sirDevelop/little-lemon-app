import Header from './Header';
import Nav from './Nav';
import Reservation from './Components/Reservation';
import Home from './Home';
import Footer from './Footer';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import defaultTimeslots from './lib/timeslots';

function checkLocalStorageForTimeslots() {
  let timeslots = localStorage.getItem('timeslots')
  if (!timeslots) {timeslots = defaultTimeslots}
  else {timeslots = JSON.parse(timeslots)}
  return timeslots
}

function App() {
  
  return (
    <>
    <Router>
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reservation" element={<Reservation />}></Route>
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;