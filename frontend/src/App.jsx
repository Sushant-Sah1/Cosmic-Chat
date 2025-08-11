import { useState } from 'react'
import { Route, Routes } from 'react-router'
import LandingPage from '../pages/LandingPage'
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import DashBoard from '../pages/DashBoard';
import GroupChat from '../pages/GroupChat';
import ProfilePage from '../pages/ProfilePage';
import GroupOverview from '../pages/GroupOverview';
import UnAthorized from '../pages/UnAthorized';
import "./index.css";
import { AnimatedBackground } from "animated-backgrounds";
function App() {

  return (
    <>
      <AnimatedBackground
        animationName="starryNight"
        interactive={true}
        interactionConfig={{
          effect: "attract", // cursor interaction effect
          strength: 0.8,
          radius: 150,
          continuous: true,
        }}
        adaptivePerformance={true} // optimizes for mobile
      />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/groupchat" element={<GroupChat />}></Route>
        <Route path="/profilepage" element={<ProfilePage />}></Route>
        <Route path="/groupoverview" element={<GroupOverview />}></Route>
        <Route path="/UnAthorized" element={<UnAthorized />}></Route>
      </Routes>
    </>
  );
}

export default App
