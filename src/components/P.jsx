import React from 'react'

function P({post}) {
    // console.log(post)
    return (
        <>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        </>
    )
}

export default P
