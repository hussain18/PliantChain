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
const orgIcon = require('../img/org_address.jpg').default;

const projectTemplate = {
  title: 'Pliant Chain',
  href: '#/project/#',
  description:
    'To develop a trustworthy and adoptable finance management system for organizations to avoid corruption',
  date: 'Nov 11, 2021',
  datetime: '2021-11-11',
  imageUrl:
    'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
  readingTime: '3 min',
  author: {
    name: 'Group-5',
    href: '#',
    imageUrl: orgIcon,
  },
};

const navigation = [
  { name: 'Home', href: '#/home', icon: HomeIcon, current: false },
  { name: 'History', href: '#/history', icon: ClockIcon, current: false },
  { name: 'Balances', href: '#/balances', icon: ScaleIcon, current: false },
  { name: 'Profile', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Team', href: '#/team', icon: UserGroupIcon, current: false },
  {
    name: 'Project',
    href: '#/project',
    icon: DocumentReportIcon,
    current: true,
  },
];
const secondaryNavigation = [
  { name: 'Settings', href: '#/settings', icon: CogIcon },
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

function NewProjectView(props) {
  const [newProject, setNewProject] = useState({
    projectName: '',
  });

  const handleNewProjectChange = (event) => {
    setNewProject({ projectName: event.target.value });
  };

  return (
    <div className='px-10 py-1 mt-5 flex-1 items-center space-y-1 space-x-1 sm:flex'>
      <div className='w-96'></div>
      <input
        type='text'
        name='projectName'
        value={newProject.projectName}
        onChange={handleNewProjectChange}
        id='text'
        className='shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md'
        placeholder='Enter the Project Name'
      />
      <button
        onClick={() => props.onSubmit(newProject)}
        type='submit'
        className='grow w-full sm:w-auto sm:flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
      >
        Create Project
      </button>
      <div className='w-96'></div>
    </div>
  );
}

export default function Projects() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [projectsList, setProjectsList] = useState(
    JSON.parse(JSON.stringify(null))
  );

  const [submittingNewProject, setSubmittingNewProject] = useState(false);

  useEffect(() => {
    loadProjectsData();
  }, [!dataLoaded]);

  const loadProjectsData = async () => {
    if (!getAuth()) {
      console.log('username or password is wrong');
      window.location = '#/';
      return;
    } // TODO: redirect to landing page with a flash message (not signed in)

    const user = await authRequest('/user', GET);
    if (user.type !== '1') {
      console.log('only organization can access');
      window.location = '#/home';
      return;
    } // TODO: redirect to profile/dashboard with a flash message (only organization can access)

    const projects = await authRequest('/projects', GET);

    setProjectsList(projects);
    setDataLoaded(true);
  };

  const submitNewProject = async (newProject) => {
    setSubmittingNewProject(true);
    await authRequest('/project', POST, newProject);
    setSubmittingNewProject(false);
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
              <div className='relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
                <div className='absolute inset-0'>
                  <div className='bg-white h-1/3 sm:h-2/3' />
                </div>
                <div className='relative max-w-7xl mx-auto'>
                  <div className='text-center'>
                    <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
                      Projects
                    </h2>
                    <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
                      The projects created by you!
                    </p>
                  </div>

                  {submittingNewProject ? (
                    <p className='text-center'>loading...</p>
                  ) : null}

                  <NewProjectView
                    onSubmit={(newProject) => submitNewProject(newProject)}
                  />

                  <div className='mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
                    {projectsList.map((project) => (
                      <div
                        key={project.projectName}
                        className='flex flex-col rounded-lg shadow-lg overflow-hidden'
                      >
                        <div className='flex-shrink-0'>
                          <img
                            className='h-48 w-full object-cover'
                            src={projectTemplate.imageUrl}
                            alt=''
                          />
                        </div>
                        <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                          <div className='flex-1'>
                            <a
                              href={'#/project/' + project.projectName}
                              className='block mt-2'
                            >
                              <p className='text-xl font-semibold text-gray-900'>
                                {project.projectName}
                              </p>
                              <p className='mt-3 text-base text-gray-500'>
                                {projectTemplate.description}
                              </p>
                            </a>
                          </div>
                          <div className='mt-6 flex items-center'>
                            <div className='flex-shrink-0'>
                              <a href={'#/project/' + project.projectName}>
                                <span className='sr-only'>
                                  {project.orgUsername}
                                </span>
                                <img
                                  className='h-10 w-10 rounded-full'
                                  src={projectTemplate.author.imageUrl}
                                  alt=''
                                />
                              </a>
                            </div>
                            <div className='ml-3'>
                              <p className='text-sm font-medium text-gray-900'>
                                <a
                                  href={'#/project/' + project.projectName}
                                  className='hover:underline'
                                >
                                  {project.orgUsername}
                                </a>
                              </p>
                              <div className='flex space-x-1 text-sm text-gray-500'>
                                <time dateTime={projectTemplate.datetime}>
                                  {projectTemplate.date}
                                </time>
                                <span aria-hidden='true'>&middot;</span>
                                <span>{projectTemplate.readingTime} read</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <p>loading....</p>
  ); //style this
}
