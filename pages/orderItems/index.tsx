import { gql, useMutation, useQuery } from '@apollo/client';
import {  Col, Form, Input, Modal, Row, Space, Table } from 'antd';
import { useState } from 'react';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import CustomLayout from '../../styles/components/produc';
import { useUserData } from '@nhost/nextjs';
import Image from 'next/image'
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { nhost } from '../_app';
import { EyeInvisibleOutlined, EyeOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons';
import moment from 'moment';


const query = gql` query GetOrderDetails($where: order_details_bool_exp,$limit:Int,$offset:Int) {
  order_details (where: $where, offset:$offset, limit:$limit,order_by:  {uid: desc}){
    quantity
		report
    uid
		status
		test_type
    report
		created_at
		updated_at
		card_id
		customer_id
    customer{
      id
      displayName
    }
		id

		order_id
    order{
      uid
    }
		product_id
    product{
      name
      uid
    }
		uuid
  }

  order_details_aggregate {
    aggregate{
      count
    }
  }

}
      `;

const update_mutation = gql`mutation update_by_pk($id: uuid!, $set: order_details_set_input!)   {
                        update_order_details_by_pk(pk_columns: {id: $id}, _set: $set) {
                        id
                        }
                     }`

const insert_mutation = gql `mutation MyMutation3($object:order_details_insert_input!) {
                             insert_order_details_one(object:$object) {
                                 id
                                }
                              }
`

const delete_mutation = gql`
                           mutation delete($id:uuid!){
                           delete_order_details_by_pk(id:$id){
                              id
                           }
   
   
                       }`


const EditModal = ({selectedRecord,Mdata, setMData,setIsModalOpen,isModalOpen,insertFunction, updateFunction, user_id, refetch}) =>{


   const showModal = () => { setIsModalOpen(true); };

   const handleOk = () => { setIsModalOpen(false); };

   const handleCancel = () => { setIsModalOpen(false); };

   const onChange = (e) =>{ 
      console.log("Checking event is ",e, e?.target?.id, e?.target?.value)
      
      setMData({...Mdata, [e?.target?.id]:e?.target?.value}) 
   }


   const fileUploadProps = {
    beforeUpload: async (file) => {
      const link = await nhost.storage.upload({ file, bucketId: "public" });
      const links = await nhost.storage.getPublicUrl({
        fileId: link.fileMetadata.id,
      });
    
      console.log("Links ",links)
      // setFileLink(links);
      setMData({...Mdata,"report":links})
      // refetch();
    },
  };


   console.log("MDATA is", Mdata)
   const onFinish = async () =>{

      console.log("selectedrecord",selectedRecord)
      try {
         if (selectedRecord) {
      console.log("selectedrecord",selectedRecord)

           // Editing an existing record
           const result = await updateFunction({
             variables: {
               id: Mdata.id,
               set: {
                 report:Mdata?.report
               }
             }
             
           });

           console.log("selectedrecord", result)
   
           if (result?.data?.update_order_details_by_pk?.id) {
             toast.success("Updated successfully");
             setIsModalOpen(false)

           }
         } else {
      console.log("selectedrecord else",selectedRecord)

           // Creating a new record
           const result = await insertFunction({
             variables: {
               object: {
                 cost: Mdata.cost,
                 currency: Mdata.currency,
                 description: Mdata.description,
                 name: Mdata.name
               }
             }
           });
   
           if (result?.data?.insert_order_details_one?.id) {
             toast.success("Created successfully");
             setIsModalOpen(false)

           }
         }
       } catch(error) {
         toast.error(`Error: ${error}`);
       }finally{
        refetch()

       }
   
         }



      return     <div >
               {/* <Button type="primary" onClick={showModal}>
                  { selectedRecord ? "EDIT" :  "CREATE"}
               </Button> */}
               <Modal title="Basic Modal" open={isModalOpen} okText="Close" onOk={handleOk} onCancel={handleCancel}>
                  <Form    onChange={onChange}    onFinish={onFinish}>
                     <Row gutter={15}>
                        {/* <Col  className="gutter-row"  >
                           <Input id="name" required  placeholder='Name' value={selectedRecord?.name} />
                        </Col>
                        <Col  className="gutter-row">
                        <Input id="description"  required placeholder='Descritpion' value={selectedRecord?.description} />
                        </Col>
                        <Col  className="gutter-row">
                        <Input id="cost" required placeholder='Cost' value={selectedRecord?.cost} />
                        </Col>
                        <Col  className="gutter-row">
                        <Input id="currency" required placeholder='Currencty' value={selectedRecord?.currency} />
                        </Col> */}
                        <Col  className="gutter-row">
                          <label htmlFor='report'> Report</label>
                          <Upload
                            style={{ color: "skyblue" }}
                            {...fileUploadProps}
                            accept="image/*"
                          >
                            Upload
                          </Upload>                 
                        </Col>

                     </Row>
                     <br/>
                     <Button htmlType='submit'  type='primary'>Submit</Button>

                     </Form>
            
               </Modal>
   </div>

}

function MyComponent() {

  const user = useUserData()

  const [Data, setData] = useState([])

  const [MData, setMData] = useState({})

  const [searchText, setSearchText] = useState(null)

  const [searchTextCondition, setsearchTextCondition] = useState(null)

  const [limit, setLimit] = useState(10)

  const [pageNo, setPageNo] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [updateFunction, { data:uData, loading:uLoading, error:uError }] = useMutation(update_mutation);

  const [insertFunction, { data:IData, loading:Iloading, error:IError }] = useMutation(insert_mutation);
  
  const [deleteFunction, { data:dData, loading:dLoading, error:dError}] = useMutation(delete_mutation);

  const { data, loading, error,refetch  } = useQuery(
    query,
    { variables:{
     "where":  searchTextCondition,
     limit:limit,
     offset:(pageNo-1)*limit
    } });

    
  const count = data?.pets_aggregate?.aggregate?.count

  const maxPage = Math.ceil(count/limit)

  const onChangeText = (e) =>{

    let where = {}
    if (e){
         where= {
        "_or":  [
          {"test_type": {"_ilike":"%"+e+"%" }},
          // {"type": {"_ilike":"%"+e+"%" }}
        ]
      }
    }
    setSearchText(e)
    setsearchTextCondition(where)

  }

  console.log("Page details ",pageNo)

  const NextPage = () =>{

      setPageNo((page) =>page+1)
  }

  const PreviousPage = () => {

    if(pageNo>0){
      setPageNo((page) =>page-1)
     }
  }

  const formatData = (data:[]) =>{ 
    
    

     let modifieData = []


     modifieData = data?.map((e:any,i)=>{

    return ({...e, 
             user_name : e?.customer?.displayName,
             order_uid : e?.order?.uid,
             product_uid:e?.product?.uid,
             product_name:e?.product?.name,

    
    })
     })
     console.log("Data is ",data,modifieData)

    
    
    return [...modifieData] }

  useEffect(()=>{
   if(data?.order_details){
      setData(formatData(data?.order_details))
   }
  },[data?.order_details])
  

  const handleEdit = (record) => {
   setSelectedRecord(record);
   setIsModalOpen(true);
   setMData(record)
 }

 const handleCreate = (record) => {
   setSelectedRecord(record);
   setIsModalOpen(true);
   setMData(record)

 }

 const handleDelete= (record) =>{
   console.log("delete record is",record)
   deleteFunction({variables:{id:record?.id}})

 }

   
    //Open new tab if clicks on an image
    const openInNewTab = (url) => {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer")
      if (newWindow) newWindow.opener = null
    }
  

  const columns = [
   { title: 'Id', dataIndex: 'uid', key: 'uid', },
   { title: 'Order Id', dataIndex: 'order_uid', key: 'order_uid', },
   { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', },
   { title: 'UserName', dataIndex: 'user_name', key: 'user_name', },
   { title: 'Product Id', dataIndex: 'product_uid', key: 'product_uid', },
   { title: 'Product Name', dataIndex: 'product_name', key: 'product_name', },
   { title: 'CreatedAt', dataIndex: 'created_at', key: 'created_at', render:(val) => moment(val).format('MMMM Do YYYY, h:mm:ss a') }, 

   { title: 'report', dataIndex: 'report', key: 'report',
    render: (text, record) => {
      return text ?  <EyeOutlined  onClick={()=>openInNewTab(text) }/> : <EyeInvisibleOutlined/>;
   }
},
  
   { title: 'Status', dataIndex: 'status', key: 'status', },
   { title: 'Test Type', dataIndex: 'test_type', key: 'test_type', },
   { title: 'CreatedAt', dataIndex: 'created_at', key: 'created_at', render:(val) => moment(val).format('MMMM Do YYYY, h:mm:ss a') }, 
   { title: 'Action', dataIndex: 'action', key: 'action', 
   
   render: (_,record) => {

      return (  <Space>
                  <Button color='red'  onClick={() => handleEdit(record)} type='ghost' icon={<EditOutlined   style={{ color: 'red' }}/>} >  </Button>
                  <Button  onClick={() => handleDelete(record)} type="ghost" icon={<DeleteFilled  style={{color: 'red'}} />}>  </Button>
                  </Space>

              )
                  
                  }, 
   
   },   
  ]

  console.log("new data", Data)

  // if (loading) return <div>Loading...</div>;

  // if (error) return <div>Error: {error.message}</div>;

  // if(!Data) return <div>Loading...</div>

 
  return (<>
 
 <div style={{display:'flex', justifyContent:"flex-end"}}>
           <Input type='text' style={{minWidth:"50px", width:"150px"}} placeholder='Search By Status' onChange={e=>onChangeText(e?.target?.value)} value={searchText}/>
           {/* <Button type="primary" onClick={handleCreate}>CREATE</Button> */}
  </div>
            <Table dataSource={Data} columns={columns} />
            <Button onClick={PreviousPage}
             disabled={pageNo<=1} 
            >Previous</Button>
            <Button onClick={NextPage} 
             disabled={pageNo >= maxPage}
             >Next</Button>
            <EditModal 
               selectedRecord={selectedRecord}
               Mdata={MData} 
               setMData={setMData}
               setIsModalOpen={setIsModalOpen}
               isModalOpen={isModalOpen}
               insertFunction ={insertFunction}
               updateFunction ={updateFunction}
               user_id={user?.id}
               refetch={refetch}
           />
        </>  );
}

function App() {
  return (
    <CustomLayout>

    <div style={{textAlign:"right"}}>
        <MyComponent />

    </div>
    </CustomLayout>

  );
}

export default App;

