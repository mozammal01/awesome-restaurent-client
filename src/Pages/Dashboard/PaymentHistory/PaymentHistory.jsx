import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  const { data: payments = [] } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`)
      return res.data;
    }
  })


  return (
    <div className="mx-10 my-10">
      <div>
        <h4 className="text-4xl font-bold text-center my-10">Total Payments: {payments.length}</h4>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-400 text-black">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {
              payments.map((payment, i) => <tr key={payment._id}>
                <td>{i + 1}</td>
                <td>{payment.email}</td>
                <td><p>{payment.status}</p></td>
                <td>${payment.price}</td>
                <td>{payment.date}</td>
              </tr>)
            }

          </tbody>
        </table>
      </div>


    </div>
  );
};

export default PaymentHistory;