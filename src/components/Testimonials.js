import React, { useState } from 'react';

const testimonials = [
  {
    text: "CerdasBudi benar-benar membantu saya mengatasi rasa malu dan membangun kepercayaan diri. Saya merasa lebih siap menghadapi tantangan sosial sekarang.",
    name: "Rina, 22",
    role: "Mahasiswa"
  },
  {
    text: "Sebagai orang tua, saya sangat terbantu dengan saran-saran CerdasBudi dalam mendampingi anak saya yang mengalami perundungan di sekolah.",
    name: "Budi, 40",
    role: "Pegawai Swasta"
  },
  {
    text: "CerdasBudi seperti teman yang selalu ada kapanpun saya butuhkan. Sangat membantu ketika saya merasa cemas atau down.",
    name: "Dian, 28",
    role: "Freelancer"
  }
];

const TestimonialCard = ({ text, name, role }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <p className="text-gray-600 mb-4">{text}</p>
    <div className="flex items-center">
      <img src="/api/placeholder/50/50" alt="User" className="w-10 h-10 rounded-full mr-4" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Apa Kata Mereka tentang CerdasBudi</h2>
        <div className="relative">
          <TestimonialCard {...testimonials[currentIndex]} />
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button onClick={prevTestimonial} className="bg-white p-2 rounded-full shadow-md">
              &lt;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button onClick={nextTestimonial} className="bg-white p-2 rounded-full shadow-md">
              &gt;
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;