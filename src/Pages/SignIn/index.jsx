import { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext} from '../../Context'
import { UserManagement } from '../../Components/userManagement'

function SignIn() {
  const {
    inputName,
      inputEMail,
      inputPassword,
      userLogin,
      logIn,
  } = useContext(ShoppingCartContext)
  const [render, setRender] = useState(true)
  
  const toRegister = () => {

    return (
      <Link to='/'>
        <div className='text-xl font-semibold text-center mb-8'>Welcome</div>
        <UserManagement/>
      </Link>
    )
  }
  const loginView = () => {
    if (userLogin === true || inputName && inputEMail && inputPassword) {
      return (
      <div className='w-80 text-center gap-4 flex flex-col'>
        <h2 className='text-xl font-semibold'>Welcome</h2>
        <div className='text-left'>
          <p className='text-sm font-normal mb-1'>Email: <span className=' font-semibold'>{inputEMail}</span> </p>
          <p className='text-sm font-normal mb-1'>Password: <span className=' font-semibold'>{inputPassword.replace(/./g, '*')}</span> </p>
        </div>
        <Link to='/'>
          <div
          onClick={() => {
            logIn()
            }
          }
          className='flex justify-center items-center w-full h-11 rounded-lg bg-black'>
            <p  className='text-lg font-normal text-white cursor-pointer'>Log in</p>
          </div>
        </Link>
        <a className='text-center text-xs font-normal mb-1 underline' href="">Forgot my password</a>
        <div className='flex justify-center items-center w-full h-11 rounded-lg bg-white border border-gray-500'>
          <p className='text-lg font-normal text-gray-400 cursor-pointer'>Sign up</p>
        </div>
      </div>
      )
    }else {
      return(
        <div className=' w-80 text-center gap-4 flex flex-col'>
          <h2 className='text-xl font-semibold'>Welcome</h2>
          <div className='text-left'>
            <p className='text-sm font-normal mb-1'>Email: <span className=' font-semibold'>{inputEMail}</span> </p>
            <p className='text-sm font-normal mb-1'>Password: <span className=' font-semibold' >{inputPassword.replace(/./g, '*')}</span> </p>
          </div>
          <div className='flex justify-center items-center w-full h-11 rounded-lg bg-white border border-gray-500 '>
            <p className='text-lg font-normal text-gray-400 cursor-pointer'>Log in</p>
          </div>
          <a className='text-center text-xs font-normal mb-1 underline' href="">Forgot my password</a>
          <div className='flex justify-center items-center w-full h-11 rounded-lg bg-black'>
            <p onClick={() => {
              setRender(false)
              
            }} className='text-lg font-normal text-white cursor-pointer'>Sign up</p>
          </div>
        </div>
      )
    }
  }
  return (
    <Layout>
      {render ? loginView() : toRegister()}
    </Layout>
  )
}

export default SignIn