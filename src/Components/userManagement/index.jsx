import React from "react";
import { useContext} from "react";
import { ShoppingCartContext} from '../../Context'

function UserManagement() {
  const {
    inputName,
      inputEMail,
      inputPassword,
      handleInputChangeName,
      handleInputChangeEMail,
      handleInputChangePassword,
      logIn,
      text
  } = useContext(ShoppingCartContext)

  return(
    <div className='w-full flex flex-col justify-center items-center '>
      <form onSubmit={logIn}  className=' w-80 '>
        <fieldset className='flex flex-col gap-4'>
          <label className='text-sm font-normal'>
            Your name:
            <input
            required 
            type="text" 
            placeholder='Pepe' 
            value={inputName}
            onChange={handleInputChangeName} 
            className='w-full h-11 p-4 border border-black rounded-lg mt-1' 
            />
          </label>
          <label className='text-sm font-normal'>
            Your Email:
            <input 
            required 
            type="email" 
            placeholder='example@email.com'
            value={inputEMail}
            onChange={handleInputChangeEMail} 
            className='w-full h-11 p-4 border border-black rounded-lg mt-1' 
              />
          </label>
          <label className='text-sm font-normal'>
            Your password:
            <input 
            required 
            type="password" 
            placeholder='******' 
            value={inputPassword}
            onChange={handleInputChangePassword}  
            className='w-full h-11 p-4 border border-black rounded-lg mt-1'
            />
          </label>
          <button 
            onClick={() => {
              if (inputName && inputEMail && inputPassword){
                logIn()
              }else {
                alert('Please fill out all fields to create a user')
              } }}  
            type='submit' className='w-full h-11 rounded-lg bg-black text-lg font-normal text-white cursor-pointer'>
            {text}
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export {UserManagement}