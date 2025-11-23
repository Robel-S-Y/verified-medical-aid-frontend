import { create } from "zustand";
import api from "../utils/api";

export const useDonationStore = create ((set) =>({
    loading:false,
    saving:false,
    error:null,
    donations:[],
    donation:null,
    
makeDonation: async (donation) => {
  try {
    set({ loading: true, error: null });
    
    const response = await api.post('/donations',{
            Patient_id:donation.id,
            isAnonymous:donation.isAnonymous,
            amount:Number(donation.amount),
        });

    if (response.status === 201) {
      setTimeout(() => set({ loading: false }), 1000);
      set({ error: null });
      return { success: true, };
    } else {
      set({ error: 'Failed to make donation' });
      setTimeout(() => set({ loading: false }), 1000);
      return { success: false };
    }
  } catch (error) {
    console.error('Making donation failed:', error?.response);
    set({
      error: error.response?.data?.message || 'An error occurred during making a donation.',
    });
    setTimeout(() => set({ loading: false }), 1000);
    return { success: false };
  }
},

getDonations: async() =>{
    try{
        set({loading:true,error:null})
        const response = await api.get('/donations');
        if(response.status== 200)
            {
                set({donations:response.data.donations,error:null})
                setTimeout(()=>{set({loading:false}) },1000)
            }
        else{
            setTimeout(()=>{set({loading:false}) },1000)
            set({error:"Failed to Fecth donations"})
        }
    }
    catch(error){
        set({
            loading:false,
            error:error.response?.data?.message||"An error occured during fetching donations.",
        })
    }
},

getDonation: async(id) =>{
    try{
        set({donation:null,loading:true,error:null})
        const response = await api.get(`/donations/${id}`);
        if(response.status== 200)
            {
                set({
                    donation:response.data.donation
                    ,error:null
                })
                setTimeout(()=>{set({loading:false}) },1000)
            }
        else{
            setTimeout(()=>{set({loading:false}) },1000)
            set({error:"Failed to Fetch the donation"})
        }
    }
    catch(error){
        set({
            loading:false,
            error:error.response?.data?.message||"An error occured during fetching the donation.",
        })
    }
},

retryDonation: async(id) =>{
    try{
        set({donation:null,loading:true,error:null})
        const response = await api.get(`/donations/retry/${id}`);
        if(response.status== 200)
            {
                set({
                    donation:response.data.donation
                    ,error:null
                })
                setTimeout(()=>{set({loading:false}) },1000)
            }
        else{
            setTimeout(()=>{set({loading:false}) },1000)
            set({error:"Failed to Fetch the donation"})
        }
    }
    catch(error){
        set({
            loading:false,
            error:error.response?.data?.message||"An error occured during fetching the donation.",
        })
    }
},

}))