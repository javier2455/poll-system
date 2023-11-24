import { Navigate, Outlet } from 'react-router-dom'
import { AuthenticationHook } from '../../context/Authentication'
export default function ProtectedRoutes() {
  // const user = sessionStorage.getItem('user')
  const { isAuth, loading } = AuthenticationHook()

  if(loading) return <h1>Loading...</h1>
  // if (!user) return <Navigate to={'/auth'} replace />
  if (!loading && !isAuth) return <Navigate to={'/auth'} replace />
  return <Outlet />
}
