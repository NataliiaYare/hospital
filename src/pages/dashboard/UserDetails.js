import React, {useState, useEffect} from 'react'

const UserDetails = () => {
const [userData, setUserData] = useState(null);

useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }
  const calculateDaysUntilBirthday = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Set the next birthday's date (month/day stays the same, year might change)
    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    // If the birthday this year has passed, use the next year
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    // Calculate the difference in time (milliseconds) and convert to days
    const timeDiff = nextBirthday - today;
    const daysUntilBirthday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysUntilBirthday;
  };

  const formattedDOB = new Date(userData.dob).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const daysUntilBirthday = calculateDaysUntilBirthday(userData.dob);
  
  return (
    <>
        <div className="bg-white relative font-sans ">

    <div class="grid mt-20 grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:max-w-6xl max-w-xl mx-auto font-sans">
      <div class="card bg-purple-100 rounded-lg p-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          About you
        </h3>
        <p class="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst. Proin quis quam vel nisi commodo blandit. Ut sed elit sit amet turpis venenatis porta.
        </p>
        <ul class="text-gray-600 list-disc mt-4 space-y-2 pl-4">
          <li class="text-sm">Increased efficiency</li>
          <li class="text-sm">Improved focus and organization</li>
          <li class="text-sm">Reduced time spent on tasks</li>
        </ul>
        <a href="javascript:void(0);" class="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg mt-6">Get Started</a>
      </div>
      <div class="card bg-purple-100 rounded-lg p-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          Fun facts
        </h3>
        
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          {daysUntilBirthday} days until your Birthday!
        </h3>
        <a href="javascript:void(0);" class="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg mt-6">Learn More</a>
      </div>
      <div class="card bg-purple-100 rounded-lg p-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          Which famous person has the same birthday
        </h3>
        <p class="text-sm text-gray-600">
          Nunc aliquet eros ultricies, hendrerit eros et, malesuada leo. Proin tincidunt purus at diam ultrices, in fringilla purus auctor. Nam eu diam eget purus semper tincidunt.
        </p>
        <ul class="text-gray-600 list-disc mt-4 space-y-2 pl-4">
          <li class="text-sm">Set clear and achievable goals</li>
          <li class="text-sm">Track your progress and stay motivated</li>
          <li class="text-sm">Celebrate your successes and learn from your mistakes</li>
        </ul>
        <a href="javascript:void(0);" class="inline-block px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg mt-6">Start Today</a>
      </div>
      <div class="card bg-purple-100 rounded-lg p-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          About you
        </h3>
        <p class="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst. Proin quis quam vel nisi commodo blandit. Ut sed elit sit amet turpis venenatis porta.
        </p>
        <ul class="text-gray-600 list-disc mt-4 space-y-2 pl-4">
          <li class="text-sm">Increased efficiency</li>
          <li class="text-sm">Improved focus and organization</li>
          <li class="text-sm">Reduced time spent on tasks</li>
        </ul>
        <a href="javascript:void(0);" class="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg mt-6">Get Started</a>
      </div>
      <div class="card bg-purple-100 rounded-lg p-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          How many day until their birthday?
        </h3>
        <p class="text-sm text-gray-600">
          Nullam in elit ac velit placerat consectetur nec sed sapien. Duis sit amet lorem eu elit malesuada tristique. Donec ultricies mi nec erat aliquet, sed suscipit orci mollis.
        </p>
        <ul class="text-gray-600 list-disc mt-4 space-y-2 pl-4">
          <li class="text-sm">Automated tasks and workflows</li>
          <li class="text-sm">Seamless collaboration and communication</li>
          <li class="text-sm">Enhanced project management</li>
        </ul>
        <a href="javascript:void(0);" class="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg mt-6">Learn More</a>
      </div>
      <div class="card bg-purple-100 rounded-lg p-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          Which famous person has the same birthday
        </h3>
        <p class="text-sm text-gray-600">
          Nunc aliquet eros ultricies, hendrerit eros et, malesuada leo. Proin tincidunt purus at diam ultrices, in fringilla purus auctor. Nam eu diam eget purus semper tincidunt.
        </p>
        <ul class="text-gray-600 list-disc mt-4 space-y-2 pl-4">
          <li class="text-sm">Set clear and achievable goals</li>
          <li class="text-sm">Track your progress and stay motivated</li>
          <li class="text-sm">Celebrate your successes and learn from your mistakes</li>
        </ul>
        <a href="javascript:void(0);" class="inline-block px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg mt-6">Start Today</a>
      </div>
    </div>
    </div>
    </>
)
}

export default UserDetails