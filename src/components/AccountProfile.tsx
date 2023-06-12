import UserContext from '../contexts/user'
import React, {  useContext } from 'react'
import {status,json} from '../common/requestHandler'
import SearchUser from './UserSearch'
import ImageUpload from './ImageUpload'
import { Row, Col, Space, Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'


function Profile(props) {
  const user = useContext(UserContext)
   return (  
   <UserContext.Consumer>
      {({logout, user}) => (
     <>
       <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
         <Row>
           <Col span={12}>
             <div className="Profile">
             <table   rules="all" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
               <tr>
                 <th align="left" style={{background:"#d3f261"}} >userID:  </th>
                 <td style={{background:"#d3f261"}}>{user.id}</td>
               </tr>
               <tr>
                 <th align="left" style={{background:"#f4ffb8"}}>Username:  </th>
                 <td style={{background:"#f4ffb8"}}>{user.username}</td>
               </tr>
               <tr>
                 <th align="left" style={{background:"#d3f261"}}>Email:  </th>
                 <td style={{background:"#d3f261"}}>{user.email}</td>
               </tr>
               <tr>
                 <th align="left" style={{background:"#f4ffb8"}}>About me:  </th>
                 <td style={{background:"#f4ffb8"}}>{user.about}</td>
               </tr>
               <tr>
                 <th align="left" style={{background:"#d3f261"}} >Avatar:  </th>
                 <td style={{background:"#d3f261"}}><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  {user.avatarurl}</td>
               </tr>
               <tr>
                 <th align="left" style={{background:"#f4ffb8"}} >Role: </th>
                 <td style={{background:"#f4ffb8"}}>{user.role}</td>
               </tr>
             </table>
           </div>
           </Col>
           <Col span={12}>
             { user.role=="admin"&& <SearchUser authbasic={ `${user.atoken}`}/>}
           </Col>
         </Row>
         <Col span={12}>
           { user.role=="admin"&&  <ImageUpload />}</Col>
       </Space>
     </>
   )}
</UserContext.Consumer> 
  )
}
export default Profile