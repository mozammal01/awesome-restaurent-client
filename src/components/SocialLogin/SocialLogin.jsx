import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/icon/google.png'
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(result => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
        }
        axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log(res.data);
            navigate('/')
          })
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <>
      <div className="divider"></div>
      <button onClick={handleGoogleLogin} className="btn btn-outline mx-8 mb-4">
        <img src={googleIcon} width={25} alt="" />
        Sign In With Google
      </button>
    </>
  );
};

export default SocialLogin;