// import { Col, Form, Image, Row, Spin, Input, Card } from "@pankod/refine-antd";
// import { useLogin, useNavigation } from "@pankod/refine-core";
import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/index";
import { Button, Collapse, Select } from "antd";
import { NhostClient } from "@nhost/nhost-js";
import { Divider, notification, Space,Col, Form, Image, Row, Spin, Input, Card } from "antd";
import { nhost } from "../../pages/_app";

export interface ILoginForm {
  username: string;
  password: string;
}

export const SignIn: React.FC = (props: any) => {
  // const { data, mutateAsync, isLoading } = useLogin();
  const { mutate: login, isLoading } = useLogin<ILoginForm>();
  const [form] = Form.useForm();
  const { push } = useNavigation();
  const { Panel } = Collapse;
  const { TextArea } = Input;

  const [signIn, SetsignIn] = useState(true);

  const [api, contextHolder] = notification.useNotification();

  const createNotification = (message: any) => {
    api.info({ message, placement: "topRight" });
  };

  const onFinish = async (values: any) => {
    console.log("values ", values);

    try {
      if (signIn) {
        // const result:any  =  login({username:values});
        const result: any = await login({
          username: values?.email,
          password: values?.password,
        });

        console.log("Sign In result", result, values?.email, values?.password);
      }

      if (!signIn) {
        const result = await nhost.auth.signUp({
          email: values?.email,
          password: values?.password,
        });

        if (result?.error?.message) createNotification(result?.error?.message);

        console.log("Sign Up result", result?.error?.message);
      }
    } catch (error) {
      console.log("error is", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [openCart, setOpenCart] = useState(false);

  return (
    <div id="login-page">
      <Navbar />

      <Card>
        <div className="login-outerBox">
          <h2>Sign into Alpha Wolfe</h2>
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="email"
                    size="large"
                    onChange={(e) =>
                      form.setFieldsValue({ username: e.target.value })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Password"
                    type="password"
                    size="large"
                    onChange={(e) =>
                      form.setFieldsValue({ password: e.target.value })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {signIn ? "Sign In" : "Sign Up"}
              </Button>

              <br />
              <br />

              <span
                style={{ cursor: "pointer", marginTop: "20px" }}
                onClick={() => SetsignIn(!signIn)}
              >
                {signIn ? "Don't have an account ?" : "Have an Account !"}
              </span>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};
