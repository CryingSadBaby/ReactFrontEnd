//Library
import React from 'react'
import {Form, Input, Button} from 'antd'

//Local
import {status,json} from '../resources/requestHandlers'
import {api} from '../resources/myapi'
import UserContext from '../contexts/user'

//Email input rule
const emailRule = [
  {type: 'email', message: 'The Input is not a valid E-mail address'},
  {required: true, message: 'Please input your E-mail address'}
]

//Username input Rule
const usernameRule = [
  {required: true, message: 'Please input your username'}
]

//Password input rule
const passwordRule = [
  {required: true, message: 'Please input your password'}
]


//Confirm password input rule
const confirmPasswordRule = [
  {required: true, message: 'Please confirm your password'},
  ({getFieldValue}) => ({
    validator(rule,value) {
      if(!value || getFieldValue('password') === value){
        return Promise.resolve()
      }
      return Promise.reject('The password that you entered do not match!')
    }
  })
]

//Main component
class RegisterForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selected: props.selected
    }
    this.onFinish = this.onFinish.bind(this)
  }
  static contextType = UserContext
  
  //On finish function for post data to api and register user
  onFinish = (values) => {
    console.log('Received values of form: ', values)
    const {confirm,...data} = values
    console.log("JSON: ",JSON.stringify(data))
    fetch(`${api.uri}/users`,{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(status)
    .then(json)
    .then(data=>{
      console.log(data)
      this.context.reged()
    })
    .catch(error=>{
      console.error(error)
      alert(`Error: ${error}`)
    })
  }

  //Show main component
  render(){
    //if client register state is registered then show notification text as main component
    if(this.context.user.reged==true){
      return(
        <div>
          <h2>Registration Completed!</h2>
        </div>
      )
    }else{
      //if client register state is not registered then show input form as main component
      return(
        <Form name="register" scrollToFirstError onFinish={this.onFinish}>
          <Form.Item name="email" label="E-mail" rules={emailRule}>
            <Input/>
          </Form.Item>
          <Form.Item name="username" label="Username" rules={usernameRule}>
            <Input/>
          </Form.Item>
          <Form.Item name="password" label="Password" rules={passwordRule}>
            <Input.Password/>
          </Form.Item>
          <Form.Item name="confirm" label="Confirm Password" rules={confirmPasswordRule}>
            <Input.Password/>
          </Form.Item>
          <Form.Item name="code" label="Code">
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      )
    }
  }
}

//export component
export default RegisterForm