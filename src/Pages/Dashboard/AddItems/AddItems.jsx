import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Utensils } from "lucide-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
// const image_hosting_api = "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY"
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    // image upload to imgbb and then get the url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data"
      }
    })
    if (res.data.success) {
      // Now send the menu item data to the server with image file
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url
      }
      const menuRes = await axiosSecure.post('/menu', menuItem)
      if (menuRes.data.insertedId) {
        // Show success popUp
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} added Successfull`,
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log(menuRes.data);
    }

  }



  return (
    <div className="px-10 pb-10">
      <div className="-my-10">
      <SectionTitle heading='add an item' subHeading="What's new ? "></SectionTitle>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">


          {/* Recipe name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Recipe name*</span>
            </label>
            <input {...register("name", { required: true })}
              type="text"
              placeholder="Recipe name"
              className="input input-bordered w-full" />
          </div>


          <div className="flex gap-5">

            {/* Category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Category*</span>
              </label>
              <select defaultValue='default' {...register("category", { required: true })} className="select select-bordered w-full">
                <option disabled value="default">Select a category</option>
                <option value="salad">Salad</option>
                <option value="dessert">Dessert</option>
                <option value="soup">Soup</option>
                <option value="drinks">Drinks</option>
                <option value="pizza">Pizza</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Price*</span>
              </label>
              <input {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full" />
            </div>
          </div>

          {/* Details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Recipe Details</span>
            </label>
            <textarea {...register("recipe")} className="textarea textarea-bordered min-h-40" placeholder="Recipe Details"></textarea>
          </div>

          <div className="form-control w-full">
            <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
          </div>

          {/* Submit */}
          <button className="btn btn-warning">Add Item <Utensils /></button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;