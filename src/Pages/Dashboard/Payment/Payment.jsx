import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK  )

const Payment = () => {
  return (
    <div>
      <div className="-my-10">
        <SectionTitle heading="Payment" subHeading="Please Pay First"></SectionTitle>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;