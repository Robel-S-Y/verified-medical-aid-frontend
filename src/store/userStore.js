import {create} from 'zustand';
import api from '../utils/api';
import Cookies from 'js-cookie';

const token =Cookies.get("access_token")
var x=false;
if(token){x=true}
    else{x=false}
export const useUserStore = create ((set) => ({
    isAuthenticated:x,
    error:null,
    loginerror:null,
    loading:false,
    logouterror:null,
    saving:false,
    users:[],
    user:null,
    

    
    login: async ({email,password})=>{
     
        try{            
            set({loading:true, loginerror:null, isAuthenticated:false,user:null});
            const response = await api.post('/users/login',{email,password});
             let msg=response.status
             if (msg=='200')
             {
                set({
                    user:response.data.user,
                    isAuthenticated:true,
                    loginerror:null,
                })
                setTimeout(()=>{set({loading:false}) },1000)
                Cookies.set('access_token',response.data.access_token,{expires: 1,path:'/'});
                Cookies.set('refresh_token',response.data.refresh_token,{expires: 2,path:'/'});
                localStorage.setItem('id',response.data.user.id)
                localStorage.setItem('name',response.data.user.name)
                localStorage.setItem('email',response.data.user.email)
                localStorage.setItem('role',response.data.user.role)
                localStorage.setItem('hospital_id',response.data.user.hospital?.id||"")
               return {success:true}
             }
             else{
                set({
                    loginerror:'Login failed. Please check your credentials',
                })
                setTimeout(()=>{set({loading:false}) },1000)
                return {success:false}
             }
        }
        catch(error){
         console.error("Login failed:",error?.response) 
         set({
            loginerror:error.response?.data?.message||"An error occured during login.",
            isAuthenticated:false,
            user:null
         }); 
         setTimeout(()=>{set({loading:false}) },1000) 
         return {success:false}
        }
    },
   
    
    logout: async ()=>{
        try{
        set({
        user:null,
        isAuthenticated:false,
        })
        const response = await api.post('/users/logout');
        let msg=response.status
        localStorage.clear();
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        
        if(msg =='200'){
        return {success:true}
             }
             else{
                set({
                    logouterror:'logout failed!!',
                })
                setTimeout(()=>{set({loading:false}) },1000)
                return {success:false}
             }
        }
        catch(error){
         console.error("logout failed:",error?.response) 
         set({
            logouterror:error.response?.data?.message||"An error occured during login.",
         }); 
         setTimeout(()=>{set({loading:false}) },1000) 
         return {success:false}
        }
        },

    signup: async({name,email,password,phone,role})=>{

        try{
            set({loading:true, error:null, isAuthenticated:false,user:null});
                const response = await api.post('/users',{name,email,password,phone,role});
                let msg=response.status
                if (msg == '201')
                {
                    set({
                        user:null,
                        isAuthenticated:false,
                        error:null,
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                return {success:true}
                }
                else{
                    set({
                        error:'Signup failed',
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                    return {success:false}
                }
        }
        catch(error){
            console.error("Signup failed:",error?.response) 
            set({
                error:error.response?.data?.message||"An error occured during Signup.",
                isAuthenticated:false,
                user:null
            }); 
            setTimeout(()=>{set({loading:false}) },1000) 
            return {success:false}
        }

    },

    getUser: async(id) =>{
            try{
                set({loading:true,error:null})
                const response = await api.get(`/users/${id}`);
                if(response.status== 200)
                    {
                        set({user:response.data,error:null})
                        setTimeout(()=>{set({loading:false}) },1000)
                    }
                else{
                    setTimeout(()=>{set({loading:false}) },1000)
                    set({error:"Failed to Fecth profile"})
                }
            }
            catch(error){
                set({
                    loading:false,
                    error:error.response?.data?.message||"An error occured during fetching profile.",
                })
            }
    },
  
    createUser: async({name,email,password,phone,role})=>{

        try{
            set({loading:true, error:null,user:null});
                const response = await api.post('/users',{name,email,password,phone,role});
                let msg=response.status
                if (msg == '201')
                {
                    set({
                        user:null,
                        error:null,
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                return {success:true}
                }
                else{
                    set({
                        error:'Creating user failed',
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                    return {success:false}
                }
        }
        catch(error){
            console.error("user creation failed:",error?.response) 
            set({
                error:error.response?.data?.message||"An error occured while creating the user.",
                user:null
            }); 
            setTimeout(()=>{set({loading:false}) },1000) 
            return {success:false}
        }

    },


    getUsers: async() =>{
        try{
            set({loading:true,error:null})
            const response = await api.get('/users');
            if(response.status== 200)
                {
                    set({users:response.data.users,error:null})
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fecth users"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching users.",
            })
        }
    },

    patchUser: async(id,user) =>{
        try{
            set({saving:true,error:null})
            const response = await api.patch(`/users/${id}`,user);
            if(response.status== 200)
                {
                    set({error:null})
                    setTimeout(()=>{set({saving:false}) },1000)
                    return {success:true};
                }
            else{
                setTimeout(()=>{set({saving:false}) },1000)
                set({error:"Failed to Fetch users"})
                return {success:false};
            }
        }
        catch(error){
            set({
                saving:false,
                error:error.response?.data?.message||"An error occured during fetching the user.",
            })
            return {success:false};
        }
    },

    deleteUser: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.delete(`/users/${id}`);
            if(response.status== 200)
                {
                    set({
                        
                        error:null
                    })
                    return {success:true};
                }
            else{
                setTimeout(()=>{set({loading:false}) },100)
                set({error:"Failed to delete the user"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during deletion of the user.",
            })
        }
    },

        getUp: async() =>{
        try{
            set({loading:true,error:null})
            const response = await api.get('/');
            if(response.status== 200)
                {
                    set({users:response.data.users,error:null})
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fecth users"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching users.",
            })
        }
    },
})
)