import Logo from '../../assets/signUp/Logo.png'
import { useNavigate } from 'react-router-dom'
const HeaderForm = () =>{
  const navegar = useNavigate()
  const handleNavigate = () =>{
    navegar('/')
  }
  return(
    <div className="bg-gradient-primary h-[5rem] pt-2 flex items-center gap-2 fixed w-[100vw] ">
      <div onClick={handleNavigate} className='cursor-pointer flex items-center gap-4'>
        <img src={Logo} alt="Logo de SYK" className='w-[5rem] pt-2' />
        <h1 className='text-color-text text-5xl font-Kodchasan'>SYK</h1>
      </div>
    </div>
  )
}
export { HeaderForm}