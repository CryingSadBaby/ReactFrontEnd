import React from 'react'
import {  Layout,Space } from 'antd'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import UserContext from './contexts/user'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import Img_Page from './components/Img_Page'
import Account from './components/Account'
import Dashboard from './components/Dashboard'
import CatDetail from './components/CatDetail'
import DetailArticle from './components/DetailArticle'
import About from './components/About'
import FavPage from './components/Favpage'

const { Header, Content, Footer, Button} = Layout




class App extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    user: {loggedIn: false, atoken:"", registerOK:false, userID:''}
  }
  
  this.login = this.login.bind(this)
  this.logout = this.logout.bind(this)
  this.regComplete = this.regComplete.bind(this)
}
   

login(user) {

  console.log("i m setting context")
  user.loggedIn = true
  user.atoken=user.atoken
  this.setState({user:user})
  console.log("User is now being set on the context ", this.state.user)
  
}

logout() {
  console.log("Removing user from the app context")
  this.setState({user: {loggedIn:false}})
}   
  
regComplete() {
  console.log("Registration completed")
  this.setState({user: {registerOK:true}})
}   
  
  render(){
  const context = {
  user: this.state.user,
  login: this.login,
  logout: this.logout,
  regComplete:this.regComplete}
  
    
  return(
   
    <Layout className="layout">
    <UserContext.Provider value= {context}>  	
     <Router>
				<Header> 
        <Nav/>
        </Header> 
	      <Content style={{ padding: '0 50px', height: '90%' }}>
        <Space>	
          {!context.user.loggedIn&& <Link to="/login">Login</Link>}
          {context.user.loggedIn&& <Link to="/account" style={{color:"red",background: "#91d5ff"}} type ="link" > Account: {context.user.username}  </Link>}
          {context.user.loggedIn&&  <Link to="/favpage">My Favorite</Link>}
          {!context.user.registerOK&&!context.user.loggedIn&&<Link to="/register">Register</Link>}
        </Space>
                       			
				<Routes>
          <Route path="/login"element={<Login />} />
          <Route path="/register"element={<Register/>}/>
          <Route path="/img_page"element={<Img_Page/>}/>
          <Route path="/account"element={<Account/>}/>
          <Route path="/"element={<Home/>}/>
          <Route path="/dashboard"element={<Dashboard/>}/>
          <Route path="/pet/:pid"element={<CatDetail/>}/>
          <Route path="/article/:id" element={<DetailArticle />} />
          <Route path="/about"element={<About/>}/>
          <Route path="/favpage"element={<FavPage/>}/>
				</Routes>			
				</Content>
       <Footer>
					<p style={{ color: 'green' }}>VT6003CEM Demo</p>
				</Footer>
			</Router>	
  </UserContext.Provider>  
  </Layout> 
  )
 }
}
  
  
export default App

