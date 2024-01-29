import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const stripe = loadStripe(
      "pk_test_51ObC0HAxHg3ogfzdo6YqP0rSxPDRDno4gSmW5mrmWMoMkIVGpmXGNfLW4qVxK0LjtMj9UWlTohAnUdjtLseOacbf00E7nbSwK2"
    );
    setStripePromise(stripe);

    const { data } = await axios.post(`${BACKEND_URL}/orders/`, {
      country: "USA",
      userId: userInfo.id,
    });
    console.log(data.clientSecret);
    setClientSecret(data.clientSecret);
  };

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
