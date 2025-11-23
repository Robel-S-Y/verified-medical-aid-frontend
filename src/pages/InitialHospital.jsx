import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useHospitalStore } from "../store/hospitalStore";


function InitialHospital() {
  const [formData, setFormData] = useState({});
  const hospitalStore = useHospitalStore((state) => state);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  const hospital = await hospitalStore.createHospital(formData);

if(hospital?.success){
      navigate("/dashboard")
    }
    else{
      setError(hospitalStore.error);
    }

  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-start">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your Hospital to Proceed
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="Name"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start">
              <label
                htmlFor="license_number"
                className="block text-sm font-medium text-gray-700"
              >
                License Number
              </label>
              <input
                id="license_number"
                name="license_number"
                type="text"
                autoComplete="license_number"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="license number"
                value={formData.license_number}
                onChange={handleChange}
              />
            </div>


            <div className="flex flex-col items-start">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="address"
                autoComplete="address-level1"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

          <div className="flex flex-col items-start">
            <button
              type="submit"
              disabled={hospitalStore?.loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hospitalStore?.loading ? "Creating Hospital..." : "Create Hospital"}
            </button>
          </div></div>
        </form>
      </div>
    </div>
  );
}

export default InitialHospital;
