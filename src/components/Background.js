import React from "react";
import bullyImg from '../assets/bully.jpg';
import dampakImg from '../assets/dampak.jpg';
import berhasilImg from '../assets/berhasil.jpg';

const Background = () => {
  return (
    <section
      id="background"
      className="py-16 bg-gradient-to-br from-primary via-secondary to-accent"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Latar Belakang CerdasBudi
          </h2>
          <p className="text-lg mb-8 text-gray-200">
            CerdasBudi lahir dari keprihatinan kami terhadap maraknya kasus
            perundungan dan dampaknya yang mendalam pada masyarakat kita,
            khususnya generasi muda. Kami melihat bagaimana korban perundungan
            sering kali mengalami:
          </p>
          <ul className="text-left text-gray-200 mb-8 space-y-4">
            <li>
              <i className="fas fa-check-circle text-accent mr-2"></i>Rasa malu
              yang mendalam dan berkepanjangan
            </li>
            <li>
              <i className="fas fa-check-circle text-accent mr-2"></i>Ketakutan
              untuk bersosialisasi atau mengekspresikan diri
            </li>
            <li>
              <i className="fas fa-check-circle text-accent mr-2"></i>Kesulitan
              dalam membangun kepercayaan diri
            </li>
            <li>
              <i className="fas fa-check-circle text-accent mr-2"></i>Masalah
              dalam lingkungan sekolah dan kerja
            </li>
            <li>
              <i className="fas fa-check-circle text-accent mr-2"></i>Kecenderungan
              untuk menjadi antisosial
            </li>
          </ul>
          <p className="text-lg mb-8 text-gray-200">
            Kami percaya bahwa setiap individu berhak untuk merasa aman,
            dihargai, dan percaya diri. CerdasBudi hadir sebagai solusi inovatif
            untuk memberikan dukungan psikologis yang mudah diakses, tanpa
            judgement, dan tersedia 24/7.
          </p>
        </div>
      </div>
      {/* Vector Illustrations Section */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 text-center text-white">
          Situasi dan Solusi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Illustration 1: Bullying Situation */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={bullyImg}
              alt="Ilustrasi situasi perundungan"
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              Situasi Perundungan
            </h4>
            <p className="text-gray-600">
              Menggambarkan situasi perundungan yang sering terjadi di sekolah
              atau tempat kerja.
            </p>
          </div>

          {/* Illustration 2: Impact of Bullying */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={dampakImg}
              alt="Ilustrasi dampak perundungan"
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              Dampak Perundungan
            </h4>
            <p className="text-gray-600">
              Menunjukkan dampak emosional dan psikologis dari perundungan pada
              korban.
            </p>
          </div>

          {/* Illustration 3: CerdasBudi Solution */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={berhasilImg}
              alt="Ilustrasi solusi CerdasBudi"
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              Solusi CerdasBudi
            </h4>
            <p className="text-gray-600">
              Menggambarkan bagaimana CerdasBudi membantu mengatasi dampak
              perundungan dan meningkatkan kepercayaan diri.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Background;
