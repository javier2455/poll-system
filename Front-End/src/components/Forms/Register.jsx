import { Alert, Button, Input, Typography } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import { AuthenticationHook } from '../../context/Authentication'
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signUp, errors: RegisterErrors } = AuthenticationHook()

  const onSubmit = handleSubmit(async (values) => {
    signUp(values)
  })

  return (
    <div>
      {RegisterErrors.map((error, i) => (
        <Alert key={i} color='red' className='mt-3'>
          {error}
        </Alert>
      ))}
      <form className='mt-10 flex flex-col gap-4' onSubmit={onSubmit}>
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
            placeholder='laurabc'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          {errors.username && (
            <span className='text-red-500'>{errors.username.message}</span>
          )}

          <Typography
            variant='paragraph'
            color='blue-gray'
            className='mt-4 mb-2 font-medium'
          >
            Fullname
          </Typography>
          <Input
            type='text'
            {...register('fullname', {
              required: {
                value: true,
                message: 'The input (fullname) is required'
              }
            })}
            placeholder='Laura Berz Cita'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          {errors.fullname && (
            <span className='text-red-500'>{errors.fullname.message}</span>
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
          REGISTER
        </Button>
      </form>
    </div>
  )
}

{
  /* <Select
                    placeholder="USA"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    menuProps={{ className: "h-48" }}
                  >
                    {countries.map(({ name, flags }: any) => (
                      <Option key={name} value={name}>
                        <div className="flex items-center gap-x-2">
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-4 w-4 rounded-full object-cover"
                          />
                          {name}
                        </div>
                      </Option>
                    ))}
                  </Select> */
}

{
  /* <Typography
                  variant='small'
                  color='gray'
                  className='flex items-center justify-center gap-2 font-medium opacity-60'
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                  secure and encrypted
                </Typography> */
}
