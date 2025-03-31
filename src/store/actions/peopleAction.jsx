export {removepeople} from "../reducers/peopleSlice"

import axios from "../../utils/Axios"
import {loadpeople} from "../reducers/peopleSlice"


export const asyncloadpeople = (id)=>async (dispatch,getState)=>{
    try{
        const details =await axios.get(`/person/${id}`)
        const externalid= await axios.get(`/person/${id}/external_ids`)
        const combinedCredits= await axios.get(`/person/${id}/combined_credits`)
        const tvCredits= await axios.get(`/person/${id}/tv_credits`)
        const movieCredits= await axios.get(`/person/${id}/movie_credits`);
        let theultimatedetail = {
            details:details.data,
            externalid:externalid.data,
            combinedCredits:combinedCredits.data,
            tvCredits:tvCredits.data,
            movieCredits:movieCredits.data,
        }
        dispatch(loadpeople(theultimatedetail));
        // console.log(theultimatedetail)
    }catch(error){
        console.log("error",error)
    };
};