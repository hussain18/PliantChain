import { useState } from 'react';
import { signup, getAuth, removeAuth } from '../api';

export default function SignUp() {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    completeName: '',
    accountAddress: '',
    password: '',
    type: '1',
  });

  const handleChange = (event) => {
    const changedData = { ...userData };
    changedData[event.target.name] = event.target.value;
    setUserData(changedData);
  };

  const handleSubmit = async () => {
    if (getAuth()) removeAuth(); // Log out prev logged in user
    await signup(userData);
    if (!getAuth()) {
      console.log('st went wrong check your data and try again');
      return;
    }
    window.location = '#/profile';
  };

  //TODO: add option for signing in

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign Up to your account
          </h2>
          {/* <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">create your account</h3> */}
          {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p> */}
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    value={userData.email}
                    onChange={handleChange}
                    autoComplete='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Username
                </label>
                <div className='mt-1'>
                  <input
                    id='username'
                    onChange={handleChange}
                    value={userData.username}
                    name='username'
                    type='username'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Full name
                </label>
                <div className='mt-1'>
                  <input
                    id='completeName'
                    onChange={handleChange}
                    value={userData.completeName}
                    name='completeName'
                    type='text'
                    autoComplete='completeName'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Type
                </label>
                <div className='mt-1'>
                  <select
                    id='number'
                    name='type'
                    type='text'
                    onChange={handleChange}
                    value={userData.type}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  >
                    <option value='1'> Organization-1</option>
                    <option value='2'> User-2</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Account Address
                </label>
                <div className='mt-1'>
                  <input
                    id='number'
                    name='accountAddress'
                    type='text'
                    onChange={handleChange}
                    value={userData.accountAddress}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    onChange={handleChange}
                    value={userData.password}
                    type='password'
                    autoComplete='current-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>
                    Or Already have an account coUpntinue 
                  </span>
                </div>
              </div>

              <div>
                <a
                  href="#/signin"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Sign In
                </a>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
