import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = ({onClick}) => {
  const [auth, setAuth] = useState(false);
  function updateAuth(){
    setAuth(!auth)
  }
  const [render, setRender] = useState(false);
  const [notifs, setNotifs] = useState(false);
  const isAuth = localStorage.getItem('auth');
  const [user, setUser] = useState("");
  

  useEffect(()=>{
    fetch('/api/user').then(res=>{
      if(res.ok){
        let json = res.json()
        setAuth(true)
        return json;
      } else {
        setAuth(false)
      }
    }).then(data=>{
      if(data){
        setUser(data)
      }
    })
  }, [])


  //get notifs
  useEffect(()=>{
    if(auth){
      fetch('/api/areNotifs').then(res=>{

      }).then()
    }
  },[render])

  const { currentColor, activeMenu, setActiveMenu, setScreenSize, handleClick, isClicked,  screenSize } = useStateContext(); 
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
        {/* {auth ? 
          <>
          {notifs ? 
            <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
          :
            <NavButton title="Notification" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
          }
          </>
        :
          <NavButton title="Login to see notifications" icon={<RiNotification3Line />} />
        } */}
          {auth ? 
          <TooltipComponent content="Signin" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick('userProfile')}
            >
              <FaUserAlt className="w-8 h-8"/>
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{' '}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {user.firstName}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
            </TooltipComponent>
          :
          <TooltipComponent content="Sign in" position="BottomCenter">
          <a href='/login'>
            <div
              className="flex cursor-pointer p-1 h-6/8 bg-blue-500 hover:bg-blue-600 align-middle mt-2 w-24 text-center"
            >
              <p className='text-center m-auto'>
                <span className="text-white text-14 text-center">
                  Sign in
                </span>
              </p>
            </div>
          </a>
          </TooltipComponent>
          }
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile onClick={() => {
          onClick();
          updateAuth();
        }}/>)}
      </div>
    </div>
  );
};

export default Navbar;