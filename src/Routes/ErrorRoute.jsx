import errorImg from '../assets/others/404.gif'
import useAuth from '../hooks/useAuth';

const ErrorRoute = () => {
  const { theme } = useAuth();
  const forest = theme === 'forest';
  return (
    <>
      {
        forest ?
          <div className='flex items-center min-h-screen justify-evenly'>
            <h1 className="text-9xl text-red-600 font-extrabold">404</h1>
              <h2 className="text-5xl font-bold">This page is Under Construction</h2>
          </div> :

          <div className='flex items-center'>
            <div>
              <img src={errorImg} alt="" />
            </div>

            <div>
              <h2 className="text-5xl font-bold text-red-600">This page is Under Construction</h2>
            </div>
          </div>
      }
    </>
  );
};

export default ErrorRoute;