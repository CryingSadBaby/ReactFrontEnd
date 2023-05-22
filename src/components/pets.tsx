import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Spin } from 'antd'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'

//local file
import { api } from '../common/http-common'

const Pets = () => {
  const [articles, setArticles] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(()=>{
    axios.get(`${api.uri}/pets`)
      .then((res)=>{
        setArticles(res.data)
      })
      .then(()=>{
        setLoading(false)
      })
  }, []);

  if(loading){
    const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
    return(<Spin indicator={antIcon} />);
  } else {
    if(!articles){
      return(<div>There is no article available now.</div>)
    } else {
      return(
        <Row>
          {
            articles && articles.map(({id, petname,des,breed,age})=> (
              <Col span={8} key={id}>
                <Card hoverable={true} title={petname} style={{width: 300}}>
                  <p>{des}</p>
                  <p>Breed: {breed}</p>
                  <p>Age: {age}</p>
                  <Link to= {`/a/${id}`}>Details</Link>
                </Card>
              </Col>
            ))
          }
        </Row>
      )
    }
  }
}
export default Pets