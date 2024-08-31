import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
  const [menu] = useMenu()

  const popular = menu.filter(item => item.category === 'popular');

  return (
    <section>
      <SectionTitle
        subHeading="---Check it out---"
        heading="From Our Menu"
      ></SectionTitle>

      <div className='md:grid grid-cols-2 gap-10 md:my-20 mx-4'>
        {
          popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
        }
      </div>

      <div className='text-center'>
        <button className="btn btn-outline border-0 border-b-2 md:mb-10">View Full Menu</button>
      </div>

    </section>
  );
};

export default PopularMenu;