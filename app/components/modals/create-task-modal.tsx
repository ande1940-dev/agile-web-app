import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Form } from "@remix-run/react";
import { Status, User } from "@prisma/client";
import UserMenu from '../select-menus/user-menu';
import StatusMenu from '../select-menus/status-menu';

interface CreateTaskProps {
    open: boolean,
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>
    taskStatus: Status
    users: User[]
}

export default function CreateTaskModal({ open, setOpen, taskStatus, users }: CreateTaskProps) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <Form method="post">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="flex justify-center w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <div className="grid w-full space-y-4">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-4">
                              Create Task
                            </Dialog.Title>
                            <div className="grid space-y-2">
                              <label htmlFor="title">Title</label>
                              <input className="px-3 h-10 rounded-md border border-slate-300 outline-none focus:outline-2 focus:invalid:outline-red-400 focus:valid:outline-green-400" type="text" name="title" id="title" placeholder='Like "Create Repository & Push To GitHub"' required />
                            </div>
                            <div className="grid space-y-2">
                              <label htmlFor="description">Description (Optional)</label>
                              <textarea className="outline-none px-2 h-20 rounded-md border border-slate-300 focus:border-slate-500"  name="description" id="description"/>
                            </div>
                            <div className="grid space-y-2">
                              <label htmlFor="dueDate">Due Date (Optional)</label>
                              <input className="px-3 h-10 rounded-md outline-none border border-slate-300 focus:border-slate-500"  type="datetime-local" name="dueDate" id="dueDate"/>
                            </div>
                            <StatusMenu status={taskStatus} />
                            <UserMenu users={users} />
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      name="intent"
                      value="create-task"
                      className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
