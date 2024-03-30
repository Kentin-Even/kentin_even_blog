import { formatDateTimeShort } from "@/utils/formatters"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import Button from "@/web/components/ui/Button"
import { useRouter } from "next/router"

export const getServerSideProps = async () => {
  try {
    const data = await apiClient("/posts")

    return { props: { initialData: data } }
  } catch (error) { 
    // eslint-disable-next-line no-console
    console.error(error)

    return { props: { initialData: [] } }
  }
}
const IndexPage = ({ initialData }) => {
  const router = useRouter()
  const { isFetching, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient("/posts"),
    initialData,
    enabled: Boolean(initialData),
  })
  const handleReadPost = (id) => {
    router.push(`http://localhost:3000/post/${id}`)
   }

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts &&
          posts.map(({ id, title, created_at }) => (
            <div key={id} className="bg-white rounded shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-500 mb-3">
                {formatDateTimeShort(new Date(created_at))}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleReadPost(id)}
              >
                Lire le post
              </Button>{" "}
            </div>
          ))}
      </div>
    </div>
  )
}

export default IndexPage
