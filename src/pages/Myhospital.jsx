import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHospitalStore } from '../store/hospitalStore';
import DeleteModal from '../components/DeleteModal';
import EditModal from "../components/EditModal";


function Myhospital() {
const id  = localStorage.getItem('hospital_id');
const navigate = useNavigate();
const [refreshTrigger, setRefreshTrigger] = useState(0);
const hospitalStore = useHospitalStore((state) => state);
const [error, setError] = useState('');
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteHospital,setDeleteHospital]=useState('');
const [isEditOpen, setIsEditOpen] = useState(false);
const [editFormData, setEditFormData] = useState();
const [showSuccess, setShowSuccess] = useState(false);
const [ShowError, setShowError] = useState(false);
const [message,setMessage]=useState('');

useEffect(() => {
if (!id) return;
hospitalStore.getHospital(id);
}, [id, refreshTrigger]);


const hospital = hospitalStore.hospital

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
return (

<div className=" bg-gray-50 m-0 ">
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

<div >
<div >
<div className="flex justify-between items-center py-6">
<Link
to="/dashboard"
className="text-gray-900 hover:text-black font-medium text-shadow-gray-500"
>
← Back to Dashboard
</Link>
<div className="flex space-x-4">    
<button 
onClick={() => {setEditFormData(hospitalStore.hospital);
    setIsEditOpen(true);}}
className=" bg-white shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen h-4 w-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg></button>

<button 
onClick={() => {setShowDeleteModal(true);setDeleteHospital(hospitalStore.hospital.name) }}
className="bg-white shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>

</div>
</div>
</div>
</div>

<div class="space-y-6 max-w-2xl">
<div>
<h1 class="text-3xl font-bold text-gray-900 w-fit">My Hospital</h1>
<p class="text-gray-600 w-fit">View your hospital information</p></div>
<div class="rounded-lg border border-gray-200 bg-white bg-card text-card-foreground shadow-sm">
<div class="flex flex-col space-y-1.5 p-6"><div class="flex items-center space-x-4">
<div class="h-16 w-16  rounded-full flex items-center justify-center">
<svg width="200" height="200" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#2196F3" />
  <stop offset="100%" stop-color="#1976D2" />
</linearGradient>
</defs>

<rect x="18" y="35" width="60" height="16" rx="3" fill="#ff2424ff"/>
<rect x="40" y="15" width="16" height="60" rx="3" fill="#ff2424ff"/>
</svg></div><div>
    
    <div class="font-semibold tracking-tight text-xl">{hospital?.name}</div>

        
    <div class="text-sm text-muted-foreground flex items-center mt-1">
      {hospital?.verified ?(  <div class="capitalize inline-flex items-center rounded-full border px-2.5 
        py-0.5 text-xm font-bold border-transparent bg-green-700 text-white">Verified</div>)
          :
        (  <div class="capitalize inline-flex items-center rounded-full border px-2.5 
        py-0.5 text-xm font-bold border-transparent bg-orange-500 text-white">Unverified</div>)}
        
        </div>
        
        </div></div></div>
        
        <div class="p-6 pt-0 space-y-6">
            <div class="space-y-4">
                
                <h3 class="text-lg font-medium w-fit">Basic Information</h3>
                
                <div class="grid gap-4">
                    
                    <div class="flex items-center p-3 bg-gray-50 rounded-md">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-user mr-3 h-5 w-5 text-gray-500">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle></svg>
                            
                            <div className="grid grid-rows-2 justify-start">
                                <p class="text-sm font-medium text-gray-600 w-fit">name</p>
                                
                                <p class="text-sm w-fit">{hospital?.name}</p></div></div>
                                
                                <div class="flex items-center p-3 bg-gray-50 rounded-md">
                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" stroke-width="2"/>
                                            <path d="M9 7H15M9 11H15M9 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                            <text x="12" y="20" text-anchor="middle" font-family="Arial" font-size="4" font-weight="bold" fill="currentColor">LICENSE</text>
                                          </svg>
                                    
                                    <div className="grid grid-rows-2 justify-start">
                                    <p class="text-sm font-medium text-gray-600 w-fit">License Number</p>
                                    
                                    <p class="text-sm w-fit">{hospital?.license_number}</p></div></div>
                                    
                                    <div class="flex items-center p-3 bg-gray-50 rounded-md">
                                    
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                                    </svg>
                                    
                                    <div className="grid grid-rows-2 justify-start"><p class="text-sm font-medium text-gray-600 w-fit">address</p>
                                    
                                    <p class="text-sm capitalize w-fit">{hospital?.address}</p></div></div>
                                    
                            
                                    </div></div></div></div>
                                            
                        <div class="rounded-lg border border-gray-200 bg-white text-card-foreground shadow-sm ">
                        <div class="flex flex-col space-y-1.5 p-6">
                            
                        <div class="text-2xl font-semibold leading-none tracking-tight w-fit">Guidelines</div>
                        
                        <div class="text-sm text-muted-foreground w-fit text-gray-500">We would like you to adhere the following guidelines.</div></div>
                        
                        <div class="p-6 pt-0">
                            
                        
                            <div class="space-y-3">                                                    
                        <div class="flex items-center text-green-600">
                            
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-shield mr-2 h-4 w-4">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 
                        1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                        <span class="text-sm">Supporting the process.</span></div>

                        <div class="flex items-center text-green-600">
                            
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-shield mr-2 h-4 w-4">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 
                        1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                        <span class="text-sm">Ensuring Credibility of the system.</span></div>

                        <div class="flex items-center text-green-600">
                            
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-shield mr-2 h-4 w-4">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 
                        1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                        <span class="text-sm">Avoid fraud and mischiveous activities.</span></div>                                                
                        </div>                                              
                        </div></div></div>


                            <DeleteModal
                              isOpen={showDeleteModal}
                              onClose={() => setShowDeleteModal(false)}
                              onConfirm={() => {
                                setShowDeleteModal(false);
                                navigate('/create/hospital')
                                hospitalStore.deleteHospital(id);
                              }}
                              postTitle={ deleteHospital || ''}
                            />

                            <EditModal
                              isOpen={isEditOpen}
                              onClose={() => setIsEditOpen(false)}
                              onSubmit={handleEdit}
                              formData={editFormData}
                              setFormData={setEditFormData}
                              setError={setError}
                            />

</div>
);
}

export default Myhospital;