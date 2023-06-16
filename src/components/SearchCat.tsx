import React from 'react'
import {Link} from 'react-router-dom'
import {Form, Select, Input, InputNumber, Button, Row, Col, Card, Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

import {api} from '../resources/myapi'
import {status, json} from '../resources/requestHandlers'

function SearchCat(){
  const [searching, setSearching] = React.useState(false)
  const [cats, setCat] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  
  const search = (values) => {
    const data = {[values.key]:values.value}
    setSearching(true)
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
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const CatResult = () => {
    if(searching){
      if(loading){
        const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />
        return(<Spin indicator={antIcon}/>)
      }else{
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
      }
    }
  }

  

  return(
    <main>
      <Form onFinish={search}>
        <Form.Item name="key" label="Search by" initialValue='petname'>
          <Select options={
          [
            {value:'petname', label: 'Name'},
            {value:'breed', label: 'Breed'},
            {value:'age', label: 'Age'}
          ]} />
        </Form.Item>
        <Form.Item name="value" label="Keywords" initialValue='*'>
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Search</Button>
        </Form.Item>
      </Form>
      {searching&&<CatResult/>}
    </main>
  )
}

export default SearchCat