import React from 'react';

const HowToUse = () => {
  return (
    <section id="how-to-use" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Cara Menggunakan CerdasBudi</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: 'fas fa-user-plus',
              title: '1. Buat Profil',
              description: 'Isi informasi pribadi Anda untuk pengalaman yang lebih personal',
            },
            {
              icon: 'fas fa-comments',
              title: '2. Mulai Percakapan',
              description: 'Mulai chat dengan CerdasBudi tentang masalah yang Anda hadapi',
            },
            {
              icon: 'fas fa-lightbulb',
              title: '3. Dapatkan Saran',
              description: 'Terima saran dan strategi yang disesuaikan dengan situasi Anda',
            },
            {
              icon: 'fas fa-tasks',
              title: '4. Terapkan Tips',
              description: 'Praktikkan saran yang diberikan dalam kehidupan sehari-hari',
            },
          ].map((step, idx) => (
            <div key={idx} className="text-center p-6 rounded-lg bg-gray-800 shadow-lg">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${step.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;