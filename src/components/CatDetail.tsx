import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Button, Spin} from 'antd'
import {RollbackOutlined, LoadingOutlined} from '@ant-design/icons'

import {status,json} from '../resources/requestHandlers'
import {api} from '../resources/myapi'

function CatDetail(props){
  const id = useParams()
  const navigate = useNavigate()
  const [cat, setCat] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  useEffect(()=>{
    fetch(`${api.uri}/pets/${id.pid}`)
    .then(status)
    .then(json)
    .then(data=>{
      console.log(`Data: ${data}`)
      setCat(data)
      setLoading(false)
    })
  },[])
  
  if(id==undefined){
    return(
      <main>
        <h1>The Cat detail</h1>
        <h2>Nothing to show yet...</h2>
        <Button type="primary" icon={<RollbackOutlined/>} onClick={()=>navigate(-1)}/>
      </main>
    )
  }else{
    if(loading){
      const antIcon = <LoadingOutlined style={{fontSize: 48}} spin/>
      return(<Spin indicator={antIcon}/>)
    }else{
      console.log(cat.petname)
      return(
        <main>
          <h1>{cat.petname}</h1>
          <img src={cat.imageurl} alt={id} width="600"/>
          <h3>{cat.des}</h3>
          <h3>{cat.breed}</h3>
          <h3>{cat.age}</h3>
          {!cat.gender&&<h3>Gender: female</h3>}
          {cat.gender&&<h3>Gender: male</h3>}
          {!cat.neutered&&<h3>Neutered: No</h3>}
          {cat.neutered&&<h3>Neutered: Yes</h3>}
          <h3>Poster id: {cat.userid}</h3>
          <Button type="primary" icon={<RollbackOutlined/>} onClick={()=>navigate(-1)}/>
        </main>
      )
    }
  }
}

export default CatDetail