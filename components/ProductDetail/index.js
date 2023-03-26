import React, { useContext } from "react";
import CartItemsContext from "../../store/Item";
import { Navbar } from "../Navbar";
import { Button, Image, Space } from "antd";
import { TagOutlined } from "@ant-design/icons";




export const ProductDetailsC = ({data}) =>{
    const {cartItems,setCartItems, showDrawer, totalCount } = useContext(CartItemsContext);

    const addItem = (item) => {
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        setCartItems([...cartItems]);
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    };
   
    const removeItem = (item) => {
      const newCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(newCartItems);
    };
  
   
  
    const removeOneItem = (item) => {
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        setCartItems([...cartItems]);
      } else {
        removeItem(item);
      }
    };
  
  
      const contentStyle = {
          height: '100%',
          color: '#fff',
          // lineHeight: '160px',
          textAlign: 'center',
   
        };
        console.log("data is ",data)


return <>
<Navbar showDrawer={showDrawer} itemsCount={totalCount}/>

<div className="product_info">
<div className="product_info_left">

<Space>
  <Button
    className="custom-button-2"
    type="primary"
    onClick={() => addItem(data)}
  >
    Add to Cart
  </Button>
  <Button
    className="custom-button"
    type="primary"
    onClick={() => removeOneItem(data)}
  >
    Remove
  </Button>
</Space>
<br/>
<br/>

    <div className="product_info_left_images">

    <Space>
    {
        data?.images?.map((e,i)=>{
            return <Image key={i} className="courasel_im" height={100} width={100}  src={e} style={contentStyle}></Image>
        })
    } 

    </Space>
    </div>

    <br/>
    <br/>

    <div className="product_info_left_image" >
        <Image
         className="product_info_left_image_1"
         src ={data?.image_url}
        >

        </Image>
    </div>

</div>
<div className="product_info_right">
    <h1 className="product_info_right_heading"> {data?.name}</h1>
    {/* <div className="product_info_right_tag">Free Shipping</div> */}
    <div className="product_info_right_tag"><TagOutlined style={{color:"green"}} className="product_info_right_tag_icon" /><span className="span-icon"> </span>Free Shipping</div>
    <div className="product_info_right_cost">£ {data?.cost} GBP <span className="product_info_right_cost_vat">(VAT included)</span></div>
    <p className="product_info_right_para">{data?.description}</p>
    <div className="product_info_right_features"> 
    <p>Key Features: </p>
    <br/>
     {data?.features?.map((e,i)=>{
       return <p key={i} className="product_info_right_features_one">✅ {e}</p>

     })}
        
    </div>
</div>

</div>
</>

    
}
