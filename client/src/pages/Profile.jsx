import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="flex items-center justify-center space-x-1 lg:space-x-40 max-w-6xl mx-auto">
      <div className="bg-[#F0FDF4] border-[3px] mt-9 w-[440px] md:w-[450px] lg:w-[500px] h-[480px] rounded-[0.6rem] shadow-lg">
        <div className=" font-bold text-white text-[25px]  bg-[#ed5012] rounded-[0.4rem]  h-[48px] ">
          <p className="mx-4 p-1 font-bold text-[25px]">Profile</p>
        </div>

        <form className="flex flex-col py-3 space-y-1 items-center justify-center">
          <img
            src={currentUser.avatar}
            alt="profile"
            className=" rounded-full h-24 w-24 object-cover cursor-pointer border-[3px] border-black shadow-md self-center mt-2"
          />
          <input
            type="text"
            placeholder="username"
            id="username"
            className="border p-3 rounde-lg"
          />
          <input
            type="email"
            placeholder="username"
            id="username"
            className="border p-3 rounde-lg"
          />
          <input
            type="text"
            placeholder="username"
            id="username"
            className="border p-3 rounde-lg"
          />
          <div className="py-2"> 
            <button className="w-[400px] lg:w-[440px] text-white font-medium text-sm bg-blue-600 px-7 py-2 mt-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 uppercase">
            update
          </button>
          </div>
         </form>

         <div className="flex justify-between mx-3 my-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
         </div>
      </div>
    </section>
  );
}
