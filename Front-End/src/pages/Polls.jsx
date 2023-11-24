import { AuthenticationHook } from '../context/Authentication'

export default function Polls() {
  const { user } = AuthenticationHook()
  console.log(user)
  return <div>Polls</div>
}
