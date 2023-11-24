import { createContext, useContext, useEffect, useState } from 'react'
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'

export const AuthenticationContext = createContext()

export const AuthenticationHook = () => {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error(
      'useAuthentication must be used whitin an AuthenticationProvider'
    )
  }
  return context
}

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  const signUp = async (theUser) => {
    try {
      const res = await registerRequest(theUser)
      console.log(res.data)
      setUser(res.data)
      sessionStorage.setItem("user", res.data);
      setIsAuth(true)
    } catch (error) {
      console.log(error.response)
      setErrors(error.response.data.message)
    }
  }

  const signIn = async (theUser) => {
    try {
      const res = await loginRequest(theUser)
      console.log(res.data)
      setUser(res.data)
      sessionStorage.setItem("user", res.data);
      setIsAuth(true)
    } catch (error) {
      console.log(error.response)
      setErrors(error.response.data.message)
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuth(false)
        setLoading(false)
        return setUser(null)
      }
      try {
        const res = await verifyTokenRequest(cookies.token)
        if (!res.data) {
          setLoading(false)
          setIsAuth(false)
          return
        }
        setIsAuth(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setIsAuth(false)
        setUser(null)
        setLoading(false)
        // setErrors(error.response.data.message)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{ signIn, signUp, user, isAuth, errors, loading }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
