import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Input, Modal, Row, Space, Table, Upload } from 'antd';
import { useState } from 'react';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import CustomLayout from '../../styles/components/produc';
import { useUserData } from '@nhost/nextjs';
import moment from 'moment';
import { DeleteFilled, EditOutlined, EyeInvisibleOutlined, EyeOutlined, PlusSquareFilled } from '@ant-design/icons';
import { nhost } from '../_app';
 
const query = gql` query ($where: products_bool_exp,$limit:Int,$offset:Int) {
   products(where: $where, offset:$offset, limit:$limit,order_by:  {uid: desc})
    { id uid name description cost currency  image_url created_at
    }
    products_aggregate {
      aggregate{
        count
      }
    }
   } `;

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
                 cost: Mdata.cost,
                 currency: Mdata.currency,
                 description: Mdata.description,
                 name: Mdata.name,
                 image_url:Mdata?.image_url
               }
             }
             
           });

           console.log("selectedrecord", result)
   
           if (result?.data?.update_products_by_pk?.id) {
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
                 name: Mdata.name,
                 image_url:Mdata?.image_url

               }
             }
           });
   
           if (result?.data?.insert_products_one?.id) {
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

         
   const fileUploadProps = {
    beforeUpload: async (file) => {
      const link = await nhost.storage.upload({ file, bucketId: "public" });
      const links = await nhost.storage.getPublicUrl({
        fileId: link.fileMetadata.id,
      });
    
      console.log("Links ",links)
      // setFileLink(links);
      setMData({...Mdata,"image_url":links})
      // refetch();
    },
  };


      return     <div >
               {/* <Button type="primary" onClick={showModal}>
                  { selectedRecord ? "EDIT" :  "CREATE"}
               </Button> */}
               <Modal title="Basic Modal" open={isModalOpen} okText="Close" onOk={handleOk} onCancel={handleCancel}>
                  <Form    onChange={onChange}    onFinish={onFinish}>
                     <Row gutter={[16, 16]}>
                        <Col  className="gutter-row" span={12}   >
                           <Input id="name" required  placeholder='Name'  value={Mdata?.name} />
                        </Col>
                        <Col  className="gutter-row" span={12} >
                        <Input id="description"  required placeholder='Descritpion' value={Mdata?.description} />
                        </Col>
                        <Col  className="gutter-row" span={12} >
                        <Input id="cost" required placeholder='Cost' value={Mdata?.cost} />
                        </Col>
                        <Col  className="gutter-row" span={12} >
                        <Input id="currency" required placeholder='Currency' value={Mdata?.currency} />
                        </Col>
                        <Col  className="gutter-row">
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

  useEffect(()=>{
   if(data?.products){
      setData(formatData(data?.products))
   }
  },[data?.products])
  

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

     //Open new tab if clicks on an image
     const openInNewTab = (url) => {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer")
      if (newWindow) newWindow.opener = null
    }
  

  const columns = [
   { title: 'Id', dataIndex: 'uid', key: 'uid', },
   { title: 'Name', dataIndex: 'name', key: 'name', },
   { title: 'Desc', dataIndex: 'description', key: 'description', },
   { title: 'Cost', dataIndex: 'cost', key: 'cost', },
   { title: 'Currency', dataIndex: 'currency', key: 'currency', }, 
   { title: 'image_url', dataIndex: 'image_url', key: 'image_url',
   render: (text, record) => {
    console.log("text ",text)
     return text ?  <EyeOutlined  onClick={()=>openInNewTab(text) }/> : <EyeInvisibleOutlined/>
  }
},
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
           <Input type='text' style={{minWidth:"50px", width:"150px"}} onChange={e=>onChangeText(e?.target?.value)} value={searchText}/>
           <Button type="primary" onClick={handleCreate} icon={<PlusSquareFilled />} ghost>CREATE</Button>
  </div>
 
            {/* <Button type="primary" onClick={handleCreate}>CREATE</Button> */}
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

