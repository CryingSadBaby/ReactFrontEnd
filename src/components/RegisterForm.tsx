import React from 'react'
import { Form, Input, Button } from 'antd'
import { status, json } from '../utilities/requestHandlers'
import { api } from '../utilities/common_api'
import  GoHomeButton  from './Gohome'
import UserContext from '../contexts/user'

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
}
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];

const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    // rules can include function handlers in which you can apply additional logic
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The passwords that you entered do not match!');
        }
    })
];
const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
]

/**
 * Registration form component for app signup.

 */
 

class RegistrationForm extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected   
    };
   this.onFinish = this.onFinish.bind(this)
    
   }
   
  static contextType = UserContext
  
  onFinish = (values) => { 
  console.log('Received values of form: ', values)
  const {confirm,...data } = values;  // ignore the 'confirm' value
    console.log("Json  ",JSON.stringify(data))
    fetch(`${api.uri}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        // For you TODO: display success message and/or redirect
        console.log(data);  
          this.context.regComplete()
   //     alert(`Registration Completed! Pls. press login or green button to continue `)      
			  
    })
    .catch(errorResponse => {
        // For you TODO: show nicely formatted error message and clear form
	 console.error(errorResponse);
        alert(`Error: ${errorResponse}`)
    });  
  }
    


render() {
 if(this.context.user.registerOK==true) 
   {//alert("You have already login")
     return(<div>
      <h2> Registration Completed ! </h2>
     <p> Pls. press login or green button to continue! <GoHomeButton /> </p> 
    </div>)
   
      
      }
 else
 {
    return (
      <Form {...formItemLayout} name="register" scrollToFirstError onFinish={this.onFinish}>
        
        <Form.Item name="email" label="E-mail" rules={emailRules} >
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
            <Input.Password />
        </Form.Item>

        <Form.Item name="confirm" label="Confirm Password" rules={confirmRules} >
            <Input.Password />
        </Form.Item>

        <Form.Item name="username" label="Username">
            <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit"  >
                Register
            </Button>
      
        </Form.Item>
      </Form>
    )
    }
  }
}

export default RegistrationForm