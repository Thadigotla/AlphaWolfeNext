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

const { Header, Sider, Content } = Layout;

 

  const CustomLayout: React.FC = ({children}:any) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    
    return (

      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                // icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                // icon: <VideoCameraOutlined />,
                label: 'nav 2',

              },
              {
                key: '3',
                // icon: <UploadOutlined />,
                label: 'nav 3',
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