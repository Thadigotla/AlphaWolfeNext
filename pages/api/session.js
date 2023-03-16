import stripe from "stripe";

const session = async  (req, res) => {
  console.log("req body is", req.body);

  const stripeClient = stripe("sk_test_51MhnQJSG1kawF0cmcJ7aHuOic23iOFNbJOFfbZRz9Ac6KOGge98uSe9RERjMUMrZ8U7AOzqv088sqCRZl4uT0EEG000uFyqDOP");

  const cartItems = req.body;
  console.log("req", cartItems, cartItems?.totalPrice, cartItems?.couponDetails?.id);

  const Session = await stripeClient.checkout.sessions.create({
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
    metadata: {
      customer_id: cartItems.user_id,
      payment_id: cartItems.payment_id,
      order_id: cartItems.order_id,
    },
    discounts: [
      {
        coupon: cartItems?.Coupon_Code?.id,
      },
    ],
    success_url: "http://localhost:3000/products",
    cancel_url: "http://localhost:3000/products",
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "IN", "GB"], // List of countries where shipping addresses can be collected
    },
  });

  res.status(200).json({
    id: Session.id,
    input: req.body,
  });
}



export default session;