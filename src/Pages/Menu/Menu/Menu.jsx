import { Helmet } from 'react-helmet-async';
import menuImg from '../../../assets/menu/banner3.jpg'
import desserImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import Cover from '../../Shared/Cover/Cover';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {

  const [menu] = useMenu();
  const offered = menu.filter(item => item.category === 'offered');
  const dessert = menu.filter(item => item.category === 'dessert');
  const pizza = menu.filter(item => item.category === 'pizza');
  const salad = menu.filter(item => item.category === 'salad');
  const soup = menu.filter(item => item.category === 'soup');

  if (dessert.length > 4) {

    const dessertShow = dessert.slice(0,4);
    console.log()
    console.log('Congrats');
  }

  console.log('offered: ', offered.length);
  console.log('Dessert: ', dessert.length);
  console.log('Pizza: ', pizza.length);
  console.log('salad: ', salad.length);
  console.log('soup: ', soup.length);

  return (
    <div>
      <Helmet>
        <title>Restaurent | Menu </title>
      </Helmet>


      {/* Menu Banner */}
      <div>
        <Cover
          backgroundImage={menuImg}
          title='Our menu'
          description='Would you like to try a dish?'
        ></Cover>

        <SectionTitle
          subHeading="---Don't Miss---"
          heading="Today's Offer"
        ></SectionTitle>
        <MenuCategory items={offered}></MenuCategory>
      </div>


      {/* Dessert Banner */}
      <div>
        <MenuCategory
          items={dessert}
          backgroundImage={desserImg}
          title="dessert"
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad enim nulla, fugiat, necessitatibus unde, suscipit similique saepe ullam veritatis doloribus voluptatem. Sapiente nesciunt rerum sint rem, veritatis dolores nulla ipsa!'
        ></MenuCategory>
      </div>

      {/* pizza Banner */}
      <div>
        <MenuCategory
          items={pizza}
          backgroundImage={pizzaImg}
          title="pizza"
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad enim nulla, fugiat, necessitatibus unde, suscipit similique saepe ullam veritatis doloribus voluptatem. Sapiente nesciunt rerum sint rem, veritatis dolores nulla ipsa!'
        ></MenuCategory>
      </div>

      {/* salad Banner */}
      <div>
        <MenuCategory
          items={salad}
          backgroundImage={saladImg}
          title="salad"
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad enim nulla, fugiat, necessitatibus unde, suscipit similique saepe ullam veritatis doloribus voluptatem. Sapiente nesciunt rerum sint rem, veritatis dolores nulla ipsa!'
        ></MenuCategory>
      </div>

      {/* soup Banner */}
      <div>
        <MenuCategory
          items={soup}
          backgroundImage={soupImg}
          title="soup"
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad enim nulla, fugiat, necessitatibus unde, suscipit similique saepe ullam veritatis doloribus voluptatem. Sapiente nesciunt rerum sint rem, veritatis dolores nulla ipsa!'
        ></MenuCategory>
      </div>


    </div>
  );
};

export default Menu;