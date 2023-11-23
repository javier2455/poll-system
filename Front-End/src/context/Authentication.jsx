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

  const signUp = async (theUser) => {
    try {
      const res = await registerRequest(theUser)
      console.log(res.data)
      setUser(res.data)
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
      if (cookies.token) {
        try {
          const res = await verifyTokenRequest(cookies.token)
          if (!res.data) setIsAuth(false)
          setIsAuth(true)
          setUser(res.data)
        } catch (error) {
          console.log(error)
          setIsAuth(false)
          setUser(null)
          // setErrors(error.response.data.message)
        }
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{ signIn, signUp, user, isAuth, errors }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
