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
import { nhost } from '../../../pages/_app';

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
        <Sider trigger={null} collapsible collapsed={collapsed}     
      >
          <div className="logo" />
          <Menu 
            theme="light"
            // mode="inline"  
          
            selectedKeys={[router.pathname]}
        
            items={[


              {
                key: '/pets',
                // icon: <VideoCameraOutlined />,
                label: 'Pets',
                onClick: () => router.push("/pets")
              },

              {
                key: '/products',
                // icon: <VideoCameraOutlined />,
                label: 'Products',
                onClick: () => router.push("/productss")
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
              
              {
                key: '/payments',
                // icon: <VideoCameraOutlined />,
                label: 'Payments',
                onClick: () => router.push("/payments")
              },
              {
                key: '/customers',
                // icon: <UserOutlined />,
                label: 'Customers',
                onClick: () => router.push("/customers")
              },
              {
                key: '/home',
                // icon: <UploadOutlined />,
                label: 'Home',
                onClick: () => ( router.push("/"))
              },
              {
                key: '/logout',
                // icon: <UploadOutlined />,
                label: 'Logout',
                onClick: () => (nhost.auth.signOut(), router.push("/"))
              }
              ,

            ]}
          />
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