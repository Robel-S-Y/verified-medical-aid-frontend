import { useState,useEffect } from "react";
import { useDonationStore } from "../store/donationsStore";


function Mydonations() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const donationStore = useDonationStore((state) => state);
    const [id,setId]=useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [ShowError, setShowError] = useState(false);
    const [message,setMessage]=useState('');
    const [error, setError] = useState('');


  const search=searchQuery.toLowerCase();

    useEffect(()=>{
        donationStore.getDonations();
      },[refreshTrigger]);

const handleRetry = async () => {
setError("");
const donation = await donationStore.retryDonation(id);
if(donation?.success){
setRefreshTrigger(prev => prev + 1);
setMessage(`Success! Retrying Donation.`)
setShowSuccess(true)
setTimeout(() => {
setShowSuccess(false)
}, 2000);
}  else
{
setError(donationStore.error)
setShowError(true)
setTimeout(() => {
setShowError(false)
}, 2000);
}}


if (donationStore.loading) {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
<div className="text-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
<p className="mt-4 text-gray-600">Loading donation...</p>
</div>
</div>
);
}

const myDonations = donationStore.donations.filter(
  p => p.donor_id === localStorage.getItem('id')
);

const filteredDonations =myDonations.filter(donation => {
    return (
      donation.user.name.toLowerCase().includes(search)
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

      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 w-fit">Donations</h1>
          <p class="text-gray-600">View and retry Donations</p></div>          
            </div>

                    <div className="relative">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        
      <input className="flex bg-white h-10 w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10" placeholder="Search donations by name and by verification status" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
      </div>
              
              <div className="grid gap-4">
                  {filteredDonations?.map((donation) => (
                <div key={donation.id} 
                className="rounded-lg border border-gray-200 bg-white text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="capitalize font-semibold tracking-tight text-lg flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        className="lucide lucide-donation mr-2 h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle></svg><span className="px-2">Patient :</span>
                      {donation.patient.full_name}</div>

                      

                        <div className="text-sm text-muted-foreground flex items-center mt-2 w-fit text-gray-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                          <path d="M12 7V17M7 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <span className="px-1 font-semibold">Diagnosis:</span>
                        {donation.patient.diagnosis}</div>
                                </div>


                                                  
                        {/*payment_status */}                          
                        {donation.payment_status === "Pending" ?(
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-orange-600 text-white hover:opacity-80">
                          Pending</div>
                          )
                          :
                          (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-green-600 text-white hover:opacity-80">
                          Completed</div>)}

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
                              Donor:</span>{donation.user.name}</div></div>

                    <div className="flex items-center text-sm text-gray-600">
                            
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" stroke-width="2"/>
                          <path d="M9 7H15M9 11H15M9 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <text x="12" y="20" text-anchor="middle" font-family="Arial" font-size="4" font-weight="bold" fill="currentColor">LICENSE</text>
                        </svg>
                              <div>
                      <span className="px-3"></span>

                              <span className="font-medium">                              
                              Donation Amount:</span>{donation.amount}</div></div>


                              </div>
                              <div className="flex justify-end">
       
                                    <div className="flex justify-end space-x-2 ">

                                  { donation.payment_status === "Pending" &&(<button 
                                onClick={() => {
                                              setId(donation.id);
                                              handleRetry();
                                            }}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground 
                                 hover:bg-primary/90 h-9 rounded-md px-3 bg-black text-white hover:opacity-80 cursor-pointer">Retry</button>  )}
                                  </div>
                                 </div>
                                 </div></div>
                                 ))}
                                 </div>
                                 
                                 </div>
                                 

  );
}


export default Mydonations;
