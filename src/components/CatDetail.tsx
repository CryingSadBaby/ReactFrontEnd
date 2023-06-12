import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spin } from 'antd'
import axios from 'axios'
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons'

//local file
import { api } from '../utilities/common_api'

const CatDetail = () => {
  const [cat, setCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const { pid } = useParams()
  const navigate = useNavigate()
  let catgender = ""
  let neutered = ""

  useEffect(()=>{
    axios.get(`${api.uri}/pets/${pid}`)
      .then((res)=>{
        setCat(res.data)
      })
      .then(()=>{
        setLoading(false)
      })
  }, [])
  if(loading){
    const loadingIcon = <LoadingOutlined style={{fontSize: 48}} spin />
    return(<Spin indicator={loadingIcon}/>)
  } else {
    if(!cat){
      return(<div>Page does not exist</div>)
    } else {
      if(!cat.gender){
        catgender = "boy"
      } else {
        catgender = "girl"
      }
      if(!cat.neutered){
        neutered = "False"
      } else {
        neutered = "True"
      }
      return(
        <div>
          <h1>Name: {cat.petname}</h1>
          <img src={cat.imageurl} width="500" />
          <p>Age: {cat.age}</p>
          <p>Breed: {cat.breed}</p>
          <p>Gender: {catgender}</p>
          <p>Description: {cat.des}</p>
          <p>Neutered: {neutered}</p>
          <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)}/>
        </div>
      )
    }
  }
  
  
}

export default CatDetail