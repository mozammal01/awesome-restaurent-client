import { useState } from 'react';
import coverImg from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  const categories = ['dessert', 'pizza', 'salad', 'soup', 'drinks'];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  const dessert = menu.filter(item => item.category === 'dessert');
  const pizza = menu.filter(item => item.category === 'pizza');
  const salad = menu.filter(item => item.category === 'salad');
  const soup = menu.filter(item => item.category === 'soup');
  const drinks = menu.filter(item => item.category === 'drinks');

  return (
    <div>
      <Helmet>
        <title>Restaurent | Order Food </title>
      </Helmet>

      <Cover
        backgroundImage={coverImg}
        title="Order Food"
        description='Nothing Much'
      ></Cover>

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className='text-center my-10'>
          <Tab>Dessert</Tab>
          <Tab>Pizza</Tab>
          <Tab>Salad</Tab>
          <Tab>Soup</Tab>
          <Tab>Drinks</Tab>
        </TabList>



        {/* Dessert */}
        <TabPanel>
          <OrderTab items={dessert}></OrderTab>
        </TabPanel>

        {/* Pizza */}
        <TabPanel>
          <OrderTab items={pizza}></OrderTab>
        </TabPanel>

        {/* Salad */}
        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>

        {/* Soup */}
        <TabPanel>
          <OrderTab items={soup}></OrderTab>
        </TabPanel>

        {/* Drinks */}
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>



      </Tabs>

    </div>
  );
};

export default Order;