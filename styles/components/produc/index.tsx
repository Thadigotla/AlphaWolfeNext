import React, { useState,useContext } from 'react';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import { nhost } from '../../../pages/_app';
import Image from 'next/image';
import { AliwangwangOutlined, HomeOutlined, LeftCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MoneyCollectOutlined, OrderedListOutlined, PoundCircleOutlined, ProfileOutlined, UnorderedListOutlined, UploadOutlined, UserOutlined, UserSwitchOutlined, UsergroupAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import CartItemsContext from '../../../store/Item';

const { Header, Sider, Content } = Layout;

interface CustomLayoutProps {
  children: React.ReactNode;
}

 

  const CustomLayout: React.FC<CustomLayoutProps> = ({children}:any) => {
    const [collapsed, setCollapsed] = useState(true);
    const user = nhost.auth.getUser();

    console.log("userasdetails",user)


    const {
      token: { colorBgContainer },
    } = theme.useToken();


    const {setHelp} = useContext(CartItemsContext)

    const router = useRouter()



    
    const sideBarItems = [
      {
        key: '/pets',
        icon: <AliwangwangOutlined />,
        label: 'Pets',
        onClick: () => router.push("/pets")
      },

 

      {
        key: '/orders',
        icon: <UnorderedListOutlined />,
        label: 'Orders',
        onClick: () => router.push("/orders")
      },

      {
        key: '/orderItems',
        icon: <OrderedListOutlined />,
        label: 'Order Items',
        onClick: () => router.push("/orderItems")
      },       
      
      {
        key: '/payments',
        icon: <PoundCircleOutlined />,
        label: 'Payments',
        onClick: () => router.push("/payments")
      },
      {
        key: '/customers',
        icon: <UserOutlined />,
        label: 'Customers',
        onClick: () => router.push("/customers")
      },
      {
        key: '/home',
        icon: <HomeOutlined />,
        label: 'Home',
        onClick: () => (setHelp(false), router.push("/"))
      },
      {
        key: '/logout',
        icon: <LeftCircleOutlined />,
        label: 'Logout',
        onClick: () => (nhost.auth.signOut(), router.push("/"))
      }
      ,

    ]

    if(user?.defaultRole=="admin"){
       sideBarItems.pop()
       sideBarItems.pop()
        sideBarItems.push(    
          {
            key: '/products',
            icon: <ProfileOutlined />,
            label: 'Products',
            onClick: () => router.push("/productss")
          },)
          sideBarItems.push(    
            {
              key: '/customer_contacts',
              icon:<UsergroupAddOutlined />,
              label: 'Customer Contacts',
              onClick: () => router.push("/customer_contacts")
            },)
          sideBarItems.push(    
            {
              key: '/customer_emails',
              icon:<UserSwitchOutlined />,
              label: 'Customer Emails',
              onClick: () => router.push("/customer_emails")
            },)

            sideBarItems.push(    
              {
                key: '/home',
                icon: <HomeOutlined />,
                label: 'Home',
                onClick: () => (setHelp(false), router.push("/"))
              },)
  

              sideBarItems.push(    
            {
              key: '/logout',
              icon: <LeftCircleOutlined />,
              label: 'Logout',
              onClick: () => (nhost.auth.signOut(), router.push("/"))
            }
            ,)

    }
    
    const handleMouseEnter = () => {
      if (collapsed) {
        setCollapsed(false);
      }
    };
  
    const handleMouseLeave = () => {
      if (!collapsed) {
        setCollapsed(true);
      }
    };
  
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

    return (

      <Layout>
        <Sider 
        
        collapsible 
        collapsed={collapsed}   
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          // overflow: 'auto',
        //   height: '100vh',
        //   position: 'fixed',
        //   left: 0,
        //   top: 0,
        //   bottom: 0,
         }}
      >
                {/* <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} /> */}

          <div className="logo" style={{position:"relative"}} >
            <Image
            src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f733050ef63f2e151dc369_AW-logo.webp"
            layout="fill"
            objectFit="contain"

            >

            </Image>
          </div>
          <br/>
          <br/>
          <Menu 
            theme="light"
            mode="inline"  
          
            selectedKeys={[router.pathname]}
            items={sideBarItems}
            // items={[
            //   {
            //     key: '/pets',
            //     icon: <AliwangwangOutlined />,
            //     label: 'Pets',
            //     onClick: () => router.push("/pets")
            //   },

            //   {
            //     key: '/products',
            //     icon: <ProfileOutlined />,
            //     label: 'Products',
            //     onClick: () => router.push("/productss")
            //   },

            //   {
            //     key: '/orders',
            //     icon: <UnorderedListOutlined />,
            //     label: 'Orders',
            //     onClick: () => router.push("/orders")
            //   },

            //   {
            //     key: '/orderItems',
            //     icon: <OrderedListOutlined />,
            //     label: 'Order Items',
            //     onClick: () => router.push("/orderItems")
            //   },       
              
            //   {
            //     key: '/payments',
            //     icon: <PoundCircleOutlined />,
            //     label: 'Payments',
            //     onClick: () => router.push("/payments")
            //   },
            //   {
            //     key: '/customers',
            //     icon: <UserOutlined />,
            //     label: 'Customers',
            //     onClick: () => router.push("/customers")
            //   },
            //   {
            //     key: '/home',
            //     icon: <HomeOutlined />,
            //     label: 'Home',
            //     onClick: () => (setHelp(false), router.push("/"))
            //   },
            //   {
            //     key: '/logout',
            //     icon: <LeftCircleOutlined />,
            //     label: 'Logout',
            //     onClick: () => (nhost.auth.signOut(), router.push("/"))
            //   }
            //   ,

            // ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: "80vh",
              height:"90vh",
              background: colorBgContainer,
              overflow: 'scroll',
              fontFamily:"sans-serif"
              
              
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };

export default CustomLayout;