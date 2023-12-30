import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
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
  const { currentUser, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileuploadError] = useState(false);
  const [updateSuccess, setupdateSuccess] = useState(false);
  const [formData, setFormdData] = useState({});
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

  return (
    <section className="flex items-center justify-center space-x-1 lg:space-x-40 max-w-6xl mx-auto">
      <div className="bg-[#F0FDF4] border-[3px] mt-9 w-[440px] md:w-[450px] lg:w-[500px] h-[480px] rounded-[0.6rem] shadow-lg max-w-lg mx-auto">
        <div className=" font-bold text-white text-[25px]  bg-[#ed5012] rounded-[0.4rem]  h-[48px] ">
          <p className="mx-4 p-1 font-bold text-[25px]">Profile</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col py-3 space-y-1 items-center justify-center"
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
          <div className="2">
            <button className="w-[400px] lg:w-[440px] text-white font-medium text-sm bg-blue-600 px-7 py-2 mt-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 uppercase">
              update
            </button>
          </div>
        </form>

        <div className="flex justify-between mx-5 lg:mx-6 my-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            <button className="w-[190px] lg:w-[220px] text-white font-medium text-sm bg-red-600 px-7 py-1 mt-4 rounded-md shadow-sm hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-800 uppercase">
              Delete Account
            </button>
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            <button className="w-[190px] lg:w-[220px] text-white font-medium text-sm bg-green-600 px-7 py-1 mt-4 rounded-md shadow-sm hover:bg-green-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-800 uppercase">Sign out</button>
          </span>
        </div>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User is updated successfully! 😎" : ""}
        </p>
      </div>
    </section>
  );
}
