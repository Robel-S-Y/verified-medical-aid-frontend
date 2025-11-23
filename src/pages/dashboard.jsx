import { useEffect } from "react";
import { usePatientStore } from "../store/patientsStore";
import { useHospitalStore } from "../store/hospitalStore";
import { useDonationStore } from "../store/donationsStore";

function Dashboard() {
  

const userrole= localStorage.getItem('role');
const patientStore = usePatientStore((state) => state);
const hospitalStore = useHospitalStore((state) => state);
const donationsStore =useDonationStore((state)=>(state));

  const isAdmin=()=>{
    return userrole==='admin'
  }

   const isHospital=()=>{
    return userrole==='hospital'
  }

    const isDonor=()=>{
    return userrole==='donor'
  }

   
useEffect(()=>{
hospitalStore.getHospitals();
},[]);

useEffect(()=>{
patientStore.getPatients();
},[]);

useEffect(()=>{
donationsStore.getDonations();
},[]);


const treatedPatients = patientStore.patients.filter(
  p => p.treatment_status === 'DONE'
);
const verifiedPatients = patientStore.patients.filter(
  p => p.verification_status === 'verified'
);
const verifiedHospitals = hospitalStore.hospitals.filter(
  h => h.verified
);
const paidDonations = donationsStore.donations.filter(
  d => d.payment_status === 'Completed'
);
const recentDonations = paidDonations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);


  return (
    <div className="space-y-6">
      
      { isAdmin() &&(
      <div className="grid grid-rows-2 gap-2">
      {/*if admin */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
             <div className="inline-flex items-center rounded-full bg-red-500 text-white px-3 py-1 text-xs font-semibold hover:opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 mr-1"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          </svg>
          ADMINISTRATOR
        </div>
          </div>
          <p className="text-gray-600 w-fit">Full system access - Manage all Admin level operations</p>
        </div>
      </div>
      
          <div className="rounded-lg border  shadow-sm border-red-200 bg-red-50">
            <div className="p-6 pt-6"><div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield h-8 w-8 text-red-600"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
              <div>
                <h3 className="font-semibold text-red-900 w-fit">Administrator Access</h3>
                <p className="text-sm text-red-700 w-fit text-left">You have full system privileges including delete operations, user management and verification Process.</p></div>
                </div>
                </div>
                </div>
                {/* */}
              </div>)}
              {isDonor() && (
                
                <div className="grid grid-rows-2 gap-2">
                  <div class="flex items-center justify-between"><div>
                    <div class="flex items-center space-x-3">
                      <h1 class="text-3xl font-bold text-gray-900">Donor</h1>
                      <div class="bg-black text-white inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-3 h-3 mr-1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>DONOR
                      </div></div>
                  <p class="text-gray-600">Donor - Your contributtion is saving countless lifes, keep up the support!</p></div></div>

                  <div class="rounded-lg border text-card-foreground shadow-sm border-green-200 bg-green-50">
                    <div class="p-6 pt-6">
                      <div class="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-8 w-8 text-green-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <div>
                          <h3 class="font-semibold text-green-900 w-fit">Donor Access</h3>
                          <p class="text-sm text-green-700">"We make a living by what we get, but we make a life by what we give." <b>Winston Churchill</b></p>
                          </div></div></div></div>

                </div>)}

                {isHospital() && (
                
                <div className="grid grid-rows-2 gap-2">
                  <div class="flex items-center justify-between"><div>
                    <div class="flex items-center space-x-3">
                      <h1 class="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
                      <div class="bg-black text-white inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-3 h-3 mr-1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>HOSPITAL
                      </div></div>
                  <p class="text-gray-600">Standard Hospitlal operations - Mange own hospital and patients and their treatment status.</p></div></div>

                  <div class="rounded-lg border text-card-foreground shadow-sm border-blue-400 bg-blue-100">
                    <div class="p-6 pt-6">
                      <div class="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-8 w-8 text-green-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <div>
                          <h3 class="font-semibold text-green-900 w-fit">Hospital Access</h3>
                          <p class="text-sm text-green-700">You can manage your hospital and patients, handle treatment operations and status, and view reports. Contact admin for advanced operations.</p>
                          </div></div></div></div>

                </div>)}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="rounded-lg  bg-white  shadow-sm border-gray-200 border">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2 ">
                      <div className="tracking-tight  text-sm font-medium">Total patients</div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold w-fit">{verifiedPatients.length}</div>
                        <p className="text-xs text-gray-700 w-fit">All registered and verified patients.</p>
                        </div>
                        </div>
                  <div className="rounded-lg  bg-white  shadow-sm border-gray-200 border">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2 ">
                      <div className="tracking-tight  text-sm font-medium">Total Hospitals</div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold w-fit">{verifiedHospitals.length}</div>
                        <p className="text-xs text-gray-700 w-fit">All registered and verified Hospitals.</p>
                        </div>
                        </div>
                            <div className="rounded-lg border-gray-200 border bg-white  shadow-sm">
                              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="tracking-tight text-sm font-medium">Donations</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-right h-4 w-4 text-muted-foreground"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
                              </div>
                              <div className="p-6 pt-0">
                                <div className="text-2xl font-bold w-fit">{paidDonations.length}</div>
                              </div></div>
                              <div className="rounded-lg border-gray-200 border bg-white  shadow-sm">
                                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                  <div className="tracking-tight text-sm font-medium">Treated patiens</div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-triangle-alert h-4 w-4 text-red-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                                </div>
                                  <div className="p-6 pt-0">
                                    <div className="text-2xl font-bold text-red-600 w-fit">{treatedPatients.length}</div>
                                  </div>
                              </div>
                </div>

                                      <div className="rounded-lg border border-gray-200 bg-white  shadow-sm">
                                        <div className="flex flex-col space-y-1.5 p-6">
                                          <div className="text-2xl font-semibold leading-none tracking-tight w-fit">Recent Donations</div>
                                          <div className="text-sm text-muted-foreground w-fit">Recently Completed Donations</div>
                                          </div>
                                          <div className="p-6 pt-0">
                                          
                                            <div className="space-y-4">
                                              {recentDonations?.map((recent) => (
                                            <div className="flex items-center space-x-4 p-3 bg-gray-100  rounded-lg">
                                              <div className="p-2 rounded-full bg-green-100 text-green-600">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-right h-4 w-4"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
                                            </div>
                                            <div className="flex-1">
                                            <p className="text-sm font-medium  w-fit">Date: {recent.created_at}</p>
                                            <p className="text-xs text-gray-500  w-fit">By: {recent.user.name}</p>
                                            </div>
                                            </div>
                                                 )
                                                 )}
                                            </div>

                                          </div>
                                      </div>
      </div>
  );

}

export default Dashboard;
