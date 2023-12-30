import React from "react";

export default function CreateListing() {
  return (
    <main>
      <section>
        <form className="flex flex-col sm:flex-row gap-4 ">
          <div className="bg-[#F0FDF4] border-[3px] mt-9 w-[690px] md:w-[700px] lg:w-[1000px] h-[630px] rounded-[0.6rem] shadow-lg  mx-auto">
            <div className=" font-bold text-white text-[25px]  bg-[#ed5012] rounded-[0.4rem]  h-[48px] ">
              <p className="mx-4 p-1 font-bold text-[25px]">Upload Property</p>
            </div>

            <div className="px-6 mt-7">
              <div className="flex flex-col gap-4 flex-1 ">
                <input
                  type="text"
                  placeholder="Name"
                  className="border-gray-400 border-[1px] p-3 rounded-lg"
                  id="name"
                  maxLength="62"
                  minLength="10"
                  required
                />
                <textarea
                  type="text"
                  placeholder="Description"
                  className="border-gray-400 border-[1px] p-3 rounded-lg"
                  id="description"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="border-gray-400 border-[1px] p-3 rounded-lg"
                  id="address"
                  required
                />

                <div className="flex gap-6 flex-wrap mt-2">
                  <div className="flex gap-2">
                    <input type="checkbox" id="sale" className="w-5" />
                    <span>Sell</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id="rent" className="w-5" />
                    <span>Rent</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id="parking" className="w-5" />
                    <span>Parking spot</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id="furnished" className="w-5" />
                    <span>Furnished</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id="offer" className="w-5" />
                    <span>Offer</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="bedrooms"
                      min="1"
                      max="10"
                      required
                      className="p-3 border-gray-400 border-[1px] rounded-lg"
                    />
                    <p>Beds</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="bathrooms"
                      min="1"
                      max="10"
                      required
                      className="p-3 border-gray-400 border-[1px] rounded-lg"
                    />
                    <p>Baths</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="regularPrice"
                      min="50"
                      max="10000000"
                      required
                      className="p-3 border-gray-400 border-[1px] rounded-lg"
                    />
                    <div className="flex flex-col items-center">
                      <p>Regular price</p>
                      <span className="text-xs">(₹ / month)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="discountPrice"
                      min="0"
                      max="10000000"
                      required
                      className="p-3 border-gray-400 border-[1px] rounded-lg"
                    />
                    <div className="flex flex-col items-center">
                      <p>Discounted price</p>
                      <span className="text-xs">(₹ / month)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-4 mt-11">
                <p className="font-semibold">
                  Images:
                  <span className="font-normal text-gray-600 ml-2">
                    The first image will be the cover (max 6)
                  </span>
                </p>
                <div className="flex gap-4 ">
                  <input
                    className="p-3  border-gray-400 border-[1px] rounded w-[400px]"
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                  />
                  <button
                    type="button"
                    className="p-3  text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <button className="p-3 mt-5 w-[400px] bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                Upload Property
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
