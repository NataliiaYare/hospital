import React, { useState, useEffect } from 'react';  // Ensure both useState and useEffect are imported
import './stretch.css';
const Department = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      // Retrieve the user data from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }, []);
  
    if (!userData) {
      return <div>Loading...</div>;
    }

  return (
    <>
    <div className="bg-white relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
      <img src="https://readymadeui.com/cardImg.webp" alt="Banner Image" className="absolute inset-0 w-full h-full object-cover" />

      <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        <h2 className="sm:text-4xl text-2xl font-bold mb-6">{userData.name} Department</h2>
        <p className="sm:text-lg text-base text-center text-gray-200">Welcome to the {userData.name} department</p>
        <p className="sm:text-lg text-base text-center text-gray-200">Click the button below to see what will happen at your appointment</p>
       
      </div>
    </div>
    {/* doctors */}
    <div className="font-[sans-serif] bg-white mb-10 lg:max-w-5xl sm:max-w-2xl max-sm:max-w-sm mx-auto mt-4">
            <h2 className="text-gray-800 text-3xl font-extrabold border-b-2 border-gray-800 inline-block">Our Team</h2>

            <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-6 max-md:justify-center mt-12">
                <div className="grid grid-cols-3 items-center bg-gray-100 p-4 rounded-lg relative">
                    <div className="col-span-2 min-h-[190px]">
                        <img src={`/assets/images/department/${userData.doctor_img}`} className="rounded-lg" />
                    </div>

                    <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
                        <h4 className="text-gray-800 text-sm font-bold">Doctor</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">{userData.doctor}</p>
                        <p className="text-gray-800 mt-2 text-xs">Consultant</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 items-center bg-gray-100 p-4 rounded-lg relative">
                    <div className="col-span-2 min-h-[190px]">
                    <img src={`/assets/images/department/${userData.nurse_img}`} className="rounded-lg" />
                    </div>
                    <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
                        <h4 className="text-gray-800 text-sm font-bold">Head Nurse</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">{userData.nurse}</p>
                        <p className="text-gray-800 mt-2 text-xs">{userData.name} Specialist</p>
                    </div>
                </div>
            </div>
        </div>
    {/* videos */}
<div className="bg-gray-100 md:px-10 px-4 py-12 font-[sans-serif]">
  <div className="max-w-5xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8">{userData.name} videos</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
      {userData.videos.map((video, index) => (
        <div key={index} className="bg-white rounded overflow-hidden">
          <iframe
            width="360"
            height="215"
            src={`https://www.youtube.com/embed/${video}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3"></h3>
            <p className="text-gray-500 text-sm"></p>
            <p className="text-orange-500 text-[13px] font-semibold mt-4"></p>
           
          </div>
        </div>
      ))}
    </div>
  </div>
  {/* department images */}
  <div className="max-w-5xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8">{userData.name} images</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
      {userData.dept_img.map((img, index) => (
        <div key={index} className="bg-white rounded overflow-hidden">
          <img
            src={`/assets/images/department/${img}`}
          alt="image"
          ></img>
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3"></h3>
            <p className="text-gray-500 text-sm"></p>
            <p className="text-orange-500 text-[13px] font-semibold mt-4"></p>
           
          </div>
        </div>
      ))}
    </div>
  </div>
 
</div>

    </>


  )
}

export default Department;
