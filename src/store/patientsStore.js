import { create } from "zustand";
import api from "../utils/api";

export const usePatientStore = create ((set) =>({
    loading:false,
    saving:false,
    error:null,
    patients:[],
    patient:null,
    
createPatient: async (patient) => {
  try {
    set({ loading: true, error: null });

    const response = await api.post('/patients',{
            full_name:patient.full_name,
            age:patient.age,
            diagnosis:patient.diagnosis,
            treatment_cost:patient.treatment_cost,
            document_url:patient.document_url,
        });

    if (response.status === 201) {
      setTimeout(() => set({ loading: false }), 1000);
      set({ error: null });
      return { success: true };
    } else {
      set({ error: 'Failed to create patient' });
      setTimeout(() => set({ loading: false }), 1000);
      return { success: false };
    }
  } catch (error) {
    console.error('creating failed:', error?.response);
    set({
      error: error.response?.data?.message || 'An error occurred during creating a patient.',
    });
    setTimeout(() => set({ loading: false }), 1000);
    return { success: false };
  }
},

getPatients: async() =>{
    try{
        set({loading:true,error:null})
        const response = await api.get('/patients');
        if(response.status== 200)
            {
                set({patients:response.data.patients,error:null})
                setTimeout(()=>{set({loading:false}) },1000)
            }
        else{
            setTimeout(()=>{set({loading:false}) },1000)
            set({error:"Failed to Fecth patients"})
        }
    }
    catch(error){
        set({
            loading:false,
            error:error.response?.data?.message||"An error occured during fetching patients.",
        })
    }
},

patchPatient: async(id,patient) =>{
    try{
        set({saving:true,error:null})
        const response = await api.patch(`/patients/${id}`,{
            full_name:patient.full_name,
            age:patient.age,
            diagnosis:patient.diagnosis,
            treatment_cost:patient.treatment_cost,
            treatment_status:patient.treatment_status,
            document_url:patient.document_url,
        });
        if(response.status== 200)
            {
                set({error:null})
                setTimeout(()=>{set({saving:false}) },1000)
                return {success:true};
            }
        else{
            setTimeout(()=>{set({saving:false}) },1000)
            set({error:"Failed to Fetch patient"})
            return {success:false};
        }
    }
    catch(error){
        set({
            saving:false,
            error:error.response?.data?.message||"An error occured during fetching the patient.",
        })
        return {success:false};
    }
},

deletePatient: async(id) =>{
    try{
        set({loading:true,error:null})
        const response = await api.delete(`/patients/${id}`);
        if(response.status== 200)
            {
                set({
                    
                    error:null
                })
                setTimeout(()=>{set({loading:false}) },1000)
                return {success:true};
            }
        else{
            setTimeout(()=>{set({loading:false}) },1000)
            set({error:"Failed to delete the patient"})
        }
    }
    catch(error){
        set({
            loading:false,
            error:error.response?.data?.message||"An error occured during deletion of the patient.",
        })
    }
},

getPatient: async(id) =>{
    try{
        set({patient:null,loading:true,error:null})
        const response = await api.get(`/patients/${id}`);
        if(response.status== 200)
            {
                set({
                    patient:response.data.patient
                    ,error:null
                })
                setTimeout(()=>{set({loading:false}) },1000)
            }
        else{
            setTimeout(()=>{set({loading:false}) },1000)
            set({error:"Failed to Fetch the patient"})
        }
    }
    catch(error){
        set({
            loading:false,
            error:error.response?.data?.message||"An error occured during fetching the patient.",
        })
    }
},

verifyPatient: async(id,verified) =>{
    try{
        set({saving:true,error:null})
        const response = await api.patch(`/patients/verify/${id}`,{verification_status:verified});
        if(response.status== 200)
            {
                set({error:null})
                setTimeout(()=>{set({saving:false}) },1000)
                return {success:true};
            }
        else{
            setTimeout(()=>{set({saving:false}) },1000)
            set({error:"Failed to Fetch patient"})
            return {success:false};
        }
    }
    catch(error){
        set({
            saving:false,
            error:error.response?.data?.message||"An error occured during fetching the patient.",
        })
        return {success:false};
    }
},
}))