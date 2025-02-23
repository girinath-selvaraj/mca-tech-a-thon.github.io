import React from 'react';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpeg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
import image6 from '../assets/images/image6.jpeg';

const images = [
  { src: image1, title: 'Innovative Solutions', description: 'Exploring cutting-edge technology to solve real-world problems.' },
  { src: image2, title: 'Creative Minds', description: 'Where imagination meets implementation.' },
  { src: image3, title: 'Tech Revolution', description: 'Advancing the future with groundbreaking innovations.' },
  { src: image4, title: 'Future Ready', description: 'Empowering the next generation of tech leaders.' },
  { src: image5, title: 'Breaking Boundaries', description: 'Redefining the limits of what technology can achieve.' },
  { src: image6, title: 'Next-Gen Technology', description: 'Pioneering the innovations of tomorrow.' }
];

const ImageGallery: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {images.map((image, index) => (
        <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg w-80 h-80">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-95"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-lg font-semibold opacity-0 transition-all duration-500 transform group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
            <h3 className="text-xl font-bold mb-2">{image.title}</h3>
            <p className="text-sm px-4 text-center">{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
