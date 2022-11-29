import React from 'react';
import {RiGroup2Line} from 'react-icons/ri';

const Card = ({name, members, appts}) => (
    
    <div      
    className='h-20 bg-slate-400 flex justify-center rounded-lg'>
      <div className='w-1/5 float-left bg-blue-600 rounded-lg'>
        <RiGroup2Line className='w-20 h-20 text-white inline-block float-left '/>
        <p className='float-right text-white inline-block pt-2 pr-2'>{name}</p>
      </div>
      <div className='float-right w-full p-4 text-center text-blue-700'>
        <p>There are {members} members in this group,</p>
        <p>There are {appts} appointments for this group,</p>
      </div>
    </div>
);

export default Card;