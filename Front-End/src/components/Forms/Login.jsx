import { Alert, Button, Input, Typography } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import { AuthenticationHook } from '../../context/Authentication'
// import { useNavigate } from 'react-router-dom'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signIn, errors: loginErrors } = AuthenticationHook()
  // const navigate = useNavigate()
  // isAuth

  const onSubmit = handleSubmit((data) => {
    signIn(data)
  })

  return (
    <div>
      {loginErrors.map((error, i) => (
        <Alert key={i} color='red' className='mt-3'>
          {error}
        </Alert>
        // <div key={i} className='bg-red-500 px-4 py-2 text-white mt-3 rounded-md shadow-md shadow-red-200'>
        //   {error}
        // </div>
      ))}
      <form className='mt-6 flex flex-col gap-4' onSubmit={onSubmit}>
        <div>
          <Typography
            variant='small'
            color='blue-gray'
            className='mb-2 font-medium'
          >
            Username
          </Typography>
          <Input
            type='text'
            {...register('username', {
              required: {
                value: true,
                message: 'The input (username) is required'
              }
            })}
            placeholder='sofiaad'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          {errors.username && (
            <span className='text-red-500'>{errors.username.message}</span>
          )}
          <Typography
            variant='small'
            color='blue-gray'
            className='mt-4 mb-2 font-medium'
          >
            Password
          </Typography>
          <Input
            type='password'
            {...register('password', {
              required: {
                value: true,
                message: 'The input (password) is required'
              }
            })}
            placeholder='*******'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
            containerProps={{ className: 'mt-4' }}
          />
          {errors.password && (
            <span className='text-red-500'>{errors.password.message}</span>
          )}
        </div>
        <Button size='lg' variant='gradient' type='submit'>
          LOGIN
        </Button>
      </form>
    </div>
  )
}
