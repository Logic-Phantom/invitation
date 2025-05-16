'use client';

import { motion } from 'framer-motion';
import Script from 'next/script';

export default function Location() {
  return (
    <section className="py-32 bg-[#f9f9f9]">
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAP_API_KEY&libraries=services"
        strategy="beforeInteractive"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 tracking-wide">
            오시는 길
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            보테가마지오 2층 어반홀
          </p>
          <div className="w-20 h-px bg-gray-300 mx-auto" />
        </div>
        
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[400px] rounded-xl overflow-hidden shadow-lg"
          >
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg space-y-4"
            >
              <h3 className="text-xl font-medium text-gray-800">주소</h3>
              <p className="text-gray-600 leading-relaxed">
                서울특별시 중구 을지로 123<br />
                보테가마지오 2층 어반홀
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg space-y-4"
            >
              <h3 className="text-xl font-medium text-gray-800">지하철</h3>
              <ul className="text-gray-600 space-y-2">
                <li>2호선 을지로입구역 3번 출구</li>
                <li className="text-sm text-gray-500">도보 5분 거리</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-lg space-y-4"
            >
              <h3 className="text-xl font-medium text-gray-800">버스</h3>
              <div className="space-y-2">
                <p className="text-gray-600">간선버스</p>
                <p className="text-sm text-gray-500">100, 200, 300</p>
                <p className="text-gray-600 mt-4">지선버스</p>
                <p className="text-sm text-gray-500">1000, 2000</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 