// import { useCreate, useCreateMany, useList } from "@pankod/refine-core";
import {
  Button,
  Col,
  Form,
  Image,
  InputNumber,
  Modal,
  Row,
  Input,
  Space,
  Alert,
  Drawer,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { Cart } from "../Cart/Cart";
import { Navbar } from "../../components/Navbar/index";
import {
  PlusOutlined,
  DeleteOutlined,
  LoadingOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import { Product } from "./Product";
import { StripeChecout } from "../../components/stripe/StripeChecoutForm";
import { Formats } from "../../components/stripe/CheckingOutForm";
// import { useTable } from "@pankod/refine-core";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutComponent from "../../components/stripe/checkoutForm";
import { Footer } from "../../components/Footer";
import { nhost } from "../../pages/_app";
import { useQuery, gql, useMutation } from '@apollo/client';

export interface IProducts {
  //   username: string;
  //   password: string;
}

export interface Item {
  id?: string;
  name?: string;
  description?: string;
  cost?: any;
  image_id?: string;
  image_url: string;
  currency?: string;
  quantity?: any;
}

 const Products: React.FC = (props: any) => {
  const [form] = Form.useForm();

  const user = nhost.auth.getUser();

  const onFinishFailed = (errorInfo: any) => {};

  // Table
  // const products = useTable<any>({
  //   resource: "products",
  //   metaData: {
  //     fields: [
  //       "id",
  //       "name",
  //       "description",
  //       "cost",
  //       "currency",
  //       "image_url",
  //       { image: ["id", "etag"] },
  //     ],
  //   },
  //   initialSorter: [
  //     {
  //       field: "created_at",
  //       order: "asc",
  //     },
  //   ],
  // });
  const query = gql` query GetProducts {
    products {
      uid
      cost
      currency
      description
      image_url
      name
      created_at
      updated_at
      id
      image_id
    }
  }`;


  // const products = useQuery(query)
  

  const { data:products, loading, error } = useQuery(query);

  console.log("Data is is",products)

  console.log(products?.tableQueryResult?.data?.data, "XXXXXXX");

  const productsList = products?.products;

  useEffect(() => {
    let items: any = localStorage.getItem("cartItems");

    let localStorageItems: any = JSON.parse(items);
    if (localStorageItems?.length > 0) {
      setCartItems(localStorageItems);
    }
  }, []);

  const [cartItems, setCartItems] = useState<Item[]>([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const [promo, setPromo] = useState<boolean>(false);

  const [promoValid, setPromoValid] = useState<boolean>(false);

  const addItem = (item: Item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (item: Item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(newCartItems);
  };

  const removeOneItem = (item: any) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      setCartItems([...cartItems]);
    } else {
      removeItem(item);
    }
  };

  const totalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.cost * current.quantity,
    0
  );
  const totalCount = cartItems.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Coupon, setCoupon] = useState("");
  const [Coupon_Code, setCoupon_Code] = useState({});

  const checkPromo = async () => {
    // const params = {
    //   FunctionName: 'testhello',
    //   Payload: JSON.stringify({key: JSON.stringify({
    //     "coupon_name":Coupon,
    //   })})
    // };

    // lambda.invoke(params, function(err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // setResult(data.Payload);
    //     console.log("ata is ",data)
    //   }
    // });

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
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const { mutateAsync: createOrderDetails } = useCreateMany<any>();
  // const { mutateAsync: createOrder } = useCreate<any>();
  // const { mutateAsync: createPayment } = useCreate<any>();

  
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


  // const  createOrderDetails  = function({resource, values}){};
  const  [createOrderDetails]  = useMutation(insert_mutation_order_details);
  // const  createOrder  = function({resource, values}){};
  const  [createOrder]  = useMutation(insert_mutation_order);
  // const createPayment  = function({resource, values}){};
  const [createPayment]  = useMutation(insert_mutation);

  const stripePromise = loadStripe(
    "pk_test_51MhnQJSG1kawF0cmPOrpNBQTLbvjwZQHNPUGtJ8ZpB0exEJ8rZlpFUua7jMeufsGmqqDt0T8m2daZQkP1petTk2N00LzMYeZq4"
  );
  const onFinish = async () => {
    if (cartItems?.length > 0) {
      // const createdOrder = await createOrder({
      //   resource: "orders",
      //   values: {
      //     user_id: user?.id,
      //     status: "placed",
      //     total_amount: totalPrice,
      //   },
      // });

     const createdOrder = await createOrder({variables:{object:{ user_id: user?.id,status: "placed", total_amount: totalPrice}}})
console.log("createdOrder", createdOrder?.data?.insert_orders_one?.id)
      

      let formattedCartItems = await cartItems.map((item: any) => {
        return {
          customer_id: user?.id,
          status: "placed",
          test_type: item.name,
          product_id: item.id,
          quantity: `${item.quantity}`,
          order_id: createdOrder?.data?.insert_orders_one?.id,
          // card_id: createdCard.data.id,
        };
      });

      // const createdOrderDetails = await createOrderDetails({
      //   resource: "order_details",
      //   values: [...formattedCartItems],
      // });
     const createdOrderDetails = await createOrderDetails({variables:{object:[...formattedCartItems]}})
     console.log("createdOrderDetails", createdOrderDetails)
     
      // const createdPayment = await createPayment({
      //   resource: "payments",
      //   values: {
      //     user_id: user?.id,
      //     // order_id: createdOrder.data.id,
      //     status: "pending",
      //     total_amount: totalPrice,
      //   },
      // });

      const createdPayment =await createPayment({variables:{ object:{user_id: user?.id, status: "pending",total_amount: totalPrice}}})
      console.log("createdPayment", createdPayment)

      return
      // console.log("CreatedPayment", createdPayment?.data?.id);
      // console.log("createdOrderDetails", createdOrder?.data?.id);

      const stripe = await stripePromise;

      // Call your backend to create the Checkout Session
      const response = await fetch(
        "/api/session",
        // "https://ftql6xrbueq5gpygsqnsa6trw40rckpa.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          body: JSON.stringify({
            Coupon_Code,
            totalPrice,
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
      warning();
    }

    // setIsModalOpen(false);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Cannot checkout without items in cart!",
    });
  };

  return (
    <>
      <Navbar showDrawer={showDrawer} itemsCount={totalCount}/>
      {/* for warning */}
      {/* {contextHolder} */}

      <Drawer title="Cart" placement="right" onClose={onClose} open={open}>
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
                Total price: <strong>&#163;{totalPrice.toFixed(2)}</strong>
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
              <Input onChange={(e) => setCoupon(e?.target?.value)} />
            </span>
            <span>
              {promoValid && promo && <CheckOutlined />}
              {!promoValid && promo && <LoadingOutlined />}
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

      <div className="products-list">
        <Row>
 
          <Col md={18} lg={18} sm={24} xs={24}>
             {productsList?.map((product) => (
              <section className="product-container">
                <Row>
                  <Col span={8} className="product-image">
                    <Space>
                      <Image height={300} src={product.image_url} />
                    </Space>
                  </Col>
                  <Col span={16} className="product-description">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">&#163; {product.cost}</div>
                    <div className="product-quantity">
                      <span style={{ paddingRight: "10px" }}>
                        Quantity :
                        {/* {
                          cartItems.find((item) => item.id === product.id)
                            ?.quantity
                        } */}
                      </span>
 
                    </div>
                    <div className="buttons">
                      <Space>
                        <Button
                          className="custom-button-2"
                          type="primary"
                          onClick={() => addItem(product)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          className="custom-button"
                          type="primary"
                          onClick={() => removeOneItem(product)}
                        >
                          Remove
                        </Button>
                      </Space>
                    </div>
                    <div className="description">Read more...</div>
                  </Col>
                </Row>
              </section>
            ))}
          </Col>
        </Row>
      </div>

      <Footer/>
 
    </>
  );
};


export default Products;