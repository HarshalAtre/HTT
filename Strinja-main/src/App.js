import './App.css';
import "./components/header/navbar.css";
import { GalleryData } from './components/Buying/gallery/GalleryData';
import Navbar from './components/header/Navbar';
import Maincomp from './components/home/Maincomp';
import Footer from './components/header/footer/Footer';
import Sign_in from './components/signup_signin/Sign_in';
import Sign_up from './components/signup_signin/Sign_up';
import {Routes,Route} from 'react-router-dom';
import Gallery from './components/Buying/gallery/Gallery';
import ContactUs from './components/contact/contact';
import TextImageComponent from './components/about/about';
import Back from './components/backgroud/back';
import { createContext, useState } from "react";
import React from 'react';
import Logout from './components/signup_signin/Logout';
import AddForm from './components/addImages/AddForm';
import Login from './components/login/login';
import Register from './components/login/register';
import Course from './components/login/Courses';
import RoomForm from './components/Live/live';
import Room from './components/Live/Room';
import VideoComponent from './components/Tracker/tracker';
import VerticalTimeline from './components/Timeline/timeline';
import splineTemplate from './components/Timeline/chart';

export const ThemeContext = createContext(null);


function App() {
  const [isAuth,setIsAuth] = useState(false);
  const handleSignIn = () =>{
    setIsAuth(true);
  }
  const handleSignOut = () => {
    setIsAuth(false);
  }
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Back/>
        <Navbar theme={theme} toggleTheme={toggleTheme} isAuth={isAuth}/>
        <Routes>
          <Route path="/"element={<Maincomp/>}/>
           <Route path="/login"element={<Login/>}/>
          <Route path='/logout' element={<Logout isAuth={isAuth} handleSignOut={handleSignOut}/>} />
          <Route path="/register"element={<Register/>}/>
          <Route path='/gallery' element={<Gallery GalleryData={GalleryData}/>}/>
          <Route path='/new' element={<AddForm GalleryData={GalleryData}/>}/>
          <Route path='/contactUs' element={<ContactUs />}/>
          <Route path='/about' element={<TextImageComponent/>}/>
          <Route path='/courses' element={<Course/>}/>
          <Route path='/live' element={<RoomForm/>}/>
          <Route path='/room/:roomId' element={<Room/>}/>
          <Route path='/tracker/:course' element={<VideoComponent/>}/>
          <Route path='/timeline' element={<VerticalTimeline/>}/>
          {/* <Route path='/graph' element={<splineTemplate/>}/> */}
          


        </Routes>
        <Footer theme={theme} toggleTheme={toggleTheme}/>
      </div>
    </ThemeContext.Provider>
  )
}

export default App;
