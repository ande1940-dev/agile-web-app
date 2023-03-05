import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon, CalendarIcon, ChevronRightIcon, MagnifyingGlassIcon, Squares2X2Icon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import { User } from "@prisma/client";
import { Form, Link, NavLink } from "@remix-run/react";
import CreateWorkspaceModal from './modals/create-workspace-modal';
import { UserWithWorkspaces } from '~/server/types.server';

interface SidebarNavProps {
    user: UserWithWorkspaces
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SidebarNav({ user }: SidebarNavProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <nav className="fixed top-0 left-0 h-screen w-[19.5rem] border-r px-8">     
                <div className="flex h-20 z-10 absolute top-4 left-8 bg-white">
                    <div className="grid place-content-center w-12 h-12 bg-slate-400 rounded-lg">Logo</div>
                    <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900"></div>
                </div>
                <div className="flex absolute z-10 bottom-4 left-8 h-20 bg-white">
                    <div className="h-8 bg-gradient-to-t from-white dark:from-slate-900"></div>
                    <div className="mt-8 flex items-center gap-x-4">
                        {/* <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" /> */}
                        <div className="h-10 w-10 rounded-full bg-slate-400"></div>
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
                                <Menu.Items className="absolute left-24 -top-full z-30 mt-2 w-56 origin-bottom-left rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to="/dashboard/settings" className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}>Account settings</Link>
                                        )}
                                    </Menu.Item>
                                    <Form method="post">
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
                                    </Form>
                                </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
                <div className="mt-32 w-full">
                    <ul className="mt-16">
                        <li>
                            <NavLink to="/dashboard/workspaces">
                                <div className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
                                    <div className="grid place-content-center h-6 w-6 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 group-hover:shadow-purple-200">
                                    <Squares2X2Icon className="h-4 w-4 text-slate-300"/> 
                                    </div>
                                    <span>Workspaces</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/tasks">
                                <div className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
                                    <div className="grid place-content-center h-6 w-6 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 group-hover:shadow-purple-200">
                                        <CalendarIcon className="h-4 w-4 text-slate-300"/> 
                                    </div>
                                    <span>Tasks</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="mt-4 w-full">
                    <div className="sticky top-0 -ml-0.5">
                        <div className="flex w-full justify-between mt-10 bg-white relative">
                            <div className="hidden lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300">
                                <MagnifyingGlassIcon className="h-6 w-6 text-slate-400 mr-3"/>
                                <input className="w-36 focus:outline-none" type="search" name="search" id="search" placeholder="Search Workspaces"/>
                            </div>
                            <button onClick={() => setOpen(true)} className="grid place-content-center h-9 w-9 rounded-md ring-1 ring-slate-900/5 shadow-sm hover:shadow hover:ring-slate-900/10 hover:shadow-purple-200">
                                <SquaresPlusIcon className="h-6 w-6 text-slate-300 hover:text-slate-400"/> 
                            </button>
                        </div>
                        <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900"></div>
                    </div>
                    <ul className="grow h-64 space-y-6 lg:space-y-2 border-slate-100 overflow-y-auto">
                        { 
                            user.workspaces.map((workspace) => {
                                return (
                                    <li key={workspace.id} className="flex space-x-4 items-center block pl-3 text-sm text-slate-600 hover:text-slate-900">
                                        <div className={`h-2 w-2 rounded-sm ${ (workspace.endDate && new Date(workspace.endDate) > new Date(Date.now()))  || !workspace.endDate ? "bg-green-500": "bg-slate-200"}`}></div>
                                        <NavLink className="w-48 truncate" to={`/dashboard/workspaces/${workspace.id}`}>{workspace.name}</NavLink>
                                    </li>
                                )
                            })   
                        }
                    </ul>
                </div>
            </nav>
            <CreateWorkspaceModal open={open} setOpen={setOpen}/>
        </>
    )
}