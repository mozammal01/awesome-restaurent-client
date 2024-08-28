import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('https://awesome-restaurent-server.vercel.app/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
      })
  }, [])

  return (
    <div className="my-20">
      <SectionTitle subHeading="---What Our Clients Say---" heading="TESTIMONIALS"></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper text-center">


        {
          reviews.map(review => <SwiperSlide
            key={review._id}
          >
            <div className="w-3/4 mx-auto space-y-3">
              <Rating
                className="mx-auto "
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p>{review.details}</p>
              <h3 className="text-4xl text-warning">{review.name}</h3>
            </div>
          </SwiperSlide>)
        }

      </Swiper>

    </div>
  );
};

export default Testimonials;