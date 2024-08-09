import FoodCard from "../../../components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
// import { useState } from "react";


const OrderTab = ({ items }) => {

  // const [currentPage, setCurrentPage] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(6);

  // const numberOfPages = Math.ceil(items / itemsPerPage)
  // const pages = [...Array(numberOfPages).keys()];
  // console.log(pages);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  console.log('Items: ',items.length);

  // if(items.length > 6){
  //   console.log('Ai jaygay pagination dewa lagbe');
  // }

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className='grid md:grid-cols-3 gap-6'>
            {
              items.map(item => <FoodCard
                key={item._id}
                item={item}
              ></FoodCard>)
            }
          </div>
        </SwiperSlide>
      </Swiper>

    </div>
  );
};

export default OrderTab;