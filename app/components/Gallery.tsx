'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  {
    src: '/images/gallery1.jpg',
    alt: '첫 번째 사진',
    description: '우리의 첫 만남'
  },
  {
    src: '/images/gallery2.jpg',
    alt: '두 번째 사진',
    description: '함께한 시간들'
  },
  {
    src: '/images/gallery3.jpg',
    alt: '세 번째 사진',
    description: '소중한 순간들'
  },
  {
    src: '/images/gallery4.jpg',
    alt: '네 번째 사진',
    description: '영원한 사랑'
  }
];

const Gallery = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <section className="relative w-[90vw] max-w-7xl h-[70vh] rounded-lg shadow-xl overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
        <div className="absolute inset-0">
          <Swiper
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            effect="fade"
            speed={1000}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            className="h-full w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-1000"
                    sizes="90vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 p-10 text-white"
                  >
                    <h3 className="text-3xl md:text-4xl font-light mb-4">{image.description}</h3>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 양쪽 네비게이션 버튼 */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-8 z-10 pointer-events-none">
            <button className="swiper-button-prev !w-10 !h-10 !bg-white/20 hover:!bg-white/30 transition-all duration-300 rounded-full flex items-center justify-center group pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button className="swiper-button-next !w-10 !h-10 !bg-white/20 hover:!bg-white/30 transition-all duration-300 rounded-full flex items-center justify-center group pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* 커스텀 페이지네이션 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="swiper-pagination !bottom-0" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery; 