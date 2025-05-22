
import React, { useState, useRef } from "react";
import { statesAndDistricts } from "./statesAndDistricts";


const PROPERTY_TYPES = [
  "Flats / Apartments",
  "Independent / Builder Floors",
  "Farm House",
  "House & Villa",
];

const RealEstatePostForm = () => {
  const [photos, setPhotos] = useState(Array(20).fill(null));
   const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [mobile, setMobile] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [coverIdx, setCoverIdx] = useState(0);
  const inputRefs = useRef([]);
  const [formData, setFormData] = useState({
    category: "For Sale: Houses & Apartments",
    propertyType: "",
    bhk: "",
    bathrooms: "",
    furnishing: "",
    projectStatus: "",
    listedBy: "",
    superBuiltupArea: "",
    carpetArea: "",
    maintenance: "",
    totalFloors: "",
    floorNo: "",
    carParking: "",
    facing: "",
    projectName: "",
    adTitle: "",
    description: "",
    price: "",
    location: "",
    state: "",
  });

  // const handleImageUpload = (e, idx) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const newPhotos = [...formData.photos];
  //     newPhotos[idx] = file;
  //     setFormData(prev => ({
  //       ...prev,
  //       photos: newPhotos,
  //       coverIdx: newPhotos.every(p => !p) ? idx : prev.coverIdx
  //     }));
  //   }
  // };

  //  const handleRemoveImage = (idx) => {
  //   const newPhotos = [...formData.photos];
  //   newPhotos[idx] = null;
  //   setFormData(prev => ({
  //     ...prev,
  //     photos: newPhotos,
  //     coverIdx: idx === prev.coverIdx ? 
  //       newPhotos.findIndex(p => p) : prev.coverIdx
  //   }));
  // };


//   const handleBoxClick = (idx) => {
//   setCoverIdx(idx);
//   if (inputRefs.current[idx]) {
//     inputRefs.current[idx].click();
//   }
// };



  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict(""); 
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      setLogo(file);
    }
  };
  const [errors, setErrors] = useState({});

 const logoInputRef = useRef(null);
const handleSingleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setPhotos(prev => {
      const updated = [...prev];
      updated[coverIdx] = file;
      return updated;
    });

    setTimeout(() => {
      setPhotos(currentPhotos => {
        const nextEmpty = currentPhotos.findIndex(p => !p);
        setCoverIdx(nextEmpty !== -1 ? nextEmpty : coverIdx);
        return currentPhotos;
      });
    }, 0);
  }
};


   const handleRemove = (idx) => {
    const newPhotos = [...photos];
    newPhotos[idx] = null;
    setPhotos(newPhotos);
    if (idx === coverIdx) {
      const next = newPhotos.findIndex(f => f);
      setCoverIdx(next !== -1 ? next : 0);
    }
  };


//     const handleCoverClick = (idx) => {
//     if (inputRefs.current[idx]) {
//       inputRefs.current[idx].click();
//     }
//   };

//   const handleCoverBadgeClick = (idx) => {
//   setCoverIdx(idx);
//   if (inputRefs.current[idx]) {
//     inputRefs.current[idx].click();
//   }
// };

   const handleSetCover = (idx) => {
    setCoverIdx(idx);
  };

    const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setReviewError("Name is required");
      return;
    }
    if (!mobile.match(/^[6-9]\d{9}$/)) {
      setReviewError("Valid 10-digit mobile number required");
      return;
    }
    
    if (!photos.some(p => p)) {
      setFormError("At least one property photo required");
      return;
    }

     const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.match(/^[6-9]\d{9}$/)) {
      newErrors.mobile = "Valid 10-digit mobile number required";
    }
    
    if (!formData.photos.some(p => p)) {
      newErrors.photos = "At least one property photo required";
    }
    
    const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submissionData = {
      userDetails: {
        name: formData.name,
        logo: formData.logo,
        mobile: `+91${formData.mobile}`
      },
      propertyDetails: { ...formData },
      photos: formData.photos.filter(p => p)
    };

    console.log("Submission Data:", submissionData);
    alert("Form submitted successfully!");
  };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const submissionData = {
      userDetails: {
        name,
        logo,
        mobile: `+91${mobile}`
      },
      propertyDetails: formData,
      photos,
      location: {
        state: selectedState,
        district: selectedDistrict
      }
    };

    console.log("Combined Submission Data:", submissionData);
    alert("Form submitted successfully!");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center mt-10">
        POST YOUR AD
      </h1>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <h1 className="text-xl font-bold mb-2">SELECTED CATEGORY</h1>
            <div className="flex items-center">
              <div className="text-gray-500">
                Properties/For Sale: Houses & Apartments
              </div>
              <button
                type="button"
                className="ml-4 text-blue-600 font-semibold underline"
              >
                Change
              </button>
            </div>
          </div>

          <div className="-mx-6">
            <hr className="border-t border-gray-300" />
          </div>

          <div className="space-y-4 p-2 w-1/2">
            <h2 className="text-xl font-bold">INCLUDE SOME DETAILS</h2>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <div className="flex flex-wrap gap-4">
                {PROPERTY_TYPES.map((option) => (
                  <div
                    key={option}
                    onClick={() =>
                      setFormData({ ...formData, propertyType: option })
                    }
                    className={`cursor-pointer p-2 rounded-md border text-center transition-colors duration-200
                      ${formData.propertyType === option
                        ? "bg-blue-200 border-black"
                        : "bg-white border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            {/* BHK */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BHK
              </label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, "4+"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setFormData({ ...formData, bhk: opt })}
                    className={`cursor-pointer px-6 py-2 rounded-md border text-center w-max transition-colors duration-200
                      ${formData.bhk === opt
                        ? "bg-blue-200 border-black"
                        : "bg-white border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, "4+"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setFormData({ ...formData, bathrooms: opt })}
                    className={`cursor-pointer px-6 py-2 rounded-md border text-center w-max transition-colors duration-200
                      ${formData.bathrooms === opt
                        ? "bg-blue-200 border-black"
                        : "bg-white border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Furnishing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Furnishing
              </label>
              <div className="flex gap-2 flex-wrap">
                {["Furnished", "Semi-Furnished", "Unfurnished"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setFormData({ ...formData, furnishing: opt })}
                    className={`cursor-pointer px-4 py-2 rounded-md border text-center w-max transition-colors duration-200
                      ${formData.furnishing === opt
                        ? "bg-blue-200 border-black"
                        : "bg-white border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Project Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Status
              </label>
              <div className="flex gap-2 flex-wrap">
                {["New Launch", "Ready to Move", "Under Construction"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setFormData({ ...formData, projectStatus: opt })}
                    className={`cursor-pointer px-4 py-2 rounded-md border text-center w-max transition-colors duration-200
                      ${formData.projectStatus === opt
                        ? "bg-blue-200 border-black"
                        : "bg-white border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Listed by */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listed by
              </label>
              <div className="flex gap-2 flex-wrap">
                {["Builder", "Dealer", "Owner"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setFormData({ ...formData, listedBy: opt })}
                    className={`cursor-pointer px-4 py-2 rounded-md border text-center w-max transition-colors duration-200
                      ${formData.listedBy === opt
                        ? "bg-blue-200 border-black"
                        : "bg-white border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Super Builtup area */}
            <div>
              <h2 className="block text-sm font-medium text-gray-700 mb-2">Super Builtup area sqft *</h2>
              <input
                type="number"
                required
                className="w-full p-2 border rounded-md"
                value={formData.superBuiltupArea}
                onChange={(e) =>
                  setFormData({ ...formData, superBuiltupArea: e.target.value })
                }
              />
            </div>


            {/* Carpet Area */}
            <div>
              <h2 className="block text-sm font-medium text-gray-700 mb-2">Carpet Area sqft *</h2>
              <input
                type="number"
                required
                className="w-full p-2 border rounded-md"
                value={formData.carpetArea}
                onChange={(e) =>
                  setFormData({ ...formData, carpetArea: e.target.value })
                }
              />
            </div>


            {/* Maintenance */}
            <div>
              <h2 className="block text-sm font-medium text-gray-700 mb-2">Maintenance (Monthly)</h2>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.maintenance}
                onChange={(e) =>
                  setFormData({ ...formData, maintenance: e.target.value })
                }
              />
            </div>


            {/* Total Floors */}
            <div>
              <h2 className="block text-sm font-medium text-gray-700 mb-2">Total Floors</h2>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={formData.totalFloors}
                onChange={(e) =>
                  setFormData({ ...formData, totalFloors: e.target.value })
                }
              />
            </div>


            {/* Floor No */}
            <div>
              <h2 className="block text-sm font-medium text-gray-700 mb-2">Floor No</h2>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={formData.floorNo}
                onChange={(e) =>
                  setFormData({ ...formData, floorNo: e.target.value })
                }
              />
            </div>

            {/* Car Parking */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Parking
              </label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, "4+"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setFormData({ ...formData, carParking: opt })}
                    className={`cursor-pointer px-6 py-2 rounded-md border text-center w-max transition-colors duration-200
                      ${formData.carParking === opt
                        ? "bg-blue-200 border-black"
                        : "bg-white border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Facing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facing</label>
              <select
                className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.facing}
                onChange={e => setFormData({ ...formData, facing: e.target.value })}
              >
                <option value=""></option>
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South">South</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
                <option value="West">West</option>
              </select>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.projectName}
                onChange={e => {
                  const value = e.target.value;
                  if (value.length <= 70) {
                    setFormData({ ...formData, projectName: value });
                  }
                }}
                maxLength={70}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {formData.projectName.length} / 70
              </div>
            </div>


            {/* Ad Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Title
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.adTitle}
                onChange={e => {
                  const value = e.target.value;
                  if (value.length <= 70) {
                    setFormData({ ...formData, adTitle: value });
                  }
                }}
                maxLength={70}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">
                  (Mention key features, e.g. brand, model, age, type)
                </span>
                <span className="text-xs text-gray-500">
                  {formData.adTitle.length} / 70
                </span>
              </div>
            </div>


            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.description}
                onChange={e => {
                  const value = e.target.value;
                  if (value.length <= 4096) {
                    setFormData({ ...formData, description: value });
                  }
                }}
                maxLength={4096}
                rows={5}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">
                  (Include condition, features and reason for selling)
                </span>
                <span className="text-xs text-gray-500">
                  {formData.description.length} / 4096
                </span>
              </div>
            </div>
          </div>

          <div className="-mx-6">
            <hr className="border-t border-gray-300" />
          </div>

          <div className="w-1/2">
            <h1 className="text-xl font-bold mb-2">SET A PRICE</h1>
            <div className="relative">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Prices*
              </label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none pt-5">
                <span className="text-gray-500 font-semibold ">Rs.</span>
                <span className="mx-2 h-5 w-px bg-gray-300"></span>
              </div>
              <input
                type="number"
                min="0"
                required
                className="w-full pl-14 p-4 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.price}
                onChange={e => {
                  const val = e.target.value.replace(/^0+/, "");
                  if (val.length <= 12) {
                    setFormData({ ...formData, price: val });
                  }
                }}
                maxLength={12}
              />
            </div>
          </div>

          <div className="-mx-6">
            <hr className="border-t border-gray-300" />
          </div>

          <div className="w-2/3">
            <h1 className="text-xl font-bold mb-2">UPLOAD UP TO 20 PHOTOS</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mx-auto my-4 p-2 max-w-2xl">

              {photos.map((file, idx) => (
            <div
              key={idx}
              className={`relative border-2 rounded flex flex-col items-center justify-center bg-white w-full aspect-square cursor-pointer transition-all
                ${idx === 0 ? "border-black" : "border-gray-300"}
                ${file ? "overflow-hidden" : ""}
              `}
              
            >
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                {file ? (
                  <>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover rounded"
                      onClick={() => handleSetCover(idx)}
                    />
                    {photos.some(p => p) && idx === 0 && (
                      <span
                        className="block -mt-10 bg-blue-600 text-white text-xs px-3 py-1.5 rounded shadow cursor-pointer z-10"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSetCover(0); 
                if (inputRefs.current[0]) {
                  inputRefs.current[0].click(); // Open file input for first box
                }
                        }}
                      >
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleRemove(idx);
                      }}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs font-bold shadow"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto mb-1"
                      width="32"
                      height="32"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7.5A2.25 2.25 0 015.25 5.25h1.086a2.25 2.25 0 001.591-.659l.828-.828A2.25 2.25 0 0110.25 3h3.5a2.25 2.25 0 011.591.659l.828.828a2.25 2.25 0 001.591.659h1.086A2.25 2.25 0 0121 7.5v9A2.25 2.25 0 0118.75 18.75H5.25A2.25 2.25 0 013 16.5v-9z"
                      />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                    {idx === 0 && (
                      <span className="text-xs font-semibold text-gray-700">Add Photo</span>
                    )}
                  </>
                )}
                <input
                  ref={el => (inputRefs.current[idx] = el)}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={e => handleSingleImageUpload(e, idx)}
                  tabIndex={-1}
                  aria-label={`Upload photo ${idx + 1}`}
                />
              </label>
            </div>
          ))}

            </div>
          </div>



          <div className="-mx-6">
            <hr className="border-t border-gray-300" />
          </div>

          <div className="w-1/2">
              <h2 className="text-lg font-bold mb-2">Confirm Your Location</h2>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Select State:</label>
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className="w-full border-2 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Select State --</option>
                  {Object.keys(statesAndDistricts).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {selectedState && (
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Select District:</label>
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full border-2 px-3 py-2 rounded focus:outline-none focus:border-2-blue-500"
                  >
                    <option value="">-- Select District --</option>
                    {statesAndDistricts[selectedState].map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>


          <div className="-mx-6">
                                <hr className="border-2-t border-2-gray-300" />
          </div>


          <div className="w-1/2">

             <h2 className="text-xl font-bold mb-2">REVIEW YOUR DETAILS</h2>

             <div className="flex items-center gap-5 mb-4">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border-2"
                onClick={() => logoInputRef.current.click()}
              >
                {formData.logo ? (
                  <img
                    src={URL.createObjectURL(formData.logo)}
                    alt="Logo"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path d="M12 5.5v13M5.5 12h13" />
                  </svg>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={logoInputRef}
                className="hidden"
                onChange={e => handleInputChange("logo", e.target.files[0])}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
               <input
                type="text"
                className="w-full p-2 border-2 rounded"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                maxLength={30}
                required
              />
            </div>


            </div>


            <div className="mt-8 mb-4">
              <h2 className="font-bold text-lg mb-1">Let's verify your account</h2>
              <p className="text-gray-700">
                We will send you a confirmation code by sms on the next step.
              </p>
            </div>


          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Phone Number *
            </label>
            <div className="flex">
              <span className="px-3 py-2 bg-gray-100 border rounded-l">+91</span>
              <input
                type="tel"
                className="flex-1 p-2 border rounded-r"
                value={formData.mobile}
                onChange={e => handleInputChange("mobile", e.target.value.replace(/\D/g, ""))}
                maxLength={10}
                required
              />
            </div>
            {errors.mobile && <div className="text-red-500 text-sm mt-1">{errors.mobile}</div>}
          </div>

          </div>

       


          <div className="-mx-6">
            <hr className="border-2-t border-gray-300" />
          </div>



          <button
            type="button"
            className=" py-3 px-4 bg-gray-300 text-white font-medium rounded hover:bg-gray-500 transition"
          >
            Post Now
          </button>

        </form>
        </div>
    </>
  );
};

export default RealEstatePostForm;



