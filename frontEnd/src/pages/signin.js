import { login, getAuth, removeAuth } from '../api';
import { useState } from 'react';

export default function Signin() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const changedData = { ...userData };
    changedData[event.target.name] = event.target.value;
    setUserData(changedData);
  };

  const handleSubmit = async () => {
    await login(userData);
    if (!getAuth()) {
      console.log('username or password is wrong');
      return;
    }
    window.location = '#/profile';
  };

  return !getAuth() ? (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-700'
                >
                  Username
                </label>
                <div className='mt-1'>
                  <input
                    id='username'
                    name='username'
                    value={userData.username}
                    onChange={handleChange}
                    type='text'
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
                    type='password'
                    value={userData.password}
                    onChange={handleChange}
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

                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-medium text-cyan-600 hover:text-cyan-500'
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  Sign in
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
                    Dont have an account continue
                  </span>
                </div>
              </div>

              <a
                  href="#/signup"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Sign Up
                </a>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>
      {/* TODO: style this link it return to home page or continue login with another account */}
      You are already signed in{' '}
      <button
        onClick={() => {
          removeAuth();
          window.location.reload();
        }}
      >
        click here
      </button>{' '}
      to log out ro{' '}
      <button
        onClick={() => {
          window.location = '#/profile';
        }}
      >
        click here
      </button>{' '}
      to return to your home page.
    </div>
  );
}
