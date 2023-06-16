"use client";

import { Tab } from "@headlessui/react";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";

export function AuthComponent() {
  const tabClassName = `border !border-b-transparent rounded-tl-md rounded-tr-md
  focus:outline-none focus:ring-0 py-2.5 px-4
  ui-selected:bg-white
  ui-not-selected:bg-transparent 
  ui-not-selected:text-sky-600
  ui-selected:border-gray-300 
  ui-not-selected:border-transparent`;

  return (
    <div
      className="w-full min-h-[365px] md:w-7/12 lg:w-6/12 xl:w-4/12 bg-gray-100 p-5
      place-self-center border border-gray-300 rounded-sm"
    >
      <Tab.Group>
        <Tab.List className="border-b border-b-gray-300 h-10 mb-4">
          <Tab className={tabClassName}>Login</Tab>
          <Tab className={tabClassName}>Create Account</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <LoginComponent />
          </Tab.Panel>
          <Tab.Panel>
            <RegisterComponent />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
