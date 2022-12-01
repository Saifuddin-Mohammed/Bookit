// import React from 'react'
// const Event = () => {
//   return (
//     <div>Event</div>
//   )
// }
//export default Event

import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import { Navbar, Footer, Sidebar} from '../components'; 
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";
import {BsFillCalendarEventFill} from 'react-icons/bs';

const Event = () => {
  const { currentMode, activeMenu} = useStateContext();
  const [event, setEvent] = useState(null);
  let id = useParams().id

  useEffect(()=>{
      fetch(`/api/event/${id}`)
      .then(res=>{
        if(res.ok){
          let json = res.json()
          return json;
        }
      }).then(data=>{
        if(data){
          setEvent(data)
        }
      })
    },[])

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



      <div>      
        <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-0 bg-gray-50">
          <div className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md sm:max-w-md sm:rounded-lg h-6/8 overflow-visible ">
            <div
              className="items-center justify-center flex text-white"><BsFillCalendarEventFill className='h-24 w-24'/>
            </div>
              {event ?
              <div>
                <h1 className='block text-xl font-bold black undefined text-center bold text-white'>{event.title}</h1>
                <div className='text-white pt-4'>
                  <p className='text-bold text-lg'>Priority: </p>
                  <p>{event.priority}</p>
                  <br/>
                  <p className='text-bold text-lg'>Start time: </p>
                  <p>{event.start}</p>
                  <br/>
                  <p className='text-bold text-lg'>End time: </p>
                  <p>{event.end}</p>
                  <br/>
                  {/* <p className='text-bold text-lg'>Description: </p>
                  <p>{event.description}</p> */}
                </div>
              </div>
              :
              <div className='mt-4'>
                <p className='text-white'>Can not find this event</p>
              </div>
              }


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

export default Event