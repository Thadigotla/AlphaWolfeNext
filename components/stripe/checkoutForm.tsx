// import { loadStripe } from "@stripe/stripe-js";
// import React from "react";
// import AWS from "aws-sdk";
// import { Button } from "antd";
// import { nhost } from "pages/_app";

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   "pk_test_51MhnQJSG1kawF0cmPOrpNBQTLbvjwZQHNPUGtJ8ZpB0exEJ8rZlpFUua7jMeufsGmqqDt0T8m2daZQkP1petTk2N00LzMYeZq4"
// );

// AWS.config.update({
//   accessKeyId: "AKIAWVMMF2JN3SJ4TSWP",
//   secretAccessKey: "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",
//   region: "us-easet-1",
// });

// const lambda = new AWS.Lambda({ region: "ap-south-1" });

// const user = nhost.auth.getUser();

// interface StripeCheckoutInterface {
//   cartItems: any;
//   couponDetails: any;
//   totalPrice: any;
// }

// export const StripeCheckoutComponent: React.FC<StripeCheckoutInterface> = ({
//   couponDetails,
//   cartItems,
//   totalPrice,
// }) => {
//   console.log("props are", cartItems, couponDetails, totalPrice);

//   const handleClick = async () => {
//     // Get Stripe.js instance
//     const stripe = await stripePromise;

//     // Call your backend to create the Checkout Session
//     const response = await fetch(
//       // "http://localhost:4000/create-checkout-session",
//       "https://ftql6xrbueq5gpygsqnsa6trw40rckpa.lambda-url.us-east-1.on.aws/",
//       {
//         method: "POST",
//         body: JSON.stringify({ couponDetails, totalPrice, user_id: user?.id }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("sseissiond  details", response);

//     const session = await response.json();

//     // When the customer clicks on the button, redirect them to Checkout.
//     const result = await stripe?.redirectToCheckout({
//       sessionId: session.id,
//     });

//     console.log("result is", result);

//     if (result?.error) {
//       // If `redirectToCheckout` fails due to a browser or network
//       // error, display the localized error message to your customer
//       // using `result.error.message`.
//     }
//   };

//   return (
//     <div style={{ margin: "5%" }}>
//       <Button type="primary" onClick={handleClick}>
//         Pay
//       </Button>
//     </div>
//   );
// };

// export default StripeCheckoutComponent;


import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";
import { nhost } from "../../pages/_app";

const stripePromise = loadStripe(
  "pk_test_51MhnQJSG1kawF0cmPOrpNBQTLbvjwZQHNPUGtJ8ZpB0exEJ8rZlpFUua7jMeufsGmqqDt0T8m2daZQkP1petTk2N00LzMYeZq4"
);


const StripeCheckoutComponent = () => {
  
const user = nhost.auth.getUser();

  const handleClick = async () => {
    const stripe = await stripePromise;
    const response = await fetch(
      "https://ftql6xrbueq5gpygsqnsa6trw40rckpa.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        // body: JSON.stringify({ couponDetails, totalPrice, user_id: user?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const session = await response.json();
    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
    if (result?.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div style={{ margin: "5%" }}>
      <Button type="primary" onClick={handleClick}>
        Pay
      </Button>
    </div>
  );
};

// export async function getServerSideProps() {
//   const AWS = await import("aws-sdk");
//   AWS.config.update({
//     accessKeyId: "YOUR_ACCESS_KEY",
//     secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
//     region: "us-easet-1",
//   });
//   const lambda = new AWS.Lambda({ region: "ap-south-1" });
//   return { props: {} };
// }

export default StripeCheckoutComponent;
