import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Col, MenuItemProps, Row } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Dropdown, Space } from "antd";
import { nhost } from "../../pages/_app";
import { useAuthenticationStatus } from "@nhost/nextjs";
import Image from "next/image";

import Link from "next/link";
import {useContext} from 'react';
import CartItemsContext from "../../store/Item";

export interface INavbar {
  showDrawer?: any;
  itemsCount?: any;
}

export const Navbar: React.FC<INavbar> = ({ showDrawer, itemsCount }) => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const pathname = useRouter().pathname;
  const router = useRouter();
  const {help, setHelp}= useContext(CartItemsContext)

  console.log("pathname is", pathname);

  React.useEffect(()=>{
    const element = document.querySelector(".frequently_asked_questions");
    if(element &&help){
    
      element.scrollIntoView({ behavior: "smooth" });
    }

  },[help])

  const handleClickScroll = () => {
    setHelp(true)

    if (pathname != "/") router.push("/");
 
  };

  const handleClickScrollHome = () => {
    const element = document.getElementById("login-page");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const whatWeDoitems = [
    {
      key: "1",
      label: <Link href="/epigenetics">Epigenetics</Link>,
    },
    {
      key: "2",
      label: <Link href="/hairbulbfolicle">Hair Bulb Follice</Link>,
    },
    {
      key: "3",
      label: <Link href="/s_drive_technology">S Drive Technology</Link>,
    },
    {
      key: "4",
      label: <Link href="/research">Research</Link>,
    },
    {
      key: "5",
      label: <Link href="/gut_support">Gut Support</Link>,
    },
    {
      key: "6",
      label: <Link href="/emf_and_elf_sensitivity">EMF & ELF Sensitivity</Link>,
    },
  ];
  const certificateItems = [
    {
      key: "1",
      label: <Link href="/">CE</Link>,
      onClick: () =>
        openInNewTab(
          "https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6410479d523ba68fe82ef0c2_CE.pdf"
        ),
    },
    {
      key: "2",
      label: <Link href="/">FDA</Link>,
      onClick: () =>
        openInNewTab(
          "https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6410479b8b448147d3ab9d50_FDA%20Letter%20of%20Compliance%20with%20FDA%20%20Guidance%2012_07_17.pdf"
        ),
    },
    {
      key: "3",
      label: <Link href="/">Intertek</Link>,
      onClick: () =>
        openInNewTab(
          "https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6410479c96a313215f2f1557_intertek.pdf"
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
              loader={() =>
                "https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f733050ef63f2e151dc369_AW-logo.jpeg"
              }
              onClick={() => (setHelp(false),router.push("/"))}
            />
          </div>
        </div>

        <div
          className="nav-links"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Button
            onClick={() => (setHelp(false),router.push("/"))}
            type="link"
          >
            Home
          </Button>
          <Button
            onClick={() => (router.push("/products"))}
            type="link"
          >
            Products
          </Button>

          <Button onClick={() => router.push("/about")} type="link">
            About
          </Button>

          <Button onClick={() => (setHelp(true), handleClickScroll())} type="link">
            Help
          </Button>

          <Dropdown menu={{ items: whatWeDoitems }} placement="bottomLeft"  >
            <Button style={{boxShadow:"none"}}>What we Do ?</Button>
          </Dropdown>

          <Dropdown menu={{ items: certificateItems }} placement="bottomLeft">
            <Button style={{boxShadow:"none"}}>Certificates</Button>
          </Dropdown>

          <Button onClick={() => router.push("/contact")} type="link">
            Contact
          </Button>

          {isAuthenticated ? (
            <Button onClick={() => router.push("/pets")} type="link">
              Manage
            </Button>
          ) : null}

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

          {/* {pathname === "/products" ? ( */}
          {pathname.startsWith("/products") ? (
            <Button
              size="large"
              icon={
                <Badge count={itemsCount()} color="blue">
                  <Avatar
                    shape="square"
                    style={{ background: "none" }}
                    size="large"
                  >
                    <ShoppingCartOutlined
                      size={50}
                      style={{ fontSize: "28px", color: "green" }}
                    />
                  </Avatar>
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
