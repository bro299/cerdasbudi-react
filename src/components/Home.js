import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faShieldAlt, faUserFriends, faComments } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../assets/dasboard.png'; // Tambahkan ini

const Home = () => {
  const mainTitleRef = useRef(null);
  const mainSubtitleRef = useRef(null);
  const startChatBtnRef = useRef(null);
  const heroImageRef = useRef(null);
  const featureCardsRef = useRef([]);

  useEffect(() => {
    gsap.to(mainTitleRef.current, { duration: 1, opacity: 1, y: 20, delay: 0.5 });
    gsap.to(mainSubtitleRef.current, { duration: 1, opacity: 1, y: 20, delay: 0.7 });
    gsap.to(startChatBtnRef.current, { duration: 1, opacity: 1, y: 20, delay: 0.9 });
    gsap.to(heroImageRef.current, { duration: 1, opacity: 1, scale: 1.05, delay: 1.1 });

    featureCardsRef.current.forEach((card, index) => {
      gsap.to(card, { duration: 1, opacity: 1, y: 20, delay: 1.3 + (index * 0.2) });
    });
  }, []);

  return (
    <>
      <section id="home" className="pt-24 pb-32 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 ref={mainTitleRef} className="text-4xl md:text-6xl font-bold mb-4 leading-tight opacity-0">
                Selamat Datang di <span className="text-accent">CerdasBudi</span>
              </h1>
              <p ref={mainSubtitleRef} className="text-lg md:text-xl mb-8 opacity-0">
                Teman AI Anda untuk mengatasi perundungan, rasa malu, dan meningkatkan kepercayaan diri
              </p>
              <a
                href="#chat-section"
                ref={startChatBtnRef}
                className="bg-accent text-text font-bold py-3 px-6 rounded-full hover:bg-opacity-80 transition duration-300 opacity-0"
              >
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                Mulai Mengobrol Sekarang
              </a>
            </div>
            <div className="md:w-1/2 relative">
              <div className="blob bg-accent w-64 h-64 absolute top-0 right-0 opacity-50"></div>
              <img
                ref={heroImageRef}
                src={heroImage} // Gunakan variabel yang diimpor
                alt="AI Assistant"
                className="relative z-10 rounded-lg shadow-2xl opacity-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Remainder of the component */}
    </>
  );
};

export default Home;
