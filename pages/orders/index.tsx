import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Input, Row, Table, Modal, Select } from 'antd';
import { useState } from 'react';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import CustomLayout from '../../styles/components/produc';
import { useUserData } from '@nhost/nextjs';
import { InputPicker } from 'rsuite';
import moment from 'moment';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';

const query = gql` query GetOrders($where: orders_bool_exp,$limit:Int,$offset:Int) {
  orders (where: $where, offset:$offset, limit:$limit,order_by: {uid: desc}) {
    user_id
		status
		created_at
		updated_at
		total_amount
    user_id 
    user{
      id
      displayName
    }
		id
		uid
    created_at
  }
  orders_aggregate {
    aggregate{
      count
    }
  }
}
     `;

const update_mutation = gql`mutation update_by_pk($id: uuid!, $set: orders_set_input!)   {
                        update_orders_by_pk(pk_columns: {id: $id}, _set: $set) {
                        id
                        }
                     }`

const insert_mutation = gql `mutation MyMutation3($object:orders_insert_input!) {
                             insert_orders_one(object:$object) {
                                 id
                                }
                              }
`

const delete_mutation = gql`
                           mutation delete($id:uuid!){
                           delete_orders_by_pk(id:$id){
                              id
                           }
                           }`

const EditData =gql`query Users {
                        users {
                          id
                          displayName
                        }

                        enum_order_status{
                          value
                          comment
                        }

                      }`

const status_data =gql`query OrderStatus {
  enum_order_status{
    value
    comment
  }
}`

const EditModal = ({selectedRecord,Mdata, setMData,setIsModalOpen,isModalOpen,insertFunction, updateFunction, user_id,refetch,UserData=[],OrderStatus=[]}) =>{

  console.log("Mdataasdasdsad",UserData,OrderStatus)

   const showModal = () => { setIsModalOpen(true); };

   const handleOk = () => { setIsModalOpen(false); };

   const handleCancel = () => { setIsModalOpen(false); };

   const onChange = (e) =>{ 
      console.log("Checking event is ",e, e?.target?.id, e?.target?.value)
      
      setMData({...Mdata, [e?.target?.id]:e?.target?.value}) 
   }

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
                status: Mdata.status,
                total_amount: Mdata.total_amount,
                user_id: Mdata.user_id
               }
             }
             
           });

           console.log("selectedrecord", result)
   
           if (result?.data?.update_orders_by_pk?.id) {
             toast.success("Updated successfully");
             setIsModalOpen(false)

           }
         } else {
      console.log("selectedrecord else",selectedRecord)

           // Creating a new record
           const result = await insertFunction({
             variables: {
               object: {
                 status: Mdata.status,
                 total_amount: Mdata.total_amount,
                 user_id: Mdata.user_id
               }
             }
           });
   
           if (result?.data?.insert_orders_one?.id) {
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


         const onSelects = (field,e) =>{

          console.log("Details ",field, e)

          setMData({...Mdata, [field]:e}) 

         }


         console.log("meta data", Mdata)


      return     <div >
 
               <Modal title="Basic Modal"  open={isModalOpen} okText="Close" onOk={handleOk} onCancel={handleCancel}>
                  <Form    onChange={onChange}    onFinish={onFinish} >
                     <Row gutter={[16, 16]}>
                      
                        <Col  className="gutter-row" span={12}>
                        <Input id="total_amount"  required placeholder='total_amount' value={Mdata?.total_amount} />
                        </Col>
                        <Col  className="gutter-row" span={12} >
                          <div>
 
                          <Select
                              showSearch
                              placeholder="User"
                              optionFilterProp="children"
                              value={Mdata?.user_id}
                              onChange={(e)=>onSelects("user_id",e)}
                              options={[...UserData]}
                             />                     
                                </div>

                        </Col>

                        <Col  className="gutter-row" span={12} >
 
                          <Select
                              showSearch
                              placeholder="status"
                              optionFilterProp="children"
                              value={Mdata?.status}
                              onChange={(e)=>onSelects("status",e)}
                              options={[...OrderStatus]}
                             />                     

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

  const { data, loading, error, refetch } = useQuery(
    query,
    { variables:{
     "where":  searchTextCondition,
     limit:limit,
     offset:(pageNo-1)*limit
    } });

    const { data:UserData, loading:ULoading, error:UError, refetch:URefetch } = useQuery(
      EditData,
      );

      
      

      console.log("UserData",UserData)
    

    const count = data?.orders_aggregate?.aggregate?.count

    const maxPage = Math.ceil(count/limit)


    const onChangeText = (e) =>{

      let where = {}
      if (e){
           where= {
          "_or":  [
            {"user": {"displayName":  {"_ilike": "%"+e+"%"}}
            },
            {"enum_order_status": {"value": {"_ilike":"%"+e+"%"} }}

          ]
          // {"type": {"_ilike":"%"+e+"%" }}
          // ]
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
    
    console.log("daasdasdis ",data)

    let modifiedData= [];

    // if(data?.length>0){

    modifiedData= data?.map((e:any,i)=>{

        return {...e,"user_name":user?.displayName}
       })
    // }


    return [...modifiedData] 
  
  
  
  }

  useEffect(()=>{
   if(data?.orders){

      setData(formatData(data?.orders))
   }
  },[data?.orders])
  

  const handleEdit = (record) => {
   setSelectedRecord(record);
   setIsModalOpen(true);
   setMData(record)
 }

 const handleCreate = (record) => {
  setSelectedRecord(null);
  setIsModalOpen(true);
  setMData(null)

 }

 const handleDelete=async (record) =>{
   console.log("delete record is",record)
  const result = await deleteFunction({variables:{id:record?.id}})
   refetch()

   if(result?.data?.delete_products_by_pk)return toast("deleted sucessfully")
   else toast("Not Deleted")

 }

  const columns = [
   { title: 'Id', dataIndex: 'uid', key: 'uid', },
   { title: 'Status', dataIndex: 'status', key: 'status', },
   { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount', },
   { title: 'UserName', dataIndex: 'user_name', key: 'user_name', },
   { title: 'CreatedAt', dataIndex: 'created_at', key: 'created_at', render:(val) => moment(val)?.format('MMMM Do YYYY, h:mm:ss a') }, 
   { title: 'Action', dataIndex: 'action', key: 'action', 
   
   render: (_,record) => {

      return (  <>
                  <Button color='red'  onClick={() => handleEdit(record)} type='ghost' icon={<EditOutlined   style={{ color: 'red' }}/>} >  </Button>
                  <Button  onClick={() => handleDelete(record)} type="ghost" icon={<DeleteFilled  style={{color: 'red'}} />}>  </Button>
                  </>

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
           <Input type='text' style={{minWidth:"50px", width:"200px"}} placeholder='Search By Name, Status' onChange={e=>onChangeText(e?.target?.value)} value={searchText}/>
           {/* <Button type="primary" onClick={handleCreate}>CREATE</Button> */}
  </div>            <Table dataSource={Data} columns={columns} />
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
               UserData={UserData?.users?.map((e,i)=>({label:e?.displayName,value:e?.id}))}
               OrderStatus={UserData?.enum_order_status?.map((e,i)=>({label:e?.comment,value:e?.value}))}
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

