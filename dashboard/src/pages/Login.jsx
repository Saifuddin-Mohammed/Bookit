import React , {useState}from 'react'
import {BiLogIn} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, Sidebar} from '../components'; 
import { useStateContext } from '../contexts/ContextProvider';

const Login = () => {
  const { currentMode, activeMenu} = useStateContext();
  const [email, setEmail] = useState("");  
  const [password, setPass] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  function loginRed(){
      navigate(`/`)
  }
  let handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST', 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(
      {
        email: email,
        password: password,
      })
    }).then(res=>{
      if(res.status !== 200){
        setMessage("There was a problem")
      } else {
        loginRed();
      }
    })
  };
  return (
<div>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            
          </div> */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
            <div
                className={
                    activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
            >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
            </div>
            
{/*  */}
    <div>      
      <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-0 bg-gray-50">
        <div>
          {/* <MdEventAvailable href='/' className='h-24 w-24'/>           */}
          </div>
            <div className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md sm:max-w-md sm:rounded-lg h-6/8 overflow-visible ">
            <div className="items-center justify-center flex text-white"><BiLogIn className='h-24 w-24 pr-4'/></div>  
            <p className='block text-sm font-bold black undefined text-center bold text-white'>Login</p>

              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Email
                  </label>
                    <div className="flex flex-col items-start">
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  {/* password */}
                  <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Password
                  </label>
                    <div className="flex flex-col items-start">
                      <input
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        name="password"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                      </div>
                      {/* Button */}
                          <div className="flex items-center justify-end mt-4">
                              <button
                                  type="submit"
                                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-700 border border-transparent rounded-md active:bg-gray-900 false"
                              >
                                  Login
                              </button>
                          </div>
                      </form>
                      <p className="mt-8 text-center text-white text-base font-semibold ">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="text-base text-fuchsia-800 hover:underline font-semibold"
                    >
                        Sign up
                    </a>
                </p>
                      <div className="message">{message ? <p>{message}</p> : null}</div>
                  </div>
              </div>
          </div>
          {/* footer */}
          <Footer />
          </div>
        </div>
    </div>
  )
}

export default Login