//Library
import {useContext,useEffect,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {LoadingOutlined,HeartOutlined,HeartFilled} from '@ant-design/icons'
import {Card, Col, Row, Spin} from 'antd'

//Local
import UserContext from '../contexts/user'
import {api} from '../resources/myapi'
import {status,json} from '../resources/requestHandlers'

//Main component
function FavGrid(){
  const [cats, setCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)

  const navigate = useNavigate()
  const user = useContext(UserContext)
  const token = user.user.token

  const rmfav = (id: Number, catname: String) => {
    fetch(`${api.uri}/fav/${id}`,{
      method: "DELETE",
      headers: {
        "Authorization": `Basic ${token}`
      }
    })
    .then(status)
    .then(json)
    .then(res=>{
      alert(`You remove favorited with name: ${catname}`)
      navigate('/')
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    fetch(`${api.uri}/fav`,{
      method: "GET",
      headers: {
        "Authorization": `Basic ${token}`
      }
    })
    .then(status)
    .then(json)
    .then(res=>{
      if(!res.length){
        setErrors(true)
        setLoading(false)
      } else {
        setCat(res)
        setLoading(false)
      }
    })
  },[])

  //show favorited cats component
  const Cats = () => {
    if(loading){
      const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />
      return(<Spin indicator={antIcon}/>)
    } else if(errors){
      return(<p>There is no favorited cats</p>)
    } else {
      return(
        <Row>
          {cats&&cats.map((
          {id,petname,des,breed,age,gender,neutered,imageurl})=>(
            <Col span={8}>
              <Card 
                key={id} 
                cover={<img src={imageurl} alt={id}/>}
                style={{width: 300, color:'purple'}}
                hoverable
                actions={[
                  <HeartFilled key='fav'onClick={()=>{rmfav(id,petname)}}/>
                ]}>
                <h3>{petname}</h3>
                <p>{des}</p>
                <p>Breeed: {breed}</p>
                <p>Age: {age}</p>
                {!gender&&<p>Gender: female</p>}
                {gender&&<p>Gender: male</p>}
                {!neutered&&<p>Neutered: No</p>}
                {neutered&&<p>Neutered: Yes</p>}
                <Link to={ `/cat/${id}` }>Details</Link>
              </Card>
            </Col>
          ))}
        </Row>
      )
    }
  }
  
  return(
    <UserContext.Consumer>
      {({user})=>(
      <main>
        <Cats/>
      </main>
      )}
    </UserContext.Consumer>
  )
}

//Export main component
export default FavGrid