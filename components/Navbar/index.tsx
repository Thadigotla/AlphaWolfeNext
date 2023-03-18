import { ShoppingCartOutlined } from "@ant-design/icons";
// import { useNavigation } from "@pankod/refine-core";
import { Avatar, Badge, Button, Col, Row } from "antd";
import React, { useState } from "react";
// import { useLocation } from "react-router";
import { useRouter } from "next/router";

//  import { Cart } from "../Cart/Cart";
import type { MenuProps } from "antd";
import   CartLogo  from "../../public/images/cart.svg";
import { Dropdown, Space } from "antd";
import { nhost } from "../../pages/_app";
import { useAuthenticationStatus } from '@nhost/nextjs'
import Image from 'next/image'

import Link from "next/link"
 
// import { Product } from "../Products/Product";
// import { nhost } from 'pages/_app';
 
export interface INavbar {
  showDrawer?: any;
  itemsCount?: any;
  //   username: string;
  //   password: string;q
}

export const Navbar: React.FC<INavbar> = ({ showDrawer, itemsCount }) => {
  //   // const { data, mutateAsync, isLoading } = useLogin();
  //   const { mutate: login, isLoading } = useLogin<ILoginForm>();
  //   const [form] = Form.useForm();

  const { isLoading, isAuthenticated } = useAuthenticationStatus()

  // const { push } = useNavigation();
   let  push  ;
  const pathname = useRouter().pathname;

  const router = useRouter()

  

  console.log("pathname",pathname)

  //   const onFinish = (values: any) => {
  //     console.log("Success:", values);

  //     login(values);

  //     props._setRole(values);
  //   };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log("Failed:", errorInfo);
  //   };

  const userDetails: any = "as";
  // const userDetails: any = nhost.auth.getUser();

  const handleClickScroll = () => {
    const element = document.querySelector(".frequently_asked_questions");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickScrollHome = () => {
    const element = document.getElementById("login-page");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log(userDetails, "userDetails : ");
  // const items = [
  //   {
  //     key: "1",
  //     label: (
  //       <Button onClick={() => router.push("/s_DriveTechnology")} type="link">
  //         s-drivetechnology
  //       </Button>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <Button
  //         className="alpha_button"
  //         onClick={() => router.push("/epigenetics")}
  //         type="link"
  //       >
  //         Epigenetics
  //       </Button>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: (
  //       <Button
  //         className="alpha_button"
  //         onClick={() => router.push("/hairBulbFolicle")}
  //         type="link"
  //       >
  //         Hair Bulb Follicle
  //       </Button>
  //     ),
  //   },
  //   {
  //     key: "1",
  //     label: (
  //       <Button
  //         className="alpha_button"
  //         onClick={() => router.push("/LoginPage/products-list")}
  //         type="link"
  //       >
  //         Products
  //       </Button>
  //     ),
  //   },
  // ];

  const items = [
    {
      key: '1',
      label: (
        <Link  href="/epigenetics" >
          Epigenetics
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link  href="/hairbulbfolicle" >
          Hair Bulb Follice
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link  href="/s_drive_technology">
         S Drive Technology
        </Link>
      ),
    },
  ];

  return (
    <>
      <section className="navbar" style={{ zIndex: "1000" }}>
        
        <div className="logo">
          <div className="logo_wrapper_">
          <Image
            src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f733050ef63f2e151dc369_AW-logo.jpeg"
            alt="logo"
            layout="fill"
            className="logo_wrapper_imgs"
            objectFit="cover"
            loader={()=>"https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f733050ef63f2e151dc369_AW-logo.jpeg"}
            // height={100}
            // width={50}
            // style={{ height: "50px", cursor: "pointer" }}
            onClick={() => (router.push("/"), handleClickScrollHome())}
          />
          </div>
        </div>

 
         {/*  <Button  onClick={() => push("/s_drive_technology")} type="link">
            s-drivetechnology
          </Button>

          <Button className="alpha_button" onClick={() => push("/epigenitics")} type="link">
            Epigenetics
          </Button>

          <Button className="alpha_button" onClick={() => push("/hairBulbFollicle")} type="link">
            Hair Bulb Follicle
          </Button>
          <Button className="alpha_button" onClick={() => push("/products-list")} type="link">
            Products
          </Button> */}



        <div
          className="nav-links"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >

           <Button
            onClick={() => (router.push("/products"), handleClickScroll())}
            type="link"
             >
            Products
          </Button>

          
          <Button onClick={() => router.push("/about")} type="link">
            About
          </Button>

          <Button
            onClick={() => (router.push("/"), handleClickScroll(),handleClickScroll())}
            type="link"
          >
            Help
          </Button>
 
          <Button>

            
          </Button>
          <Dropdown menu={{ items }} placement="bottomLeft">
             <Button>What we Do ?</Button>
          </Dropdown>



          <Button onClick={() => router.push("/contact")} type="link">
            Contact
          </Button>
 
          {isAuthenticated ?<Button onClick={() => router.push("/pets")} type="link">
            Manage
          </Button> : null}

          {isAuthenticated ? (
            <Button
              onClick={() => {
                nhost.auth.signOut();
               router.push("/");
              }}
              type="link"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("./sign-in");
              }}
              type="link"
            >
              Login
            </Button>
          )}

          {pathname === "/products" ? (
            <Button
              size="large"
              icon={
                <Badge count={itemsCount} color="blue">
                  {/* <CartLogo /> */}
                </Badge>
              }
              type="primary"
              style={{
                backgroundColor: "#c4b2a0",
                height: "3em",
                width: "3em",
              }}
              onClick={showDrawer}
            ></Button>
          ) : null}
        </div>
      </section>
    </>
  );
};
