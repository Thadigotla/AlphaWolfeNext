import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Input, Modal, Row, Space, Table } from 'antd';
import { useState } from 'react';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import React from "react";
import CustomLayout from '../../styles/components/produc';

import {

  useUserData
} from '@nhost/nextjs'
import moment from 'moment';
import { DeleteFilled, DeleteOutlined, EditOutlined, PlusSquareFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';

 

const query = gql`query GetPets($where: pets_bool_exp,$limit:Int,$offset:Int) {
  pets(where: $where, offset:$offset, limit:$limit,order_by: {uid: desc}) {
    name
    type
    gender
    date_of_birth
    description
    uuid
    created_at
    updated_at
    user_id
    id
    uid
  }
  pets_aggregate {
    aggregate{
      count
    }
  }

} `;

const update_mutation = gql`mutation update_by_pk($id: uuid!, $set: pets_set_input!)   {
                        update_pets_by_pk(pk_columns: {id: $id}, _set: $set) {
                        id
                        }
                     }`

const insert_mutation = gql `mutation MyMutation3($object:pets_insert_input!) {
                             insert_pets_one(object:$object) {
                                 id
                                }
                              }
`

const delete_mutation = gql`
                           mutation delete($id:uuid!){
                           delete_pets_by_pk(id:$id){
                              id
                           }
                           }`


const EditModal = ({selectedRecord,Mdata, setMData,setIsModalOpen,isModalOpen,insertFunction, updateFunction, user_id,refetch}) =>{


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
                 name: Mdata.name,
                 type: Mdata.type,
                 gender: Mdata.gender,
                 date_of_birth: Mdata.date_of_birth,
                 description: Mdata.description,
                 user_id
   
               }
             }
             
           });

           console.log("selectedrecord", result)
   
           if (result?.data?.update_pets_by_pk?.id) {
             toast.success("Updated successfully");
             setIsModalOpen(false)

           }
         } else {
      console.log("selectedrecord else",selectedRecord)

           // Creating a new record
           const result = await insertFunction({
             variables: {
               object: {
                name: Mdata.name,
                type: Mdata.type,
                gender: Mdata.gender,
                date_of_birth: Mdata.date_of_birth,
                description: Mdata.description,
                user_id
               }
             }
           });
   
           if (result?.data?.insert_pets_one?.id) {
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
               <Modal   title = { selectedRecord ? "EDIT" :  "CREATE"} open={isModalOpen} okText="Close" onOk={handleOk} onCancel={handleCancel}>
                  <Form    onChange={onChange}    onFinish={onFinish}>
                     <Row gutter={[16, 16]}>
                        <Col  className="gutter-row" span={12}  >
                           <label htmlFor='Name'>Name</label>
                           <Input id="name" required  placeholder='Name' value={Mdata?.name} />
                        </Col>
                        <Col  className="gutter-row" span={12}>
                        <label htmlFor='type'>Type</label>

                        <Input id="type"  required placeholder='Type' value={Mdata?.type} />
                        </Col>
                        <Col  className="gutter-row" span={12}>
                        <label htmlFor='gender'>Gender</label>

                        <Input id="gender" required placeholder='Gender' value={Mdata?.gender} />
                        </Col>
                        <Col  className="gutter-row" span={12}>
                        <label htmlFor='date_of_birth'>Date of Birth</label>

                        <Input id="date_of_birth" type='date' required placeholder='Date of Birth' value={Mdata?.date_of_birth} />
                        </Col>

                        <Col  className="gutter-row" span={12}>
                        <label htmlFor='description'>Description</label>

                        <Input id="description" required placeholder='Description' value={Mdata?.description} />
                        </Col>

                     </Row>
                     <br/>
                     <Button htmlType='submit'  type='primary'>Submit</Button>

                     </Form>
            
               </Modal>
   </div>

}

function MyComponent({where}) {

  const user:any = useUserData()

  const router = useRouter()

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

    React.useEffect(()=>{
      setsearchTextCondition(where)
  
    },[where])
  const count = data?.pets_aggregate?.aggregate?.count

  const maxPage = Math.ceil(count/limit)

  const onChangeText = (e) =>{

    let where = {}
    if (e){
         where= {
        "_or":  [
          {"name": {"_ilike":"%"+e+"%" }},
          {"type": {"_ilike":"%"+e+"%" }}
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


  console.log("user data is ", user?.id)

  useEffect(()=>{
   if(data?.pets){
      setData(formatData(data?.pets))
   }
  },[data?.pets])
  

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

 const handleDelete= async (record) =>{
   console.log("delete record is",record)
 const result =  await deleteFunction({variables:{id:record?.id}})
 refetch()

 if(result?.data?.delete_pets_by_pk)return toast("deleted sucessfully")
 else toast("Not Deleted")



 console.log('result is ', result)

 }

  let columns = [
   { title: 'Pet Id', dataIndex: 'uid', key: 'uid', },
   { title: 'Name', dataIndex: 'name', key: 'name', render:(val,record) =><span style={{color:"rgb(226 121 17)", cursor:"pointer",textDecoration:"underline"}} onClick={()=>router.push(`/pets/${record.id}`)}>{val}</span> },
   { title: 'Type', dataIndex: 'type', key: 'type', },
   { title: 'Gender', dataIndex: 'gender', key: 'gender', },
   { title: 'DOB', dataIndex: 'date_of_birth', key: 'date_of_birth', }, 
   { title: 'CreatedAt', dataIndex: 'created_at', key: 'created_at', render:(val) => moment(val).format('MMMM Do YYYY, h:mm:ss a') }, 
  //  { title: 'Action', dataIndex: 'action', key: 'action', 
   
  //  render: (_,record) => {

  //           return user?.role =="user"  ? (  <Space>
  //                       <Button color='red'  onClick={() => handleEdit(record)} type='ghost' icon={<EditOutlined   style={{ color: 'red' }}/>} >  </Button>
  //                       <Button  onClick={() => handleDelete(record)} type="ghost" icon={<DeleteFilled  style={{color: 'red'}} />}>  </Button>
  //                       </Space>

  //                   ) : null
                  
  //     }, 
   
  //  },   
  ]

  if(user?.defaultRole == "user"){
    columns?.push( 
        { title: 'Action', dataIndex: 'action', key: 'action', 
   
    render: (_,record) => {
 
       return (  <Space>
                   <Button color='red'  onClick={() => handleEdit(record)} type='ghost' icon={<EditOutlined   style={{ color: 'red' }}/>} >  </Button>
                   <Button  onClick={() => handleDelete(record)} type="ghost" icon={<DeleteFilled  style={{color: 'red'}} />}>  </Button>
                   </Space>
 
               )
                   
                   }, 
    
    }, )
  }

  console.log("new data", Data)
 

 
  return (<>
  <div style={{display:'flex', justifyContent:"flex-end", alignItems:"center"}}>
           <Input type='text' style={{minWidth:"50px", width:"150px", margin:"10px"}} placeholder='Search By Name' onChange={e=>onChangeText(e?.target?.value)} value={searchText}/>
           {user?.defaultRole == "user" ? <Button type="primary" onClick={handleCreate} icon={<PlusSquareFilled />}  >CREATE</Button> : null}
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

function ManagePets({where}) {
  console.log("params",where)

  return (
 
        <MyComponent where={where} />
 
 
  );
}

export default ManagePets;

