import stripe from "stripe";

const session = async  (req, res) => {
  console.log("req body is", req.body);

  const stripeClient = stripe("sk_test_51MhnQJSG1kawF0cmcJ7aHuOic23iOFNbJOFfbZRz9Ac6KOGge98uSe9RERjMUMrZ8U7AOzqv088sqCRZl4uT0EEG000uFyqDOP");

  const cartItems = req.body;
  console.log("req", cartItems, cartItems?.totalPrice, cartItems?.couponDetails?.id);


  let options = {
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Amount",
          },
          unit_amount: cartItems.totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    client_reference_id:cartItems.order_id,
    metadata: {
      customer_id: cartItems.user_id,
      payment_id: cartItems.payment_id,
      order_id: cartItems.order_id,
    },
    success_url: "https://alpha-wolfe-next-git-master-thadigotla.vercel.app/orders",
    cancel_url: "https://alpha-wolfe-next-git-master-thadigotla.vercel.app/products",
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "IN", "GB"], // List of countries where shipping addresses can be collected
    },
  }


  if(cartItems?.Coupon_Code?.id){
    options ={
      ...options,
      discounts: [
        {
          coupon: cartItems?.Coupon_Code?.id,
        },
      ],
      }
  }
  const Session = await stripeClient.checkout.sessions.create({
    // payment_method_types: ["card"],
    // line_items: [
    //   {
    //     price_data: {
    //       currency: "inr",
    //       product_data: {
    //         name: "Amount",
    //       },
    //       unit_amount: cartItems.totalPrice * 100,
    //     },
    //     quantity: 1,
    //   },
    // ],
    // mode: "payment",
    // metadata: {
    //   customer_id: cartItems.user_id,
    //   payment_id: cartItems.payment_id,
    //   order_id: cartItems.order_id,
    // },
    // discounts: [
    //   {
    //     coupon: cartItems?.Coupon_Code?.id,
    //   },
    // ],
    // success_url: "https://alpha-wolfe-next-ovcdatqcz-thadigotla.vercel.app/payments",
    // cancel_url: "https://alpha-wolfe-next-ovcdatqcz-thadigotla.vercel.app/products",
    // shipping_address_collection: {
    //   allowed_countries: ["US", "CA", "IN", "GB"], // List of countries where shipping addresses can be collected
    // },
    ...options
  });

  res.status(200).json({
    id: Session.id,
    input: req.body,
  });
}



export default session;