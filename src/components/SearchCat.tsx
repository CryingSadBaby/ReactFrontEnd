import React from 'react'
import {Link} from 'react-router-dom'
import {Form, Select, Input, InputNumber, Button, Row, Col, Card, Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

import {api} from '../resources/myapi'
import {status, json} from '../resources/requestHandlers'


const inputRule = [
  {required: true, message:'Please input keywords'}
]

function SearchCat(){
  const [searching, setSearching] = React.useState(false)
  const [searchComp, setSearchComp] = React.useState(false)
  const [cats, setCat] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [input, setInput] = React.useState('text')
  const [error, setError] = React.useState(false)

  const [form] = Form.useForm()

  const change = (value) => {
    if(value==="age"){
      setInput('number')
    } else if (value==="gender") {
      setInput('gender')
    } else if (value==="neutered"){
      setInput('neutered')
    } else {
      setInput('text')
    }
  }
  
  const search = (values) => {
    const data = {[values.key]:values.value}
    setSearching(true)
    setError(false)
    fetch(`${api.uri}/pets/search`,{
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(status)
    .then(json)
    .then(res=>{
      console.log(res)
      setCat(res)
      setLoading(false)
      setSearching(false)
      setSearchComp(true)
    })
    .catch(err=>{
      setError(true)
      setSearching(false)
    })
  }

  const CatResult = () => {
    if(searchComp){
      if(loading){
        const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />
        return(<Spin indicator={antIcon}/>)
      }else{
        if(!error){
          return(
            <Row>
              {
                cats&&cats.map((
                  {id,petname,des,breed,age,gender,neutered,imageurl}
                )=>(
                  <Col span={8}>
                    <Card 
                      key={id} 
                      cover={<img src={imageurl} alt={id}/>}
                      style={{width: 300, color:'purple'}}
                      hoverable>
                      <h3>{petname}</h3>
                      <p>{des}</p>
                      <p>Breed: {breed}</p>
                      <p>Age: {age}</p>
                      {!gender&&<p>Gender: female</p>}
                      {gender&&<p>Gender: male</p>}
                      {!neutered&&<p>Neutered: No</p>}
                      {neutered&&<p>Neutered: Yes</p>}
                      <Link to={ `/cat/${id}` }>Details</Link>
                    </Card>
                  </Col>
                ))
              }
            </Row>
          )
        } else {
          return(<h1>There is no result</h1>)
        }
      }
    }
  }

  return(
    <main>
      <Form form={form} onFinish={search}>
        <Form.Item name="key" label="Search by" initialValue='petname'>
          <Select options={
          [
            {value:'petname', label: 'Name'},
            {value:'breed', label: 'Breed'},
            {value:'gender', label: 'Gender'},
            {value:'neutered', label: 'Neutered State'},
            {value:'age', label: 'Age'}
          ]} onChange={change} />
        </Form.Item>
        <Form.Item name="value" label="Keywords" rules={inputRule}>
          {input==="text"?(<Input />):
          input==="number"?(<InputNumber/>):
          input==="gender"?(
            <Select 
              options={
              [{value: false, label: 'female'},
               {value: true, label: 'male'}]}/>):
          input==="neutered"?(
            <Select 
              options={
              [{value: false, label: 'No'},
               {value: true, label: 'Yes'}]}/>
          ):null}
        </Form.Item>
        <Form.Item>
          {!searching&&<Button type="primary" htmlType="submit">Search</Button>}
          {searching&&<Button type="primary" htmlType="submit" disabled>Search</Button>}
        </Form.Item>
      </Form>
      {searchComp&&<CatResult/>}
    </main>
  )
}

export default SearchCat