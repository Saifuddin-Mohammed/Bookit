import React, {useEffect, useState} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import {FaUserAlt} from 'react-icons/fa';
import { useNavigate, NavLink } from "react-router-dom";

import { Button } from '.';
import { userProfileData } from '../data/data';
import { useStateContext } from '../contexts/ContextProvider';

const UserProfile = ({onClick}) => {
  const { setIsClicked, initialState } = useStateContext();
  const [user, setUser] = useState("");
  // get auth state
  let navigate = useNavigate();
  function loginRed(){
    navigate('/')
  }

  useEffect(()=>{
    fetch('/api/user').then(res=>{
      if(res.ok){
        let json = res.json()
        return json;
      }
    }).then(data=>{
      if(data){
        setUser(data)
      }
      console.log(data)
    })
  }, [])

  function handleSubmit(){
    setIsClicked(initialState)
    fetch('/api/logout').then(res=>{
    onClick()
    })
  };
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <FaUserAlt className="rounded-full h-24 w-24"/>
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user.firstName} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {user.userName}   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.email} </p>
        </div>
      </div>
      {/* <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="mt-5">
        
        <NavLink
          key={'signout'}
          onClick={handleSubmit}
          className={`p-3 w-full hover:drop-shadow-xl bg-blue-600 color-white`}
        >
          <span className='w-full'>
            Signout
          </span>
        </NavLink>
      </div>
    </div>

  );
};

export default UserProfile;