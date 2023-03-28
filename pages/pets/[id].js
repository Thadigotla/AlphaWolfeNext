import React from "react";
import ManageProductDetail from "../../components/ManageProductDetail/index";
import ManagePaymentDetail from "../../components/ManagePayment/index";
import CustomLayout from "../../styles/components/produc";
import { useRouter } from "next/router";
import ManageOrder from "../../components/ManageOrder/index"

const ItemDetails = () => {

    const router = useRouter()
    const params = router.query
  
    let whereCondition = {}
  
    if(params?.id){
      whereCondition = { "pet_id":{_eq:params?.id}} 
    }
  
    console.log("params",whereCondition, params)
  


  return (
    <CustomLayout>
      <div style={{ textAlign: "right" }}>
        <ManageOrder         where={whereCondition}></ManageOrder>
        {/* <ManageProductDetail where={whereCondition}></ManageProductDetail>
        <ManagePaymentDetail where={whereCondition}></ManagePaymentDetail> */}
      </div>
    </CustomLayout>
  );
};

export default ItemDetails;
