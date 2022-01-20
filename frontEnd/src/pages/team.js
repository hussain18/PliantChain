import { Fragment, useEffect, useState } from 'react';
import Footer from '../components/footer';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { authRequest, GET, getAuth, POST } from '../api';
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  ChevronLeftIcon,
  DocumentReportIcon,
  PlusSmIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from '@heroicons/react/solid';

// Images
const personIcon = require('../img/person_icon.png').default;
const orgIcon = require('../img/org_address.jpg').default;

// User data control
const NUMBER_TO_AUTH = {
  1: 'Organization',
  2: 'Finance Manager',
  3: 'Employee',
  0: 'Terminated',
};

const people = [
  {
    empPsername: 'Sunita Patil',
    handle: 'sunitapt',
    email: 'sunita.patil18@vit.edu',
    authorities: 1,
    imageId: '1517841905240-472988babdf9',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Talib Hussain',
    handle: 'hussain18',
    email: 'talib.hussain18@vit.edu',
    authorities: 2,
    imageId: '1438761681033-6461ffad8d80',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Pradunya Maladhari',
    handle: 'pradunya07',
    email: 'pradunya.maladhari18@vit.edu',
    authorities: '3',
    imageId: '1472099645785-5658abf4ff4e',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Sagar Sikchi',
    handle: 'SagarSikchi',
    email: 'sagar.sikchi18@vit.edu',
    authorities: '3',
    imageId: '1472099645785-5658abf4ff4e',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Tejas Kachare',
    handle: 'tvk2012',
    email: 'tejas.kachare18@vit.edu',
    authorities: '2',
    imageId: '1472099645785-5658abf4ff4e',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Sunita Patil',
    handle: 'sunitapt',
    email: 'sunita.patil18@vit.edu',
    authorities: '1',
    imageId: '1517841905240-472988babdf9',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Talib Hussain',
    handle: 'hussain18',
    email: 'talib.hussain18@vit.edu',
    authorities: '1',
    imageId: '1438761681033-6461ffad8d80',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Pradunya Maladhari',
    handle: 'pradunya07',
    email: 'pradunya.maladhari18@vit.edu',
    authorities: '3',
    imageId: '1472099645785-5658abf4ff4e',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Sagar Sikchi',
    handle: 'SagarSikchi',
    email: 'sagar.sikchi18@vit.edu',
    authorities: '3',
    imageId: '1472099645785-5658abf4ff4e',
    imageUrl: personIcon,
  },
  {
    empPsername: 'Tejas Kachare',
    handle: 'tvk2012',
    email: 'tejas.kachare18@vit.edu',
    authorities: '2',
    imageId: '1472099645785-5658abf4ff4e',
    imageUrl: personIcon,
  },
];

const navigation = [
  { name: 'Home', href: '#/home', icon: HomeIcon, current: false },
  { name: 'History', href: '#/history', icon: ClockIcon, current: false },
  { name: 'Balances', href: '#/balances', icon: ScaleIcon, current: false },
  { name: 'Profile', href: '#/profile', icon: CreditCardIcon, current: false },
  { name: 'Team', href: '#/team', icon: UserGroupIcon, current: true },
  {
    name: 'Project',
    href: '#/project',
    icon: DocumentReportIcon,
    current: false,
  },
];
const secondaryNavigation = [
  { name: 'Settings', href: '#/settings', icon: CogIcon, current: true },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];
const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: 'Payment to Siera Alicia',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
];
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function EditMenu(props) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-cyan-500'>
          Edit
          <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => props.onSubmit(2)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Finance Manager
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => props.onSubmit(3)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Employee
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => props.onSubmit(0)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Terminate
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function Team() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [structureData, setStructureData] = useState(null);
  const [addEmployeeData, setAddEmployeeData] = useState({
    empUsername: '',
    authorities: 3,
  });

  const [changeSubmitted, setChangeSubmitted] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getStructureData();
  }, [!dataLoaded]);

  const getStructureData = async () => {
    if (!getAuth()) {
      console.log('only organizations are allowed');
      window.location = '#/';
      return;
    } // TODO: has to return to landing page with a flash message

    const user = await authRequest('/user', GET);
    if (!user) return;
    if (!user.type === '1') {
      console.log('only organizations are allowed');
      window.location = '#/';
      return;
    } // TODO: redirect to landing page with a flash message

    // add organization info to structure
    const orgInfo = {
      empUsername: user.username,
      authorities: '1',
    };

    const structure = await authRequest('/structure', GET);
    if (!structure) return;

    structure.unshift(orgInfo);

    setStructureData(structure);
    setDataLoaded(true);
  };

  const handleSubmit = async (username, orgUsername, newAuthority) => {
    const updatedStructureData = {
      orgUsername: orgUsername,
      empUsername: username,
      authorities: newAuthority,
    };

    await authRequest('/structure', POST, updatedStructureData);
    window.location.reload();
  };

  const handleAddEmployeeChange = async (event) => {
    setChangeSubmitted(true);
    const changedData = { ...addEmployeeData };
    changedData[event.target.name] = event.target.value;
    setAddEmployeeData(changedData);
  };

  const addEmployee = async () => {
    setChangeSubmitted(true);
    let newStructureData = { ...addEmployeeData };
    newStructureData.orgUsername = structureData[0].empUsername;
    await authRequest('/structure', POST, newStructureData);
    window.location.reload();
  };

  return dataLoaded ? (
    <>
      <div className='min-h-full'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-shrink-0 flex items-center px-4'>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg'
                    alt='Easywire logo'
                  />
                </div>
                <nav
                  className='mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto'
                  aria-label='Sidebar'
                >
                  <div className='px-2 space-y-1'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-cyan-800 text-white'
                            : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className='mr-4 flex-shrink-0 h-6 w-6 text-cyan-200'
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className='mt-6 pt-6'>
                    <div className='px-2 space-y-1'>
                      {secondaryNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className='group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600'
                        >
                          <item.icon
                            className='mr-4 h-6 w-6 text-cyan-200'
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg'
                alt='Easywire logo'
              />
            </div>
            <nav
              className='mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto'
              aria-label='Sidebar'
            >
              <div className='px-2 space-y-1'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-cyan-800 text-white'
                        : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className='mr-4 flex-shrink-0 h-6 w-6 text-cyan-200'
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className='mt-6 pt-6'>
                <div className='px-2 space-y-1'>
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600'
                    >
                      <item.icon
                        className='mr-4 h-6 w-6 text-cyan-200'
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className='lg:pl-64 flex flex-col flex-1'>
          <div className='relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none'>
            <button
              type='button'
              className='px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <MenuAlt1Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            {/* Search bar */}
            <div className='flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
              <div className='flex-1 flex'>
                <form className='w-full flex md:ml-0' action='#' method='GET'>
                  <label htmlFor='search-field' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                    <div
                      className='absolute inset-y-0 left-0 flex items-center pointer-events-none'
                      aria-hidden='true'
                    >
                      <SearchIcon className='h-5 w-5' aria-hidden='true' />
                    </div>
                    <input
                      id='search-field'
                      name='search-field'
                      className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm'
                      placeholder='Search transactions'
                      type='search'
                    />
                  </div>
                </form>
              </div>
              <div className='ml-4 flex items-center md:ml-6'>
                <button
                  type='button'
                  className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50'>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                      <span className='hidden ml-3 text-gray-700 text-sm font-medium lg:block'>
                        <span className='sr-only'>Open user menu for </span>
                        Sunita Patil
                      </span>
                      <ChevronDownIcon
                        className='hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#/profile'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#/settings'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className='flex-1 flex overflow-hidden'>
            <div className='flex-1 flex flex-col overflow-y-auto xl:overflow-hidden'>
              {/* Breadcrumb */}
              <div className='max-w-lg mx-auto'>
                <div>
                  <div className='text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 48 48'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z'
                      />
                    </svg>
                    <h2 className='mt-2 text-lg font-medium text-gray-900'>
                      Organization members
                    </h2>
                    <p className='mt-1 text-sm text-gray-500'>
                      Add members to your Organization. As the admin of this
                      Organization, you can manage organizations member
                      permissions.
                    </p>
                  </div>
                  <div className='mt-6 flex-1 items-end space-x-1 space-y-1 sm:flex'>
                    <label htmlFor='email' className='sr-only'>
                      Username
                    </label>
                    <input
                      type='text'
                      name='empUsername'
                      id='email'
                      required={true}
                      value={addEmployeeData.empUsername}
                      onChange={handleAddEmployeeChange}
                      className='shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      placeholder='Enter a username'
                    />
                    <select
                      type='text'
                      name='authorities'
                      id='email'
                      value={addEmployeeData.authorities}
                      onChange={handleAddEmployeeChange}
                      className='shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    >
                      <option value={3}>Employee</option>
                      <option value={2}>Finance Manager</option>
                    </select>
                    <button
                      type='submit'
                      onClick={() => addEmployee()}
                      className='ml-4 flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className='mt-10'>
                  <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>
                    Members previously added to Organization
                  </h3>
                  {changeSubmitted ? <p>working...</p> : null}{' '}
                  {/*TODO: make this one a flash message */}
                  <ul
                    role='list'
                    className='mt-4 mb-32 border-t border-b border-gray-200 divide-y divide-gray-200'
                  >
                    {structureData.map((person, personIdx) => (
                      <li
                        key={personIdx}
                        className='py-4 flex items-center justify-between space-x-3'
                      >
                        <div className='min-w-0 flex-1 flex items-center space-x-3'>
                          <div className='flex-shrink-0'>
                            <img
                              className='h-10 w-10 rounded-full'
                              src={
                                person.authorities === '1'
                                  ? orgIcon
                                  : personIcon
                              }
                              alt=''
                            />
                          </div>
                          <div className='min-w-0 flex-1'>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {person.empUsername}
                            </p>
                            <p className='text-sm font-medium text-gray-500 truncate'>
                              {NUMBER_TO_AUTH[person.authorities]}
                            </p>
                          </div>
                        </div>

                        {person.authorities === '1' ? null : (
                          <EditMenu
                            onSubmit={(newAuth) =>
                              handleSubmit(
                                person.empUsername,
                                structureData[0].empUsername,
                                newAuth
                              )
                            }
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  ); //TODO: style it
}
