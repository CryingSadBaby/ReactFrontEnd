import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spin } from 'antd'
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons'

//load api
import { api } from '../common/http-common'

const Profile = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const { aid } = useParams()
  const navigate = useNavigate()

  React.useEffect(()=>{
    axios.get(`${api.uri}/users/${aid}`).then((res)=>{
      setUser(res.data)
    }).then(()=>{
      setLoading(false)
    })
  }, [])

  if(loading){
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return(<Spin indicator={antIcon} />)
  } else {
    if(!user){
      return(<div>The user not exist</div>)
    } else {
      return(
        <>
          <h1>{user.username}</h1>
        </>
      )
    }
  }
}

export default Profile