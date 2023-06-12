import axios from 'axios'
import {useState, useEffect} from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Card, Row, Col, Spin } from 'antd'
import { Link } from 'react-router-dom'

import { api } from '../utilities/common_api'

const Cats = ()=>{
  const [cats, setCats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    axios.get(`${api.uri}/pets`)
      .then((res)=>{
        setCats(res.data)
      })
      .then(()=>{
        setLoading(false)
      })
  }, [])

  if(loading){
    const loadingIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
    return (<Spin indicator={loadingIcon} />)
  } else {
    if(!Cats){
      return (<div>There is no cats avalible now.</div>)
    } else {
      return (
        <Row>
          {
            cats && cats.map(({id,petname,breed,age,gender,neutered,imageurl})=>(
              <Col span={8} key={id}>
                <Card cover=<img src={imageurl}/>>
                  <Card.Meta title={petname}/>
                  <Link to= {`/pet/${id}`}>Details</Link>
                </Card>
              </Col>
            ))
          }
        </Row>
      )
    }
  }
  
}

export default Cats