import React, {useState} from "react";

export default function useVisualMode(initial){
  const[mode,setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition= function(goAhead,replace=false){ 
    if(replace===true){
      console.log(goAhead)
      setMode(goAhead)
      setHistory([initial])
    }
    else {
      setMode(goAhead)
      setHistory(prev => ([...prev, goAhead]))
    }
    
  }
  const back = function(){
    
    const prevHistory = [...history];
    if(prevHistory.length===1){
      setMode(initial)
    }
    //setHistory([...history.pop() only return the removed item)
    else{prevHistory.pop();
      setHistory(prevHistory)
      setMode(prevHistory[prevHistory.length-1])}
    
  }
  return{
    transition,
    back,
    mode
  }
}

