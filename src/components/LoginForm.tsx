import React from 'react'
import {Form, Input, Button} from 'antd'

import {api} from '../resources/myapi'
import {status, json} from '../resources/requestHandlers'
import UserContext from '../contexts/user'

const passwordRule = [
  { required: true, message: 'Please enter your password'}
]

const usernameRule = [
  { required: true, message: 'Please enter your username'}
]

class LoginForm extends React.Component {
  constructor(props){
    super(props)
    this.login = this.login.bind(this)
  }
  static contextType = UserContext

  login(values){
    const {username, password} = values
    const access_token = btoa(`${username}:${password}`,'utf8').toString('base64')
    console.log(`logging in user: ${username}`)
    fetch(`${api.uri}/users/login`,{
      method: "POST",
      headers: {
        "Authorization": `Basic ${access_token}`
      }
    })
    .then(status)
    .then(json)
    .then(user => {
      console.log('Logged in successfully')
      console.log(`Login as ${user}`)
      user.token=access_token
      this.context.login(user)
      alert(`Welcome ${username}`)
    })
    .catch(err=>{
      console.log('Login failed')
      alert(`Sorry, ${username} login failed.`)
    })
  }

  render(){
    if(this.context.user.logged==true){
      return(
        <div>
          <h2>Welcome {this.context.user.username} !</h2>
        </div>
      )
    }else{
      return(
        <Form name="login" scrollToFirstError onFinish={this.login}>
          <Form.Item name="username" label="Username" rules={usernameRule}>
            <Input/>
          </Form.Item>
          <Form.Item name="password" label="Password" rules={passwordRule}>
            <Input.Password/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      )
    }
  }
}


export default LoginForm