import { Parallax } from 'react-parallax';


const Cover = ({ backgroundImage, title, description }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={backgroundImage}
      bgImageAlt="the menu"
      strength={-200}
    >
      <div
        className="hero h-[500px]"
        style={{
        }}>
        <div className=""></div>
        <div className="hero-content text-white text-center bg-black bg-opacity-50 w-2/3 h-1/2">
          <div className="max-w-md">
            <h1 className=" text-5xl font-bold uppercase">{title}</h1>
            <p className="mt-5">{description}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;