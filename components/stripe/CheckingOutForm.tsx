import React from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForms = () => {
  const stripe: any = useStripe();

  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51MhnQJSG1kawF0cmPOrpNBQTLbvjwZQHNPUGtJ8ZpB0exEJ8rZlpFUua7jMeufsGmqqDt0T8m2daZQkP1petTk2N00LzMYeZq4"
);

export const Formats = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForms />
  </Elements>
);
