import React, { useState } from "react";
import {
  Drawer,
  Button,
  Badge,
  Avatar,
  Form,
  Input,
  Col,
  Row,
} from "@pankod/refine-antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCreate } from "@pankod/refine-core";
import { nhost } from "pages/_app";
 
export interface ICheckout {
  //   username: string;
  //   password: string;
}

export const Checkout: React.FC = (props: any) => {
  const [form] = Form.useForm();

  const user = nhost.auth.getUser();
  console.log(user);

  const { mutateAsync: addVehicleToQuoataion } = useCreate<any>();

  const onFinish = async (data: any) => {
    console.log(data);

    if (data) {
      const addedVehicle = await addVehicleToQuoataion({
        resource: "orders",

        values: {},
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // className="custom-form"
      >
        {/* //  ******* Customer Info ******** */}

        <Row gutter={[18, 18]}>
          <Col span={8} sm={24} md={8} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

// import {
//     Input,
//     Form,
//     Button,
//     Switch,
//     Select,
//     Row,
//     Col,
//     useSelect,
//     InputNumber,
//   } from "@pankod/refine-antd";
//   import { useUpdate } from "@pankod/refine-core";
//   import { DatePicker } from "antd";
//   import type { RangePickerProps } from "antd/es/date-picker";
//   import moment from "moment";
//   import React, { useState, useEffect } from "react";

//   import {
//     IVehicleMake,
//     IVehicleModel,
//     IEnumType,
//     IQuotations,
//   } from "interface/index.d";

//   type VehicleFormProps = {
//     policyDetails?: IQuotations;
//     setModalOpen: React.Dispatch<React.SetStateAction<any>>;
//     vehicleDetailsProps?: any;
//     modalProps?: any;
//   };
