import { Button, Col, Form, Input, Modal, Row } from "antd";
import {useEffect, useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';

const EditModal = ({data}) =>{

    
    const mutation = gql`mutation update_by_pk($id: uuid!, $set: products_set_input!)   {
        update_products_by_pk(pk_columns: {id: $id}, _set: $set) {
        id
        }
    }`


    const [isModalOpen, setIsModalOpen] = useState(false);
 
    const [Data, setData]:any = useState({})
 
    const [mutateFunction, { data:d, loading, error }] = useMutation(mutation);
 
 
 
    useEffect(()=>{
 
       if(data?.id)   setData(data)
 
    },[data])
 
 
    const onFinish = async () =>{
 
       try{
 
        const result:any = await mutateFunction({variables:{
             id:data?.id, 
             set:{
                cost : Data?.cost,
                currency : Data?.currency,
                description : Data?.description,
                name : Data?.name
             }
          }})
 
          if(result?.data?.update_products_by_pk?.id) toast.success("success")
 
       }catch(error){
         toast.error(`error : ${error}`)
       }
  
    }
 
    const onChange = (e) =>{
        setData({...Data, [e?.target?.id]:e?.target?.value})
    }
 
 
    const showModal = () => { setIsModalOpen(true); };
    const handleOk = () => { setIsModalOpen(false); };
    const handleCancel = () => { setIsModalOpen(false); };
 
     return     <>
                <Button type="primary" onClick={showModal}>
                   { !data?.id ? "CREATE" :  "Edit"}
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} okText="Close" onOk={handleOk} onCancel={handleCancel}>
                   <Form    onChange={onChange}    onFinish={onFinish}>
                      <Row gutter={15}>
                         <Col  className="gutter-row"  >
                           <Input id="name" required  placeholder='Name' value={Data?.name} />
                         </Col>
                         <Col  className="gutter-row">
                         <Input id="description"  required placeholder='Descritpion' value={Data?.description} />
                         </Col>
                         <Col  className="gutter-row">
                         <Input id="cost" required placeholder='Cost' value={Data?.cost} />
                         </Col>
                         <Col  className="gutter-row">
                         <Input id="currency" required placeholder='Currencty' value={Data?.currency} />
                         </Col>
                      </Row>
                    <Button htmlType='submit'  type='primary'>Submit</Button>
 
                    </Form>
             
                </Modal>
   </>
 
 }

 