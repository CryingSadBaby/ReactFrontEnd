import React, { useContext } from 'react'
import {Form,Input,Button,Select,InputNumber} from 'antd'

import UserContext from '../contexts/user'
import {status,json} from '../resources/requestHandlers'
import {api} from '../resources/myapi'


const inputRule = [
  {required: true, message:"Please Input information"}
]

const ageRule = [
  {required: true, message:"Please Input a valid age"},
  {type: 'number', min: 1, max: 99}
]

function PostCatForm(props){
  const user = useContext(UserContext)

  function postcat(values){
  console.log(`Received values of form: ${values}`)
  console.log(`JSON: ${JSON.stringify(values)}`)
  fetch(`${api.uri}/pets`,{
    method: "POST",
    body: JSON.stringify(values)
  })
  .then(status)
  .then(json)
  .then(data=>{
    console.log(data)
    alert(`Post success!`)
  })
  .catch(err=>{
    console.log(err)
    alert(`Error: ${err}`)
  })
  }
  return(
    <UserContext.Consumer>
      {({logout,user})=>(
      <Form name="postcat" scrollToFirstError onFinish={postcat}>
        <Form.Item name="petname" label="Cat name" rules={inputRule}>
          <Input/>
        </Form.Item>
        <Form.Item name="breed" label="Cat breed" rules={inputRule}>
          <Input/>
        </Form.Item>
        <Form.Item name="gender" label="Cat gender" rules={inputRule}>
          <Select defaultValue='false' options={
          [{value: false, label: 'female'},{value: true, label: 'male'}]}/>
        </Form.Item>
        <Form.Item name="age" label="Cat age" rules={ageRule}>
          <InputNumber/>
        </Form.Item>
        <Form.Item name="neutered" label="Neutered state" rules={inputRule}>
          <Select defaultValue='false' options={
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

export default PostCatForm