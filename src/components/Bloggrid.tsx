import React from 'react'
import { Col, Row } from 'antd'
import PostCard from './Postcard'
import { status, json } from '../utilities/requestHandlers'
import { api } from '../utilities/common_api'

class BlogGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
  fetch(`${api.uri}/articles`)
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ posts: data })
    })
    .catch(err => console.log("Error fetching articles", err))
  }
  render() {
    if (!this.state.posts.length) {
      return <h3>Loading posts...</h3>
    }
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post.id} >
          <Col span={6}>
            <PostCard InFav='false' {...post} />  
          </Col>
        </div>
      )
    })
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    )
  }
}

export default BlogGrid
