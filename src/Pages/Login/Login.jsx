import { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";


  const { signIn } = useAuth();

  // const [disabled, setDisabled] = useState(true);

  // 
  const handleShowPass = () => {
    const pass = document.getElementById('pass')
    console.log(pass.value);

    if (pass.type === 'password') {
      pass.type = 'text'
    }
    else {
      pass.type = 'password'
    }

  }

  const handleLogin = e => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);


    // 
    signIn(email, password)
      .then(res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfull",
          showConfirmButton: false,
          timer: 1500
        });
        // 
        navigate(from, { replace: true })
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })

  }
  // const handleValidate = (e) => {
  //   const captcha = e.target.value;
  //   console.log(captcha);

  //   if (validateCaptcha(captcha)) {
  //     // setDisabled(false)
  //   }
  //   else {
  //     alert('Your captcha is wrong')
  //   }

  // }

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])

  return (
    <>
      <Helmet>
        <title>Restaurent | Login  </title>
      </Helmet>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row max-w-5xl">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card w-full max-w-sm shrink-0 ">
            <form onSubmit={handleLogin} className="card-body bg-base-100 rounded-xl">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required id='pass' />
                <label className="label flex justify-normal">
                  <input onClick={handleShowPass} type="checkbox" /> <span className='ms-2'>Show Pass</span>
                </label>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                {/* <input onBlur={handleValidate} id='captcha' type="text" name="captcha" placeholder="Type the text above" className="input input-bordered" required /> */}
              </div>
              <div className="form-control mt-6">
                <button disabled={false} className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className='text-center my-4'><small>New Here ? <Link to='/signUp' className='font-bold'>Create an Account</Link></small></p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;