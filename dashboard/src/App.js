import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar, Footer, Sidebar} from './components';
import { Schedule, NewEvent, Event, Groups, Login, Signup, Schedulecopy, EditGroup,CreateGroup, ViewGroup} from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';


const App = () => {
  const { currentMode, activeMenu} = useStateContext();
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        {/* <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            
          </div>
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
            </div> */}
            <div>
              <Routes>
                {/* Home  */}
                <Route path="/" element={(<Schedulecopy />)} />
                <Route path="/schedule" element={(<Schedulecopy />)} />
                <Route path="/test" element={(<Schedulecopy />)} />
                
                {/* User nav*/}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Appts / Events  */}
                <Route path="/newEvent/" element={<NewEvent />} />
                <Route path="/event/:id" element={<Event />} />

                {/* Groups */}
                <Route path="/groups" element={<Groups />} /> {/* Display user groups */}
                <Route path="/newGroup" element={<CreateGroup />} /> {/* Create a new group */}
                <Route path="/editGroup/:id" element={<EditGroup />} /> {/* Create a new group */}
                <Route path="/groups/:id" element={<ViewGroup />} /> {/* Create a new group */}
              </Routes>
            </div>
             {/*<Footer />
          </div>
        </div> */}
      </BrowserRouter>
    </div>
  );
};

export default App;