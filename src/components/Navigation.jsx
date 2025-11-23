import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";



function Navigation() {
  const location = useLocation()
  const userStore = useUserStore((state) => state);


  const userrole=userStore.user?.role || localStorage.getItem('role')

      const isAdmin=()=>{
    return userrole==='admin'
  }
      const isHospital=()=>{
    return userrole==='hospital'
  }
        const isDonor=()=>{
    return userrole==='donor'
  }
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
    
      
      <div className="flex flex-col h-full">
        
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">VMA System</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            
            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house mr-3 h-5 w-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>Dashboard</Link>

         {isHospital() &&(<>
            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/my-hospital")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/my-hospital"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-cog mr-3 h-5 w-5"><circle cx="18" cy="15" r="3"></circle><circle cx="9" cy="7" r="4"></circle><path d="M10 15H6a4 4 0 0 0-4 4v2"></path><path d="m21.7 16.4-.9-.3"></path><path d="m15.2 13.9-.9-.3"></path><path d="m16.6 18.7.3-.9"></path><path d="m19.1 12.2.3-.9"></path><path d="m19.6 18.7-.4-1"></path><path d="m16.8 12.3-.4-1"></path><path d="m14.3 16.6 1-.4"></path><path d="m20.7 13.8 1-.4"></path></svg>My Hospital</Link>
           <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/my-patients")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/my-patients"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users mr-3 h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>My Patients</Link>
           
           </>)}

                 
               {isAdmin() &&(<>
            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/hospitals")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/hospitals"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 7V17M7 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg><span className="px-1"></span> Hospitals</Link>

            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/Users")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/Users"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-cog mr-3 h-5 w-5"><circle cx="18" cy="15" r="3"></circle><circle cx="9" cy="7" r="4"></circle><path d="M10 15H6a4 4 0 0 0-4 4v2"></path><path d="m21.7 16.4-.9-.3"></path><path d="m15.2 13.9-.9-.3"></path><path d="m16.6 18.7.3-.9"></path><path d="m19.1 12.2.3-.9"></path><path d="m19.6 18.7-.4-1"></path><path d="m16.8 12.3-.4-1"></path><path d="m14.3 16.6 1-.4"></path><path d="m20.7 13.8 1-.4"></path></svg>Users</Link>
 </>)}
            {(isAdmin() || isDonor)&&(
              <><Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/patients")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users mr-3 h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>Patients</Link>
                 {isAdmin() ?( <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/donations")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`} to="/donations"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gift" viewBox="0 0 16 16">
                  <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zM1 4v2h6V4zm8 0v2h6V4zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5z"/>
                  </svg><span className="px-1"></span>Donations</Link>):(
                    <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/my-donations")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`} to="/my-donations"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gift" viewBox="0 0 16 16">
                  <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zM1 4v2h6V4zm8 0v2h6V4zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5z"/>
                  </svg><span className="px-1"></span>My Donations</Link>)}
                        
                        </>)}


            </nav>
        </div>
      
    </>
  );
}

export default Navigation;
