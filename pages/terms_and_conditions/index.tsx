// import { useNavigation } from "@pankod/refine-core";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
// import { Cart } from "./Cart";
import { Navbar } from "../../components/Navbar/index";
import { nhost } from "../../pages/_app";
import { useRouter } from 'next/router';
import Image from 'next/image'


export interface INavbar {
  //   username: string;
  //   password: string;
}

const TermsConditions: React.FC = (props: any) => {
  //   // const { data, mutateAsync, isLoading } = useLogin();
  //   const { mutate: login, isLoading } = useLogin<ILoginForm>();
  //   const [form] = Form.useForm();
  // const { push } = useNavigation();
  const router  = useRouter();
  //   const onFinish = (values: any) => {
  //     console.log("Success:", values);

  //     login(values);

  //     props._setRole(values);
  //   };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log("Failed:", errorInfo);
  //   };

  const [open, setOpen] = useState(false);

  const userDetails: any = nhost.auth.getUser();

  const showDrawer = () => {
    setOpen(true);
  };

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

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <section id="faq" className="section wf-section">
        <div className="container">
          <div className="faq-body">
            <div className="faq-headline-wrapper">
              <div className="heading-wrapper">
                <Image
                  src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c615312face_heading%20bg.svg"
                  loading="lazy"
                  data-w-id="12aee5a2-b9d0-5dd6-7495-4e128ba51863"
                  alt=""
                  className="image-14"
                />
                <h2 className="section-heading">Terms and Conditions</h2>
              </div>
            </div>
            <div className="faq-grid-wrapper">
              <div className="w-layout-grid faq-grid">
                <p className="accordion-bottom-text-2">
                  Welcome to ALPHA WOLFE, a brand of SJSJ LTD, a pet health
                  vertical that offers natural supplements to promote the health
                  and well-being of your furry friends. These terms and
                  conditions apply to all purchases made through our website or
                  other channels. By making a purchase from ALPHA WOLFE, you
                  agree to the following terms and conditions:
                </p>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">Products</div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        Our products are designed to promote the health and
                        well-being of pets. While we believe in the
                        effectiveness of our products, we cannot guarantee
                        specific results, as the effectiveness of the product
                        may vary from pet to pet. Before using any of our
                        products, please consult with your veterinarian.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Ordering</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        Orders may be placed through our website or other
                        channels. All orders are subject to acceptance by ALPHA
                        WOLFE. We reserve the right to refuse any order for any
                        reason.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Payment</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        Payment must be made at the time of purchase. We accept
                        all major credit cards.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Shipping</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        We offer shipping within the United Kingdom. Shipping
                        times and costs may vary depending on the destination.
                        We are not responsible for any customs duties or fees
                        that may be imposed by the destination country.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Returns</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        If you are not satisfied with your purchase, please
                        contact us within 30 days of receiving the product to
                        request a return. The product must be unopened and in
                        its original condition. You will be responsible for the
                        cost of return shipping. Refunds will be issued within
                        14 days of receiving the returned product.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Liability</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        We are not liable for any harm or injury that may be
                        caused by the use of our products. By using our
                        products, you assume all risks associated with their
                        use.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">
                          Intellectual Property
                        </a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        All content on our website, including text, images, and
                        logos, are the property of ALPHA WOLFE and are protected
                        by copyright and other intellectual property laws. You
                        may not use any content from our website without our
                        prior written consent.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Privacy</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        We respect your privacy and are committed to protecting
                        your personal information. Please review our Privacy
                        Policy for more information.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Return Policy</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        We want you to be completely satisfied with your
                        purchase from Alpha Wolfe. If for any reason you are not
                        satisfied, you may return the unopened and undamaged
                        product within 30 days of purchase for a full refund.
                        Here are the details of our return policy:
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">
                          Returns Process
                        </a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        To initiate a return, please contact our customer
                        service team at [insert email address or phone number]
                        to obtain a Return Merchandise Authorization (RMA)
                        number. Once you have an RMA number, please package the
                        product securely and include all of the original
                        packaging materials, manuals, and accessories. Please
                        ensure that the RMA number is clearly marked on the
                        outside of the package.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">
                          Shipping and Handling Charges
                        </a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        Customers are responsible for all shipping and handling
                        charges for returned products. We recommend that you use
                        a trackable shipping method and purchase shipping
                        insurance to ensure that the product arrives safely. We
                        are not responsible for any products that are lost or
                        damaged in transit.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Refunds</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        We will issue a full refund for the purchase price of
                        the product, less any shipping and handling charges,
                        within 14 days of receiving the returned product.
                        Refunds will be issued to the original payment method
                        used to make the purchase.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">
                          Condition of Returned Products
                        </a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        To receive a full refund, the product must be unopened
                        and undamaged. If the product has been opened or
                        damaged, we may make deductions from the refund amount.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-click="faq" className="accordion">
                  <div className="accordion-top-2">
                    <div className="accordion-top-wrap-2">
                      <div className="accordion-top-text-2">
                        <a href="https://alpha-wolfe.com/faq/">Amendments</a>
                      </div>
                    </div>
                    <div className="accordion-top-icon-2">
                      <div className="accordion-top-icon-wrap-2">
                        <Image
                          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f7267539759c1eff12fb37_angle-small-down-free-icon-font%20(1).svg"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-bottom">
                    <div className="accordion-bottom-wrap-2">
                      <p className="accordion-bottom-text-2">
                        We reserve the right to update or modify these terms and
                        conditions at any time. Any changes will be effective
                        immediately upon posting on our website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="tnc-end-para">
                If you have any questions or concerns about our terms and
                conditions, please{" "}
                <a href="/contact" className="text-link">
                  contact us
                </a>
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
};

export default TermsConditions;