import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { gsap } from 'gsap';
import aiMessageProfileImage from '../assets/aiuserr.png';
import userProfileImage from '../assets/user.png';


const Chat = ({ userName, userAge, userGender }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatMessagesRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadApiKey();
    addMessage('ai', `Halo ${userName}! Saya CerdasBudi, psikolog AI Anda. Bagaimana perasaan Anda hari ini? Apa yang ingin Anda bicarakan?`);
  }, [userName]);

  const loadApiKey = async () => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      updateChatHistoryUI();
    } else {
      await promptForApiKey();
    }
  };

  const promptForApiKey = async () => {
    const result = await Swal.fire({
      icon: 'info',
      title: 'API Key Diperlukan',
      html: `
        <p>Silakan masukkan API key Anda:</p>
        <ol class="text-left mt-4 mb-4">
          <li>1. Kunjungi <a href="https://makersuite.google.com/app/apikey" target="_blank" class="text-blue-500 hover:underline">Google AI Studio</a></li>
          <li>2. Klik "Create API key" atau "Buat API key"</li>
          <li>3. Salin API key yang dihasilkan</li>
          <li>4. Tempel API key tersebut di bawah ini</li>
        </ol>
      `,
      input: 'text',
      inputPlaceholder: 'Tempel API key Anda di sini',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Anda perlu memasukkan API key!';
        }
      }
    });

    if (result.isConfirmed) {
      setApiKey(result.value);
      localStorage.setItem('apiKey', result.value);
      updateChatHistoryUI();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!apiKey) {
      await promptForApiKey();
      if (!apiKey) return;
    }

    addMessage('user', input);
    setInput('');

    const prompt = `
      Anda adalah psikolog AI bernama CerdasBudi, yang mengkhususkan diri dalam membantu orang-orang dengan masalah seperti perundungan, ketakutan, rasa malu, dan tantangan kesehatan mental. Gaya komunikasi Anda hangat, mendukung, dan menggunakan bahasa yang sesuai dengan anak muda Indonesia. Tugas Anda adalah:

      1. Memberikan respons yang empatik dan mendukung terhadap pesan pengguna.
      2. Menenangkan pengguna dengan emosional.
      3. Menawarkan saran praktis dan strategi mengatasi masalah yang disesuaikan dengan situasi mereka.
      4. Menyarankan kelompok dukungan atau komunitas yang relevan yang mungkin bermanfaat bagi mereka.
      5. Merekomendasikan 5 buku (dengan harga, deskripsi singkat, dan link untuk membeli) yang bisa bermanfaat untuk situasi mereka.
      6. Menyarankan 5 lagu relaksasi di YouTube yang sesuai dengan keadaan emosional atau situasi mereka, lengkap dengan link YouTube.

      Profil Pengguna:
      Nama: ${userName}
      Usia: ${userAge}
      Jenis Kelamin: ${userGender}

      Pesan pengguna: ${input}

      Berikan respons Anda dengan nada percakapan, menyapa pengguna dengan namanya. Format respons Anda dalam HTML, menggunakan tag yang sesuai untuk struktur (misalnya, <p>, <ul>, <h3>). Untuk rekomendasi buku dan musik, gunakan format berikut:

      <h3>Rekomendasi Buku:</h3>
      <ul>
          <li>
              <strong>Judul Buku</strong> oleh Penulis - Rp XXX.XXX
              <p>Deskripsi singkat buku.</p>
              <a href="URL_BELI_BUKU" target="_blank">Beli Buku</a>
          </li>
          <!-- Ulangi untuk 5 buku -->
      </ul>

      <h3>Rekomendasi Musik Relaksasi:</h3>
      <ul>
          <li>
              <strong>Judul Lagu</strong> oleh Artis
              <a href="URL_YOUTUBE" target="_blank">Dengarkan di YouTube</a>
          </li>
          <!-- Ulangi untuk 5 lagu -->
      </ul>
    `;

    try {
      const response = await generateContent(prompt);
      const result = response.candidates[0].content.parts[0].text;
      addMessage('ai', result);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.',
      });
    }
  };

  const generateContent = async (prompt) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      if (response.status === 403) {
        setApiKey('');
        localStorage.removeItem('apiKey');
        throw new Error('API key tidak valid');
      }
      throw new Error('Respons jaringan tidak berhasil');
    }

    return response.json();
  };

  const addMessage = (sender, message) => {
    const newMessage = { sender, message };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    if (sender === 'user') {
      saveChatHistory(message);
    }

    setTimeout(() => {
      if (chatMessagesRef.current) {
        const lastMessage = chatMessagesRef.current.lastElementChild;
        gsap.from(lastMessage, { duration: 0.5, opacity: 0, y: 20, ease: 'power2.out' });
      }
    }, 0);
  };

  const playTTS = async (text) => {
    try {
      const response = await fetch(`https://api.nyxs.pw/tools/tts?text=${encodeURIComponent(text)}&to=id`);
      const data = await response.json();

      if (data.status) {
        const audio = new Audio(data.result);
        audio.play();
      } else {
        throw new Error('TTS generation failed');
      }
    } catch (error) {
      console.error('Error generating TTS:', error);
      Swal.fire({
        icon: 'error',
        title: 'TTS Error',
        text: 'Terjadi kesalahan saat menghasilkan audio. Silakan coba lagi.',
      });
    }
  };

  const saveChatHistory = (message) => {
    const newHistory = [...chatHistory, {
      timestamp: new Date().toISOString(),
      message: message.substring(0, 50) + (message.length > 50 ? '...' : '')
    }].slice(-10);
    setChatHistory(newHistory);
    localStorage.setItem(`chatHistory_${apiKey}`, JSON.stringify(newHistory));
  };

  const updateChatHistoryUI = () => {
    const history = JSON.parse(localStorage.getItem(`chatHistory_${apiKey}`)) || [];
    setChatHistory(history);
  };

  const loadChat = (timestamp) => {
    console.log(`Loading chat from ${timestamp}`);
    Swal.fire({
      title: 'Fitur Dalam Pengembangan',
      text: 'Maaf, fitur untuk memuat riwayat chat masih dalam tahap pengembangan.',
      icon: 'info'
    });
  };

  const handleNewChat = () => {
    setMessages([]);
    addMessage('ai', `Halo ${userName}! Saya CerdasBudi, psikolog AI Anda. Ceritakan masalah anda!`);
  };

  const handleEndChat = () => {
    Swal.fire({
      title: 'Akhiri Percakapan?',
      text: "Anda yakin ingin mengakhiri percakapan ini?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Akhiri',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-card p-4 lg:p-6 flex flex-col">
        <div className="flex items-center mb-6">
          <i className="fas fa-brain text-accent text-2xl mr-3"></i>
          <h1 className="text-2xl font-bold">CerdasBudi</h1>
        </div>
        <div className="flex-grow overflow-y-auto mb-4">
          <h2 className="text-lg font-semibold mb-4">Riwayat Chat</h2>
          <ul className="space-y-2">
            {chatHistory.map((item, index) => (
              <li
                key={item.timestamp}
                className="text-sm text-gray-300 cursor-pointer hover:text-white truncate"
                onClick={() => loadChat(item.timestamp)}
              >
                Chat {index + 1}: {item.message}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleNewChat}
          className="w-full bg-accent text-white py-2 px-4 rounded-full hover:bg-opacity-80 transition duration-300"
        >
          <i className="fas fa-plus mr-2"></i>Chat Baru
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col">
        {/* Chat Header */}
        <div className="bg-card p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/assets/aiuserr.png" alt="AI Avatar" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h2 className="font-semibold">CerdasBudi</h2>
              <p className="text-sm text-gray-400">Psikolog AI Anda</p>
            </div>
          </div>
          <button
            onClick={handleEndChat}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-opacity-80 transition duration-300"
          >
            <i className="fas fa-times mr-2"></i>Akhiri Chat
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={chatMessagesRef} className="flex-grow overflow-y-auto p-4 lg:p-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start space-x-4 mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ${msg.sender === 'user' ? 'order-2' : ''}`}>
              <img
                src={msg.sender === 'user' ? userProfileImage : aiMessageProfileImage}
                alt={`${msg.sender === 'user' ? 'User' : 'AI'} Avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`flex-grow ${msg.sender === 'user' ? 'order-1' : ''}`}>
              <div className={`p-4 rounded-lg shadow relative chat-bubble break-words ${
                msg.sender === 'user' ? 'bg-primary text-white' : 'bg-secondary text-white'
              }`}>
                <div dangerouslySetInnerHTML={{ __html: msg.message }} />
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => playTTS(msg.message)}
                    className="tts-button absolute bottom-2 right-2"
                  >
                    <i className="fas fa-volume-up"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

        {/* Chat Input */}
        <div className="bg-card p-4">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              className="flex-grow px-4 py-2 bg-background border border-gray-600 rounded-l-full focus:outline-none focus:ring-2 focus:ring-primary text-text"
            />
            <button
              type="submit"
              className="bg-accent text-white px-6 py-2 rounded-r-full hover:bg-opacity-80 transition duration-300"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
