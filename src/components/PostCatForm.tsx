//Library
import React, { useContext } from 'react'
import {Form,Input,Button,Select,InputNumber} from 'antd'

//Local
import UserContext from '../contexts/user'
import {status,json} from '../resources/requestHandlers'
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
function PostCatForm(props){
  //Get UserContext as user
  const user = useContext(UserContext)

  //Post cat function
  const postcat = (values) =>{
    //ignore token in values as data
    const {token,...data} = values
    console.log(`JSON: ${JSON.stringify(data)}`)
    fetch(`${api.uri}/pets`,{
      method: "POST",
      headers: {
        "Authorization": `Basic ${values.token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(status)
    .then(json)
    .then(data=>{
      console.log(data)
      alert("Post success")
    })
    .catch(error=>{
      console.error(error)
      alert(`Error: ${error}`)
    })
  }

  //Show main component
  return(
    <UserContext.Consumer>
      {({user}) => (
      <Form name="postpet" scrollToFirstError onFinish={postcat}>
        <Form.Item name="token" hidden={true} initialValue={user.token}>
        </Form.Item>
        <Form.Item name="userid" hidden={true} initialValue={user.id}>
        </Form.Item>
        <Form.Item name="petname" label="Cat name" rules={inputRule}>
          <Input/>
        </Form.Item>
        <Form.Item name="breed" label="Cat breed" rules={inputRule}>
          <Input/>
        </Form.Item>
        <Form.Item name="gender" label="Cat gender" rules={inputRule} initialValue={false}>
          <Select options={
          [{value: false, label: 'female'},{value: true, label: 'male'}]}/>
        </Form.Item>
        <Form.Item name="age" label="Cat age" rules={ageRule}>
          <InputNumber/>
        </Form.Item>
        <Form.Item name="neutered" label="Neutered state" rules={inputRule} initialValue={false}>
          <Select options={
          [{value: false, label: 'No'},{value: true, label: 'Yes'}]}/>
        </Form.Item>
        <Form.Item name="imageurl" label="Image link">
          <Input/>
        </Form.Item>
        <Form.Item name="des" label="Description">
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Post</Button>
        </Form.Item>
        
      </Form>
      )}
    </UserContext.Consumer>
  )
}

//Export main component
export default PostCatForm