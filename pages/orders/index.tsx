import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import { useState } from 'react';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import CustomLayout from '../../styles/components/produc';
import { useUserData } from '@nhost/nextjs';
 
const query = gql` query GetOrders($where: orders_bool_exp,$limit:Int,$offset:Int) {
  orders (where: $where, offset:$offset, limit:$limit) {
    user_id
		status
		created_at
		updated_at
		total_amount
		id
		uid
  }
  orders_aggregate {
    aggregate{
      count
    }
  }
}
     `;

const update_mutation = gql`mutation update_by_pk($id: uuid!, $set: products_set_input!)   {
                        update_products_by_pk(pk_columns: {id: $id}, _set: $set) {
                        id
                        }
                     }`

const insert_mutation = gql `mutation MyMutation3($object:products_insert_input!) {
                             insert_products_one(object:$object) {
                                 id
                                }
                              }
`

const delete_mutation = gql`
                           mutation delete($id:uuid!){
                           delete_products_by_pk(id:$id){
                              id
                           }
                           }`


const EditModal = ({selectedRecord,Mdata, setMData,setIsModalOpen,isModalOpen,insertFunction, updateFunction}) =>{


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
                 cost: Mdata.cost,
                 currency: Mdata.currency,
                 description: Mdata.description,
                 name: Mdata.name
               }
             }
             
           });

           console.log("selectedrecord", result)
   
           if (result?.data?.update_products_by_pk?.id) {
             toast.success("Updated successfully");
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
   
           if (result?.data?.insert_products_one?.id) {
             toast.success("Created successfully");
           }
         }
       } catch(error) {
         toast.error(`Error: ${error}`);
       }
   
         }



      return     <div >
               {/* <Button type="primary" onClick={showModal}>
                  { selectedRecord ? "EDIT" :  "CREATE"}
               </Button> */}
               <Modal title="Basic Modal" open={isModalOpen} okText="Close" onOk={handleOk} onCancel={handleCancel}>
                  <Form    onChange={onChange}    onFinish={onFinish}>
                     <Row gutter={15}>
                        <Col  className="gutter-row"  >
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
                        </Col>
                     </Row>
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

  const { data, loading, error } = useQuery(
    query,
    { variables:{
     "where":  searchTextCondition,
     limit:limit,
     offset:(pageNo-1)*limit
    } });

    const count = data?.orders_aggregate?.aggregate?.count

    const maxPage = Math.ceil(count/limit)


    const onChangeText = (e) =>{

      let where = {}
      if (e){
           where= {
          "_or":  [
            {"status": {"_ilike":"%"+e+"%" }},
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
  
  
  const formatData = (data:[]) =>{ return [...data] }

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

 const handleDelete= (record) =>{
   console.log("delete record is",record)
   deleteFunction({variables:{id:record?.id}})

 }

  const columns = [
   { title: 'Id', dataIndex: 'uid', key: 'uid', },
   { title: 'Status', dataIndex: 'status', key: 'status', },
   { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount', },
   { title: 'Cost', dataIndex: 'cost', key: 'cost', },
   { title: 'CreatedAt', dataIndex: 'created_at', key: 'created_at', }, 
  //  { title: 'Action', dataIndex: 'action', key: 'action', 
   
  //  render: (_,record) => {

  //     return (  <>
  //                 <Button  onClick={() => handleEdit(record)} > Edit </Button>
  //                 <Button  onClick={() => handleDelete(record)} > Delete </Button>
  //                 </>

  //             )
                  
  //                 }, 
   
  //  },   
  ]

  console.log("new data", Data)

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if(!Data) return <div>Loading...</div>

 
  return (<>
 
                        <div style={{display:'flex', justifyContent:"flex-end"}}>
           <Input type='text' style={{minWidth:"50px", width:"150px"}} placeholder='Search By Status' onChange={e=>onChangeText(e?.target?.value)} value={searchText}/>
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

