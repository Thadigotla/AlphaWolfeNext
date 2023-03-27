import { Button, Col, Drawer, Image, Input, Row, Space } from "antd"
import React, { useContext, useState } from "react"
import CartItemsContext from "../../store/Item"
import { gql, useMutation } from "@apollo/client"
import { useRouter } from 'next/router'
import { nhost } from "../../pages/_app"
import { loadStripe } from "@stripe/stripe-js";
import { CheckOutlined, CloseOutlined, LoadingOutlined } from "@ant-design/icons"


const DrawerComp = ( ) =>{

    const {cartItems,setCartItems,open,totalCount,totalPrice ,showDrawer,onClose:onclose} = useContext(CartItemsContext)
  
    const insert_mutation_order_details = gql `mutation MyMutation1($object: [order_details_insert_input!]!) {
        insert_order_details(  objects: $object) {
           affected_rows
        }
      }
      
      `
      
      
      const insert_mutation_order = gql `mutation MyMutation2($object:orders_insert_input!) {
        insert_orders_one(object:$object) {
            id
           }
         }
      `
      const insert_mutation = gql `mutation MyMutation3($object:payments_insert_input!) {
        insert_payments_one(object:$object) {
            id
           }
         }
      `
    const  [createOrderDetails]  = useMutation(insert_mutation_order_details);
    const  [createOrder]  = useMutation(insert_mutation_order);
    const [createPayment]  = useMutation(insert_mutation);

    const [Coupon, setCoupon] = useState("");
    const [Coupon_Code, setCoupon_Code] = useState({});
    const [promo, setPromo] = useState<boolean>(false);

    const [promoValid, setPromoValid] = useState<boolean>(false);
    const removeItem = (item) => {
      const newCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(newCartItems);
    };
    const [stripePromoValid, setStripePromoValid] = useState<boolean>(false);
    const user = nhost.auth.getUser();
    const stripePromise = loadStripe(
      "pk_test_51MhnQJSG1kawF0cmPOrpNBQTLbvjwZQHNPUGtJ8ZpB0exEJ8rZlpFUua7jMeufsGmqqDt0T8m2daZQkP1petTk2N00LzMYeZq4"
    );

    const onFinish = async () => {
      
        if (cartItems?.length > 0) {
     
         const createdOrder = await createOrder({variables:{object:{ user_id: user?.id,status: "placed", total_amount: totalPrice()}}})
           
    
         const formattedCartItems = await cartItems.map((item) => {
            return {
              customer_id: user?.id,
              status: "placed",
              test_type: item.name,
              product_id: item.id,
              quantity: `${item.quantity}`,
              order_id: createdOrder?.data?.insert_orders_one?.id || null,
              // card_id: createdCard.data.id,
            };
          });
     
         const createdOrderDetails = await createOrderDetails({variables:{object:[...formattedCartItems]}})
         console.log("createdOrderDetails", createdOrderDetails)
         
     
          const createdPayment =await createPayment({variables:{ object:{user_id: user?.id, status: "pending",total_amount: totalPrice}}})
          console.log("createdPayment", createdPayment)
     
          const stripe = await stripePromise;
    
          // Call your backend to create the Checkout Session
          const response = await fetch(
            "/api/session",
            // "https://ftql6xrbueq5gpygsqnsa6trw40rckpa.lambda-url.us-east-1.on.aws/",
            {
              method: "POST",
              body: JSON.stringify({
                Coupon_Code,
                totalPrice:totalPrice(),
                user_id: user?.id,
                payment_id: createdPayment?.data?.insert_payments_one?.id,
                order_id: createdOrder?.data?.insert_orders_one?.id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          const parsedResponse = await response?.json();
    
          console.log("response ", response, parsedResponse);
    
          const result = await stripe?.redirectToCheckout({
            sessionId: parsedResponse?.id,
          });
    
          console.log("result is", result);
        } else {
          // warning();
        }
    
        // setIsModalOpen(false);
      };


    const checkPromo = async () => {
 
        setPromo(true);
        const response = await fetch(
          "/api/checkpromo",
          // "http://localhost:3000/api/checkpromo",
          // "https://7yq72fujgvbpoc7222wdztdhrq0qgrlz.lambda-url.us-east-1.on.aws/",
          {
            method: "POST",
            body: JSON.stringify({
              coupon_name: Coupon,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        const result = await response?.json();
    
        console.log("response is", result);
    
        if (result?.valid && result?.id) {
          setCoupon_Code(result);
          setPromoValid(true);
        }else{
          setStripePromoValid(true)
        }
      };

    return       <Drawer title="Cart" placement="right" onClose={onclose} open={open}>
    <Space direction="vertical">
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.map((item) => (
        <div key={item.id}>
          <Row className="cart-item">

            <Col span={4} className="cart-item-image">
              <Image src={item.image_url} height={40} alt="image" />
            </Col>
            <Col span={14} className="cart-item-name">
              {item.name}
            </Col>
            <Col span={6} className="cart-item-cost">
              <b>&#163;{item.cost}</b>
            </Col>
            <Col span={12}>
              <Button onClick={() => removeItem(item)}>Remove</Button>
            </Col>
            <Col span={6}>
              {item.quantity} {" x "} {item.cost}
              {" = "}
            </Col>
            <Col span={6} className="cart-item-quantity">
              <b>&#163; {(item.cost * item.quantity).toFixed(2)}</b>
            </Col>
          </Row>
          <hr />
        </div>
      ))}
      {cartItems.length > 0 && (
        <div>
          <p>
            Total price: <strong>&#163;{totalPrice()?.toFixed(2)}</strong>
          </p>
        </div>
      )}

      <Space>
        <Button
          type="primary"
          style={{ background: "rgb(196, 178, 160)" }}
          onClick={checkPromo}
        >
          Apply Promo
        </Button>
        <span>
          <Input onChange={(e) => {
            setCoupon_Code({})
            setCoupon("")
            setPromo(false)
            setPromoValid(false)
            setStripePromoValid(false)
            setCoupon(e?.target?.value)}} />
        </span>
        <span>
          {promoValid && promo &&!stripePromoValid&& <CheckOutlined />}
          {!promoValid && promo && !stripePromoValid && <LoadingOutlined />}
          {stripePromoValid && promo && <CloseOutlined />}
        </span>
      </Space>
    </Space>

    <br />
    <br />

    <div>
      <Button
        className="m-1"
        onClick={() => setCartItems([])}
        type="dashed"
        block
      >
        Clear cart
      </Button>
      <br />

      <Button
        type="primary"
        className="m-1"
        style={{ width: "100%", background: "#d7af87" }}
        onClick={onFinish}
        block
      >
        Check Out
      </Button>
    </div>

    <Space></Space>
  </Drawer>
}



export default DrawerComp;