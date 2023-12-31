import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileuploadError] = useState(false);
  const [updateSuccess, setupdateSuccess] = useState(false);
  const [formData, setFormdData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  //     allow write: if
  //     request.resource.size < 2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileuploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormdData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormdData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setupdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="flex sm:flex-col lg:flex-row items-center justify-center space-x-1 lg:space-x-40 max-w-6xl mx-auto">
      <div className="bg-[#F0FDF4] border-[3px] mt-9 w-[440px] md:w-[450px] lg:w-[500px] h-[595px] rounded-[0.6rem] shadow-lg max-w-lg mx-auto">
        <div className=" font-bold text-white text-[25px]  bg-[#ed5012] rounded-[0.4rem]  h-[48px] ">
          <p className="mx-4 p-1 font-bold text-[25px]">Profile</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col py-3 space-y-2 items-center justify-center"
        >
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className=" rounded-full h-24 w-24 object-cover cursor-pointer border-[3px] border-black shadow-md self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-green-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 font-mono text-[12px]">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            className="border w-[400px] lg:w-[430px] p-3 rounde-lg font-medium"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border w-[400px] lg:w-[430px] p-3 rounde-lg font-medium"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="password"
            id="password"
            className="border w-[400px] lg:w-[430px] p-3 rounde-lg font-medium"
            onChange={handleChange}
          />
          <div className="">
            <button className="w-[400px] lg:w-[440px] text-white font-medium text-sm bg-green-600 px-7 py-2 mt-4 rounded-md shadow-sm hover:bg-green-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-800 uppercase">
              {loading ? "Loading..." : "Update"}
            </button>
            <div>
              <Link className="" to={"/create-listing"}>
                <button className="w-[400px] lg:w-[440px] text-white font-medium text-sm bg-blue-600 px-7 py-2 mt-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 uppercase">
                  Upload Property
                </button>
              </Link>
            </div>
          </div>
        </form>

        <div className="flex justify-between mx-5 lg:mx-7 my-1">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            <button className="w-[190px] lg:w-[200px] text-white font-medium text-sm bg-red-600 px-7 py-1 mt-4 rounded-md shadow-sm hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-800 uppercase">
              Delete Account
            </button>
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            <button className="w-[190px] lg:w-[200px] text-white font-medium text-sm bg-slate-700 px-7 py-1 mt-4 rounded-md shadow-sm hover:bg-slate-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-slate-900 uppercase">
              Sign out
            </button>
          </span>
        </div>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User is updated successfully! 😎" : ""}
        </p>
        <div className="flex justify-center items-center">
          <button onClick={handleShowListings} className="text-green-700 p-1 uppercase font-medium text-sm px-8 rounded-lg bg-white hover:bg-green-500  hover:text-white shadow-sm transition duration-450 ease-in-out border-black border-[2px]">
          Show Properties
        </button>
        </div>
        
        <p className="text-red-700 mt-5">
          {showListingsError ? "Error showing listings" : ""}
        </p>
        </div>

        {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4 bg-[#F0FDF4] border-[3px] mt-9 w-[440px] md:w-[450px] lg:w-[500px] h-[595px] rounded-[0.6rem] shadow-lg max-w-lg mx-auto'>
          <div className=" font-bold text-white text-[25px]  bg-[#ed5012] rounded-[0.4rem]  h-[48px] ">
          <p className="mx-4 p-1 font-bold text-[25px]">Your Properties</p>
        </div>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border-[1px] border-gray-400 bg-white rounded-lg p-3 mx-2 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <div className="flex flex-col gap-1">
                <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <Link
                className='text-slate-700 text-wrap w-[200px]  truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.address}</p>
              </Link>
              </div>
              

              <div className='flex flex-col item-center gap-2'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase hover:font-medium'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase hover:font-medium'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </section>
  );
}
