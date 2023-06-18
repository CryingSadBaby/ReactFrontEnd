//Library
import {useContext,useEffect,useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Form, Input, InputNumber, Button, Spin, Select} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

//Local
import UserContext from '../contexts/user'
import {status, json} from '../resources/requestHandlers'
import {api} from '../resources/myapi'

//Basic input rule
const inputRule = [
  {required: true, message:"Please Input information"}
]

//Age input rule
const ageRule = [
  {required: true, message:"Please Input a valid age"},
  {type: 'number', min: 1, max: 99}
]

//Main component
function UpdateCatForm(){
  //Init react state
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState(null)
  const [updating, setUpdating] = useState(false)

  //Get id
  const id = useParams()
  
  //get user context
  const user = useContext(UserContext)
  //for redirect user
  const navigate = useNavigate()

  //Update cat function
  const updatecat = (values) =>{
    setUpdating(true)
    console.log(`JSON: ${JSON.stringify(values)}`)
    fetch(`${api.uri}/pets/${id.pid}`,{
      method: "PUT",
      headers: {
        "Authorization": `Basic ${user.user.token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(status)
    .then(json)
    .then(data=>{
      console.log(data)
      alert("Update success")
      setUpdating(false)
      //redirect user to home
      navigate('/')
    })
    .catch(error=>{
      console.error(error)
      alert(`Error: ${error}`)
      setUpdating(false)
    })
  }

  //Init cat information
  useEffect(()=>{
    fetch(`${api.uri}/pets/${id.pid}`)
    .then(status)
    .then(json)
    .then(res=>{
      setCat(res)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      alert(`Error: ${err}`)
    })
  },[])

  if(user.user.logged&&user.user.role==='staff'||'admin'){
    if(loading){
      const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />
      return(<Spin indicator={antIcon}/>)
    }else{
      return(
        <main>
          <h1>Updating Cat id: {cat.id}</h1>
          <Form name="postpet" scrollToFirstError onFinish={updatecat}>
            <Form.Item name="petname" label="Cat name" rules={inputRule} initialValue={cat.petname}>
              <Input/>
            </Form.Item>
            <Form.Item name="breed" label="Cat breed" rules={inputRule} initialValue={cat.breed}>
              <Input/>
            </Form.Item>
            <Form.Item name="gender" label="Cat gender" rules={inputRule} initialValue={cat.gender}>
              <Select options={
              [{value: false, label: 'female'},{value: true, label: 'male'}]}/>
            </Form.Item>
            <Form.Item name="age" label="Cat age" rules={ageRule} initialValue={cat.age}>
              <InputNumber/>
            </Form.Item>
            <Form.Item name="neutered" label="Neutered state" rules={inputRule} initialValue={cat.neutered}>
              <Select options={
              [{value: false, label: 'No'},{value: true, label: 'Yes'}]}/>
            </Form.Item>
            <Form.Item name="imageurl" label="Image link" initialValue={cat.imageurl}>
              <Input/>
            </Form.Item>
            <Form.Item name="des" label="Description" initialValue={cat.des}>
              <Input/>
            </Form.Item>
            <Form.Item>
              {!updating&&<Button type="primary" htmlType="submit">Update</Button>}
              {updating&&<Button type="primary" htmlType="submit" disabled>Updating</Button>}
            </Form.Item>
          </Form>
        </main>
      )
    }
  }else{
    return(<h1>Error: not valid request</h1>)
  }
}


//Export main component
export default UpdateCatForm