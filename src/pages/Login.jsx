import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from '../store/userStore.js'

function Login() {
  const [loading, setLoading] = useState(false);
  const isloading = async ()=>{
  setLoading(true)
}
  const [error,setError]=useState('');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
 const userStore =useUserStore((state)=> state);
  const navigate = useNavigate();

      useEffect(()=>{
        userStore.getUp();
      },[]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const user=await userStore.login({email:formData.email, password:formData.password})

    if(user?.success){
      navigate("/dashboard")
    }
   else
   {
    setError(userStore.loginerror)
   }

 
  };

  if (userStore.loading) {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
<div className="text-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
<p className="mt-4 text-gray-600">Loading Applicaition...</p>
</div>
</div>
);
}

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="rounded-lg   bg-white text-card-foreground shadow-sm w-full max-w-md">
        
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="flex justify-center mb-4">
            <svg width="120" height="120" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2196F3" />
                  <stop offset="100%" stop-color="#1976D2" />
                </linearGradient>
              </defs>

              <path d="M 30 30 
                      Q 50 20 70 30 
                      Q 70 40 68 50 
                      Q 65 70 50 80 
                      Q 35 70 32 50 
                      Q 30 40 30 30" 
                    fill="none" 
                    stroke="#4CAF50" 
                    stroke-width="2"/>
              
              <rect x="35" y="45" width="30" height="8" rx="2" fill="#ff2424ff"/>
              <rect x="46" y="35" width="8" height="30" rx="2" fill="#ff2424ff"/>
              
              <circle cx="72" cy="28" r="12" fill="#4CAF50" stroke="white" stroke-width="2"/>
              <path d="M 68 28 L 71 31 L 76 25" 
                    fill="none" 
                    stroke="white" 
                    stroke-width="3" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
            </svg>
          </div>
          <div className="tracking-tight text-2xl font-bold">
            Verified Medical Aid System
          </div>
          <div className="text-sm text-muted-foreground">
           Sign in to your account to continue
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}
        </div>

        <div className="p-6 pt-0">
        <form className="space-y-4" onSubmit={handleSubmit}>
          
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2 w-0">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="peer w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password"className="block text-sm font-semibold text-gray-800 mb-2 w-0">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="peer w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black-500"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          

          
            <button
              type="submit"
              onClick={isloading}
              disabled={loading}
              className="w-full rounded-sm bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              {loading ? "Signing in..." : "Sign in"}
              
            </button>
          
        </form>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-2">Test Credentials:</p>
          <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Admin:</span><span>admin@gmail.com / Admin@123</span>
              </div>
              <div className="flex justify-between">
                <span>Other users:</span><span>You could Create Other users.</span>
              </div>
          </div>
        </div>
        </div>
      </div>


    </div>
    </>
  );
}

export default Login;
