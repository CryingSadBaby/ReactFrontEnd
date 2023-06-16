import {Menu,Layout} from 'antd'
import {Link} from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'

import UserContext from '../contexts/user'

const {Content} = Layout

function Nav(props){
  const logout = useContext(UserContext)

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
            <Menu.Item key="4" onClick={logout}>{user.logged&&<Link to="/">Logout</Link>}</Menu.Item>
            <Menu.Item key="5">{!user.logged&&<Link to="/login">Login</Link>}</Menu.Item>
            <Menu.Item key="6">{!user.logged&&<Link to="/register">Register</Link>}</Menu.Item>
            <Menu.Item key="7">{user.logged&&<Link to="/profile">Profile</Link>}</Menu.Item>
            <Menu.Item key="8">{user.logged&&<Link to="/postcat">Post Cat</Link>}</Menu.Item>
          </Menu>
        </Content>
      </main>
      )}
    </UserContext.Consumer>
  )
}

export default Nav