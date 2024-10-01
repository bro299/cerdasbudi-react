import React from 'react';

const ErrorHelp = () => {
  return (
    <section id="error-help" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Bantuan Jika Terjadi Error</h2>
          <div className="max-w-3xl mx-auto bg-background p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Jika Anda Mengalami Masalah:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pastikan koneksi internet Anda stabil</li>
              <li>Coba muat ulang halaman website</li>
              <li>Bersihkan cache browser Anda</li>
              <li>Pastikan Anda menggunakan browser yang didukung (Chrome, Firefox, Safari versi terbaru)</li>
            </ul>
            <div className="mt-6">
              <a 
                href="https://wa.link/higxks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-accent text-text font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300 inline-flex items-center"
              >
                <i className="fab fa-whatsapp mr-2"></i>Laporkan Error via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      );
    };
    
    export default ErrorHelp;