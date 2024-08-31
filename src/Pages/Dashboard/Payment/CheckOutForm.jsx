import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState()
  const [transactionId, setTransactionId] = useState()

  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements()
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret)
        })
    }
  }, [axiosSecure, totalPrice])

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })


    if (error) {
      console.log('Payment Error', error);
      setError(error.message)
      setTransactionId(null)
    }
    else {
      console.log('Payment Method', paymentMethod);
      setError('')
    }


    const payment = {
      email: user?.email,
      price: totalPrice,
      transactionId,
      date: new Date(), // utc date convert. use moment js to
      cartIds: cart.map(item => item._id),
      menuItemIds: cart.map(item => item.menuId),
      status: 'Pending'
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'anonymous',
          email: user?.email || 'anonymous'
        }
      }
    })

    if (confirmError) {
      console.log('Your error Confirmed', confirmError);
      setTransactionId(null)
      setError(confirmError.message)
    }
    else {
      console.log('Payment Intent', paymentIntent)
      setError('')
      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id)
        console.log('Transaction ID: ', transactionId);
        const res = await axiosPublic.post('/payments', payment)
    console.log('Response from payments', res.data);
    if (res.data.result.insertedId) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Payment request has been successfull",
        showConfirmButton: false,
        timer: 1500
      });
    }
        navigate('/dashboard/paymentHistory')
      }
    }


    // Now save the payment in the database
    

    



  }


  return (
    <div className="mx-10">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424778',
                '::placeholder': {
                  color: '#aab7c4'
                },
              },
              invalid: {
                color: '#9e2146'
              }
            }
          }}
        />

        <button type="submit" className="btn bg-orange-400 px-8 font-bold my-4"
          disabled={!stripe || !clientSecret}>
          pay
        </button>
        {error && <p className="text-red-600 font-bold">{error}</p>}
        {transactionId && <p className="text-green-600 font-bold">Payment Successfull. And your transactionId : {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckOutForm;