import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function EditModal({ isOpen, onClose, onSubmit, formData, setFormData }) {
  const location = useLocation();
  const locationname = location.pathname.replace('/', '');
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

  const isUser = () => location.pathname === '/Users'||location.pathname ===`/Users/${formData.id}`;
  const isHospital = () => location.pathname === '/my-hospital'||location.pathname === '/hospitals';
  const isPatient = () => location.pathname === '/my-patients'||location.pathname === '/patients';
  

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-lg translate-y-0 translate-x-0 rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight capitalize">
              Edit {isUser() ? 'User' :isHospital() ? 'Hospital': locationname}
          </h2>
          <p className="text-sm text-gray-500">
            Update the {isHospital() ? 'Hospital' : `${locationname} information below`}.
          </p>
        </div>

        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}>


{/*this is user edit*/}
          {isUser() && (
            <div className="grid gap-4 py-4">     
                <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium w-fit">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium w-fit">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
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
                    <label htmlFor="role" className="text-sm font-medium w-fit">
                      Role
                    </label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    >
                      <option value="hospital">Hospital</option>
                      <option value="donor">Donor</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium w-fit">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    />
                  </div>
            </div>
          )}
{/*.................*/}

{/*this is Hospital edit*/}
          {isHospital() && (
            <div className="grid gap-4 py-4">     
                <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium w-fit">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="license_number" className="text-sm font-medium w-fit">
                  License Number
                </label>
                <input
                  id="license_number"
                  type="text"
                  required
                  value={formData.license_number}
                  onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="address" className="text-sm font-medium w-fit">Phone Number</label>
                <input
                  id="address"
                  type="text"
                  required
                  autoComplete='address-level1'
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>

            </div>
          )}
{/*.................*/}

{/*this is Patient edit*/}
          {isPatient() && (
            <div className="grid gap-4 py-4">     
                <div className="grid gap-2">
                <label htmlFor="full_name" className="text-sm font-medium w-fit">
                  Full Name
                </label>
                <input
                  id="full_name"
                  required
                  value={formData.full_name}
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
                  value={formData.age}
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
                  value={formData.diagnosis}
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
                  value={formData.treatment_cost}
                  onChange={(e) => setFormData({ ...formData, treatment_cost: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
                  <div className="grid gap-2">
                    <label htmlFor="treatment_status" className="text-sm font-medium w-fit">
                      Treatment Status
                    </label>
                    <select
                      id="treatment_status"
                      value={formData.treatment_status}
                      onChange={(e) => setFormData({ ...formData, treatment_status: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    >
                      <option value="NEED">NEED</option>
                      <option value="TREATING">TREATING</option>
                      <option value="DONE">DONE</option>
                    </select>
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

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="mt-2 sm:mt-0 rounded-md border px-4 py-2 text-sm border-gray-200 cursor-pointer hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-black cursor-pointer px-4 py-2 text-sm text-white hover:opacity-70"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
