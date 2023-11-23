import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authentication from './pages/Authentication'
import { AuthenticationProvider } from './context/Authentication'
import Home from './pages/Home'
import Polls from './pages/Polls'
import Users from './pages/Users'
import Profile from './pages/Profile'
import CreateUser from './pages/CreateUser'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Authentication />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/polls' element={<Polls />} />
            <Route path='/users' element={<Users />} />
            <Route path='/create-users' element={<CreateUser />} />
            <Route path='/user/:id' element={<CreateUser />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          {/* Protected Routes */}
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
    // <div>
    //   <AuthContainer>
    //     <AuthForm />
    //   </AuthContainer>
    // </div>
  )
}

export default App
