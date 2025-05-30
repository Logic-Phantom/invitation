'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const images = [
  {
    src: '/images/gallery1.png',
    alt: '첫 번째 사진'
  },
  {
    src: '/images/gallery2.png',
    alt: '두 번째 사진'
  },
  {
    src: '/images/gallery3.png',
    alt: '세 번째 사진'
  },
  {
    src: '/images/gallery4.png',
    alt: '네 번째 사진'
  },
  {
    src: '/images/gallery5.png',
    alt: '다섯 번째 사진'
  },
  {
    src: '/images/gallery6.png',
    alt: '여섯 번째 사진'
  }
];

const Gallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className="w-full">
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
        {/* 메인 Swiper */}
        <Swiper
          modules={[EffectFade, Navigation, Thumbs, Autoplay]}
          effect="fade"
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          thumbs={{ swiper: thumbsSwiper }}
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
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 네비게이션 버튼 */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-10 pointer-events-none">
          <button className="swiper-button-prev !w-10 !h-10 !bg-white/40 hover:!bg-white/60 transition-all duration-300 rounded-full flex items-center justify-center group pointer-events-auto shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-900 transform group-hover:scale-110 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="swiper-button-next !w-10 !h-10 !bg-white/40 hover:!bg-white/60 transition-all duration-300 rounded-full flex items-center justify-center group pointer-events-auto shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-900 transform group-hover:scale-110 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
      {/* 썸네일 Swiper를 메인 Swiper 바깥에 분리하여 배치 */}
      <div className="w-full flex justify-center mt-4 overflow-x-auto">
        <div className="max-w-full w-full">
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            slidesPerView="auto"
            spaceBetween={12}
            watchSlidesProgress
            className="!h-24"
          >
            {images.map((image, idx) => (
              <SwiperSlide key={idx} className="!w-24 !h-24 bg-white">
                <div className="w-24 h-24 overflow-hidden border-2 border-transparent transition-all duration-200">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={96}
                    height={96}
                    className="object-cover opacity-50 bg-white"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 