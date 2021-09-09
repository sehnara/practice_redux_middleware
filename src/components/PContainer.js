import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { clearPost, getPost, goToHome } from "../modules/posts"
import P from "./P"

function PContainer() {
  const postId = useRouteMatch().params.id
  const { loading, data, error } = useSelector((state) => state.posts.post[postId]) || {
    loading: false,
    data: null,
    error: null,
  }
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) return
    dispatch(getPost(postId))
    // Post API 재로딩 문제 해결 방법 : 링크를 클릭하면 그 전에 데이터가 남아있어 라우팅 시 데이터가 살짝 보이는 문제가 있었다.
    // 그래서 post에서 뒤로가기 할 때 데이터를 다시 비워주는 것으로 해결!(unmount시, data비우기)
    // return () => {
    //   dispatch(clearPost())
    // }
  }, [postId, dispatch])

  if (loading && !data) return <div>로딩 중...</div>
  if (error) return <div>에러발생</div>
  if (!data) return null
  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <P post={data} />
    </>
  )
}

export default PContainer
