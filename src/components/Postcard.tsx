import React from 'react'
import { Card, Input ,Button, Space} from 'antd'
import PostIcon from './Posticon'
const { Meta } = Card;
import { Link} from 'react-router-dom'
import Displaycomment from './Comments'
import { status, json } from '../utilities/requestHandlers'
import UserContext from '../contexts/user'
import { CloseSquareOutlined,CloseSquareFilled} from '@ant-design/icons'

function getIcon (theme) {
  let Icon;

  if (theme === 'filled') 
    Icon=CloseSquareFilled
   else
    Icon=CloseSquareOutlined
  return Icon;
}

class PostCard extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
     article_comments: [],
      selected: props.selected,
      add_msg:false
    }
    this.onClick = this.onClick.bind(this);
  }  
  
  static contextType = UserContext;
  
  componentDidMount() {   
  fetch(this.props.links.msg)
  .then(status)
  .then(json)
  .then(response => { 
    console.log('msgLink ',this.props.links.msg)
    console.log('res ',response)
    this.setState({article_comments:response})
    console.log('no of msg ',this.state.article_comments.length)
  })
  .catch(err => {
    console.log(`${this.props.type} icon error for msg ${this.props.type} `)
  });
 }
 
addComment(event) {  
  this.setState({input_msg: event.target.value})
    if(this.state.input_msg!=null){
      let raw = JSON.stringify({"messagetxt": `${this.state.input_msg}`})
        console.log('raw ', raw)
      return(
          fetch(this.props.links.msg, {
           method: "POST",
             body: raw,
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${this.context.user.atoken}`
        }  
               
    }).then(status)
      .then(json)
      .then(reponsejson =>{ if(reponsejson.message==="added")
      {
       alert("Post added")}
         else(alert("you have post like already"))
      })
      .catch(err => {
      console.log(`${this.props.links.msg} Check network problems pls. ${this.props.id}`);
         alert("Check network problems");
      })
      )}
                 
}

onClick()
  {this.setState({selected: !this.state.selected})
  fetch(this.props.links.fav, {
        method: "DELETE",
        headers: {
            "Authorization": `Basic ${this.context.user.atoken}`
        }        
    }).then(status)
      .then(json)
      .then(responsejson =>{ console.log('respone ',responsejson.message)
        if(responsejson.message==="removed")
      {
          alert("This article is removed from your favorite list")}
        
      })
      .catch(err => {
      console.log(`${this.props.type} Check network problems pls. ${this.props.id}`);
         alert("Check network problems");
  })      
}
    
  render() {
    const theme = this.state.selected ? 'filled' : 'outlined';
    const Icon = getIcon(theme)
    
      return(  
     <>{this.props.InFav=='true'&&<Icon onClick={this.onClick}/>}
        <Card
        style={{ width: 320 }}
        cover={<img alt="test" src={this.props.imageurl}/>}
        hoverable={true}
        actions={[
      <PostIcon type="like" countLink={this.props.links.likes} handleToggle={this.toggleLike} id={this.props.id} />,
      <PostIcon type="dislike" countLink={this.props.links.likes} handleToggle={this.toggleLike} id={this.props.id} />,
   <PostIcon type="message" msgLink={this.props.links.msg} 
            msg_count={this.state.article_comments.length}
            handleToggle={this.toggleLike} id={this.props.id} /> ,
          <PostIcon type="heart" FavLink={this.props.links.fav} 
          handleToggle={this.toggleLike} id={this.props.id} />
        ]}>
        <Meta title={this.props.title} description={this.props.summary} />
        <p></p>
  <Link   to={ `/article/${this.props.id}` }>Details</Link> 
          <Displaycomment data={this.state.article_comments} 
            isLoggedIn= {this.context.user.loggedIn} role={this.context.user.role}
            msgLink={this.props.links.msg}
            username={this.context.user.username}
            password={this.context.user.password}
            />
          <Input  placeholder="Pls. login to enter your comments here" name='input_msg' disabled={this.context.user.loggedIn? false:true} value={this.state.title} allowClear
            onPressEnter={this.addComment.bind(this)} /> </Card>      
      </>   
    );
   }
}       
export default PostCard; 