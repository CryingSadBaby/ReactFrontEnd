
import { List, Tooltip, Space } from  'antd'
import { Comment } from '@ant-design/compatible'
import { DeleteOutlined,DeleteFilled, } from '@ant-design/icons'
import { status, json } from '../utilities/requestHandlers'
import React, { useState } from 'react'

const DisplayComment = (props) => {    

const [Icon, setIcon] = useState(DeleteOutlined);
const  removeComm = (msgtxt) =>{
  const raw = JSON.stringify({"messagetxt": `${msgtxt}`})
  console.log(' msgLink  ',props.msgLink)   
  console.log(' raw  ',raw)   
  if(raw!=undefined){
    fetch (props.msgLink, {
      method: "DELETE",
      body: raw,
      headers: {"Content-Type": "application/json",
            "Authorization": "Basic " +  btoa(`${props.username}:${props.password}`)
               },
      mode: 'no-cors'
    })
      .then(status)
      .then(json)
      .then(responsejson =>{ 
        console.log('msglink ',props.msgLink)
        console.log('respone ',responsejson.message)
        if(responsejson.message==="removed")
      {
        alert("This article commentis removed by admin")}
      })
      .catch(err => {
        console.log(`${this.props.type} Check network problems pls. ${this.props.id}`)
        alert("Check network problems")
      })
  }
}
  return(
    <List
      className="comment-list"
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={(item) => (
        <li>
          <Comment
            author={item.username}
            content={item.messagetxt}   
            datetime={item.datemodified}
            />
          {
          props.isLoggedIn&&props.role==='admin'&&
          <DeleteOutlined onClick={() =>removeComm(item.messagetxt)}/>
          }
        </li>
      )}
      />
  )
}

export default DisplayComment

