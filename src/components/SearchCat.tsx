//Library
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {Form, Select, Input, InputNumber, Button, Row, Col, Card, Spin} from 'antd'
import {LoadingOutlined,EditOutlined,HeartFilled,HeartOutlined} from '@ant-design/icons'

//Local
import {api} from '../resources/myapi'
import {status, json} from '../resources/requestHandlers'
import UserContext from '../contexts/user'

//Basic input rule
const inputRule = [
  {required: false, message:'Please input keywords'}
]
//Input rule of age
const ageRule = [
  {required: false, message:'Please input age'},
  {type: 'number',min: 1, max: 99, message:'Please input valid age'}
]

//Main component
function SearchCat(){
  const [searching, setSearching] = useState(false)
  const [cats, setCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('text')
  const [favlist, setFavlist] = useState([])
  const [start, setStart] = useState(true)

  const [form] = Form.useForm()

  const user = useContext(UserContext)

  const change = (value) => {
    if(value==="age"){
      setInput('number')
    } else if (value==="gender") {
      setInput('gender')
    } else if (value==="neutered"){
      setInput('neutered')
    } else {
      setInput('text')
    }
  }
  
  //search cats from api database
  const search = (values) => {
    setSearching(true)
    setStart(false)
    setLoading(true)
    const data = {[values.key]:values.value}

    const normalfetch = async() => {
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
        setCat(res)
        setSearching(false)
        setLoading(false)
      })
    }

    const loggedfetch = async() => {
      await fetch(`${api.uri}/pets/search`,{
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      })
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
        if(res.length){
          for(let i=0;i<res.length;i++){
            favlist.push(res[i].id)
          }
          setFavlist(favlist)
          setSearching(false)
          setLoading(false)
        }
      })
    }
    
    if(user.user.logged){
      loggedfetch()
    }else{
      normalfetch()
    }
    
  }

  //add fav function
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

  //remove fav function
  const rmfav = (id: Number, catname: String) => {
    fetch(`${api.uri}/fav/${id}`,{
      method: "DELETE",
      headers: {
        "Authorization": `Basic ${user.user.token}`
      }
    })
    .then(status)
    .then(json)
    .then(res=>{
      alert(`You remove favorited with name: ${catname}`)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  //Show cats search result
  const CatResult = () => {
    if(start){
      return(<h3>Search cats</h3>)
    }else{
      if(loading){
        const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />
        return(<Spin indicator={antIcon}/>)
      }else{
        if(cats.length){
          return(
            <Row>
              {
                cats&&cats.map((
                  {id,petname,des,breed,age,gender,neutered,imageurl,userid})=>(
                    <Col span={8} key={`col${id}`}>
                      <Card
                        key={id}
                        cover={<img src={imageurl} alt={id}/>}
                        style={{width: 300, color:'purple'}}
                        hoverable
                        actions={
                          user.user.logged&&favlist.includes(id)&&userid===user.user.id?
                        ([<HeartFilled key="fav" onClick={()=>{rmfav(id,petname)}}/>,
                          <Link to={`/update/${id}`}><EditOutlined key="edit"/></Link>]):
                          user.user.logged&&!favlist.includes(id)&&userid===user.user.id?
                        ([<HeartOutlined key="fav" onClick={()=>{fav(id,petname)}}/>,
                          <Link to={`/update/${id}`}><EditOutlined key="edit"/></Link>]):
                        user.user.logged&&!favlist.includes(id)?
                        ([<HeartOutlined key="fav" onClick={()=>{fav(id,petname)}}/>]):
                        user.user.logged&&favlist.includes(id)&&
                        [<HeartFilled key="fav" onClick={()=>{rmfav(id,petname)}}/>]}>
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
        }else{return(<h1>There is no matched cats</h1>)}
      }
    }
    // if(searchComp){
    //   if(loading){
    //     const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />
    //     return(<Spin indicator={antIcon}/>)
    //   }else{
    //     if(!error){
    //       return(
    //         <Row>
    //           {
    //             cats&&cats.map((
    //               {id,petname,des,breed,age,gender,neutered,imageurl}
    //             )=>(
    //               <Col span={8}>
    //                 <Card 
    //                   key={id} 
    //                   cover={<img src={imageurl} alt={id}/>}
    //                   style={{width: 300, color:'purple'}}
    //                   hoverable>
    //                   <h3>{petname}</h3>
    //                   <p>{des}</p>
    //                   <p>Breed: {breed}</p>
    //                   <p>Age: {age}</p>
    //                   {!gender&&<p>Gender: female</p>}
    //                   {gender&&<p>Gender: male</p>}
    //                   {!neutered&&<p>Neutered: No</p>}
    //                   {neutered&&<p>Neutered: Yes</p>}
    //                   <Link to={ `/cat/${id}` }>Details</Link>
    //                 </Card>
    //               </Col>
    //             ))
    //           }
    //         </Row>
    //       )
    //     } else {
    //       return(<h1>There is no result</h1>)
    //     }
    //   }
    // }
  }
  //Show main component
  return(
    <main>
      <Form form={form} onFinish={search}>
        <Form.Item name="key" label="Search by" initialValue='petname'>
          <Select options={
          [
            {value:'petname', label: 'Name'},
            {value:'breed', label: 'Breed'},
            {value:'gender', label: 'Gender'},
            {value:'neutered', label: 'Neutered State'},
            {value:'age', label: 'Age'}
          ]} onChange={change} />
        </Form.Item>
          {input==="text"?(
      <Form.Item name="value" label="Keywords" rules={inputRule}>
        <Input />
      </Form.Item>):
          input==="number"?(
            <Form.Item name="value" label="Keywords" rules={ageRule}>
              <InputNumber />
            </Form.Item>):
          input==="gender"?(
            <Form.Item name="value" label="Keywords" rules={inputRule} initialvalue={false}>
              <Select 
                options={
                [{value: false, label: 'female'},
                {value: true, label: 'male'}]}/>
            </Form.Item>):
          input==="neutered"?(
            <Form.Item name="value" label="Keywords" rules={inputRule} initialvalue={false}>
              <Select 
                options={
                [{value: false, label: 'No'},
                {value: true, label: 'Yes'}]}/>
            </Form.Item>
          ):null}
        <Form.Item>
          {!searching&&<Button type="primary" htmlType="submit">Search</Button>}
          {searching&&<Button type="primary" htmlType="submit" disabled>Search</Button>}
        </Form.Item>
      </Form>
      {!searching&&<CatResult/>}
    </main>
  )
}

//Export component
export default SearchCat