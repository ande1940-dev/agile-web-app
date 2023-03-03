import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon, CalendarIcon, ChevronRightIcon, MagnifyingGlassIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { User } from "@prisma/client";
import { NavLink } from "@remix-run/react";

interface SidebarNavProps {
    user: User
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SidebarNav({ user }: SidebarNavProps) {
    return (
        <nav className="hidden lg:block fixed z-20 inset-0 top-0 left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] border-r pb-10 px-8">  
            <div className="mt-8 flex items-center gap-x-4">
                {/* <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" /> */}
                <div className="h-10 w-10 rounded-full bg-yellow-400"></div>
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                      { user.profile.firstName + " " + user.profile.lastName}
                  </p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                            <ChevronRightIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-24 -top-1/2 z-30 mt-2 w-56 origin-top-left rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    >
                                    Account settings
                                    </a>
                                )}
                            </Menu.Item>
                            <form method="POST">
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        type="submit"
                                        name="intent"
                                        value="sign-out"
                                        className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                    >
                                        Sign out
                                    </button>
                                    )}
                                </Menu.Item>
                            </form>
                        </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <ul className="mt-10">
                <li>
                    <NavLink to="/dashboard/workspaces">
                        <div className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
                            <div className="grid place-content-center h-6 w-6 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 group-hover:shadow-purple-200">
                               <Squares2X2Icon className="h-4 w-4 text-yellow-300"/> 
                            </div>
                            <span>Workspaces</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/tasks">
                        <div className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
                            <div className="grid place-content-center h-6 w-6 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 group-hover:shadow-purple-200">
                               <CalendarIcon className="h-4 w-4 text-yellow-300"/> 
                            </div>
                            <span>Tasks</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/notifications">
                        <div className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
                            <div className="grid place-content-center h-6 w-6 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 group-hover:shadow-purple-200">
                               <BellIcon className="h-4 w-4 text-yellow-300"/> 
                            </div>
                            <span>Notifications</span>
                        </div>
                    </NavLink>
                </li>
            </ul>
            <div className="sticky top-0 -ml-0.5">
                <div className="mt-10 bg-white relative">
                    <div className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300">
                        <MagnifyingGlassIcon className="h-6 w-6 text-slate-400 mr-3"/>
                        <input className="focus:outline-none" type="text" name="search" id="search" placeholder="Search Workspaces"/>
                    </div>
                </div>
                <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900"></div>
            </div>
            <ul className="grow h-64 space-y-6 lg:space-y-2 border-slate-100 overflow-y-auto">
                <li className="block border-l pl-4 hover:border-slate-400 text-sm text-slate-700 hover:text-slate-900">
                    <NavLink to={`/dashboard`}>Link</NavLink>
                </li>
            </ul>
        </nav>
    )
}