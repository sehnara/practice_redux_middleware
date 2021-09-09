import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../modules/posts"
import Post from "./Post"

function PostContainer() {
  const { loading, data, error } = useSelector((state) => state.posts.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    // if (data) return // API 재로딩 문제 해결방법 1
    dispatch(getPosts())
  }, [dispatch])

  if (loading && !data) return <div>로딩중 ...</div>
  if (error) return <div>에러발생</div>
  if (!data) return null
  return <Post posts={data} />
}

export default PostContainer
