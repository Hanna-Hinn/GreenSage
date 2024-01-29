import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../config";

const stripe = loadStripe(
  "pk_test_51ObC0HAxHg3ogfzdo6YqP0rSxPDRDno4gSmW5mrmWMoMkIVGpmXGNfLW4qVxK0LjtMj9UWlTohAnUdjtLseOacbf00E7nbSwK2"
);

function Payment() {
  const [clientSecret, setClientSecret] = useState();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.post(`${BACKEND_URL}/orders/`, {
      country: "USA",
      userId: userInfo.id,
    });
    setClientSecret(data.clientSecret);
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripe} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </>
  );
}

export default Payment;
