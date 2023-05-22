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
          </Space>
        </nav>
      </Header>

      <Content>
        <Routes>
          <Route index element ={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element ={<About />} />
        </Routes>
      </Content>

      <Footer>
        <p>VT6003CEM Demo</p>
      </Footer>
        
    </Router>
  )
}