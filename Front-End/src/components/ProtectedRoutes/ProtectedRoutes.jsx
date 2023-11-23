import { Navigate, Outlet } from 'react-router-dom'
import { AuthenticationHook } from '../../context/Authentication'
export default function ProtectedRoutes() {
  const { isAuth } = AuthenticationHook()

  if (!isAuth) return <Navigate to={'/auth'} replace />
  return <Outlet />
}
