import React from 'react';
import { GROOM_NAME, BRIDE_NAME, GROOM_FATHER_NAME, GROOM_MOTHER_NAME, BRIDE_FATHER_NAME, BRIDE_MOTHER_NAME } from '../config';

const Invitation = () => {
  return (
    <section className="py-20 px-4 text-center bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-light mb-12">초대합니다</h2>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p className="text-lg">
            서로 마주 보며 다져온 사랑을<br />
            이제 함께 한곳을 바라보며 걸어갈 수 있는<br />
            큰 사랑으로 키우고자 합니다.
          </p>
          <p className="text-lg">
            저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게<br />
            앞날을 축복해 주시면 감사하겠습니다.
          </p>
          <div className="mt-16 space-y-4">
            <p className="text-lg">{GROOM_NAME} · {BRIDE_NAME}</p>
            <p className="text-gray-600">
              {GROOM_FATHER_NAME} · {GROOM_MOTHER_NAME}의 장남 {GROOM_NAME}<br />
              {BRIDE_FATHER_NAME} · {BRIDE_MOTHER_NAME}의 장녀 {BRIDE_NAME}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invitation; 