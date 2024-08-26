import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, backgroundImage, title, description }) => {
  return (
    <div className="my-10">
      {title && <Cover
        backgroundImage={backgroundImage}
        title={title}
        description={description}
      ></Cover>}
      <div className='grid grid-cols-2 gap-10 my-20 mx-20'>
        {
          items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
        }
      </div>
      <div className="text-center">
        <Link to={`/order/${title}`}><Button btnText="Order Your Favourite Food"></Button></Link>
      </div>

    </div>
  );
};

export default MenuCategory;