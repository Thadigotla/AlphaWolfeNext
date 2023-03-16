import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Link from "next/link"
import { useRouter } from 'next/router';

const { Header, Sider, Content } = Layout;

interface CustomLayoutProps {
  children: React.ReactNode;
}

 

  const CustomLayout: React.FC<CustomLayoutProps> = ({children}:any) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const router = useRouter()

    
    return (

      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu 
            theme="dark"
            mode="inline"  
            selectedKeys={[router.pathname]}
            // defaultSelectedKeys={['1']}
            items={[
              {
                key: '/customers',
                // icon: <UserOutlined />,
                label: 'Customers',
                onClick: () => router.push("/customers")
              },
              {
                key: '/orders',
                // icon: <VideoCameraOutlined />,
                label: 'Orders',
                onClick: () => router.push("/orders")


              },
              {
                key: '/orderItems',
                // icon: <UploadOutlined />,
                label: 'Order Items',
                onClick: () => router.push("/orderItems")

              },
            ]}
          />
              {/* <Menu.Item key="1" >
              <Link href="/items" ><a>Home</a></Link>
            </Menu.Item>
            <Menu.Item key="2" >
              <Link href="/products">Videos</Link>
            </Menu.Item> */}

          {/* </Menu> */}
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? "MenuUnfoldOutlined" : "MenuFoldOutlined", {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };

export default CustomLayout;