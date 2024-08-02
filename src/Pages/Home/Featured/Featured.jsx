import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './featured.css'

const Featured = () => {
  return (
    <section className="featured-item text-white my-20 bg-fixed  bg-opacity-40">
      <div className=" bg-black bg-opacity-40 pt-5">

        <SectionTitle subHeading="---Check it out---" heading="Featured Item"></SectionTitle>
        <div className="md:flex justify-center items-center px-48 pb-20">
          <div className="md:me-10">
            <img src={featuredImg} alt="" />
          </div>
          <div className="space-y-3">
            <p className="font-semibold">March 20, 2023</p>
            <p className="uppercase font-semibold">Where can i get some ?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aperiam quia eum animi, tempore, dicta quasi debitis fuga est ab possimus, aut doloremque suscipit nobis? Repellat eveniet aspernatur nulla rem.</p>
            <button className="btn btn-outline border-0 border-b-2 text-white">Order Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;