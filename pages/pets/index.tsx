import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import { useState } from 'react';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
 
const query = gql`query GetPets {
  pets {
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
                 name: Mdata.name,
                 type: Mdata.type,
                 gender: Mdata.gender,
                 date_of_birth: Mdata.date_of_birth,
                 description: Mdata.description,
   
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
                name: Mdata.name,
                type: Mdata.type,
                gender: Mdata.gender,
                date_of_birth: Mdata.date_of_birth,
                description: Mdata.description,
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
                        <Input id="type"  required placeholder='Type' value={selectedRecord?.type} />
                        </Col>
                        <Col  className="gutter-row">
                        <Input id="gender" required placeholder='Gender' value={selectedRecord?.gender} />
                        </Col>
                        <Col  className="gutter-row">
                        <Input id="date_of_birth" required placeholder='Date of Birth' value={selectedRecord?.date_of_birth} />
                        </Col>

                        <Col  className="gutter-row">
                        <Input id="description" required placeholder='Description' value={selectedRecord?.description} />
                        </Col>

                     </Row>
                     <Button htmlType='submit'  type='primary'>Submit</Button>

                     </Form>
            
               </Modal>
   </div>

}

function MyComponent() {

  const [Data, setData] = useState([])

  const [MData, setMData] = useState({})

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [updateFunction, { data:uData, loading:uLoading, error:uError }] = useMutation(update_mutation);

  const [insertFunction, { data:IData, loading:Iloading, error:IError }] = useMutation(insert_mutation);
  
  const [deleteFunction, { data:dData, loading:dLoading, error:dError}] = useMutation(delete_mutation);

  const { data, loading, error } = useQuery(query);

  const formatData = (data:[]) =>{ return [...data] }

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
   setSelectedRecord(record);
   setIsModalOpen(true);
   setMData(record)

 }

 const handleDelete= (record) =>{
   console.log("delete record is",record)
   deleteFunction({variables:{id:record?.id}})

 }

  const columns = [
   { title: 'Id', dataIndex: 'uid', key: 'uid', },
   { title: 'Name', dataIndex: 'name', key: 'name', },
   { title: 'Type', dataIndex: 'type', key: 'type', },
   { title: 'Gender', dataIndex: 'gender', key: 'gender', },
   { title: 'DOB', dataIndex: 'date_of_birth', key: 'date_of_birth', }, 
   { title: 'Action', dataIndex: 'action', key: 'action', 
   
   render: (_,record) => {

      return (  <>
                  <Button  onClick={() => handleEdit(record)} > Edit </Button>
                  <Button  onClick={() => handleDelete(record)} > Delete </Button>
                  </>

              )
                  
                  }, 
   
   },   
  ]

  console.log("new data", Data)

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if(!Data) return <div>Loading...</div>

 
  return (<>
 
            <Button onClick={handleCreate}>CREATE</Button>
            <Table dataSource={Data} columns={columns} />
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
    <div style={{textAlign:"right"}}>
        <MyComponent />

    </div>
  );
}

export default App;

