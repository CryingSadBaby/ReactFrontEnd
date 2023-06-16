//Library
import React, {useContext} from 'react'
import {Row, Col, Space, Avatar, Image} from 'antd'
import {UserOutlined} from '@ant-design/icons'

//Local
import UserContext from '../contexts/user'

//Main component
function ProfileGrid(props){
  //Get UserContext as user
  const user = useContext(UserContext)
  //Show main component
  return(
    <UserContext.Consumer>
      {({logout, user}) => (
      <main>
        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
          <Row>
            <Col span={12}>
              <div className="Profile">
                <table style={{"borderWidth":"1px","borderColor":"#aaaaaa","borderStyle":"solid"}}>
                  <tbody>
                    <tr>
                      <th align="center" style={{background:"#3399ff"}}>user ID: </th>
                      <td style={{background:"#0073e6"}}>{user.id}</td>
                    </tr>
                    <tr>
                      <th align="center" style={{background:"#3333ff"}}>Username: </th>
                      <td style={{background:"#006bb3"}}>{user.username}</td>
                    </tr>
                    <tr>
                      <th align="center" style={{background:"#3399ff"}}>Email: </th>
                      <td style={{background:"#0073e6"}}>{user.email}</td>
                    </tr>
                    <tr>
                      <th align="center" style={{background:"#3333ff"}}>About me: </th>
                      <td style={{background:"#006bb3"}}>{user.about}</td>
                    </tr>
                    <tr>
                      <th align="center" style={{background:"#3399ff"}}>Avatar: </th>
                      <td style={{background:"#0073e6"}}><Avatar style={{backgroundColor:"#66c2ff"}} icon={<UserOutlined/>}/>{user.avatarurl}</td>
                    </tr>
                    <tr>
                      <th align="center" style={{background:"#3333ff"}}>Role: </th>
                      <td style={{background:"#006bb3"}}>{user.role}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Space>
      </main>
      )}
    </UserContext.Consumer>
  )
}

//Export main component
export default ProfileGrid