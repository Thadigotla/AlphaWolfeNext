import React, { useState } from "react";
import { Drawer, Button, Badge, Avatar } from "@pankod/refine-antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./loginPage.css";

export interface ICart {
  //   username: string;
  //   password: string;
}

export const Cart: React.FC = (props: any) => {
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
    <>
      <Button
        icon={
          <Badge count={5}>
            <Avatar shape="square" size="large">
              <ShoppingCartOutlined style={{ fontSize: "28px" }} />
            </Avatar>
          </Badge>
        }
        type="link"
        onClick={showDrawer}
      ></Button>
      <Drawer title="Cart" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
