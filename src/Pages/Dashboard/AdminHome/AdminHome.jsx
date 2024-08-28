import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ChefHatIcon, Truck, Users, Wallet } from 'lucide-react';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';


const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];



const AdminHome = () => {


  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Admin stat 
  const { data: stats = {} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('admin-stats')
      return res.data
    }
  })

  const { users, menu, orders, revenue } = stats;


  // Order Stat
  const { data: chartData = [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('order-stats')
      return res.data
    }
  })
  console.log(chartData);


  // 
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };


  // Custom shape for the pie chart

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map(data => {
    return {
      name: data.category,
      value: data.revenue
    }
  })


  return (
    <div className='m-10'>

      <h3 className="text-4xl">
        <span>Hi, Welcome </span>{user ? user?.displayName + ' ' : 'Back'}<span>Sir</span>
      </h3>

      <div className="flex gap-5 my-10">

        {/* 1 */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-300 text-white flex p-5 pr-14 items-center gap-2 border-2 rounded-xl w-[220px]">
          <div>
            <Wallet size={40}></Wallet>
          </div>
          <div>
            <div className="stat-value">${revenue}</div>
            <div className="font-bold">Revenue</div>
          </div>
        </div>

        {/* 2 */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-200 text-white flex p-5 pr-14 items-center gap-2 border-2 rounded-xl w-[220px]">
          <div>
            <Users size={40}></Users>
          </div>
          <div>
            <div className="stat-value">{users}</div>
            <div className="font-bold">Users</div>
          </div>
        </div>

        {/* 3 */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-200 text-white flex p-5 pr-14 items-center gap-2 border-2 rounded-xl w-[220px]">
          <div>
            <ChefHatIcon size={40} />
          </div>
          <div>
            <div className="stat-value">{menu}</div>
            <div className="font-bold">Menu</div>
          </div>
        </div>

        {/* 4 */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-100 text-white flex p-5 pr-14 items-center gap-2 border-2 rounded-xl w-[220px]">
          <div className='text-3xl'>
            <Truck size={40}></Truck>
          </div>
          <div>
            <div className="stat-value">{orders}</div>
            <div className="font-bold">Orders</div>
          </div>
        </div>

      </div>


      <div className='flex'>
        <div className="w-1/2">

          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>

        </div>

        <div className="w-1/2">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>


      </div>

    </div>
  );
};

export default AdminHome;