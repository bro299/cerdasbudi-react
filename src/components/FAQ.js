import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        className="flex justify-between items-center w-full py-3 px-4 bg-card rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{question}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-gray-700 rounded-lg">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqItems = [
    {
      question: 'Apakah CerdasBudi benar-benar dapat menggantikan psikolog manusia?',
      answer: 'CerdasBudi tidak dimaksudkan untuk menggantikan psikolog manusia. Ia adalah alat pendukung yang dapat memberikan saran awal dan dukungan, tetapi untuk masalah kesehatan mental yang serius, selalu disarankan untuk berkonsultasi dengan profesional kesehatan mental yang berkualifikasi.'
    },
    {
        question: 'Apakah percakapan saya dengan CerdasBudi bersifat pribadi?',
        answer: 'Ya, privasi Anda adalah prioritas kami. Semua percakapan dengan CerdasBudi bersifat rahasia dan tidak disimpan secara permanen. Kami menggunakan enkripsi end-to-end untuk memastikan keamanan data Anda.'
    },
    {
        question: 'Bagaimana cara kerja CerdasBudi?',
        answer: 'CerdasBudi menggunakan teknologi kecerdasan buatan canggih untuk memahami pesan Anda dan memberikan respons yang relevan. Ia dilatih dengan pengetahuan psikologi dan teknik konseling untuk memberikan dukungan yang bermanfaat dalam mengatasi perundungan, rasa malu, dan meningkatkan kepercayaan diri.'
    }
  ];

  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan yang Sering Diajukan</h2>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;