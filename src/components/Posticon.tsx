import React from 'react'
import { LikeOutlined,LikeFilled, DislikeOutlined,DislikeFilled, MessageOutlined, MessageFilled,HeartOutlined,HeartFilled} from '@ant-design/icons'
import { status, json } from '../utilities/requestHandlers'
import { Comment } from '@ant-design/compatible'
import {  List, Tooltip  } from 'antd'
import UserContext from '../contexts/user'



function getIcon (theme, iconType) {
  let Icon;

  if (theme === 'filled') {
    if (iconType === 'like') {
      Icon = LikeFilled
    } else if (iconType === 'dislike') {
       Icon = DislikeFilled
    } else if (iconType === 'heart') {
      Icon = HeartFilled
    } else if (iconType === 'message') {
      Icon = MessageFilled
    }
  } else if (theme === 'outlined') {
    if (iconType === 'like') {
      Icon = LikeOutlined
    }  else if (iconType === 'dislike') {
       Icon = DislikeOutlined
    } else if (iconType === 'heart') {
      Icon = HeartOutlined
    } else if (iconType === 'message') {
      Icon = MessageOutlined
    }      
  }
 
  return Icon;
}

class PostIcon extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      selected: props.selected,
      count:0,
      show_msg:false,
      countLink:this.props.countLink,
      FavLink:this.props.FavLink,
      msgLink:this.props.msgLink,
    };
  this.onClick = this.onClick.bind(this);
  }
  
  static contextType = UserContext;
  
componentDidMount() { 
  if(this.props.type=='like'){
  fetch(this.props.countLink)
  .then(status)
  .then(json)
  .then(count => {
      console.log('this.coutLink ', this.props.countLink);
    this.setState({count:count})
  })
  .catch(err => {
   
    console.log(`${this.props.type} icon error for post ${this.props.type} `)
  });
 }
  
}
 

postLike() 
{
if(this.props.type=='like'&&this.context.user.username!="undefined"){ 
//console.log(`logging in user: ${this.context.user.username} password: ${this.context.user.password}`)
   return (fetch(this.props.countLink, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${this.context.user.atoken}`
        }        
    }).then(status)
      .then(json)
      .then(responsejson =>{ if(responsejson.message==="liked")
      {this.setState({count:this.state.count+1})
          alert("Post liked")}
         else(alert("you have post like already"))
      })
      .catch(err => {
      console.log(`${this.props.type} Check network problems pls. ${this.props.id}`);
         alert("Check network problems");
  })
 )
}
}

 postdisLike() 
{
if(this.props.type=='dislike'&&this.context.user.username!="undefined"){ 
console.log(`logging in user: ${this.context.user.username} password: ${this.context.user.password}`)
   return (fetch(this.props.countLink, {
        method: "DELETE",
        headers: {
            "Authorization": `Basic ${this.context.user.atoken}`
        }        
    }).then(status)
      .then(json)
      .then(responsejson =>{ console.log('respone ',responsejson.message)
        if(responsejson.message==="disliked")
      {this.setState({count:this.state.count-1})
          alert("Post disliked")}
         else(
           
           alert("you have not post like yet"))
      })
      .catch(err => {
      console.log(`${this.props.type} Check network problems pls. ${this.props.id}`);
         alert("Check network problems");
  })
 )
}
}
addFav() 
{
if(this.props.type=='heart'&&this.context.user.username!="undefined"){ 
console.log(`logging in user: ${this.context.user.username} password: ${this.context.user.password}`)
   return (fetch(this.props.FavLink, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${this.context.user.atoken}`
        }        
    }).then(status)
      .then(json)
      .then(reponsejson =>{ if(reponsejson.message==="added")
      {
       console.log("message "+ reponsejson.message) 
       alert("Fav added")}
         else(alert("you have add this Fav already"))
      })
      .catch(err => {
      console.log(`${this.props.type} Check network problems pls. ${this.props.id}`);
         alert("Check network problems");
  })
 )
}
}

  

//show all messages count of this article and allow showing, adding & deleting comment


  

  
 
 
   
  
onClick()
  {
    //reverse the selected state with every click
  

  
   //need to post count to API server database in table articleslikes with articleid and userid =>need to login like and dislike posts
  
   
    if((this.context.user.loggedIn==false))
      {alert("Pls. login to procceed this action")}
    else  
      if(this.props.type=='like')  {this.postLike();this.setState({selected: !this.state.selected});}
    else
        if(this.props.type=='dislike')  {this.postdisLike();this.setState({selected: !this.state.selected});}
    else
             if(this.props.type=='heart') {this.addFav();this.setState({selected: !this.state.selected});}
    else 
      if(this.props.type=='message') { this.setState({selected: !this.state.selected});} 
  }   
 
 

  render(){
    const theme = this.state.selected ? 'filled' : 'outlined'; 
    const iconType = this.props.type;
    const Icon = getIcon(theme, iconType);
    
    return (
     <span>        
        <Icon
          onClick={this.onClick}
          style={{color:'steelblue'}}  />
          {iconType === 'like'&&this.state.count}{iconType ==='message'&&this.props.msg_count}
        </span>
    
    
  
       
      
     
      
    );
  }

}
export default PostIcon
