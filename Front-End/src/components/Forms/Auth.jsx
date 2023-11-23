import { useEffect, useState } from 'react'
// import { useCountries } from "use-react-countries";
import {
  Card,
  CardHeader,
  CardBody,
  // Input,
  // Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
  // Select,
  // Option,
} from '@material-tailwind/react'
import Login from './Login'
import Register from './Register'
import { AuthenticationHook } from '../../context/Authentication'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [type, setType] = useState('login')
  const { isAuth } = AuthenticationHook()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/polls')
    }
  }, [isAuth])

  return (
    <Card className='w-full max-w-[24rem] mb-3 border border-black'>
      <CardHeader
        color='gray'
        variant='gradient'
        floated={false}
        shadow={false}
        className='m-0 grid place-items-center px-4 py-2 text-center'
      >
        <Typography variant='h4' color='white' className='py-2 text-center'>
          POLL SYSTEM
        </Typography>
        <Typography variant='h6' color='white' className='py-2 text-center'>
          A classic system for polls
        </Typography>
        {/* <div className='mb-4 h-8 p-3 text-white'>
          {type === 'login' ? <h3>Login</h3> : <h3>Register</h3>}
        </div> */}
      </CardHeader>
      <CardBody>
        <Tabs value={type} className='overflow-visible'>
          <TabsHeader className='relative z-0 '>
            <Tab value='login' onClick={() => setType('login')}>
              Login
            </Tab>
            <Tab value='register' onClick={() => setType('register')}>
              Register
            </Tab>
          </TabsHeader>
          <TabsBody
            className='!overflow-x-hidden'
            animate={{
              initial: {
                x: type === 'login' ? 400 : -400
              },
              mount: {
                x: 0
              },
              unmount: {
                x: type === 'login' ? 400 : -400
              }
            }}
          >
            <TabPanel value='login' className='p-0'>
              <Login />
            </TabPanel>
            <TabPanel value='register' className='p-0'>
              <Register />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  )
}

// export default function LoginForm() {
//   return <div>LoginForm</div>
// }
