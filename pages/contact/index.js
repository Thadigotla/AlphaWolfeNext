import { Button, Form, Input, Select } from "antd"
import { Navbar } from "../../components/Navbar/index";
import React from "react"
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { Footer } from "../../components/Footer";

const ContactForm = () =>{

  const mutationQuery = gql `mutation InsertContactDetails($object:contact_details_insert_input!) {
    insert_contact_details_one(object:  $object) {
       id
   
    }
  }
      `

  const [mutateContat] = useMutation(mutationQuery)

  const [message, showMessage] = React.useState(false)
  
  const { TextArea } = Input;



  const onFinish =async (values) => {
    try{
      const result = await  mutateContat({variables:{object:values}})
       if(result?.data?.insert_contact_details_one?.id){
        showMessage(true)
        return toast.success("will contact you shortly")
       }
      console.log('Success:', values,result);
    }catch(error){
      toast.error(error)
    }



  };
    return <>
   <Navbar  />

  <section className="form_" style={{marginTop:"8%"}}>

<div className="form_left">

 {!message ? <div >
  <h2 className="form_left_heading">Know more about us</h2>
  
  <Form    
     name="basic"
     labelCol={{ span: 24 }}
    //  wrapperCol={{ span: 24 }}
     style={{ maxWidth: 600 , margin:"0 auto"}}
     initialValues={{ remember: true }}
     onFinish={onFinish}
     autoComplete="off"
   
   >
 
   
  <Form.Item label="Name" name="name" className="form_field_wrapper_label">
   <Input className="form_field_wrapper_input"/>
 </Form.Item>
 

 

 <Form.Item label="Email Address"  name="email" className="form_field_wrapper_label">
   <Input className="form_field_wrapper_input" />
 </Form.Item>
 

 

 <Form.Item label="Phone"  name="phone_no" className="form_field_wrapper_label">
   <Input className="form_field_wrapper_input" />
 </Form.Item>


 

 <Form.Item label="Product" name="product" className="form_field_wrapper_label">
<Select>
  <Select.Option value="other">Other</Select.Option>
  <Select.Option value="EFA - Essential Fatty Acids">EFA - Essential Fatty Acids</Select.Option>
  <Select.Option value="Minerals">Minerals</Select.Option>
  <Select.Option value="Alpha Nutrition Test">Alpha Nutrition Test</Select.Option>
</Select>
</Form.Item>
 

 
<Form.Item label="message" name="message" className="form_field_wrapper_label">
<TextArea  rows={4} />
</Form.Item>
 

<Form.Item wrapperCol={{  span: 24 }}>
      <Button   htmlType="submit" block>
        Submit
      </Button>
    </Form.Item>
</Form></div> : 
<div style={{textAlign:"center"}}>

<h3>Thank you for contacting Alpha Wolfe!</h3>
<h3> We'll get back to you soon!</h3>

</div>

}


</div>



<div className="form_right">

  <div className="form_right_block_1">
    <h3 className="form_right_block_1_label">Locations</h3>
    <div className="form_right_block_1_details">
      <div>Be11a Js House, Ironmongers Mews,</div>
      <div>Church Road, Barnes,</div>
      <div>London, England, SW13 0DD</div>
    </div>
  </div>

  <div className="form_right_block_1">
    <h3 className="form_right_block_1_label">Phone</h3>
    <div className="form_right_block_1_details">02036060049 </div>
  </div>



  <div className="form_right_block_1">
    <h3 className="form_right_block_1_label">Stay connected on</h3>
    <div className="footer-links-wrapper">
              <a
                href="https://www.instagram.com/alphawolfeuk/"
                 rel="noreferrer"
                className="social-links-wrapper w-inline-block"
              >
                <div className="sm-icon w-embed" style={{color:"#c4b2a0"}}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 350 350"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M174.953 116.642C142.819 116.642 116.596 142.866 116.596 175C116.596 207.134 142.819 233.358 174.953 233.358C207.087 233.358 233.31 207.134 233.31 175C233.31 142.866 207.087 116.642 174.953 116.642ZM349.98 175C349.98 150.834 350.199 126.886 348.842 102.764C347.485 74.7448 341.093 49.878 320.605 29.3891C300.073 8.85649 275.25 2.50846 247.232 1.15129C223.066 -0.205877 199.119 0.013022 174.997 0.013022C150.831 0.013022 126.884 -0.205877 102.762 1.15129C74.7434 2.50846 49.877 8.90027 29.3886 29.3891C8.85633 49.9217 2.50841 74.7448 1.15127 102.764C-0.205873 126.93 0.0130217 150.877 0.0130217 175C0.0130217 199.123 -0.205873 223.114 1.15127 247.236C2.50841 275.255 8.90011 300.122 29.3886 320.611C49.9208 341.143 74.7434 347.492 102.762 348.849C126.928 350.206 150.875 349.987 174.997 349.987C199.163 349.987 223.11 350.206 247.232 348.849C275.25 347.492 300.116 341.1 320.605 320.611C341.137 300.078 347.485 275.255 348.842 247.236C350.243 223.114 349.98 199.166 349.98 175ZM174.953 264.792C125.264 264.792 85.1627 224.69 85.1627 175C85.1627 125.31 125.264 85.2081 174.953 85.2081C224.642 85.2081 264.743 125.31 264.743 175C264.743 224.69 224.642 264.792 174.953 264.792ZM268.421 102.501C256.819 102.501 247.451 93.1322 247.451 81.5306C247.451 69.929 256.819 60.5602 268.421 60.5602C280.022 60.5602 289.391 69.929 289.391 81.5306C289.394 84.2854 288.854 87.0139 287.801 89.5597C286.749 92.1055 285.204 94.4187 283.256 96.3666C281.308 98.3146 278.995 99.8591 276.45 100.912C273.904 101.964 271.175 102.504 268.421 102.501Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/alphawolfeuk/"
                 rel="noreferrer"
                className="social-links-wrapper w-inline-block"
              >
                <div className="sm-icon w-embed" style={{color:"#c4b2a0"}}>
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
              </a>
              <a
                href="https://twitter.com/alphawolfeuk"
                 rel="noreferrer"
                className="social-links-wrapper w-inline-block"
              >
                <div className="sm-icon w-embed" style={{color:"#c4b2a0"}}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 109 88"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M108.875 10.9697C104.904 12.6964 100.641 13.8834 96.1624 14.4014C100.738 11.7035 104.235 7.43003 105.897 2.34715C101.536 4.88823 96.7788 6.67593 91.8242 7.63507C89.7401 5.45055 87.2328 3.71346 84.4553 2.52973C81.6778 1.346 78.6883 0.74044 75.6691 0.749989C63.4421 0.749989 53.5353 10.5165 53.5353 22.5492C53.5353 24.2542 53.7296 25.9162 54.1073 27.5133C45.3372 27.0969 36.7502 24.8569 28.8942 20.9363C21.0381 17.0157 14.0856 11.5006 8.48014 4.7429C6.51134 8.05703 5.47477 11.8416 5.48005 15.6965C5.48005 23.2506 9.39742 29.9414 15.3328 33.8372C11.8196 33.7271 8.3815 32.7918 5.29659 31.1069V31.3767C5.32993 36.443 7.11822 41.3411 10.357 45.2371C13.5958 49.133 18.0848 51.786 23.0597 52.7442C19.7937 53.6078 16.3763 53.7332 13.0558 53.1112C14.5033 57.4696 17.2718 61.2692 20.9771 63.9824C24.6824 66.6956 29.1406 68.1878 33.7326 68.2519C25.8543 74.3228 16.1815 77.6028 6.23547 77.5759C4.45484 77.5759 2.6958 77.4679 0.958344 77.2737C11.1076 83.6978 22.8758 87.1003 34.8873 87.0833C75.6151 87.0833 97.8783 53.8666 97.8783 25.0528L97.8028 22.2254C102.144 19.1744 105.896 15.3607 108.875 10.9697Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>
              <a
                href="https://www.youtube.com/@alphawolfeuk"
                 rel="noreferrer"
                className="social-links-wrapper w-inline-block"
              >
                <div className="sm-icon w-embed" style={{color:"#c4b2a0"}}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 362 290"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M353.569 45.5055C361.833 77.73 361.833 145 361.833 145C361.833 145 361.833 212.27 353.569 244.495C348.976 262.307 335.54 276.321 318.524 281.059C287.619 289.667 181 289.667 181 289.667C181 289.667 74.435 289.667 43.4763 281.059C26.3876 276.249 12.9697 262.252 8.43083 244.495C0.166748 212.27 0.166748 145 0.166748 145C0.166748 145 0.166748 77.73 8.43083 45.5055C13.024 27.6934 26.4599 13.6788 43.4763 8.94101C74.435 0.333341 181 0.333344 181 0.333344C181 0.333344 287.619 0.333341 318.524 8.94101C335.613 13.7512 349.03 27.7477 353.569 45.5055ZM144.833 208.292L253.333 145L144.833 81.7083V208.292Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>
              <a
                href="https://www.facebook.com/alphawolfelondon"
                 rel="noreferrer"
                className="social-links-wrapper w-inline-block"
              >
                <div className="sm-icon w-embed" style={{color:"#c4b2a0"}}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 279 279"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M191.184 278.25V170.788H227.259L232.657 128.913H191.17V102.176C191.17 90.0495 194.542 81.78 211.941 81.78H234.114V44.3175C223.376 43.1748 212.583 42.619 201.785 42.6525C169.817 42.6525 147.936 62.1746 147.936 98.0138V128.913H111.75V170.788H147.922V278.25H16.068C7.60425 278.25 0.75 271.396 0.75 262.932V16.068C0.75 7.60425 7.60425 0.75 16.068 0.75H262.932C271.396 0.75 278.25 7.60425 278.25 16.068V262.932C278.25 271.396 271.396 278.25 262.932 278.25H191.184Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>
              <a
                href="https://in.pinterest.com/alphawolfelondon/"
                 rel="noreferrer"
                className="social-links-wrapper w-inline-block"
              >
                <div className="sm-icon w-embed" style={{color:"#c4b2a0"}}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 329 329"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 164.5C0 234.728 44.0175 294.688 105.965 318.28C104.457 305.435 102.854 284.256 106.308 269.396C109.283 256.62 125.513 187.996 125.513 187.996C125.513 187.996 120.62 178.195 120.62 163.677C120.62 140.922 133.807 123.923 150.243 123.923C164.226 123.923 170.97 134.41 170.97 146.981C170.97 161.032 162.019 182.033 157.399 201.512C153.547 217.812 165.583 231.109 181.649 231.109C210.752 231.109 233.138 200.416 233.138 156.11C233.138 116.891 204.953 89.488 164.719 89.488C118.138 89.488 90.7903 124.431 90.7903 160.552C90.7903 174.63 96.2051 189.71 102.977 197.921C103.554 198.541 103.962 199.299 104.162 200.123C104.361 200.946 104.345 201.807 104.115 202.623C102.867 207.805 100.098 218.922 99.5636 221.198C98.8371 224.186 97.1921 224.83 94.0803 223.377C73.6275 213.864 60.8513 183.966 60.8513 159.949C60.8513 108.282 98.371 60.8513 169.037 60.8513C225.845 60.8513 269.999 101.332 269.999 155.425C269.999 211.862 234.426 257.292 185.021 257.292C168.421 257.292 152.834 248.655 147.488 238.47C147.488 238.47 139.277 269.753 137.289 277.402C133.423 292.262 122.703 311.07 116.055 321.748C131.381 326.464 147.639 329 164.5 329C255.345 329 329 255.345 329 164.5C329 73.6549 255.345 0 164.5 0C73.6549 0 0 73.6549 0 164.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>
            </div>
    <div className="form_right_block_1_details"> </div>
  </div>

</div>

</section>


<Footer/>


{/* <section className="footer">

<div className="footer_left"> 

 <div className="footer_left_heading">  ALPHA WOLFE </div>
 <div className="footer_left_address">  
 <div className="footer_left_address_one">Be11a Js House, Ironmongers Mews,</div>
 <div className="footer_left_address_two">Church Road, Barnes, London, England,</div>
 <div className="footer_left_address_three">SW13 0DD</div>
  </div>
 <div className="footer_left_email">  contact@alpha-wolfe.com</div>
 {/* <div className="footer_left_logos"> 
  <span></span>
  <span></span>
   </div> */}

{/* </div> */}
{/* <div className="footer_right">

  
  <h3 className="footer_right_heading">Know more about us</h3>
  <div className="footer_right_input">
  <form className="footer_right_input_form"  id="email-form" name="email-form" data-name="Email Form" method="get"  aria-label="Email Form">
    <input className="footer_right_input_form_input" type="email"   name="email-2" data-name="Email 2" placeholder="Enter Email Here" id="email-2" required/>
    <input className="footer_right_input_form_button" type="submit" value="Send" data-wait="Please wait..." />
  </form>


  </div>
  <div className="footer_right_t_and_c">Terms and Conditions</div>
  
  
</div> */}


{/* </section> */}

</>
}



export default ContactForm;