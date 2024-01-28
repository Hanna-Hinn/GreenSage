import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Checkout from "./Checkout";
const stripePromise = loadStripe(
  "pk_test_51ObC0HAxHg3ogfzdo6YqP0rSxPDRDno4gSmW5mrmWMoMkIVGpmXGNfLW4qVxK0LjtMj9UWlTohAnUdjtLseOacbf00E7nbSwK2"
);

export default function Payment() {
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.post(`${BACKEND_URL}/orders`, {
      country: "USA",
      userId: userInfo.id,
    });
    console.log(typeof data.clientSecret);
    setClientSecret(data.clientSecret);
  };


  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </>
  );
}
