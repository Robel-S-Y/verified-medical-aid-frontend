import { useState,useEffect } from "react";
import { useHospitalStore } from "../store/hospitalStore";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"


function Hospitals() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const hospitalStore = useHospitalStore((state) => state);
    const [id,setId]=useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [ShowError, setShowError] = useState(false);
    const [message,setMessage]=useState('');
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteHospital,setDeleteHospital]=useState('');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editFormData, setEditFormData] = useState();    
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


  const search=searchQuery.toLowerCase();

    useEffect(()=>{
        hospitalStore.getHospitals();
      },[refreshTrigger]);

const handleEdit = async (e) => {
e.preventDefault();
setError("");
const hospital = await hospitalStore.patchHospital(id,editFormData);
if(hospital?.success){
setIsEditOpen(false);
setRefreshTrigger(prev => prev + 1);
setMessage(`Success! edited hospital successfully`)
setShowSuccess(true)
setTimeout(() => {
setShowSuccess(false)
}, 2000);
}  else
{
setError(hospitalStore.error)
setShowError(true)
setIsEditOpen(false);
setTimeout(() => {
setShowError(false)
}, 2000);
}}

const handleDelete = async () => {
setError("");
const hospital = await hospitalStore.deleteHospital(id);
if(hospital?.success){
setShowDeleteModal(false);
setRefreshTrigger(prev => prev + 1);
setMessage(`Success! deleted hospital successfully`)
setShowSuccess(true)
setTimeout(() => {
setShowSuccess(false)
}, 2000);
}  else
{
setError(hospitalStore.error)
setShowError(true)
setShowDeleteModal(false);
setTimeout(() => {
setShowError(false)
}, 2000);
}}

const handleVerify = async () => {
setError("");
const hospital = await hospitalStore.verifyHospital(id,true);
if(hospital?.success){
setRefreshTrigger(prev => prev + 1);
setMessage(`Success! verified hospital successfully`)
setShowSuccess(true)
setTimeout(() => {
setShowSuccess(false)
}, 2000);
}  else
{
setError(hospitalStore.error)
setShowError(true)
setTimeout(() => {
setShowError(false)
}, 2000);
}}

if (hospitalStore.loading) {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
<div className="text-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
<p className="mt-4 text-gray-600">Loading hospital...</p>
</div>
</div>
);
}

const filteredHospitals = hospitalStore.hospitals.filter(hospital => {
    return (
      hospital.name.toLowerCase().includes(search) ||
      hospital.license_number.toLowerCase().includes(search) ||
      (search === "verified" && hospital.verified) ||
      (search === "unverified" && !hospital.verified)
    );
});

  return (
    
    <div className="space-y-6">

        {showSuccess && (
        <div className="fixed top-10 right-4 z-50 bg-green-100 text-green-800 px-4 py-2 rounded-md border border-gray-200 shadow-lg transition-opacity duration-300">
        {message}.
        </div>
        )}

        {ShowError && (
        <div className="fixed top-10 right-4 z-50 bg-red-100 text-red-800 px-4 py-2 rounded-md border border-gray-200 shadow-lg transition-opacity duration-300">
        {error}.
        </div>
        )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 w-fit">Hospitals</h1>
          <p className="text-gray-600 w-fit">Manage and Verify Hospitals</p>
        </div>
        <div className="flex space-x-2">

              </div></div>

                    <div className="relative">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        
      <input className="flex bg-white h-10 w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10" placeholder="Search hospitals by name, license number and by verification status" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
      </div>
              
              <div className="grid gap-4">
                  {filteredHospitals?.map((hospital) => (
                <div key={hospital.id} 
                className="rounded-lg border border-gray-200 bg-white text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="capitalize font-semibold tracking-tight text-lg flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                          <path d="M12 7V17M7 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      <span className="px-3"></span>
                      {hospital.name}</div>
                                </div>

                        {hospital.verified ?(
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-green-700 text-white hover:opacity-80">
                          Verified</div>
                          )
                          :
                           (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-orange-500 text-white hover:opacity-80">
                          Unverified</div>)}
                          </div></div>

                        <div className="p-6 pt-0"><div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center text-sm text-gray-600">
                            
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" stroke-width="2"/>
                          <path d="M9 7H15M9 11H15M9 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <text x="12" y="20" text-anchor="middle" font-family="Arial" font-size="4" font-weight="bold" fill="currentColor">LICENSE</text>
                        </svg>
                              <div>
                      <span className="px-3"></span>

                              <span className="font-medium">                              
                              License Number:</span><br/>{hospital.license_number}</div></div>

                          <div className="flex items-center text-sm text-gray-600">
                            
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                                  </svg>
                              <div>
                      <span className="px-3"></span>

                              <span className="font-medium">                              
                              Address:</span><br/>{hospital.address}</div></div>

                              </div>
                              <div className="flex justify-between">
                              <div className="mt-4 w-fit">
                                
                               {!hospital.verified &&( <button 
                                onClick={() => {
                                              setId(hospital.id);
                                              handleVerify();
                                            }}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground 
                                 hover:bg-primary/90 h-9 rounded-md px-3 bg-black text-white hover:opacity-80 cursor-pointer">Verify</button>)}
                                 </div>

                                    <div className="flex justify-end space-x-2 ">
                                    <button 
                                    onClick={() => {
                                              setEditFormData({
                                                name: hospital.name,                                                
                                                license_number:hospital.license_number,
                                                address: hospital.address
                                              });
                                              setIsEditOpen(true);
                                              setId(hospital.id)
                                            }}
                                    class=" border-gray-200 hover:bg-gray-200 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                    [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background 
                                    hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                                     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen h-4 w-4">
                                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 
                                      2 0 0 1 .506-.852z"></path></svg></button>
                                      
                                      <button 
                                      onClick={() => {setShowDeleteModal(true); setId(hospital.id);setDeleteHospital(hospital.name)}}
                                      class=" border-gray-200 hover:bg-gray-200 cursor-pointer inline-flex items-center justify-center 
                                      gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none 
                                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                                      disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border 
                                      border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                        class="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
                                  </div>
                                 </div>
                                 </div></div>
                                 ))}
                                 </div>
                                 
                            <DeleteModal
                              isOpen={showDeleteModal}
                              onClose={() => setShowDeleteModal(false)}
                              onConfirm={handleDelete}
                              postTitle={ deleteHospital || ''}
                            />

                              <Elements stripe={stripePromise}>
                              <EditModal
                              isOpen={isEditOpen}
                              onClose={() => setIsEditOpen(false)}
                              onSubmit={handleEdit}
                              formData={editFormData}
                              setFormData={setEditFormData}
                              setError={setError}
                              />
                              </Elements>

                                 </div>
                                 

  );
}


export default Hospitals;
