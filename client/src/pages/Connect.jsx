import React from 'react'
import { FaInstagram} from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { IoMdMail, IoLogoYoutube } from "react-icons/io";
export default function Connect() {
  return (
    <section id="connect" class="py-16">
    <div class="flex mx-auto flex-col justify-center items-center ">
        {/* <!-- Job Application Form --> */}
        <div class="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg border-[2px]">
            <h2 class="text-3xl font-semibold mb-6">Join Our Team</h2>
            <form action="#" method="post" class="space-y-4">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/2 px-2 mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-600">Full Name</label>
                        <input type="text" id="name" name="name" class="mt-1 p-2 w-full border rounded-md"/>
                    </div>
                    <div class="w-1/2 px-2 mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                        <input type="email" id="email" name="email" class="mt-1 p-2 w-full border rounded-md"/>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="resume" class="block text-sm font-medium text-gray-600">Resume (PDF or Word)</label>
                    <input type="file" id="resume" name="resume" accept=".pdf, .doc, .docx" class="mt-1 p-2 w-full border rounded-md"/>
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Application</button>
            </form>
        </div>

        {/* <!-- Contact Details --> */}
        <div class="w-full md:w-1/2 shadow-lg border-[2px] mt-8 ">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-3xl font-semibold mb-4">Contact Us</h2>
                <div className='flex gap-3'>
                <IoLogoYoutube  /><p class="text-gray-700 hover:text-red-800 hover:font-bold  "> Youtube</p>
                </div>
                <div className='flex gap-3 '>
                <FaInstagram /><p class="text-gray-700 hover:text-purple-800 hover:font-bold "> Instagram </p>
                </div>

                <div className='flex gap-3 hover:font-bold'>
                <FaSquarePhone /><p class="text-gray-700  "> Phone: <a className='hover:text-black hover:font-bold ' href="">8000-4564-1298</a></p>
                </div>

                <div className='flex gap-3'>
                <IoMdMail /><p class="text-gray-700 hover:font-bold "> Email: <a className='hover:text-blue-800 hover:font-bold ' href="officialroomoo@gmail.com">officialroomoo@gmail.com</a> </p>
                </div>
               
                {/* <!-- Additional Contact Information, Social Media Links, etc. can be added here --> */}
            </div>
        </div>
    </div>
</section>
  )
}
