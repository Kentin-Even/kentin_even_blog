import { useRouter } from "next/router"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"

export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient("/admin", { params: { page } })

  return { props: { initialData: data } }
}
const AdminPage = ({ initialData }) => {
  const { query } = useRouter()
  const page = Number.parseInt(query.page || 1, 10)
  const {
    isFetching,
    data: {
      result: users,
      meta: { count },
    },
    refetch,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => apiClient("/users", { params: { page } }),
    initialData,
    enabled: false,
  })
  const { mutateAsync: toggleUser } = useMutation({
    mutationFn: (user) => apiClient.patch(`/users/${user.id}`, {
      active: !user.active,
    }),
  })
  const handleClickToggle = (id) => async () => {
    const user = user.find(({ id: userId }) => userId === id)
    await toggleUser(user)
    await refetch()
  }
  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: (userId) => apiClient.delete(`/users/${userId}`),
  })
  const handleClickDelete = async (id) => {
    await deleteUser(id)
    await refetch
  }

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <table className="table-auto w-full">
        <thead>
          <tr>
            {["#", "Email", "Username", "Role", "Active", "🗑️", "📝"].map(
              (label) => (
                <td key={label} className="border px-4 py-2">
                  {label}
                </td>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, email, username, role, active }) => (
            <tr key={id} className="even:bg-slate-100">
              <td className="border px-4 py-2">{id}</td>
              <td className="border px-4 py-2">{email}</td>
              <td className="border px-4 py-2">{username}</td>
              <td className="border px-4 py-2">{role}</td>
              <td className="border px-4 py-2">{active ? "✅" : "❌"}</td>
              <td className="border px-4 py-2">
                <button onClick={handleClickDelete}>Delete</button>
              </td>
              <td className="border px-4 py-2">
                <button onClick={handleClickToggle}>Active</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} page={page} className="mt-8" />
    </div>
  )
}

export default AdminPage
