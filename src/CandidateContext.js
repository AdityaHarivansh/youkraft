
import React,{useState,createContext} from 'react'

export const CandidateContext=createContext()

export const CandidateProvider=(props)=>{
    const [candidateList,setCandidateList]=useState([])
    const [isModalVisible,setIsModalVisible]=useState(false)
    return(
        <CandidateContext.Provider value={{candidateList,setCandidateList,isModalVisible,setIsModalVisible}}>
            {props.children}
        </CandidateContext.Provider>
    )
}