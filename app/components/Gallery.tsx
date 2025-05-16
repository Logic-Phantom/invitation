'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = [
  '/images/gallery/photo1.jpg',
  '/images/gallery/photo2.jpg',
  '/images/gallery/photo3.jpg',
  '/images/gallery/photo4.jpg',
  '/images/gallery/photo5.jpg',
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

        <div className="text-center text-gray-500">
          <p>아직 사진이 준비되지 않았습니다.</p>
          <p className="mt-2 text-sm">추후 실제 웨딩 사진으로 업데이트될 예정입니다.</p>
        </div>
      </motion.div>
    </section>
  );
} 