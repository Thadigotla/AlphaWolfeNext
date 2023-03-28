import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Image, Input, Modal, Row, Select, Space, Table, Upload } from 'antd';
import { useState } from 'react';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import CustomLayout from '../../styles/components/produc';
import { useUserData } from '@nhost/nextjs';
import moment from 'moment';
import { DeleteFilled, DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined, PlusSquareFilled } from '@ant-design/icons';
import { nhost } from '../_app';
 
const query = gql` query ($where: products_bool_exp,$limit:Int,$offset:Int) {
   products(where: $where, offset:$offset, limit:$limit,order_by:  {uid: desc})
    { id uid name description cost currency features  image_url images created_at
    }
    products_aggregate {
      aggregate{
        count
      }
    }
    orders_aggregate {
      aggregate {
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
                 features: Mdata?.features?.length>0 ? Mdata?.features : [],
                 image_url:Mdata?.image_url,
                 images:Mdata?.images?.length>0 ? Mdata?.images : [],
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
                 image_url:Mdata?.image_url,
                 features: Mdata?.features?.length>0 ? Mdata?.features : [],
                 images:Mdata?.images?.length>0 ? Mdata?.images : [],

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

  const OtherFilesUploadProps = {
    beforeUpload: async (file) => {
      const link = await nhost.storage.upload({ file, bucketId: "public" });
      const links = await nhost.storage.getPublicUrl({
        fileId: link.fileMetadata.id,
      });
    
      console.log("Links ",links)

      let Images = [...(Mdata?.images ? Mdata?.images :[]),links]
      // setFileLink(links);
      setMData({...Mdata,"images":Images})
      // refetch();
    },
  };


  const onChange = (e) =>{ 

    if(e?.target?.id=="features"){
      
      return  Mdata
    }
    console.log("Checking event is ",e, e?.target?.id, e?.target?.value)
    
    setMData({...Mdata, [e?.target?.id]:e?.target?.value}) 
 }


  const handleSelect = (e) =>{

    let copyData = {...Mdata}

    copyData["features"] = [...(Mdata["features"] ? Mdata["features"] : []), e ]

    setMData({...copyData})

  }
  
 const handleDeselect = (e) =>{

      let copyData = {...Mdata}

      if(copyData?.["features"]?.includes(e)){

        const newArray = copyData?.["features"].filter((element) => element !== e);

        copyData["features"] = newArray

      }

  setMData({...copyData})


 } 
 const deleteImage =(e,i) =>{


  if(e==="images"){

    const imagesCopy =[...Mdata?.images]

    console.log("asd",e,i,imagesCopy, Array.isArray(imagesCopy), imagesCopy.slice(i, 1)  )

    imagesCopy.splice(i, 1);

   return setMData({...Mdata,images:imagesCopy})


  }

  if(e=="image_url"){


   return setMData({...Mdata,image_url:null})


  }



 }

      return     <div >
               {/* <Button type="primary" onClick={showModal}>
                  { selectedRecord ? "EDIT" :  "CREATE"}
               </Button> */}
               <Modal title={ selectedRecord ? "EDIT" :  "CREATE"} open={isModalOpen} okText="Close" onOk={handleOk} onCancel={handleCancel}>
                  <Form    onChange={onChange}    onFinish={onFinish}>
                     <Row gutter={[16, 16]}>
                        <Col  className="gutter-row" span={12}   >
                           <label htmlFor='name'>Name</label>
                           <Input id="name" required  placeholder='Name'  value={Mdata?.name} />
                        </Col>
                        <Col  className="gutter-row" span={12} >
                        <label htmlFor='description'>Descritpion</label>

                        <Input id="description"  required placeholder='Descritpion' value={Mdata?.description} />
                        </Col>
                        <Col  className="gutter-row" span={12} >
                        <label htmlFor='cost'>Cost</label>

                        <Input id="cost" required placeholder='Cost' value={Mdata?.cost} />
                        </Col>
                        <Col  className="gutter-row" span={12} >
                        <label htmlFor='currency'>Currency</label>

                        <Input id="currency" required placeholder='Currency' value={Mdata?.currency} />
                        </Col>
                        <Col  className="gutter-row" span={24} >
                        <label htmlFor='name'>Features</label>

                        <Select
                            mode="tags"
                            id='features'
                            style={{ width: '100%' }}
                            placeholder="Enter Features"
                            value={Mdata?.features}
                            onSelect={handleSelect}
                            onDeselect={handleDeselect}
                            showSearch={false}
                          />
                        </Col>

                        <Col  className="gutter-row" span={24} >
                        <label htmlFor='name'>Primary Image</label>

                          <Upload
                             
                            style={{ color: "skyblue" }}
                            {...fileUploadProps}
                            accept="image/*"
                            
                          >
                              {Mdata?.image_url ? 
                              <span onClick={e=>e.stopPropagation()} >
                                <>
                                <Image src={Mdata?.image_url} alt="avatar" style={{ width: '50px',height:"50px" }} />
                                <Button onClick={()=>deleteImage("image_url",null)}   icon={<DeleteOutlined />}></Button>
                                </>  </span>
                              :
                               <Button>Upload</Button>}
                          </Upload>                 
                        </Col>
                        <Col  className="gutter-row" span={24} >
                        <label htmlFor='name'>Other Images</label>

                          <Upload
                            style={{ color: "skyblue" }}
                            {...OtherFilesUploadProps}
                            accept="image/*"
                          >
                              <span onClick={e=>e.stopPropagation()}>
                                  {Mdata?.images?.map((e,i)=>
                                             <>
                                             <Image src={e} alt="avatar" style={{ width: '50px',height:"50px",margin:"1px" }} />
                                             <Button onClick={()=>deleteImage("images",i)}   icon={<DeleteOutlined />}></Button>
                                             </>
                                             )
                                  } 
                                     </span>
                               <Button>Upload</Button>
                              
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
    <div style={{display:'flex', justifyContent:"flex-end", margin:"5px", alignItems:"center"}}>
           <Input type='text' style={{minWidth:"50px", width:"150px", margin:"10px"}} onChange={e=>onChangeText(e?.target?.value)} value={searchText}/>
           <Button type="primary" onClick={handleCreate} icon={<PlusOutlined />} >CREATE</Button>
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

