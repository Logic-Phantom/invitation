'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  '/images/photo3.jpg',
  // 더 많은 이미지 추가 가능
];

export default function Gallery() {
  return (
    <section className="py-32 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 tracking-wide">
            우리의 이야기
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            서로를 향한 마음을 키워온 소중한 순간들을 담았습니다
          </p>
          <div className="w-20 h-px bg-gray-300 mx-auto" />
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="w-full max-w-5xl mx-auto"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="w-[300px] md:w-[400px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-xl"
              >
                <img
                  src={image}
                  alt={`Wedding photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
} 