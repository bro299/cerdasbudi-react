import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Fitur Unggulan CerdasBudi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: 'fas fa-shield-alt',
              title: 'Atasi Perundungan',
              description: 'Pelajari strategi untuk menghadapi dan mengatasi pengalaman perundungan di sekolah dan lingkungan sosial',
            },
            {
              icon: 'fas fa-brain',
              title: 'Dukungan Kesehatan Mental',
              description: 'Dapatkan bimbingan dan dukungan untuk berbagai tantangan kesehatan mental dalam keluarga dan pekerjaan',
            },
            {
              icon: 'fas fa-user-friends',
              title: 'Bangun Kepercayaan Diri',
              description: 'Kembangkan strategi untuk mengatasi rasa malu dan membangun kepercayaan diri di berbagai situasi sosial',
            },
          ].map((feature, idx) => (
            <div key={idx} className="text-center feature-card bg-gray-700 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
              <i className={`${feature.icon} text-4xl text-blue-400 mb-4`}></i>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;