// import { Col, Form, Image, Row, Spin, Input, Card } from "@pankod/refine-antd";
// import { useLogin, useNavigation } from "@pankod/refine-core";
import React, { useEffect, useState } from "react";
//  import { Cart } from "../Cart/Cart";
import { Navbar } from "../components/Navbar/index";
import { Button, Collapse, Select } from "antd";
 import { NhostClient } from "@nhost/nhost-js";
import { Divider, notification, Space,Col, Form, Row, Spin, Input, Card  } from "antd";
import { Footer } from "../components/Footer/index";
import { nhost } from "../pages/_app";
import { useRouter } from "next/router";
import Image from  "next/image";
import Link from "next/link";


// const Fade = require("react-reveal/Fade");
// const Jump = require("react-reveal/Jump");

// export interface ILoginForm {
//   username: string;
//   password: string;
// }

 const Home  = (props) => {
  // const { data, mutateAsync, isLoading } = useLogin();
  // const { mutate: login, isLoading } = useLogin();
  const router = useRouter();
  const { Panel } = Collapse;

  const [signIn, SetsignIn] = useState(true);

  const [api, contextHolder] = notification.useNotification();

  const createNotification = (message ) => {
    api.info({ message, placement: "topRight" });
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer")
    if (newWindow) newWindow.opener = null
  }


  // useEffect(()=>{

  //   var myElement = document.getElementById("floatButton");

  //   var windowWidth = window.innerWidth;
  //   var elementWidth = myElement.offsetWidth;

  //   console.log("ggggh", windowWidth,elementWidth)

  //   window.addEventListener("scroll", function() {
  //     // Get the current scroll position
  //     var scrollPosition = window.scrollY;

  //     // Calculate the new position of the element
  //     var newPosition = (scrollPosition / (windowWidth - elementWidth)) * (windowWidth - elementWidth);
    
  //     // Update the position of the element
  //     myElement.style.left = newPosition + "px";
  //     myElement.style.right = newPosition + "px";
  //   });

    
  // },[])

  // const onFinish = async (values ) => {
  //   console.log("values ", values);

  //   try {
  //     if (signIn) {
  //       // const result:any  =  login({username:values});
  //       const result = await login({
  //         username: values?.email,
  //         password: values?.password,
  //       });

  //       console.log("Sign In result", result, values?.email, values?.password);
  //     }

  //     if (!signIn) {
  //       const result = await nhost.auth.signUp({
  //         email: values?.email,
  //         password: values?.password,
  //       });

  //       if (result?.error?.message) createNotification(result?.error?.message);

  //       console.log("Sign Up result", result?.error?.message);
  //     }
  //   } catch (error) {
  //     console.log("error is", error);
  //   }
  // };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [openCart, setOpenCart] = useState(false);

  const wellness = [
    {
      id: 1,
      name: "Immunity System",
      desc: "An effective immune system can assist in protecting your dog from the worst effects of infection or environmental impacts. Boosting a dog s immune systems plays a role in vitality and wellbeing.",
    },
    {
      id: 2,
      name: "Canine Circulatory System",
      desc: "Poor circulation reduces the ability of your dog s systems to transport nutrients and oxygen to where they are needed. You can support a dog s circulation with good nutritional food",
    },
    {
      id: 3,
      name: "Canine Gut Support",
      desc: "The unprecedented modernization taking place over the last three decades is confronting us with a massive increase in environmental pollutants. They have also iimpacted our dogs lives in many ways. One of the biggest effects is the stress caused to the intestinal tract and gut system.",
    },
    {
      id: 4,

      name: "Coat And Skin Condition",
      desc: "A dog s coat and skin reflects the nutritional diet they are fed. Most dog s coat conditions can be enhanced by weekly feeding the dog natural omega 3 found in Salmon, Sardines or other such items.",
    },
    {
      id: 5,
      name: "Optimize Growth",
      desc: "A dog s balanced nutritional diet is essential to maintain or build growth. Growing puppies or dogs falling behind in growth need a balanced nutritional diet to feed their body and energy needs.",
    },
    {
      id: 6,
      name: "Food Restrictions",
      desc: "There are foods which your dog may be eating which show NO physical signs and symptoms of being a problem – but which might not support the body s needs, as they take up more energy to digest than the body gets in return.",
    },
  ];

  // type wellnessType = { id: number; name: string; desc: string };

  const [selectedWelness, setSelectedWelness] = useState({
    id: 1,
    name: "Immunity System",
    desc: "An effective immune system can assist in protecting your dog from the worst effects of infection or environmental impacts. Boosting a dog s immune systems plays a role in vitality and wellbeing.",
  });

  return (
    <div id="login-page">
      {/* Dashboard Layout */}

      <>

        <Navbar />
        {contextHolder}
        <div className="page-wrapper">
          <div
            data-w-id="8de08dee-736c-7446-c511-e87704589a8e"
            className="hero-section wf-section"
            style={{position:"relative"}}
          >
            <Image
              src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c794812facc_bg%20paw.svg"
              loading="lazy"
              alt=""
              layout="fill"
              objectFit="contain"
              className="image-11"
            />
            <Image
              src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c5f1a12facd_big%20bg%20paw.svg"
              loading="lazy"
              alt=""
              layout="fill"
              objectFit="contain"
              className="image-13"
            />
            <Image
              src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c794812facc_bg%20paw.svg"
              loading="lazy"
              alt=""
              layout="fill"
              objectFit="contain"
              className="image-12"
            />
            <div className="container">
              <div className="hero-body">
                <div className="hero-content-wrapper">
                  <div className="hero-heading-wrapper">
                    <h1>
                      Help your dog live a{" "}
                      {/* <Fade top> */}
                        <span className="tan-font-color">
                          longer healthier{" "}
                        </span>
                      {/* </Fade>{" "} */}
                      life
                    </h1>
                  </div>
                  <p className="hero-para">
                    Get your individualised report on all your dogs nutritional
                    needs
                  </p>
                  <div
                  // href="/products"
                  className="button white-on-hover top-margin w-button"
                  // passHref
                  onClick={()=>router.push("/products")}
                >
                  Shop Now
                </div>
                {/* <Button id="floatButton" >Button</Button> */}

                  <div className="crufts-block" >
                    <div>Upcoming Event</div>
                    <div style={{position: "relative" , height:"100%",width:"100%"}}>
                    <Image
                      style={{height:"100%", width:"100%"}}
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6405f0619cc6e02bfb9e0550_crufts-logo-update.png"
                      loading="lazy"
                      sizes="(max-width: 479px) 100vw, 180px"
                      srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6405f0619cc6e02bfb9e0550_crufts-logo-update-p-500.png 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6405f0619cc6e02bfb9e0550_crufts-logo-update-p-800.png 800w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6405f0619cc6e02bfb9e0550_crufts-logo-update-p-1080.png 1080w"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      className="crufts-logo"
                    />
                    </div>
                    <div>
                      NEC Birmingham{" "}
                      <span className="inline-text">
                        from March 08 to 11, 2023
                      </span>Alpha Nutritional Test

                    </div>
                  </div>
                </div>
                <div className="hero-image-wrapper">
                  <div className="hero-image-wrapper-test image-3">

                 
                  <Image
                    src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6400765b9dc392dfa319d7dd_dog-food2.png"
                    loading="lazy"
                    alt=""
                    layout="fill"
                    objectFit="contain"
                    
                    className="image-3"
                  />
                      </div>
                      

                      <div className="image-47-wrapper image-47">

                      <Image
                    src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f730a54180231e8d8c817e_dogbanner.png"
                    loading="lazy"
                    layout="fill"
                    sizes="(max-width: 479px) 90vw, (max-width: 767px) 343.234375px, (max-width: 991px) 370.6875px, 47vw"
                    srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f730a54180231e8d8c817e_dogbanner-p-500.png 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f730a54180231e8d8c817e_dogbanner.png 635w"
                    alt=""
                    objectFit="contain"
                    className="image-47"
                  />

                      </div>

              
              <div     className="image-86-wrapper ">
              <Image
                    src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c609312fb25_Group%2042488.png"
                    loading="lazy"
                    layout="fill"
                    objectFit="contain"
                    alt=""
                    className="image-86"
                  />

              </div>

                  {/* <Fade duration={5000} delay={1500} top forever> */}

                  <div className="image-7-wrapper">

                  <Image
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c267d12fac9_bite.png"
                      loading="lazy"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      // className="image-7"
                    />

                  </div>

                  <div className="image-8-wrapper">

                    
                    <Image
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759cb1f412faca_bite%20blue.png"
                      loading="lazy"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      // className="image-6"
                    />
                    </div>

                    <div className="image-9-wrapper">


                    <Image
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759cdad812facb_blur.png"
                      loading="lazy"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      // className="image-8"
                    />
                    </div>

                    <div className="image-4-wrapper">


                    <Image
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c267d12fac9_bite.png"
                      loading="lazy"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      // className="image-4"
                    />

                    </div>

                   
                    {/* <img
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c267d12fac9_bite.png"
                      loading="lazy"
                      alt=""
                      className="image-5"
                    />
                    <img
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759cdad812facb_blur.png"
                      loading="lazy"
                      alt=""
                      className="image-10"
                    />

                    <img
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c267d12fac9_bite.png"
                      loading="lazy"
                      alt=""
                      className="image-9"
                    /> */}
                  {/* </Fade> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feature-lane-section wf-section">
          <div className="container">
            <div className="feature-lane-body">
              <div className="feature-lane-block">
                <div className="feature-info-wrapper">
                  <div className="feature-info">60</div>
                </div>
                <div className="feauture-details-wrapper">
                  <div className="feature-detail-heading">
                    Days Nutrition
                    <br />
                    Plan
                  </div>
                </div>
              </div>
              <div
                id="w-node-_6048418e-7f0b-8186-ebc8-0e9e53eed799-fd12fab3"
                className="feature-lane-block"
              >
                <div className="feature-info-wrapper">
                  <div className="feature-info">12</div>
                </div>
                <div className="feauture-details-wrapper">
                  <div className="feature-detail-heading">
                    Wellness
                    <br />
                    Indicators
                  </div>
                </div>
              </div>
              <div className="feature-lane-block">
                <div className="feature-info-wrapper">
                  <div className="feature-info">18+</div>
                </div>
                <div className="feauture-details-wrapper">
                  <div className="feature-detail-heading">
                    Total Value Support
                    <br />
                    Immune System
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section wf-section">
          <div className="container">
            <div
              data-w-id="c70682d4-a843-ca2c-9e08-230e45e1a97d"
              className="discount-body"
            >
              <div className="discount-heading-wrapper">
                <h2>Alpha Nutritional Test</h2>
                <p className="section-para max-47ch">
                  Get epigenetic results and optimized wellbeing reports with a{" "}
                  <span className="text-span">
                    personalised nutritional plan.
                  </span>
                </p>
                <div className="div-block-15">
                <div
                  // href="/products"
                  className="button white-on-hover top-margin w-button"
                  // passHref
                  onClick={()=>router.push("/products")}
                >
                  Shop Now
                </div>

                <div
                  className="button white-on-hover top-margin w-button"
                  onClick={()=>openInNewTab("https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640756b64212e64bd05d52e3_Alpha%20Nutritional%20Test%20Sample%20Report.pdf")}
                  style={{backgroundColor:"white", color:"black"}}
                >
                  Sample Report
                </div>

                  {/* <a
                    href="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640756b64212e64bd05d52e3_Alpha%20Nutritional%20Test%20Sample%20Report.pdf"
                    target="_blank"
                    className="button tertiary w-button"
                  >
                    Sample Report
                  </a> */}

                  {/* <div
                  // href="/products"
                  className="button tertiary w-button"
                  // passHref
                  onClick={()=>router.push("/products")}
                >
                  Sample Report
                </div> */}
                </div>
              </div>
              {/* <div className="bg-icon-test-wrapper">


                <img
                src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64008066ae42133add6e2898_medical-report.webp"
                loading="lazy"
                alt=""
                layout="fill"
                objectFit="cover"
                className="bg-icon-test   result"
              />



              </div> */}

               {/* <img
                src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64008066447e9f6aebe2687d_dog%20(1).webp"
                loading="lazy"
                alt=""
                className="bg-icon-test"
              /> */}
            </div>
          </div>
        </div>
        <section className="dog_quotation">
          <div>
            <h2 className="dog_quotation_heading">
              Show your dog{" "}
              <span className="dog_quotation_heading_highlight">The Love</span>{" "}
              they deserve
            </h2>
            <div className="dog_quotation_parag">
              <div>
                It s crucial to make sure your dog is getting the right kind of
                nutrition and
              </div>
              <div>deserves the right amount of happiness.</div>
            </div>
          </div>
        </section>

        <section className="facilities">
          <div className="facilities_block">
            <div className="facilities_heading">
              Discover Elite Products for your Pet Friends{" "}
              <span className="facilities_highlight">SOON</span>{" "}
            </div>
            <div className="facilities_grid">
              <div className="facilities_grid_1">
                <div className="facilities_grid_1_block_1">
                  {/* <Fade bottom> */}
                    <Image
                      className="facilities_grid_1_block_1_img"
                      width={100}
                      height={100}
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63ff36762159be3ea6d39791_dog.png"
                   />
                    <div className="facilities_grid_1_block_1_img_heading">
                      Grooming
                    </div>
                    <div className="facilities_grid_1_block_1_para">
                      We love to style, wash and brush them first, air out the
                      shrugged fur, do them hygiene.
                    </div>
                  {/* </Fade> */}
                </div>
              </div>

              <div className="facilities_grid_1">
                <div className="facilities_grid_1_block_1">
                  {/* <Fade bottom> */}
                    <Image
                      width={100}
                      height={100}
                      className="facilities_grid_1_block_1_img"
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63ff2b40e18884ea0a54d01a_dog-house%20(1).png"
                    />
                    <div className="facilities_grid_1_block_1_img_heading">
                      Boarding
                    </div>
                    <div className="facilities_grid_1_block_1_para">
                      No dog enjoys being left behind. In case your buddy can t
                      join in, boarding your dog at a good day care facility can
                      be an option.
                    </div>
                  {/* </Fade> */}
                </div>
              </div>

              <div className="facilities_grid_1">
                <div className="facilities_grid_1_block_1">
                  {/* <Fade bottom> */}
                    <Image
                      width={100}
                      height={100}
                      className="facilities_grid_1_block_1_img"
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63ff351baf3504539160e30c_no-jump.png"
                    />
                    <div className="facilities_grid_1_block_1_img_heading">
                      Training
                    </div>
                    <div className="facilities_grid_1_block_1_para">
                      Do you want to Improve your dog s intelligence and
                      behaviour? Are you looking for professional dog training?
                    </div>
                  {/* </Fade> */}
                </div>
              </div>
            </div>

            <div className="facilities_grid">
              <div className="facilities_grid_1">
                <div className="facilities_grid_1_block_1">
                  {/* <Fade bottom> */}
                    <Image
                      width={100}
                      height={100}
                      className="facilities_grid_1_block_1_img"
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63ff351ca4768a11a7a41591_veterinarian.png"
                    />
                    <div className="facilities_grid_1_block_1_img_heading">
                      Veterinary
                    </div>
                    <div className="facilities_grid_1_block_1_para">
                      Trusting your pet s health in the right hands is an
                      important step in Pet care.
                    </div>
                  {/* </Fade> */}
                </div>
              </div>

              <div className="facilities_grid_1">
                <div className="facilities_grid_1_block_1">
                  {/* <Fade bottom> */}
                    <Image
                      width={100}
                      height={100}
                      className="facilities_grid_1_block_1_img"
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63ff351bf8bab329f0f50750_dog-food.png"
                    />
                    <div className="facilities_grid_1_block_1_img_heading">
                      Nutrition
                    </div>
                    <div className="facilities_grid_1_block_1_para">
                      With nutrition make your dogs wholesome to ensure their
                      happiness and health.
                    </div>
                  {/* </Fade> */}
                </div>
              </div>

              <div className="facilities_grid_1">
                <div className="facilities_grid_1_block_1">
                  {/* <Fade bottom> */}
                    <Image
                      width={100}
                      height={100}
                      className="facilities_grid_1_block_1_img"
                      src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63ff37c4e616ea049d8936a9_dog%20walking.png"
                    />
                    <div className="facilities_grid_1_block_1_img_heading">
                      Walking
                    </div>
                    <div className="facilities_grid_1_block_1_para">
                      Perfect Accessories for walking your dog to unwind connect
                      with nature and clear your own mind.
                    </div>
                  {/* </Fade> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="alpha_wolfie_promo">
          <div className="alpha_wolfie_promo_img_left">
            {/* <Fade left> */}
              <Image
                className="alpha_wolfie_promo_img_left_one"
                layout="fill"
                objectFit="contain"
                src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6401e10557fbcb3eb24f3d88_Pillow%20Box-image.png"
              />
              <Image
                className="alpha_wolfie_promo_img_left_two"
                layout="fill"
                objectFit="contain"
                src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f75ea41b66070a3f8dc8dc_56-dog-png-image.png"
              />
            {/* </Fade> */}
          </div>
          <div className="alpha_wolfie_promo_img_right_details">
            {/* <Fade left> */}
              <h2 className="alpha_wolfie_promo_img_right_details_parag">
                Take the Alpha Nutritional Test for your furry friend today
              </h2>
              {/* <div className="alpha_wolfie_promo_img_right_details_offer">
                <div className="alpha_wolfie_promo_img_right_details_offer_details">
                  USE CODE: ALPHA15 & get{" "}
                  <span className="alpha_wolfie_promo_img_right_details_offer_details_highlight">
                    15% OFF
                  </span>
                </div>
              </div> */}

              <div className="alpha_wolfie_promo_img_right_details_offer_para">
                Just like us, our furry friends have dietary needs too.
              </div>
            {/* </Fade> */}
          </div>
        </section>

        <section className="tips_and_advices">
          <div className="tips_and_advices_heading">
            Tips and Advice for your furry friend
          </div>
          <div className="tips_and_advices_heading_2">
            T5 ways to optimise the{" "}
            <span className="tips_and_advices_heading_2_highlight">
              well being
            </span>{" "}
            of your dog
          </div>
          <div className="tips_and_advices_advices">
            <div className="tips_and_advices_advices_1">
              <span className="tips_and_advices_advices_1_left">1</span>
              <span className="tips_and_advices_advices_1_right">
                Figuring out the right nutritional requirements
              </span>
            </div>

            <div className="tips_and_advices_advices_1">
              <span className="tips_and_advices_advices_1_left">2</span>
              <span className="tips_and_advices_advices_1_right">
                Feeding the right combination of supplements for immunity
                booster
              </span>
            </div>

            <div className="tips_and_advices_advices_1">
              <span className="tips_and_advices_advices_1_left">3</span>
              <span className="tips_and_advices_advices_1_right">
                Regular wellness optimization plans
              </span>
            </div>

            <div className="tips_and_advices_advices_1">
              <span className="tips_and_advices_advices_1_left">4</span>
              <span className="tips_and_advices_advices_1_right">
                Providing a suitable grooming routine
              </span>
            </div>

            <div className="tips_and_advices_advices_1">
              <span className="tips_and_advices_advices_1_left">5</span>
              <span className="tips_and_advices_advices_1_right">
                Figuring out the right nutritional requirements
              </span>
            </div>
          </div>
        </section>

        <div className="benefits-section wf-section">
          <div className="container">
            <div className="benefits-body">
              <div
                data-w-id="73853114-b22e-03fa-de12-28e85b8e6949"
                className="benefits-image-wrapper"
              >
                {/* <Fade bottom delay={1000}> */}
                <div className="image-98-wrapper image-98">
                  <Image
                    className=""
                    src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c91b012fb35_photoshop-file%202.webp"
                    width={449}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                    sizes="(max-width: 479px) 72vw, (max-width: 767px) 50vw, (max-width: 991px) 45vw, 29vw"
                    data-w-id="199ad48c-16ca-b0ab-8e64-e9ff9b9f8823"
                    loading="lazy"
                    srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c91b012fb35_photoshop-file%25202-p-500.webp 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c91b012fb35_photoshop-file%202.webp 518w"
                  />
                </div>

                {/* </Fade> */}
                <div className="image-23-wrapper">
                <Image
                  src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c8c6412fae3_light%20paw.svg"
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className="image-23"
                />
                </div>
                {/* <Fade left> */}
                <div className="image-88-wrapper image-88">

                <Image
                    src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640086184ae39529c0c796de_concept-of-organic-pet-food-isolated-on-white-back-2021-09-03-16-05-30-utc-PhotoRoom.webp"
                    loading="lazy"
                    width={258}
                    layout="fill"
                    objectFit="contain"
                    srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640086184ae39529c0c796de_concept-of-organic-pet-food-isolated-on-white-back-2021-09-03-16-05-30-utc-PhotoRoom-p-500.webp 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640086184ae39529c0c796de_concept-of-organic-pet-food-isolated-on-white-back-2021-09-03-16-05-30-utc-PhotoRoom-p-800.webp 800w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640086184ae39529c0c796de_concept-of-organic-pet-food-isolated-on-white-back-2021-09-03-16-05-30-utc-PhotoRoom.webp 864w"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 83vw, (max-width: 991px) 72vw, 52vw"
                    alt=""
                  />



                </div>

                {/* </Fade> */}
                {/* <Fade delay={1500} bottom> */}
                  <div
                    data-w-id="97306a1e-3daa-573b-bf4e-44048096a795"
                    className="benefit-review-wrapper"
                  >
                    <h1 className="benefit-review-heading">
                      Wellness ingredients
                    </h1>
                    <p className="benefit-review-para">
                      The immunity of your furry little friend is in your hands
                    </p>
                  </div>
                {/* </Fade> */}
                {/* <img
                  src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c262d12fb36_Group%2041739.webp"
                  loading="lazy"
                  width={117}
                  alt=""
                  className="image-89"
                /> */}
                {/* <Fade right> */}
                  {/* <img
                    src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c08f512fb34_Group%2041745.webp"
                    loading="lazy"
                    alt=""
                    className="image-90"
                  /> */}
                {/* </Fade> */}
              </div>
              <div className="benefits-content-wrapper">
                <h2 className="mission">
                  On a mission to give your dog the{" "}
                  <span className="white-font-colour">best quality</span>
                  of life
                </h2>
                <div
                  data-w-id="71481b35-08c6-1c4c-205f-9dd67d765fb0"
                  className="benefit-box"
                >
                  <div className="benefit-block-heading-wrapper">
                    <div className="benefit-block-heading">
                      System support indicators
                    </div>
                  </div>
                </div>
                <div className="benefit-box">
                  <div className="benefit-block-heading-wrapper">
                    <div className="benefit-block-heading">
                      Coat and Skin indicators
                    </div>
                  </div>
                </div>
                <div className="benefit-box">
                  <div className="benefit-block-heading-wrapper">
                    <div className="benefit-block-heading">
                      Circulatory Support indicators
                    </div>
                  </div>
                </div>
                <div className="benefit-box">
                  <div className="benefit-block-heading-wrapper">
                    <div className="benefit-block-heading">
                      Resistance indicators
                    </div>
                  </div>
                </div>
                <div className="benefit-box">
                  <div className="benefit-block-heading-wrapper">
                    <div className="benefit-block-heading">
                      Environment indicators
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tilt-bg" />
        </div>

        <section className="wellness">
          <div className="header">
            <h2>
              Wellness <span className="brown-text">Overview</span>
            </h2>
            <p>
              It s crucial to make sure your dog is getting the right kind of
              nutrition and deserves the right amount of happiness.
            </p>
          </div>
          <div className="desc">
            <Row>
              <Col span={8} xs={11}>
                {wellness.map((item,i) => (
                  <Button
                    type="text"
                    key={i}
                    className="wellness-button"
                    block
                    onMouseEnter={() => setSelectedWelness(item)}
                  >
                    {item.name}
                  </Button>
                ))}
              </Col>
              <Col
                offset={1}
                className="wellness-description"
                span={12}
                xs={11}
              >
                {selectedWelness?.desc}
                {/* <img
                  className="dog_paw_big"
                  height={"20%"}
                  src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f8bca7084382801892944f_paw.png"
                  alt="dog-paw"
                /> */}
              </Col>
            </Row>
          </div>
        </section>

        <div className="discount-section wf-section">
          <div className="container">
            <div
              data-w-id="bb1c191a-fe48-be8b-c07c-a1233fb56c73"
              className="discount-body"
              
            >
              <div  className="image-33-wrapper image-33" >
              <Image
                src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640098fc941bc48b57728e7d_AW%20Multi%20Product%20img.png"
                loading="lazy"
                layout="fill"
                objectFit="contain"
                sizes="(max-width: 479px) 83vw, (max-width: 991px) 250px, 360px"
                srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640098fc941bc48b57728e7d_AW%20Multi%20Product%20img-p-500.png 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640098fc941bc48b57728e7d_AW%20Multi%20Product%20img-p-800.png 800w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/640098fc941bc48b57728e7d_AW%20Multi%20Product%20img.png 992w"
                alt=""
                // className="image-33"
              />
              </div>
              <Image
                src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c47df12fb18_Mask%20Group.svg"
                loading="lazy"
                data-w-id="bb1c191a-fe48-be8b-c07c-a1233fb56c75"
                alt=""
                layout="fill"
                objectFit="contain"
                // className="image-37"
              />
              <Image
                src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c47df12fb18_Mask%20Group.svg"
                loading="lazy"
                layout="fill"
                objectFit="contain"
                data-w-id="bb1c191a-fe48-be8b-c07c-a1233fb56c76"
                alt=""
                className="image-35"
              />
              <div className="discount-heading-wrapper">
                <h2>
                  Not sure where to{" "}
                  <span className="white-font-colour">start?</span>
                </h2>
                <p className="section-para max-47ch">
                  Grab your wellness kit today.
                </p>
                <div
                  // href="/products"
                  className="button white-on-hover top-margin w-button"
                  // passHref
                  onClick={()=>router.push("/products")}
                >
                  Shop Now
                </div>
              </div>
              <div className="hero-cta-wrapper centered">
                <a href="#" className="button white-on-hover hide w-button">
                  Book an appointment
                </a>
                <div className="w-dyn-list">
                  <div role="list" className="w-dyn-items">
                    <div role="listitem" className="w-dyn-item">
                      <div>
                        <form
                          data-node-type="commerce-add-to-cart-form"
                          data-commerce-sku-id="63f79460af54a11a52d2962e"
                          data-loading-text="Adding to cart..."
                          data-commerce-product-id="63f7945fd6ccf2d40cd013be"
                          className="w-commerce-commerceaddtocartform default-state"
                        >
                          <div className="div-block-2">
                            <input
                              type="number"
                              pattern="^[0-9]+$"
                              inputMode="numeric"
                              id="quantity-2cfad0a7e345b58adad762481cd39519"
                              name="commerce-add-to-cart-quantity-input"
                              min={1}
                              className="w-commerce-commerceaddtocartquantityinput qty hide"
                              defaultValue={1}
                            />
                            <input
                              type="submit"
                              data-node-type="commerce-add-to-cart-button"
                              data-loading-text="Adding to cart..."
                              defaultValue="Add to Cart"
                              aria-busy="false"
                              aria-haspopup="dialog"
                              className="w-commerce-commerceaddtocartbutton button hide"
                            />
                            <a href="#" className="button hide w-button">
                              Book an appointment
                            </a>
                          </div>
                        </form>
                        <div
                          tabIndex={0}
                          style={{ display: "none" }}
                          className="w-commerce-commerceaddtocartoutofstock"
                        >
                          <div>This product is out of stock.</div>
                        </div>
                        <div
                          aria-live="assertive"
                          data-node-type="commerce-add-to-cart-error"
                          style={{ display: "none" }}
                          className="w-commerce-commerceaddtocarterror"
                        >
                          <div
                            data-node-type="commerce-add-to-cart-error"
                            data-w-add-to-cart-quantity-error="Product is not available in this quantity."
                            data-w-add-to-cart-general-error="Something went wrong when adding this item to the cart."
                            data-w-add-to-cart-mixed-cart-error="You can t purchase another product with a subscription."
                            data-w-add-to-cart-buy-now-error="Something went wrong when trying to purchase this item."
                            data-w-add-to-cart-checkout-disabled-error="Checkout is disabled on this site."
                            data-w-add-to-cart-select-all-options-error="Please select an option in each set."
                          >
                            Product is not available in this quantity.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="frequently_asked_questions">
          <h2 className="frequently_asked_questions_heading"> FAQs </h2>
          <div className="frequently_asked_questions_paragraph">
            {" "}
            Frequently asked questions from pet parents
          </div>

          <Collapse className="fqaa_collapse" accordion>
            <Panel
              className="fqaa_panel"
              id="1"
              header="What kind of products do you sell?"
              key="1"
            >
              <p>Dog nutritional products as well as dog accessories.</p>
            </Panel>
            <Panel
              className="fqaa_panel"
              id="2"
              header="Can I bring my pet into your store?"
              key="2"
            >
              <p>Absolutely! We encourage it.</p>
            </Panel>
            <Panel
              className="fqaa_panel"
              header="Can I return an unused and unopened item?"
              key="3"
            >
              <p>
                Yes, we just ask you to give us a call so we can answer any
                queries and then returning your product, we just ask you pay the
                postage.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="What is your return policy?"
              key="4"
            >
              <p>
                Any unopened test kits and products, un-damaged accessories can
                be returned within 30 days according to our 30-day return
                policy.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="Has my order been placed?"
              key="5"
            >
              <p>
                When an order is placed, you should receive an email
                confirmation with all the necessary information regarding your
                purchase, remember to check your junk email too! Alternatively,
                you can see the status of your order by logging into your
                account on our website. If you are still having issues, please
                contact us via our email - contact@alpha-wolfe.com
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="What if my item is damaged?"
              key="6"
            >
              <p>
                If you have received a damaged item, please send us a photo of
                the damage to contact@alpha-wolfe.com, once we see you have
                received a faulty item, we will send you a new one within 24
                hours.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="Can I order by phone or email?"
              key="7"
            >
              <p>
                All orders are processed via our website, however if you have
                any questions about purchasing, you can contact us at
                contact@alpha-wolfe.com.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="Can I change my shipping address?"
              key="8"
            >
              <p>
                Yes, you can edit your shipping address if your order hasn t
                been dispatched yet. If your order has been shipped, you cannot
                change address it is being sent to.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="What happens if my order is delayed?"
              key="9"
            >
              <p>
                We work to keep you informed at every step of our order process.
                So, upon dispatch you will receive a tracking number which you
                can monitor as your order makes it s way to you. If your order
                doesn t seem to be making any progress, you can contact the
                delivery provider. If more issues persist, contact us at
                contact@alpha-wolfe.com.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="When will my order be sent?"
              key="10"
            >
              <p>
                Once we receive your order through the Alpha Wolfe website, your
                order will be dispatched the next working day.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="Where is my package?"
              key="11"
            >
              <p>
                Wondering where your package is? We provide tracking information
                via an email confirmation upon dispatch. You can use this to
                check on your order s journey. If your item doesn t seem to be
                making any progress, you can contact the delivery provider. If
                more issues persist, contact us at contact@alpha-wolfe.com.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="What if I have not received my order?"
              key="12"
            >
              <p>
                If you have not received your order and you have checked your
                tracking information and your delivery provider then email us
                via contact@alpha-wolfe.com, we will always aim to respond
                within 24 hours to resolve your issue.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="Where is my invoice?"
              key="13"
            >
              <p>
                You should receive your invoice in your email confirmation of
                your purchase – remember to check your junk! Alternatively, you
                can download your invoice from your account on our website.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="How does my Alpha Wolfe Epigenetic testing subscription work?"
              key="14"
            >
              <p>
                Wondering where your package is? We provide tracking information
                via an email confirmation upon dispatch. You can use this to
                check on your order s journey. If your item doesn t seem to be
                making any progress, you can contact the delivery provider. If
                more issues persist, contact us at contact@alpha-wolfe.com.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="Where do you deliver to??"
              key="15"
            >
              <p>
                We deliver to most of the UK and Ireland. If you would like to
                check if we deliver to your area, please contact our friendly
                (Customer Love team.)
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="When is the best time to collect a DNA sample?"
              key="16"
            >
              <p>
                We recommend waiting at least two hours after feeding your pet a
                meal or treat to swab. (Water is fine—no delay necessary.) This
                helps ensure you get an uncontaminated sample.
              </p>
            </Panel>

            <Panel
              className="fqaa_panel"
              header="How do I update my subscription order?"
              key="17"
            >
              <p>
                Log in to your account and select the Manage my subscriptions
                option. From here, you can pause and reactivate your
                subscription or cancel your subscription (up to 7 days before
                expected delivery).To update the information about your pet,
                select the My pet details option where you can remove, add or
                edit pets associated with your account.
              </p>
            </Panel>
          </Collapse>
        </section>

        <section id="faq" className="section no-top-padding wf-section">
          <div className="container">
            <h2>Instagram Feeds</h2>
            <div className="collection-list-wrapper-4 w-dyn-list">
              <div role="list" className="collection-list-3 w-dyn-items">
                <div role="listitem" className="w-dyn-item">
                  <Link
                    href="https://www.instagram.com/p/CpknkAeP2bW/"
                    // target="_blank"
                    className="ig-link w-inline-block"
                    passHref
                  >
                    <>
                    <Image
                      src="https://uploads-ssl.webflow.com/63f72693418023a99f8b9c8b/6409f268524846c752dae4b1_334492252_9429526233785312_381940871113454095_n.jpeg"
                      loading="lazy"
                      alt=""
                      width={"1000%"}
                      height={"1000%"}
                      style={{border:"2px solid black"}}
                      // layout="fill"
                      // objectFit="contain"
                      className="image-105"
                    />
                    <div className="ig-icon w-embed">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 363 363"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.458256 30.7088C0.458256 22.6858 3.64534 14.9915 9.3184 9.31847C14.9915 3.64542 22.6858 0.458332 30.7087 0.458332H332.258C336.234 0.451839 340.172 1.22962 343.847 2.74714C347.522 4.26466 350.862 6.49212 353.675 9.30199C356.488 12.1119 358.719 15.449 360.24 19.1222C361.762 22.7955 362.544 26.7328 362.542 30.7088V332.258C362.546 336.235 361.766 340.174 360.247 343.849C358.727 347.524 356.498 350.863 353.687 353.676C350.876 356.488 347.538 358.719 343.864 360.241C340.189 361.762 336.251 362.544 332.275 362.542H30.7087C26.7347 362.542 22.7998 361.759 19.1285 360.237C15.4573 358.716 12.1218 356.486 9.31258 353.676C6.50335 350.865 4.27546 347.528 2.75621 343.856C1.23695 340.184 0.456094 336.249 0.458256 332.275V30.7088ZM143.777 138.511H192.807V163.133C199.884 148.978 217.988 136.24 245.194 136.24C297.35 136.24 309.71 164.433 309.71 216.161V311.982H256.928V227.945C256.928 198.485 249.851 181.862 231.879 181.862C206.945 181.862 196.576 199.785 196.576 227.945V311.982H143.777V138.511ZM53.2566 309.727H106.055V136.24H53.2566V309.727ZM113.609 79.6558C113.709 84.1765 112.904 88.6715 111.243 92.877C109.582 97.0826 107.098 100.914 103.936 104.146C100.774 107.379 96.9979 109.947 92.8299 111.7C88.6619 113.454 84.1857 114.357 79.664 114.357C75.1422 114.357 70.666 113.454 66.4981 111.7C62.3301 109.947 58.5543 107.379 55.3924 104.146C52.2304 100.914 49.7459 97.0826 48.0847 92.877C46.4235 88.6715 45.6191 84.1765 45.7187 79.6558C45.9141 70.7824 49.5763 62.3382 55.921 56.1317C62.2656 49.9252 70.7884 46.4498 79.664 46.4498C88.5396 46.4498 97.0623 49.9252 103.407 56.1317C109.752 62.3382 113.414 70.7824 113.609 79.6558Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    </>
                  </Link>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <Link
                    href="https://www.instagram.com/p/Cpj3NWLPBoS/"
                    target="_blank"
                    className="ig-link w-inline-block"
                  >
                    <>
                    <Image
                      width={"1000%"}
                      height={"1000%"}
                      src="https://uploads-ssl.webflow.com/63f72693418023a99f8b9c8b/64098fc1250ac12d0fd44643_332123138_729656732036342_4419359245497365322_n.jpeg"
                      loading="lazy"
                      alt=""
                      className="image-105"
                    />
                    <div className="ig-icon w-embed">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 363 363"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.458256 30.7088C0.458256 22.6858 3.64534 14.9915 9.3184 9.31847C14.9915 3.64542 22.6858 0.458332 30.7087 0.458332H332.258C336.234 0.451839 340.172 1.22962 343.847 2.74714C347.522 4.26466 350.862 6.49212 353.675 9.30199C356.488 12.1119 358.719 15.449 360.24 19.1222C361.762 22.7955 362.544 26.7328 362.542 30.7088V332.258C362.546 336.235 361.766 340.174 360.247 343.849C358.727 347.524 356.498 350.863 353.687 353.676C350.876 356.488 347.538 358.719 343.864 360.241C340.189 361.762 336.251 362.544 332.275 362.542H30.7087C26.7347 362.542 22.7998 361.759 19.1285 360.237C15.4573 358.716 12.1218 356.486 9.31258 353.676C6.50335 350.865 4.27546 347.528 2.75621 343.856C1.23695 340.184 0.456094 336.249 0.458256 332.275V30.7088ZM143.777 138.511H192.807V163.133C199.884 148.978 217.988 136.24 245.194 136.24C297.35 136.24 309.71 164.433 309.71 216.161V311.982H256.928V227.945C256.928 198.485 249.851 181.862 231.879 181.862C206.945 181.862 196.576 199.785 196.576 227.945V311.982H143.777V138.511ZM53.2566 309.727H106.055V136.24H53.2566V309.727ZM113.609 79.6558C113.709 84.1765 112.904 88.6715 111.243 92.877C109.582 97.0826 107.098 100.914 103.936 104.146C100.774 107.379 96.9979 109.947 92.8299 111.7C88.6619 113.454 84.1857 114.357 79.664 114.357C75.1422 114.357 70.666 113.454 66.4981 111.7C62.3301 109.947 58.5543 107.379 55.3924 104.146C52.2304 100.914 49.7459 97.0826 48.0847 92.877C46.4235 88.6715 45.6191 84.1765 45.7187 79.6558C45.9141 70.7824 49.5763 62.3382 55.921 56.1317C62.2656 49.9252 70.7884 46.4498 79.664 46.4498C88.5396 46.4498 97.0623 49.9252 103.407 56.1317C109.752 62.3382 113.414 70.7824 113.609 79.6558Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    </>
                  </Link>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <Link
                    href="https://www.instagram.com/p/CpjYfCvI7y6/"
                    target="_blank"
                    className="ig-link w-inline-block"
                  ><>
                    <Image
                      src="https://uploads-ssl.webflow.com/63f72693418023a99f8b9c8b/640950a4ffb6d24f6cb84a39_334288629_1677301072707663_5921840318058457387_n.jpeg"
                      loading="lazy"
                      width={"1000%"}
                      height={"1000%"}
                      alt=""
                      className="image-105"
                    />
                    <div className="ig-icon w-embed">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 363 363"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.458256 30.7088C0.458256 22.6858 3.64534 14.9915 9.3184 9.31847C14.9915 3.64542 22.6858 0.458332 30.7087 0.458332H332.258C336.234 0.451839 340.172 1.22962 343.847 2.74714C347.522 4.26466 350.862 6.49212 353.675 9.30199C356.488 12.1119 358.719 15.449 360.24 19.1222C361.762 22.7955 362.544 26.7328 362.542 30.7088V332.258C362.546 336.235 361.766 340.174 360.247 343.849C358.727 347.524 356.498 350.863 353.687 353.676C350.876 356.488 347.538 358.719 343.864 360.241C340.189 361.762 336.251 362.544 332.275 362.542H30.7087C26.7347 362.542 22.7998 361.759 19.1285 360.237C15.4573 358.716 12.1218 356.486 9.31258 353.676C6.50335 350.865 4.27546 347.528 2.75621 343.856C1.23695 340.184 0.456094 336.249 0.458256 332.275V30.7088ZM143.777 138.511H192.807V163.133C199.884 148.978 217.988 136.24 245.194 136.24C297.35 136.24 309.71 164.433 309.71 216.161V311.982H256.928V227.945C256.928 198.485 249.851 181.862 231.879 181.862C206.945 181.862 196.576 199.785 196.576 227.945V311.982H143.777V138.511ZM53.2566 309.727H106.055V136.24H53.2566V309.727ZM113.609 79.6558C113.709 84.1765 112.904 88.6715 111.243 92.877C109.582 97.0826 107.098 100.914 103.936 104.146C100.774 107.379 96.9979 109.947 92.8299 111.7C88.6619 113.454 84.1857 114.357 79.664 114.357C75.1422 114.357 70.666 113.454 66.4981 111.7C62.3301 109.947 58.5543 107.379 55.3924 104.146C52.2304 100.914 49.7459 97.0826 48.0847 92.877C46.4235 88.6715 45.6191 84.1765 45.7187 79.6558C45.9141 70.7824 49.5763 62.3382 55.921 56.1317C62.2656 49.9252 70.7884 46.4498 79.664 46.4498C88.5396 46.4498 97.0623 49.9252 103.407 56.1317C109.752 62.3382 113.414 70.7824 113.609 79.6558Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    </>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer></Footer>
      </>
    </div>
  );
};

export default Home;