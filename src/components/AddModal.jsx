import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';


export default function AddModal({ isOpen, onClose, onSubmit, formData, setFormData }) {
  const location = useLocation();
  const locationname = location.pathname.replace("/", "").toLowerCase();
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [uploading, setUploading] = useState(false);
  
  async function handleUploadFile() {
    if (!selectedFile) return;
    setUploading(true);
  
    try {
      const token = Cookies.get("access_token");
  
      const formDataObj = new FormData();
      formDataObj.append("file", selectedFile);
  
      const res = await fetch("https://verified-medical-aid.onrender.com/api/patients/upload-document", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }
  
      setFormData((prev) => ({
        ...prev,
        document_url: 'https://verified-medical-aid.onrender.com/api'+data.document_url,
      }));
  
      setSelectedFile(null);
      setMessage("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  }
  

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;


  const isUser = locationname === "users";
  const isPatients = locationname === "my-patients";
  const ismakeDonation = locationname === "patients";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]"
        role="dialog"
        aria-modal="true"
      >

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-lg font-semibold capitalize">
            Add New {isUser ? "User" : "patients"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter the {isPatients ? "patients" : `${locationname} information`} below.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >

{/*******USERS********/}
          {isUser && (
            <div className="grid gap-4 py-4">
          
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium w-fit">Name</label>
                  <input
                    id="name"
                    required
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                  />
                </div>
  
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium w-fit">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>


                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-medium w-fit">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                  />
                </div>

                  <div className="grid gap-2">
                    <label htmlFor="role" className="text-sm font-medium w-fit">Role</label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    >
                      <option>.......select option.......</option>
                      <option value="donor">Donor</option>
                      <option value="hospital">Hospital</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium w-fit">Password</label>
                    <input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium w-fit">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    />
                  </div>

            </div>
          )}
{/*************************************************** */}          

{/*this is Patient add*/}
          {isPatients && (
            <div className="grid gap-4 py-4">     
                <div className="grid gap-2">
                <label htmlFor="full_name" className="text-sm font-medium w-fit">
                  Full Name
                </label>
                <input
                  id="full_name"
                  required
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="age" className="text-sm font-medium w-fit">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  required
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="diagnosis" className="text-sm font-medium w-fit">
                  Diagnosis
                </label>
                <input
                  id="diagnosis"
                  type="text"
                  required
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="treatment_cost" className="text-sm font-medium w-fit">Treatment Cost</label>
                <input
                  id="treatment_cost"
                  type="number"
                  required
                  onChange={(e) => setFormData({ ...formData, treatment_cost: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
               
                <div className="grid gap-2">
                  <label className="text-sm font-medium w-fit">{message}</label>
                  <label className="text-sm font-medium w-fit">Medical Document (PDF)</label>

                  <input
                    type="text"
                    readOnly
                    value={formData.document_url || "No document uploaded"}
                    className="h-10 w-full rounded-md border px-3 py-2 text-sm bg-gray-100 border-gray-200"
                  />

                  {!selectedFile ? (
                        <>
                        <label
                            htmlFor="pdfUpload"
                            className="inline-flex items-center px-3 py-2 rounded-md bg-gray-200 text-sm font-medium cursor-pointer hover:bg-gray-300 w-fit"
                          >
                            Choose PDF
                          </label>

                          <input
                            id="pdfUpload"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className="hidden"
                          />

                          {selectedFile && (
                            <p className="text-sm text-gray-600 mt-2">
                              Selected: <span className="font-medium">{selectedFile.name}</span>
                            </p>
                          )}
                            </>
                  ) : (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleUploadFile}
                        disabled={uploading}
                        className="px-3 py-2 rounded-md bg-black cursor-pointer text-sm text-white hover:opacity-70"
                      >
                        {uploading ? "Uploading..." : "Upload"}
                      </button>

                      <button
                        onClick={() => setSelectedFile(null)}
                        className="px-3 py-2 rounded-md bg-gray-300 text-sm hover:bg-gray-400 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

            </div>
          )}
{/*.................*/}

{/*******Make Donation********/}
          {ismakeDonation && (
            <div className="grid gap-4 py-4">
            
              <div className="grid gap-2">
                <label htmlFor="amount" className="text-sm font-medium w-fit">Amount</label>
                <input
                  id="amount"
                  type="number"
                  required
                  placeholder="Enter amount to donate"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>

              <div className="grid gap-2">
              <label htmlFor="isAnonymous" className="text-sm font-medium w-fit">
              Anonymous
              </label>
              <input
              id="isAnonymous"
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
              className="h-5 w-5 rounded border-gray-200"
              />
              </div>


            </div>
          )}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="mt-2 sm:mt-0 rounded-md border px-4 py-2 text-sm border-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-80"
            >
              {isUser ? "Create User" : isPatients ? "Create Patient": "Donate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
