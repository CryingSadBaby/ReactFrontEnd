//Library
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Card, Col, Row, Spin} from 'antd'
import {RollbackOutlined,LoadingOutlined} from '@ant-design/icons'

//Local
import {api} from '../resources/myapi'
import {status, json} from '../resources/requestHandlers'

//Main component
function Cats(){
  //init react state
  const [cats, setCat] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  //init fetch api data
  useEffect(()=>{
    fetch(`${api.uri}/pets`)
    .then(status)
    .then(json)
    .then(data => {
      console.log(`Data: ${data}`)
      setCat(data)
      setLoading(false)
    })
  },[])

  //If react state loading, show spining circle
  if(loading){
    const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />
    return(<Spin indicator={antIcon}/>)
  }else{
    //Show cats information by Card
    return(
      <Row>
        {
          cats&&cats.map(({id,petname,des,breed,age,gender,neutered,imageurl})=>(
            <Col span={8}>
              <Card key={id} cover={<img src={imageurl} alt={id}/>} style={{width: 300, color:'purple'}} hoverable>
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

export default Cats