import React from 'react'
import {Link} from 'react-router-dom'

function Post({posts}) {
    return (
        <ul>
          {posts.map(item => {
              return <li key={item.id}><Link to={`/post/${item.id}`}>{item.title}</Link></li>
          })}  
        </ul>
    )
}

export default Post
