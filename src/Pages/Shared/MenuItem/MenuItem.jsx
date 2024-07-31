const MenuItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="flex space-x-5">
      <img width={100} style={{borderRadius: '0 200px 200px 200px'}} className="" src={image} alt="" />
      <div>
        <h2 className="text-2xl uppercase">{name}---------------</h2>
        <p>{recipe}</p>
      </div>
      <p className="text-warning">${price}</p>
    </div>
  );
};

export default MenuItem;