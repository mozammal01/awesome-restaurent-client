import Button from "../Button/Button";

const FoodCard = ({ item }) => {

  const { name, recipe, image, price } = item;

  return (
    <div className="card bg-base-100 w-96 shadow-xl text-center">
      <figure>
        <img
          src={image}
          alt="Shoes" />
      </figure>
      <p className="bg-black p-2 text-white absolute right-5 top-5 rounded-xl">${price}</p>
      <div className="card-body">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p>{recipe}</p>
        <div className="">
          <Button className='border-orange-500 bg-slate-100 text-orange-500 hover:text-orange-500 hover:border-orange-500' btnText='Add to Cart'></Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;