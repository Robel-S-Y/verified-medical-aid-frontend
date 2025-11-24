import { useState,useEffect } from "react";
import { usePatientStore } from "../store/patientsStore";
import { useDonationStore } from "../store/donationsStore";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import AddModal from "../components/AddModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";




function Patients() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const patientStore = usePatientStore((state) => state);
    const donationStore = useDonationStore((state) => state);
    const [id,setId]=useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [ShowError, setShowError] = useState(false);
    const [message,setMessage]=useState('');
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePatient,setDeletePatient]=useState('');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const [VerifyData, setVerifyData] = useState();
    const userrole= localStorage.getItem('role')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    

    
  
   const isAdmin=()=>{
      return userrole==='admin'
    }


  const search=searchQuery.toLowerCase();

    useEffect(()=>{
        patientStore.getPatients();
      },[refreshTrigger]);

const handleEdit = async (e) => {
e.preventDefault();
setError("");
const patient = await patientStore.patchPatient(id,editFormData);
if(patient?.success){
setIsEditOpen(false);
setRefreshTrigger(prev => prev + 1);
setMessage(`Success! edited patient successfully`)
setShowSuccess(true)
setTimeout(() => {
setShowSuccess(false)
}, 2000);
}  else
{
setError(patientStore.error)
setShowError(true)
setIsEditOpen(false);
setTimeout(() => {
setShowError(false)
}, 2000);
}}

const handleDelete = async () => {
setError("");
const patient = await patientStore.deletePatient(id);
if(patient?.success){
setShowDeleteModal(false);
setRefreshTrigger(prev => prev + 1);
setMessage(`Success! deleted patient successfully`)
setShowSuccess(true)
setTimeout(() => {
setShowSuccess(false)
}, 2000);
}  else
{
setError(patientStore.error)
setShowError(true)
setShowDeleteModal(false);
setTimeout(() => {
setShowError(false)
}, 2000);
}}
const handleVerify = async () => {
setError("");
const patient = await patientStore.verifyPatient(id,VerifyData);
if(patient?.success){
setRefreshTrigger(prev => prev + 1);
setMessage(`Success! verified hospital successfully`)
setShowSuccess(true)
setTimeout(() => {
setShowSuccess(false)
}, 2000);
}  else
{
setError(patientStore.error)
setShowError(true)
setTimeout(() => {
setShowError(false)
}, 2000);
}}

const handleMakeDonation = async (stripe, e, card) => {
  e.preventDefault();
  setError("");

  try {
    const donation = await donationStore.makeDonation({
      id: id,
      isAnonymous: formData.isAnonymous,
      amount: formData.amount
    });

    if (!donation?.success) {
      setError(donationStore.error);
      setIsAddModalOpen(false);
      return;
    }
    const paymentResult = await donationStore.makePayment(stripe,donation.clientSecret, card);

    if (paymentResult.success) {
      setIsAddModalOpen(false);
      setRefreshTrigger(prev => prev + 1);
      setShowSuccess(true);
      setMessage(`Success! Donation made and payment succeeded.`);
      setTimeout(() => setShowSuccess(false), 20000);
    } else {
      setError(donationStore.error || "Payment failed");
      setIsAddModalOpen(false);
      setTimeout(() => setShowError(true), 200);
      setTimeout(() => setShowError(false), 2200);
    }
  } catch (err) {
    console.error(err);
    setError("An unexpected error occurred");
    setIsAddModalOpen(false);
    setTimeout(() => setShowError(true), 200);
    setTimeout(() => setShowError(false), 2200);
  }
};



if (patientStore.loading) {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
<div className="text-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
<p className="mt-4 text-gray-600">Loading patient...</p>
</div>
</div>
);
}

const filteredPatients =patientStore.patients.filter(patient => {
    return (
      patient.full_name.toLowerCase().includes(search) ||
      (search === "verified" && patient.verified) ||
      (search === "unverified" && !patient.verified)
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
          <h1 className="text-3xl font-bold text-gray-900 w-fit">Patients</h1>
          {isAdmin()?(
          <p className="text-gray-600 w-fit">Verify Patients</p>):
          (
            <p className="text-gray-600 w-fit">View Patients</p>
          )}
        </div>
        <div className="flex space-x-2">

              </div></div>

                    <div className="relative">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        
      <input className="flex bg-white h-10 w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10" placeholder="Search patients by name, license number and by verification status" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
      </div>
              
              <div className="grid gap-4">
                  {filteredPatients?.map((patient) => (
                <div key={patient.id} 
                className="rounded-lg border border-gray-200 bg-white text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="capitalize font-semibold tracking-tight text-lg flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        className="lucide lucide-user mr-2 h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle></svg>
                      {patient.full_name}</div>

                        <div className="text-sm text-muted-foreground flex items-center mt-2 w-fit text-gray-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                          <path d="M12 7V17M7 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      <span className="px-1"></span>
                        <span className="mr-1 font-semibold">Diagnosis:</span>
                        {patient.diagnosis}</div>
                                </div>

                      {/*treatment_status */}
                        {patient.treatment_status ==="NEED" ?(
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-orange-600 text-white hover:opacity-80">
                          NEED</div>
                          )
                          :
                          patient.treatment_status ==="TREATING" ?
                          (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-blue-600-500 text-white hover:opacity-80">
                          TREATING</div>):
                          (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-green-700 text-white hover:opacity-80">
                          DONE</div>)}
                                                  
                        {/*verification_status */}                          
                        {patient.verification_status ==="pending" ?(
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-blue-600 text-white hover:opacity-80">
                          pending</div>
                          )
                          :
                          patient.verification_status ==="verified" ?
                          (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-green-700 text-white hover:opacity-80">
                          verified</div>):
                          (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-red-700 text-white hover:opacity-80">
                          rejected</div>)}

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
                              Age:</span>{patient.age}</div></div>

                    <div className="flex items-center text-sm text-gray-600">
                            
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" stroke-width="2"/>
                          <path d="M9 7H15M9 11H15M9 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <text x="12" y="20" text-anchor="middle" font-family="Arial" font-size="4" font-weight="bold" fill="currentColor">LICENSE</text>
                        </svg>
                              <div>
                      <span className="px-3"></span>

                              <span className="font-medium">                              
                              Treatment Cost:</span>{patient.treatment_cost}</div></div>


                    <div className="flex items-center text-sm text-gray-600">
                            
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" stroke-width="2"/>
                          <path d="M9 7H15M9 11H15M9 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <text x="12" y="20" text-anchor="middle" font-family="Arial" font-size="4" font-weight="bold" fill="currentColor">LICENSE</text>
                        </svg>
                              <div>
                      <span className="px-3"></span>

                              <span className="font-medium">                              
                              paid amount:</span>{patient.paid_amount}</div></div>

                              </div>
                              <div className="flex justify-between">
                            <div className="mt-4 w-fit">
                                
                              <a href={patient.document_url}><button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground 
                                 hover:bg-primary/90 h-9 rounded-md px-3 bg-black text-white hover:opacity-80 cursor-pointer">Patient Document</button></a> 
                                 </div>


                                    <div className="flex justify-end space-x-2 ">
                           { isAdmin() ? (
                            <>           
                               {patient.verification_status==='pending' &&( <button 
                                onClick={() => {
                                              setId(patient.id);
                                              setVerifyData('verified');
                                              handleVerify();
                                            }}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground 
                                 hover:bg-primary/90 h-9 rounded-md px-3 bg-black text-white hover:opacity-80 cursor-pointer">Verify</button>)}

                                {patient.verification_status==='pending' &&( <button 
                                onClick={() => {
                                              setId(patient.id);
                                              setVerifyData('rejected');
                                              handleVerify();
                                            }}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground 
                                 hover:bg-primary/90 h-9 rounded-md px-3 bg-black text-white hover:opacity-80 cursor-pointer">Reject</button>)}
                                 
                                    <button 
                                    onClick={() => {
                                              setEditFormData({
                                                full_name:patient.full_name,
                                                age:patient.age,
                                                diagnosis:patient.diagnosis,
                                                treatment_cost:patient.treatment_cost,
                                                treatment_status:patient.treatment_status,
                                                document_url:patient.document_url,
                                              });
                                              setIsEditOpen(true);
                                              setId(patient.id)
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
                                      onClick={() => {setShowDeleteModal(true); setId(patient.id);setDeletePatient(patient.full_name)}}
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
                                  </>):(
                                     <button 
                                       onClick={() => {setIsAddModalOpen(true); setId(patient.id);}}
                                      className="bg-black text-white inline-flex items-center 
                                      justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium 
                                      ring-offset-background transition-colors hover:opacity-80 hover:cursor-pointer 
                                      [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary 
                                      text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gift" viewBox="0 0 16 16">
                                        <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zM1 4v2h6V4zm8 0v2h6V4zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5z"/>
                                        </svg>
                                        
                                        Make Donations</button>   
                                  )}</div>
                                 </div>
                                 </div></div>
                                 ))}
                                 </div>
                                 
                            <DeleteModal
                              isOpen={showDeleteModal}
                              onClose={() => setShowDeleteModal(false)}
                              onConfirm={handleDelete}
                              postTitle={ deletePatient || ''}
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
                            <Elements stripe={stripePromise}>
                              <AddModal
                                    isOpen={isAddModalOpen}
                                    onClose={() => setIsAddModalOpen(false)}
                                    onSubmit={handleMakeDonation}
                                    formData={formData}
                                    setFormData={setFormData}
                                    setError={setError}
                                  />
                            </Elements>
  

                                 </div>
                                 

  );
}


export default Patients;
