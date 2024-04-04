import { useContext, useState } from 'react'
import Layout from '../../Components/Layout'
import { ShoppingCartContext} from '../../Context'
import { UserManagement } from '../../Components/userManagement'



function MyAccount() {
  const {
    inputName,
    inputEMail,
    setText
  } = useContext(ShoppingCartContext)
  const [render, setRender] = useState(true)
  const defaultView = () => {
    return (
      <div className=' w-80 text-center gap-4 flex flex-col'>
          <h2 className='text-xl font-semibold'>My Account</h2>
          <div className='text-left'>
            <p className='text-sm font-normal mb-1'>Name: <span className=' font-medium'>{inputName}</span> </p>
            <p className='text-sm font-normal mb-1'>Email: <span className=' font-medium' >{inputEMail}</span> </p>
          </div>
          <button onClick={() => {setText('Edit'), setRender(false) }}  
          className='w-full h-11 rounded-lg bg-black text-lg font-normal text-white cursor-pointer'>Edit</button>

      </div>
    )
    
  }

  return (
    <Layout>
       {/* <div className='text-xl font-semibold text-center mb-8'>My Account</div> */}
      {render 
      ? defaultView() 
      : <>  
        <div className='w-80 text-center text-xl font-semibold'>My Account</div>
        <UserManagement/>
        </> }
    </Layout>
  )
}

export default MyAccount