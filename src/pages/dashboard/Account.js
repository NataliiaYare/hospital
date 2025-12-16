import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./stretch.css";
import Department from "./Department";
import UserDetails from "./UserDetails";
import Appointment from "./Appointment";


const Account = () => {
  const [userData, setUserData] = useState(null);
  const [deptIsOpen, setDeptIsOpen] = useState(false);
  const [acctIsOpen, setAcctIsOpen] = useState(false);
  const [appointment, openAppointment] = useState(false);
  const location = useLocation(); // Move this line inside the component



  
  const toggleDeptElement = () => {
    setDeptIsOpen((prev) => !prev);
  };
  
  const toggleAcctElement = () => {
    setAcctIsOpen((prev) => !prev);
  };
  
  const toggleAppointment = () => {
    openAppointment((prev) => !prev);
  };
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(location); // Ensure state is passed correctly

    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // Handle the case where the user data is not available
      setUserData({ firstName: 'Guest', name: 'Guest' });
    }
    if (location.state && location.state.deptIsOpen !== undefined) {
      setDeptIsOpen(location.state.deptIsOpen);
    }
  }, [location]);
  

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <main className='flex h-full'>
      <div className="bg-gray-50 py-5 h-full relative flex-1">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">
            Hello {userData.firstName}, view all your account details
          </h2>

          <div className="grid gap-4 sm:mt-8 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="bg-teal-300 px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    {userData.firstName}'s Details
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo.
                  </p>
                  {/* Toggle Button */}
                  <button
                    className={`bg-orange-400 my-10 bg-red toggle-button ${acctIsOpen ? "slide" : ""}`}
                    onClick={toggleAcctElement}
                  >
                    {acctIsOpen ? "Back to Dashboard" : "View your Details"}
                  </button>
                </div>
                <div className="h-full bg-cover bg-center"   style={{ backgroundImage: "url('/assets/images/account.png')" }}
                >

                </div>
            
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="bg-orange-600 text-white px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Appointment details
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Give details on train, bus, drive, parking info, what will happen on the day of the appointment (story board?)
                  </p>
                  <button
                    className={`bg-teal-400 toggle-button my-10 ${appointment ? "slide" : ""}`}
                    onClick={toggleAppointment}
                  >
                    {appointment ? "Close" : "View Details"}
                  </button>
                </div>
                
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="bg-black text-white h-full px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    PLAY ZONE
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Play games and watch videos
                  </p>
                  <Link to="/games"
                    className={"bg-teal-400 toggle-button my-10"}
                  >
                    Play Games
                  </Link>
                </div>
               
              </div>
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div style={{ backgroundImage: "url('/assets/images/chest_xray.webp')" }} className="h-full bg-cover" >
              </div>
                <div className="bg-blue-700 px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    {userData.name} department information
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Learn about the department 
                  </p>
                  <button
                    className={`bg-teal-400 toggle-button my-10 ${deptIsOpen ? "slide" : ""}`}
                    onClick={toggleDeptElement}
                  >
                    {deptIsOpen ? "Back to Dashboard" : "View Details"}
                  </button>

                </div>
                
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]">
              </div>
            </div>
          </div>
          {/* Conditionally Render the Components with Animations */}
          <div className={`element h-full w-full ${appointment ? "open" : ""}`}>
           <Appointment />
        </div>
        <div className={`element h-full w-full ${deptIsOpen ? "open" : ""}`}>
          <Department />
        </div>
        <div className={`element h-full w-full ${acctIsOpen ? "open" : ""}`}>
          <UserDetails />
        </div>
       
        </div> 
      </div>
      {/* <div class="element">
      <div>
        
      </div>
     </div> */}

      {/* <div className="dashboard">
        <p>Hospital Number: {userData.hospital_number}</p>
        <p>Email: {userData.email}</p>
        <p>Department: {userData.department_name}</p>
        <p>Phone: {userData.telephone_number}</p>
      </div> */}
      </main>
    </>
  );
};

export default Account;


