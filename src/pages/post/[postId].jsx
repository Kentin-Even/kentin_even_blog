import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
export const getServerSideProps = async ({ params }) => {
  const { postId } = params
  const data = await apiClient(`post/${postId}`)

  return { props: { initialData: data } }
}
const PostPage = ({ initialData }) => {
  const router = useRouter()
  const { query } = router
  const { data: post } = useQuery({
    queryKey: ["post", query.postId],
    queryFn: () => apiClient(`${query.postId}`),
    initialData,
    enabled: false,
  })

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-3xl font-bold mb-2">Title: {post.title}</h1>
      <p className="text-gray-700">Content: {post.content}</p>
    </div>
  )
}
export default PostPage
