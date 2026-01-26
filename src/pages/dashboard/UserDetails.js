import React, { useState, useEffect } from 'react';

// UserDetails component shows user information and fun facts
// Calculates days until the user's next birthday
const UserDetails = () => {
  const [userData, setUserData] = useState(null); // State to store user info

  // Load user data from localStorage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser)); // Parse and set user data
    }
  }, []);

  // Show loading message if user data hasn't loaded yet
  if (!userData) {
    return <div>Loading...</div>;
  }

  // Function to calculate days until next birthday
  const calculateDaysUntilBirthday = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Set next birthday for this year
    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    // If birthday already passed this year, move to next year
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    // Difference in milliseconds, converted to days
    const timeDiff = nextBirthday - today;
    const daysUntilBirthday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysUntilBirthday;
  };

  // Format date of birth for display
  const formattedDOB = new Date(userData.dob).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate number of days until next birthday
  const daysUntilBirthday = calculateDaysUntilBirthday(userData.dob);

  return (
    <>
      <div className="bg-white relative font-sans">
        {/* Grid of cards showing user info, birthday, and fun facts */}
        <div className="grid mt-20 grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:max-w-6xl max-w-xl mx-auto font-sans">

          {/* Card 1: About the user */}
          <div className="card bg-purple-100 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">About you</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <ul className="text-gray-600 list-disc mt-4 space-y-2 pl-4">
              <li className="text-sm">Increased efficiency</li>
              <li className="text-sm">Improved focus and organization</li>
              <li className="text-sm">Reduced time spent on tasks</li>
            </ul>
            <a href="javascript:void(0);" className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg mt-6">
              Get Started
            </a>
          </div>

          {/* Card 2: Fun facts and birthday countdown */}
          <div className="card bg-purple-100 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Fun facts</h3>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {daysUntilBirthday} days until your Birthday!
            </h3>
            <a href="javascript:void(0);" className="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg mt-6">
              Learn More
            </a>
          </div>

          {/* Card 3: Famous people with same birthday */}
          <div className="card bg-purple-100 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Which famous person has the same birthday</h3>
            <p className="text-sm text-gray-600">
              Nunc aliquet eros ultricies, hendrerit eros et, malesuada leo...
            </p>
            <ul className="text-gray-600 list-disc mt-4 space-y-2 pl-4">
              <li className="text-sm">Set clear and achievable goals</li>
              <li className="text-sm">Track your progress and stay motivated</li>
              <li className="text-sm">Celebrate your successes and learn from your mistakes</li>
            </ul>
            <a href="javascript:void(0);" className="inline-block px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg mt-6">
              Start Today
            </a>
          </div>

          {/* Additional cards with sample content */}
          {/* Card 4: About you again */}
          <div className="card bg-purple-100 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">About you</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <ul className="text-gray-600 list-disc mt-4 space-y-2 pl-4">
              <li className="text-sm">Increased efficiency</li>
              <li className="text-sm">Improved focus and organization</li>
              <li className="text-sm">Reduced time spent on tasks</li>
            </ul>
            <a href="javascript:void(0);" className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg mt-6">
              Get Started
            </a>
          </div>

          {/* Card 5: Days until birthday info */}
          <div className="card bg-purple-100 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">How many day until their birthday?</h3>
            <p className="text-sm text-gray-600">
              Nullam in elit ac velit placerat consectetur nec sed sapien...
            </p>
            <ul className="text-gray-600 list-disc mt-4 space-y-2 pl-4">
              <li className="text-sm">Automated tasks and workflows</li>
              <li className="text-sm">Seamless collaboration and communication</li>
              <li className="text-sm">Enhanced project management</li>
            </ul>
            <a href="javascript:void(0);" className="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg mt-6">
              Learn More
            </a>
          </div>

          {/* Card 6: Famous people again */}
          <div className="card bg-purple-100 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Which famous person has the same birthday</h3>
            <p className="text-sm text-gray-600">
              Nunc aliquet eros ultricies, hendrerit eros et, malesuada leo...
            </p>
            <ul className="text-gray-600 list-disc mt-4 space-y-2 pl-4">
              <li className="text-sm">Set clear and achievable goals</li>
              <li className="text-sm">Track your progress and stay motivated</li>
              <li className="text-sm">Celebrate your successes and learn from your mistakes</li>
            </ul>
            <a href="javascript:void(0);" className="inline-block px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg mt-6">
              Start Today
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails;
