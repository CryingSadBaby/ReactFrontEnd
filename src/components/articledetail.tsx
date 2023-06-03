import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spin } from 'antd'
import axios from 'axios'
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons'

//local file
import { api } from '../common/http-common'

const ArticleDetail = (props) => {
  const [articles, setArticles] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const { aid } = useParams()
  const navigate = useNavigate()
  
  React.useEffect(()=>{
    axios.get(`${api.uri}/pets/${aid}`)
      .then((res)=>{
        setArticles(res.data)
      })
      .then(()=>{
        setLoading(false)
      })
  }, []);

  if(loading){
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return(<Spin indicator={antIcon} />);
  } else {
    if(!articles){
      return(<div>There is no article available now.</div>)
    } else {
      return(
        <>
          <h1>{articles.petname}</h1>
          <p>Breed: {articles.breed}</p>
          <p>Age: {articles.age}</p>
          <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)}/>
        </>
      )
    }
  }
}
export default ArticleDetail