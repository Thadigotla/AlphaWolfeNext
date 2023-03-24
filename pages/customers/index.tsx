import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import { useState } from 'react';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import CustomLayout from '../../styles/components/produc';
import moment from 'moment';
 
const query = gql`query GetUsersView {
  users_view {
    disabled
		email_verified
		is_anonymous
		phone_number_verified
		locale
		metadata
		active_mfa_type
		avatar_url
		default_role
		display_name
		otp_hash
		otp_method_last_used
		password_hash
		phone_number
		ticket
		totp_secret
		webauthn_current_challenge
		created_at
		last_seen
		otp_hash_expires_at
		ticket_expires_at
		updated_at
		email
		new_email
		id
  }
}
    
     `;

const update_mutation = gql`mutation update_by_pk($id: uuid!, $set: customers_set_input!)   {
                        update_customers_by_pk(pk_columns: {id: $id}, _set: $set) {
                        id
                        }
                     }`

const insert_mutation = gql `mutation MyMutation3($object:customers_insert_input!) {
                             insert_customers_one(object:$object) {
                                 id
                                }
                              }
`

const delete_mutation = gql`
                           mutation delete($id:uuid!){
                           delete_customers_by_pk(id:$id){
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
   if(data?.users_view){
      setData(formatData(data?.users_view))
   }
  },[data?.users_view])
  

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
   { title: 'Id', dataIndex: 'id', key: 'id', },
   { title: 'Name', dataIndex: 'display_name', key: 'name', },
   { title: 'Default Role', dataIndex: 'default_role', key: 'default_role', },
   { title: 'Disabled', dataIndex: 'disabled', key: 'disabled', },
   { title: 'Email Verified', dataIndex: 'email_verified', key: 'email_verified', },
   { title: 'Phone No', dataIndex: 'phone_number', key: 'phone_number', },
   { title: 'CreatedAt', dataIndex: 'created_at', key: 'created_at', render:(val) => moment(val).format('MMMM Do YYYY, h:mm:ss a') }, 
   { title: 'Last Seen', dataIndex: 'last_seen', key: 'last_seen', },
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
 
            {/* <Button type="primary" onClick={handleCreate}>CREATE</Button> */}
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
    <CustomLayout>
    <div style={{textAlign:"right"}}>
        <MyComponent />

    </div>
    </CustomLayout>
  );
}

export default App;

