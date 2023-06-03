import React from 'react'
import { Layout, Space } from 'antd'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

//style
import './App.css'
import 'antd/dist/reset.css'

//components
import Home from './components/home'
import Dashboard from './components/dashboard'
import About from './components/about'
import Login from './components/login'
import NewArticle from './components/newarticle'
import ArticleDetail from './components/articledetail'
import Profile from './components/profile'
import FavPost from './components/favpost'

const { Header, Content, Footer } = Layout

export default function App() {
  return (
    <Router>
      
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/:aid/profile/">User Profile</Link>
            <Link to="/newarticle">New Article</Link>
            <Link to="/:uid/fav">Favourite Post</Link>
          </Space>
        </nav>
      </Header>

      <Content>
        <Routes>
          <Route index element ={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element ={<About />} />
          <Route path="/login" element ={<Login />} />
          <Route path="/newarticle" element ={<NewArticle />} />
          <Route path="/a/:aid" element={<ArticleDetail />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/:uid/fav" element={<FavPost />} />
        </Routes>
      </Content>

      <Footer>
        <p>VT6003CEM Demo</p>
      </Footer>
        
    </Router>
  )
}