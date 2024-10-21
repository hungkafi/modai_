import React from 'react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const WorldsComponent = ({ data }) => {

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h6 className="p-4">World Cup</h6>
      <div className='px-4'>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
        >

          {data.World_Cup.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="info-component">
                <p className="title">{item.year} - {item.host} {item.final}</p>
                <div className='flex justify-center'>
                  {item.result.map((list, resultIndex) => (
                    <div className='items' key={resultIndex}>
                      <p>{list.host}</p>
                      <img src={list.img} className='icon' alt="img" />
                      <p>{list.goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h6 className="p-4">Euro</h6>
      <div className='px-4'>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
        >

          {data.Euro.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="info-component">
                <p className="title">{item.year} - {item.host} {item.final}</p>
                <div className='flex justify-center'>
                  {item.result.map((list, resultIndex) => (
                    <div key={resultIndex} className='items'>
                      <p>{list.host}</p>
                      <img src={list.img} className='icon' alt="img" />
                      <p>{list.goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

  )
}

export default WorldsComponent;