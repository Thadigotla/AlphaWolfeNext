import React, { useState } from "react";
// import {
//   Drawer,
//   Button,
//   Badge,
//   Avatar,
//   Row,
//   Col,
//   InputNumber,
//   Card,
// } from "@pankod/refine-antd";
import { Drawer, Button, Badge, Avatar, Row, Col, InputNumber, Card,} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Image, List } from "antd";

export interface IProduct {
  product: {
    id?: string;
    name?: string;
    description?: string;
    cost?: any;
    image_id?: string;
    url: string;
    currency?: string;
  };
}

export const Product: React.FC<IProduct> = ({ product }) => {
  //   // const { data, mutateAsync, isLoading } = useLogin();
  //   const { mutate: login, isLoading } = useLogin<ILoginForm>();
  //   const [form] = Form.useForm();
  //   const { push } = useNavigation();
  //   const onFinish = (values: any) => {
  //     console.log("Success:", values);

  //     login(values);

  //     props._setRole(values);
  //   };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log("Failed:", errorInfo);
  //   };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <section className="product-container">
      <Row>
        <Col span={10} className="product-image">
          <Image height={300} src={product.url} />
        </Col>
        <Col span={14} className="product-description">
          <div className="product-name">Name: {product.name}</div>
          <div className="product-price">Price : &#163; {product.cost}</div>
          <div className="product-quantity">
            <span style={{ paddingRight: "10px" }}>Quantity</span>{" "}
            <InputNumber></InputNumber>
          </div>
          <div className="buttons">
            <Button>Add to Cart</Button>
            <Button>Buy Now</Button>
          </div>
          <div className="description">Read more...</div>
        </Col>
      </Row>
    </section>
  );
};
