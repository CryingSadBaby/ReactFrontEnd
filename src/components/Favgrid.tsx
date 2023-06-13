import React from 'react'
import { Col, Row } from 'antd'
import PostCard from './Postcard'
import { status, json } from '../utilities/requestHandlers'
import { api } from '../utilities/common_api'
import UserContext from '../contexts/user'


class FavGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    listfav: [],
    posts:[]
     
      
    }
  }
static contextType = UserContext;
componentDidMount() {
 
  fetch(`${api.uri}/articles/fav`,{
        method: "GET",
        headers: {
            "Authorization": `Basic ${this.context.user.atoken}`
        }        
    })
  .then(status)
  .then(json)
  .then(data => {
    this.setState({ listfav: data })
 // console.log('listfav ', data)  
  fetch(`${api.uri}/articles`)
  .then(status)
  .then(json)
  .then(respon => {
    this.setState({ posts: this.filterPosts(data, respon) })
 //   console.log('posts ', respon) 
 //   console.log('favposts ', this.state.posts)  
  })
  
  })
  .catch(err => console.log("Error fetching fav article list", err));
       
  }

 filterPosts(filterarray, originarray) 
  { let resArr=[]
    for(let i=0; i<filterarray.length;i++)
      for( let j=0; j<originarray.length;j++)
        {
         if(filterarray[i].articleid== originarray[j].id)
          {resArr.push(originarray[j])
          break
          }  
        }
   return resArr
  }
  
   
 
  render() {
  
    if (!this.state.posts.length) {
      return <h3>There is no favorite posts...</h3>
    }
    const cardList = this.state.posts.map(post => {
      return ( 
        <div style={{padding:"10px"}} key={post.id} >
          <Col span={6}>
            <PostCard InFav='true' {...post} />           
          </Col>  
          
         </div>
      )
    });
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default FavGrid
