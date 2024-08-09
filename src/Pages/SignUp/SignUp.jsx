import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const SignUp = () => {

  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  const { createUser, updateUserProfile } = useAuth();

  const navigate = useNavigate();


  const onSubmit = (data) => {
    console.log(data)
    const name = data.name;
    const photoUrl = data.photoUrl;
    const email = data.email;
    const password = data.password;

    // 
    createUser(email, password)
      .then(res => {
        updateUserProfile(name, photoUrl)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Created User Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/')
            reset();
          })
          .catch(err => {
            console.error(err);
          })
        console.log(res.user);
      })
      .catch(err => {
        console.error(err);

      })



  }


  return (
    <>
      <Helmet>
        <title>Restaurent | Sign Up </title>
      </Helmet>


      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-5xl">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                {errors.name && <span className="text-center text-red-600">This field is required</span>}

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input type="text" {...register("photoUrl", { required: true })} placeholder="Photo Url" className="input input-bordered" />
                {errors.photoUrl && <span className="text-center text-red-600">This field is required</span>}

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />

                {errors.email && <span className="text-center text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{6,}$/
                },)} name="password" placeholder="password" className="input input-bordered" />
                {errors?.password?.type === 'required' && <span className="text-center text-red-600">This field is required</span>}
                {errors?.password?.type === 'minLength' && <span className="text-center text-red-600">PassWord must be 6 character</span>}
                {errors?.password?.type === 'pattern' &&
                  <span className="text-center text-red-600">Password must have one uppercase, one lowercase, one Number, one special character, and 6-20 character </span>}

              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            <p className='text-center mb-4'><small>Already Have an Account ?<Link to='/login' className='font-bold'>Login</Link></small></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;