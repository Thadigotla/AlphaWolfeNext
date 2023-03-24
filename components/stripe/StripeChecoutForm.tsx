import React from "react";

import { Button } from "antd";
import { loadStripe } from "@stripe/stripe-js";

export interface IStripe {
  userEmail: any;
}

export const StripeChecout: React.FC<IStripe> = ({ userEmail }) => {
  const getStripe = () => {
    let stripePromise = null;
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51MhnQJSG1kawF0cmPOrpNBQTLbvjwZQHNPUGtJ8ZpB0exEJ8rZlpFUua7jMeufsGmqqDt0T8m2daZQkP1petTk2N00LzMYeZq4"
      );
    }

    return stripePromise;
  };

  const item = {
    price: "price_1MhpNVSG1kawF0cm6oGVr5Vb",
    quantity: 1,
  };

  const checkoutOptions: any = {
    lineItems: [item],
    mode: "subscription",
    successUrl: `https://www.google.com/`,
    cancelUrl: `https://www.google.com/`,
    allow_promotion_codes: true,
    shippingAddressCollection: {
      allowedCountries: ["GB", "US", "CA"],
    },

    customerEmail: userEmail,
  };

  const redirectToCheckout = async () => {
    console.log("redirectToCheckout");

    const stripe: any = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  };

  return (
    <Button className="checkout-button" onClick={redirectToCheckout}>
      Checkout
    </Button>
  );
};
