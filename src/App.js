import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Background from './components/Background';
import Features from './components/Features';
import HowToUse from './components/HowToUse';
import FAQ from './components/FAQ';
import ErrorHelp from './components/ErrorHelp';
import Footer from './components/Footer';
import UserInfoForm from './components/UserInfoForm';
import ChatInterface from './components/ChatInterface';
import Testimonials from './components/Testimonials';

const AppContent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
  };

  const isHomePage = location.pathname === '/';
  const shouldShowFooter = !['/', '/coba-sekarang', '/chat'].includes(location.pathname);

  return (
    <div className="App bg-gray-900 text-white min-h-screen">
      {isHomePage && <Header />}
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Background />
            <Testimonials/>
            <Features />
            <HowToUse />
            <ErrorHelp />
            <Footer/>
          </>
        } />
        <Route path="/features" element={<Features />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/faq" element={<FAQ />} />
        <Route 
          path="/coba-sekarang" 
          element={<UserInfoForm onSubmit={handleUserInfoSubmit} />} 
        />
        <Route 
          path="/chat" 
          element={
            userInfo ? (
              <ChatInterface 
                userName={userInfo.name} 
                userAge={userInfo.age} 
                userGender={userInfo.gender} 
              />
            ) : (
              <Navigate to="/coba-sekarang" replace />
            )
          } 
        />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;