//Library
import {Menu,Layout} from 'antd'
import {Link} from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'

//Local
import UserContext from '../contexts/user'

const {Content} = Layout

//Main component
function Nav(props){
  const logout = useContext(UserContext)
  //Show main component
  return(
    <UserContext.Consumer>
      {({logout, user}) => (
      <main>
        <div className="logo"/>
        <Content>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/search">Search Cats</Link></Menu.Item>
            {user.logged&&<Menu.Item key="4" onClick={logout}><Link to="/">Logout</Link></Menu.Item>}
            {!user.logged&&<Menu.Item key="4"><Link to="/login">Login</Link></Menu.Item>}
            {!user.logged&&<Menu.Item key="5"><Link to="/register">Register</Link></Menu.Item>}
            {user.logged&&<Menu.Item key="6"><Link to="/profile">Profile</Link></Menu.Item>}
            {user.logged&&<Menu.Item key="7"><Link to="/fav">Favorites</Link></Menu.Item>}
            {user.logged&&user.role==='staff'?(<Menu.Item key="8"><Link to="/postcat">Post Cat</Link></Menu.Item>):null}
          </Menu>
        </Content>
      </main>
      )}
    </UserContext.Consumer>
  )
}

//Export main component
export default Nav