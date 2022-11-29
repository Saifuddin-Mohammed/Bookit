import React from 'react';
import { AiOutlineCalendar, AiOutlineUsergroupAdd, AiOutlineTeam } from 'react-icons/ai';
import { BiCalendarPlus } from 'react-icons/bi';
import { BsShield, BsCurrencyDollar } from 'react-icons/bs';
import { FiCreditCard } from 'react-icons/fi';

export const plinks = [
    {
      title: 'Appointments',
      links: [
        {
            name: 'schedule',
            icon: <AiOutlineCalendar />,
            url: 'schedule',
        },
        {
          name: 'create appointment',
          icon: <BiCalendarPlus />,
          url: 'newEvent',
      }
      ],
    },
  
    {
      title: 'Groups',
      links: [
        {
          name: 'create group',
          icon: <AiOutlineUsergroupAdd />,
          url: 'newGroup',
        },
        {
          name: 'view groups',
          icon: <AiOutlineTeam />,
          url: 'groups',
        },
      ],
    },
];

export const chatData = [
  {
    message: 'Roman Joined the Team!',
    desc: 'Congratulate him',
    time: '9:08 AM',
  },
  {
    message: 'New message received',
    desc: 'Salma sent you new message',
    time: '11:56 AM',
  },
  {
    message: 'New Payment received',
    desc: 'Check your earnings',
    time: '4:39 AM',
  },
  {
    message: 'Jolly completed tasks',
    desc: 'Assign her new tasks',
    time: '1:12 AM',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];