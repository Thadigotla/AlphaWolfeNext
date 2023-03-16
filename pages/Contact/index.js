import { Form, Input, Select } from "antd"
import { Navbar } from "../../components/Navbar/index";
import React from "react"

const ContactForm = () =>{

  const { TextArea } = Input;

    return <>
        <Navbar  />

            <section className="form_" style={{marginTop:"8%"}}>

<div className="form_left">

  <h3 className="form_left_heading">Know more about us</h3>
  <Form    
   labelCol={{
   span: 4,
  }}
// wrapperCol={{
//   span: 14,
// }}
layout="horizontal"
// style={{
//   maxWidth: "80%"
// }}
>
  <div className="form_field_wrapper">
   
  <Form.Item label="Name" className="form_field_wrapper_label">
   <Input className="form_field_wrapper_input"/>
 </Form.Item>
  </div>

  <div className="form_field_wrapper">

 <Form.Item label="Email Address" className="form_field_wrapper_label">
   <Input className="form_field_wrapper_input" />
 </Form.Item>
 </div>

 <div className="form_field_wrapper">

 <Form.Item label="Phone" className="form_field_wrapper_label">
   <Input className="form_field_wrapper_input" />
 </Form.Item>
 </div>


 <div className="form_field_wrapper">

 <Form.Item label="Select" className="form_field_wrapper_label">
<Select>
  <Select.Option value="demo">Other</Select.Option>
  <Select.Option value="demo">EFA - Essential Fatty Acids</Select.Option>
  <Select.Option value="demo">Minerals</Select.Option>
  <Select.Option value="demo">Alpha Nutrition Test</Select.Option>
</Select>
</Form.Item>
</div>

<div className="form_field_wrapper">


<Form.Item label="TextArea" className="form_field_wrapper_label">
<TextArea  rows={4} />
</Form.Item>
</div>


</Form>


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
    <h3 className="form_right_block_1_label">Connect us on</h3>
    <div className="form_right_block_1_details"> </div>
  </div>

</div>

</section>




<section className="footer">

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

</div>
<div className="footer_right">

  
  <h3 className="footer_right_heading">Know more about us</h3>
  <div className="footer_right_input">
  <form className="footer_right_input_form"  id="email-form" name="email-form" data-name="Email Form" method="get"  aria-label="Email Form">
    <input className="footer_right_input_form_input" type="email"   name="email-2" data-name="Email 2" placeholder="Enter Email Here" id="email-2" required/>
    <input className="footer_right_input_form_button" type="submit" value="Send" data-wait="Please wait..." />
  </form>


  </div>
  <div className="footer_right_t_and_c">Terms and Conditions</div>
  
  
</div>


</section>

</>
}



export default ContactForm;