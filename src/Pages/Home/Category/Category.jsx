import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
  return (
    <section>
      <SectionTitle
        subHeading='---From 11:00am to 10:00pm---'
        heading='order online'
      ></SectionTitle>

      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper my-20"
      >
        <SwiperSlide className='min-h-96'>
          <img src={slide1} />
          <h3 className='text-4xl uppercase text-center -my-24 text-white'>Salad</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} />
          <h3 className='text-4xl uppercase text-center -my-24 text-white'>Soups</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} />
          <h3 className='text-4xl uppercase text-center -my-24 text-white'>Pizzas</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} />
          <h3 className='text-4xl uppercase text-center -my-24  text-white'>Deserts</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide1} />
          <h3 className='text-4xl uppercase text-center -my-24  text-white'>Salad</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} />
          <h3 className='text-4xl uppercase text-center -my-24  text-white'>Soups</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} />
          <h3 className='text-4xl uppercase text-center -my-24  text-white'>Pizzas</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} />
          <h3 className='text-4xl uppercase text-center -my-24  text-white'>Deserts</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide1} />
          <h3 className='text-4xl uppercase text-center -my-24  text-white'>Salad</h3>
        </SwiperSlide>
      </Swiper>

      {/* <div className='my-40'>
          <img src={banner} className='max-h-96 min-w-full relative' />
        <div className='w-2/4 border-2 px-20 py-10 mx-auto absolute bg-white top-96 '>
          <h2 className="text-3xl">Bistro Boss</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos deserunt magnam pariatur perferendis, doloremque asperiores necessitatibus earum dolorum corporis quod nisi non reprehenderit aut, nam impedit iure nostrum exercitationem nesciunt?</p>
        </div>
      </div> */}
    </section>
  );
};

export default Category;