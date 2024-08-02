import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, backgroundImage, title, description }) => {
  return (
    <div>
      {title && <Cover
          backgroundImage={backgroundImage}
          title={title}
          description={description}
        ></Cover>}
      <div className='grid grid-cols-2 gap-10 my-20'>
        {
          items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
        }
      </div>

    </div>
  );
};

export default MenuCategory;