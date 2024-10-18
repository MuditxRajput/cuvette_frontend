// Homepage.js
import React, { useState } from 'react';
import { GoHomeFill } from "react-icons/go";
import JobForm from './form'; // Import the JobForm component

const Homepage = () => {
  const [click, setClick] = useState(false);

  return (
    <div className='flex'>
      <div className='w-[100px] border-r-2 h-[669px] flex '>
        <GoHomeFill className="text-2xl" />
      </div>
      <div className='flex-1 px-5'>
        <button
          onClick={() => setClick(!click)}
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
        >
          Create Interview
        </button>
        {click && <JobForm />}
      </div>
    </div>
  );
};

export default Homepage;
