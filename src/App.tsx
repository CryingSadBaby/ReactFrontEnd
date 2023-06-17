//Library
import React from 'react'
import {Layout, Space} from 'antd'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

const {Header, Content, Footer, Button} = Layout

//Local
import UserContext from './contexts/user'
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/Login'
import About from './components/About'
import Register from './components/Register'
import Profile from './components/Profile'
import PostCat from './components/PostCat'
import CatDetail from './components/CatDetail'
import SearchCat from './components/SearchCat'
import FavPage from './components/FavPage'
import UpdateCat from './components/UpdateCat'

//Style
import 'antd/dist/reset.css'
import './App.css'

//Main component
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {logged: false, token:"", registered: false, userID:""}
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.reged = this.reged.bind(this)
  }
  
  //State context setting
  login(user){
    console.log("setting context")
    user.logged = true
    user.token = user.token
    this.setState({user:user})
    console.log("User is now being set on the Context ",this.state.user)
  }
  logout(){
    console.log("Removing user from the app context")
    this.setState({user:{logged: false}})
  }
  reged(){
    console.log("Registration completed")
    this.setState({user:{reged: true}})
  }

  render(){
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout,
      reged: this.reged
    }

    //Show main component
    return(
      <main>
        <Layout className="layout">
          <UserContext.Provider value={context}>
            <Router>
              <Header>
                <Nav/>
              </Header>
              <Content style={{padding: '0 50px',height: '90%'}}>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/postcat" element={<PostCat/>}/>
                  <Route path="/cat/:pid" element={<CatDetail/>}/>
                  <Route path="/search" element={<SearchCat/>}/>
                  <Route path="/fav" element={<FavPage/>}/>
                  <Route path="/update/:pid" element={<UpdateCat/>}/>
                </Routes>
              </Content>
              <Footer>
                <h4>VT6003CEM Demo</h4>
              </Footer>
            </Router>
          </UserContext.Provider>
        </Layout>
      </main>
    )
  }
}

//Export main component
export default App