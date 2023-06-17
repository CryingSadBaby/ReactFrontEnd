//Library
import React, {useEffect,useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {Card, Col, Row, Spin} from 'antd'
import {RollbackOutlined,LoadingOutlined,HeartOutlined,HeartFilled,EditOutlined} from '@ant-design/icons'

//Local
import {api} from '../resources/myapi'
import {status, json} from '../resources/requestHandlers'
import UserContext from '../contexts/user'

//Main component
function Cats(){
  //init react state
  const [cats, setCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [favlist, setFavlist] = useState([])


  const user = useContext(UserContext)

  //init fetch api data
  useEffect(()=>{
    const loggedfetch = async() => {
      await fetch(`${api.uri}/pets`)
    .then(status)
    .then(json)
    .then(res=>{
      setCat(res)
    })
      await fetch(`${api.uri}/fav`,{
      method: "GET",
      headers: {
        "Authorization": `Basic ${user.user.token}`
      }
    })
    .then(status)
    .then(json)
    .then(res=>{
      for(let i=0;i<res.length;i++){
        favlist.push(res[i].id)
      }
      setFavlist(favlist)
      setLoading(false)
    })
      
    }
    const normalfetch = async() => {
      await fetch(`${api.uri}/pets`)
    .then(status)
    .then(json)
    .then(res=>{
      setCat(res)
      setLoading(false)
    })
      
    }
    if(user.user.logged){
      loggedfetch()
    }else{
      normalfetch()
    }
  },[])

  const fav = (id: Number,catname: String) => {
    fetch(`${api.uri}/fav/${id}`,{
      method: "POST",
      headers: {
        "Authorization": `Basic ${user.user.token}`
      }
    })
    .then(status)
    .then(json)
    .then(res=>{
      alert(`You favorited cats with name: ${catname}`)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //If react state loading, show spining circle
  if(loading){
    const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />
    return(<Spin indicator={antIcon}/>)
  }else{
    //Show cats information by Card
    return(
      <UserContext.Consumer>
        {({user})=>(
        <Row>
        {
          cats&&cats.map(({id,petname,des,breed,age,gender,neutered,imageurl,userid})=>(
            <Col span={8} key={`col${id}`}>
              <Card 
                key={id}
                cover={<img src={imageurl} alt={id}/>} 
                style={{width: 300, color:'purple'}} 
                hoverable
                actions={
                  user.logged&&favlist.includes(id)&&userid===user.id?
                  ([<HeartFilled key="fav" onClick={()=>{fav(id,petname)}}/>,<Link to={`/update/${id}`}><EditOutlined key="edit"/></Link>]):
                  user.logged&&!favlist.includes(id)&&userid===user.id?([<HeartOutlined key="fav" onClick={()=>{fav(id,petname)}}/>,<Link to={`/update/${id}`}><EditOutlined key="edit"/></Link>]):
                user.logged&&!favlist.includes(id)?([<HeartOutlined key="fav" onClick={()=>{fav(id,petname)}}/>]):user.logged&&favlist.includes(id)&&[<HeartFilled key="fav" onClick={()=>{fav(id,petname)}}/>]}>
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
        </Row>)}
      </UserContext.Consumer>
    )
  }
}

export default Cats