import { gql } from "@apollo/client";
import React, { useContext } from "react";
import { client } from "../_app";
 import { Navbar } from "../../components/Navbar";
import { Button, Carousel, Image, Space } from "antd";
import { TagOutlined } from "@ant-design/icons";
import CartItemsContext from "../../store/Item";
import { ProductDetailsC } from "../../components/ProductDetail";
import { useRouter } from "next/router";
import  DrawerComp from "../../components/Drawer/index"


const ProductDetail = ({id,data,othersProducts}) =>{

  console.log("othersProducts",othersProducts)

  const router = useRouter()
  
  const contentStyle = {
    height: '100%',
    color: '#fff',
    // lineHeight: '160px',
    textAlign: 'center',

  };
   const {cartItems,setCartItems, showDrawer, totalCount } = useContext(CartItemsContext);
 
    return <>
      <DrawerComp  />

      <ProductDetailsC data={data}/>
 
      <h2  style={{marginLeft:"15%", marginTop:"15%"}}>You may also need</h2>
      <br/>
      <br/>

      <div className="otherproducts">
        {
          othersProducts?.map((e,i)=>{
            return <div key={i} className="otherproducts_images">
                  
                    <Image
                     className="otherproducts_img"
                     src ={e?.image_url}

                    >
            
                    </Image>
                <br/>

     
                <div className="otherproducts_img_images">
            
                <Space>
                {
                    e?.images?.map((e,i)=>{
                        return <Image key={i} className="courasel_im" height={100} width={100}  src={e} style={contentStyle}></Image>
                    })
                } 
            
                </Space>
                <h3 className="other_details_name" onClick={()=>router.push(`/products/${e?.id}`)}>
                  {e?.name?.length> 10 ? e?.name?.substring(0,10)+"..." : e?.name}
                  </h3>
                <div className="product_info_right_cost">£ {e?.cost} GBP <span className="product_info_right_cost_vat">(VAT included)</span></div>

                </div>
            
            

            
            </div>
          })
        }

      </div>
        {/* <div className="product_info">
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

                <div className="product_info_left_image" >
                    <Image
                     className="product_info_left_image_1"
                     src ={data?.image_url}
                    >

                    </Image>
                </div>

            </div>
            <div className="product_info_right">
                <h1 className="product_info_right_heading"> Buy now EFA – Essential Fatty Acids</h1>
                <div className="product_info_right_tag"><TagOutlined style={{color:"green"}} className="product_info_right_tag_icon" /><span className="span-icon"> </span>Free Shipping</div>
                <div className="product_info_right_cost">£ {data?.cost} GBP <span className="product_info_right_cost_vat">(VAT included)</span></div>
                <p className="product_info_right_para">{data?.description}</p>
                <div className="product_info_right_features"> 
                <p>Key Features: </p>
                <br/>
                 {data?.features?.map((e,i)=>{
                   return <p className="product_info_right_features_one">✅ {e}</p>

                 })}
                    
                </div>
            </div>

        </div> */}
    </>
}


export async function getServerSideProps(context){

 const {params} = context;

 const query = gql` query products_by_pk($id:uuid!) {
    products_by_pk(id: $id) {
      cost
      created_at
      currency
      description

      features
      id
      image_id
      image_url
      images
      name
      uid
      updated_at
    }
  }
  `;
  const {data:product} = await client.query({query, 
    variables:{
        "id": params?.id
      }
    });


    
 const Otherquery = gql` query products($id:uuid!) {
  othersProducts: products(where: {id: {_nin: [$id]}}) {
    uid
    features
    images
    cost
    currency
    description
    image_url
    name
    created_at
    updated_at
    id
    image_id
  }
}
`;
const othersProducts = await client.query({query:Otherquery, 
  variables:{
      "id": params?.id
    }
  });


 console.log("idparamss",othersProducts)

 return {
    props : {
        id:params?.id,
        data:product?.products_by_pk,
        othersProducts:othersProducts?.data?.othersProducts
    }
 }


}


export default ProductDetail;