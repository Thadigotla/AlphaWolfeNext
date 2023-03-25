import { gql } from "@apollo/client";
import React from "react";
import { client } from "../_app";


const ProductDetail = ({id,data}) =>{

    return <h1>{data?.cost}</h1>
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


 console.log("idparamss",product?.products_by_pk)

 return {
    props : {
        id:params?.id,
        data:product?.products_by_pk
    }
 }


}


export default ProductDetail;