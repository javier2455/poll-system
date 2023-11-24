import { useEffect, useState } from 'react'
import { getAllUsersRequest } from '../api/users'

export default function Users() {
  const [data, setData] = useState([])
  useEffect(() => {
    async function getAll() {
      const users = await getAllUsersRequest()
      setData(users)
    }
    getAll()
  })

  console.log(data)

  return <div>Users</div>
}
