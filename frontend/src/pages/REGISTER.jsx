import Form from '../components/Form'

function REGISTER() {
  return (
    <div className='h-dvh flex flex-col items-center justify-center'> 
    <h1 className='w-1/4 h-14 text-5xl mb-5 text-center rounded-sm font-bold  text-orange-950 '>Simple Notes</h1>
    <Form route="/list/user/register/" method="register"/>
    <div className='bg-orange-400 right-0 w-1/2 h-dvh absolute -z-10'>
    </div>
   
    <div className='bg-orange-400 object-none left-0 w-1/2 h-dvh absolute -z-10'></div>
    </div>
    
  )
}

export default REGISTER