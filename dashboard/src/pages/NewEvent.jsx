import React, { useState, useEffect} from "react";
import DateTimePicker from 'react-datetime-picker'
import {MdEventAvailable} from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { Navbar, Footer, Sidebar} from '../components'; 
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const { currentMode, activeMenu} = useStateContext();
  let navigate = useNavigate();
  function red(){
    navigate('/')
  }
  let handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api', {
      method: 'POST', 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(
        {title: title,
        start: startValue,
        end: endValue,
        group: group,
        priority: priority,
        description: description
      })
    }).then(res=>{
      if(res.status !== 200){
        setMessage("There was a problem")
      } else {
        red()
      }
    })
  };

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
  },[])

  useEffect(()=>{
    return fetch('/api/groupsAdmin').then(res=>{
      if(res.ok){
        let json = res.json()
        return json;
      }
    }).then(data=>{
      if(data.length > 0){
        setAdmin(data)
      }      
    })
  },[])

  const getData = () =>{
    let temp = [];
    return fetch('/api/groupsAdmin').then(res=>{
      if(res.ok){
        let json = res.json()
        return json;
      }
    }).then(data=>{
      data.forEach(group => {
        temp.push({
          "value": group._id,
          "label": group.groupName
        })
      });
      return temp
    })
  }

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [group, setGroup] = useState("");
  const [priority, setPriority] = useState("low");
  const [startValue, onStartChange] = useState(new Date());
  const [endValue, onEndChange] = useState(new Date());
  const [description, setDescription] = useState("");
  const priorityOptions = [
    {value: 'low', label: 'Low' },
    {value: 'med', label: 'Medium' },
    {value: 'high', label: 'High' },
  ]
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
    
    {admin && user ? 
    <div>      
    <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-0 bg-gray-50">
          <div className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md sm:max-w-md sm:rounded-lg h-6/8 overflow-visible ">
          <div className="items-center justify-center flex text-white"><MdEventAvailable href='/' className='h-24 w-24'/></div>  
          <p className='block text-sm font-bold black undefined text-center bold text-white'>Create new Event</p>
          <br/>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white undefined"
                >
                  Title
                </label>
                  <div className="flex flex-col items-start">
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      name="title"
                      required="true"
                      className="block w-full mt-1 border-gray-300 h-8 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                {/* Priority */}
                <div className="mt-4">
                  <label
                    htmlFor="group"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Priority
                  </label>
                  <div className="flex flex-col items-start">
                    <Select 
                    options={priorityOptions}
                    required="true"
                    onChange={(e)=>{
                      setPriority(e.value)
                    }}
                    className="w-full" />
                  </div>
                </div>
                {/* Start Date */}
                  <div className="mt-4">
                    <p className="text-white">Start time</p>
                    <DateTimePicker 
                    onChange={onStartChange}
                    value={startValue}
                    className='bg-white w-full'
                    />
                  </div>
                  {/* End Date */}
                  <div className="mt-4">
                    <div className="mt-4">
                    <p className="text-white">End time</p>
                    <DateTimePicker 
                    onChange={onEndChange}
                    value={endValue}
                    className='bg-white w-full'
                    />
                  </div>
                    </div>
                    {/* Group */}
                <div className="mt-4">
                  <label
                    htmlFor="group"
                    className="block text-sm font-medium text-white undefined"
                  >
                  Please select group
                  </label>
                  <div className="flex flex-col items-start">
                  <AsyncSelect cacheOptions
                  defaultOptions
                  loadOptions={getData}
                  required="true"
                  onChange={(e)=>{
                    setGroup(e.value)
                  }}
                  className="w-full" />
                  </div>
                </div>
                {/* Submit button */}
                        <div className="flex items-center justify-end mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-700 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                </div>
            </div>
        </div>
    :
    <div></div>
    }
    {user && !admin ?
      <div>      
      <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-0 bg-gray-50">
        <div>
          {/* <MdEventAvailable href='/' className='h-24 w-24'/>           */}
          </div>
            <div className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md sm:max-w-md sm:rounded-lg h-6/8 overflow-visible ">
              <p className='text-white'>You do not own any groups</p>
          </div>
          </div>
          </div>
    : 
    <div>Please login to see this page</div>
    }
          {/* footer */}
          <Footer />
          </div>
        </div>
    </div>
  )
}

export default NewEvent