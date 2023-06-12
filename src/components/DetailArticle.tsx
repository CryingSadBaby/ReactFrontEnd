import React, { useEffect }from 'react'
import { status, json } from '../utilities/requestHandlers'
import { api } from '../utilities/common_api'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spin } from 'antd';
import { RollbackOutlined,LoadingOutlined } from '@ant-design/icons'


function DetailArticle(props) {
	var { id } = useParams();
	const navigate = useNavigate();
  const [article, setArticle] = React.useState('')
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch(`${api.uri}/articles/${id}`)
    .then(status)
    .then(json)
    .then(data => {console.log('data ',data)
      setArticle(data);
      setLoading(false);            
    })

  }); 
      if (id==undefined){
        return (
				<>
          <h1 style={{ color: 'red' }}> Welcome to Blog Dashboard</h1>   
					<h2>Nothing to show yet</h2>
					<Button
						type="primary"
						icon={<RollbackOutlined />}
						onClick={() => navigate(-1)}
					/>
				</>
			);
      }
      else  
        if(loading){
    const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
    return(<Spin indicator={antIcon} />)
    }
    else {
			return (
				<>
          <h1 style={{ color: 'red' }}> Welcome to Blog Dashboard</h1>   
					<h2>{article.title}</h2>
					<p style={{ color: 'green' }}>{article.fullText}</p>
          <p style={{ color: 'cyan' }}>{article.description}</p>
					<Button
						type="primary"
						icon={<RollbackOutlined />}
						onClick={() => navigate(-1)}
					/>
				</>
			)
    }
}
   
export default DetailArticle


