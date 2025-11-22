import { create } from "zustand";
import api from "../utils/api";

export const useHospitalStore = create ((set) =>({
    loading:false,
    saving:false,
    error:null,
    hospitals:[],
    hospital:null,
    
createHospital: async (hospital) => {
  try {
    set({ loading: true, error: null });

    const response = await api.post('/hospitals',hospital);

    if (response.status === 201) {  
      localStorage.setItem('hospital_id',response.data.hospital?.id||"")
      setTimeout(() => set({ loading: false }), 1000);
      set({ error: null });
      return { success: true };
    } else {
      set({ error: 'Failed to create hospital' });
      setTimeout(() => set({ loading: false }), 1000);
      return { success: false };
    }
  } catch (error) {
    console.error('creating failed:', error?.response);
    set({
      error: error.response?.data?.message || 'An error occurred during creating a hospital.',
    });
    setTimeout(() => set({ loading: false }), 1000);
    return { success: false };
  }
},

    getHospitals: async() =>{
        try{
            set({loading:true,error:null})
            const response = await api.get('/hospitals');
            if(response.status== 200)
                {
                    set({hospitals:response.data.hospitals,error:null})
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fecth hospitals"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching hospitals.",
            })
        }
    },

    patchHospital: async(id,hospital) =>{
        try{
            set({saving:true,error:null})
            const response = await api.patch(`/hospitals/${id}`,{name:hospital.name,address:hospital.address,license_number:hospital.license_number});
            if(response.status== 200)
                {
                    set({error:null})
                    setTimeout(()=>{set({saving:false}) },1000)
                    return {success:true};
                }
            else{
                setTimeout(()=>{set({saving:false}) },1000)
                set({error:"Failed to Fetch hospital"})
                return {success:false};
            }
        }
        catch(error){
            set({
                saving:false,
                error:error.response?.data?.message||"An error occured during fetching the hospital.",
            })
            return {success:false};
        }
    },

    deleteHospital: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.delete(`/hospitals/${id}`);
            if(response.status== 200)
                {
                    localStorage.setItem('hospital_id',"")
                    set({
                        
                        error:null
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                    return {success:true};
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to delete the hospital"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during deletion of the hospital.",
            })
        }
    },

    getHospital: async(id) =>{
        try{
            set({hospital:null,loading:true,error:null})
            const response = await api.get(`/hospitals/${id}`);
            if(response.status== 200)
                {
                    set({
                        hospital:response.data.hospital
                        ,error:null
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fetch the hospital"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching the hospital.",
            })
        }
    },

    verifyHospital: async(id,verified) =>{
        try{
            set({saving:true,error:null})
            const response = await api.patch(`/hospitals/verify/${id}`,{verified:verified});
            if(response.status== 200)
                {
                    set({error:null})
                    setTimeout(()=>{set({saving:false}) },1000)
                    return {success:true};
                }
            else{
                setTimeout(()=>{set({saving:false}) },1000)
                set({error:"Failed to Fetch hospital"})
                return {success:false};
            }
        }
        catch(error){
            set({
                saving:false,
                error:error.response?.data?.message||"An error occured during fetching the hospital.",
            })
            return {success:false};
        }
    },
}))