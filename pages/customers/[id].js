import React from "react";
import ManageProductDetail from "../../components/ManageProductDetail/index";
import ManagePaymentDetail from "../../components/ManagePayment/index";
import ManagePaymentPetDetail from "../../components/ManagePets/index";
import ManageOrderDetail from "../../components/ManageOrder/index";
import CustomLayout from "../../styles/components/produc";
import { useRouter } from "next/router";

const ItemDetails = () => {

    const router = useRouter()
    const params = router.query
  
    let whereCondition = {}
  
    if(params?.id){
      whereCondition = { "user_id":{_eq:params?.id}} 
    }
  
    console.log("params",whereCondition, params)
  


  return (
    <CustomLayout>
      <div style={{ textAlign: "right" }}>
        <ManagePaymentPetDetail   where={whereCondition}></ManagePaymentPetDetail>
        <ManageOrderDetail   where={whereCondition}></ManageOrderDetail>
        {/* <ManageProductDetail where={whereCondition}></ManageProductDetail> */}
        <ManagePaymentDetail where={whereCondition}></ManagePaymentDetail>
      </div>
    </CustomLayout>
  );
};

export default ItemDetails;
