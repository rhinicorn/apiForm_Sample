import { useEffect, useState } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Form, Input } from 'reactstrap';
import "./ApiForm.css";


const ApiForm = (props) => {
  const [choice, setChoice]= useState("")
  const [data, setData] = useState([])

  const API_URL= "https://ghibliapi.herokuapp.com/"
  
  //callback fires when choice changes
  useEffect(()=>{
    if(choice){
      let endpoint = choice === "species"? "species" : "locations"
      fetch(API_URL + endpoint)
        .then(res=> res.json())
        .then(json=> setData(json))
    }
  }, [choice])  //when requirements array is empty, fetch the data


  const [options, setOptions] = useState([])

  //callback fires when data changes
  useEffect(()=>{
    let arrayData;
    if(choice === "terrain"){
      let filteredData = data.filter(l => l.terrain != "TODO")
      let terrainNames = filteredData.map(l => l.terrain)  
      let uniqTerrains = new Set(terrainNames)
      arrayData = Array.from(uniqTerrains)

      setOptions(Array.from(uniqTerrains))

    }else{
      arrayData= data.map(s=> s.name)
    }
    setOptions(arrayData)
  }, [data])


  const [typeSelector, setTypeSelector]=useState("")
  const [displayData, setDisplayData] = useState([])

  useEffect(() => {
    let results;
    if(choice ==="species"){
      //species data
      results = data.filter(s => s.name == typeSelector)
    }else{
      //terrain data
      results = data.filter(l => l.terrain == typeSelector)
    }
    
    console.log(results)
    setDisplayData(results)
  }, [typeSelector])

  return (
    <>
    <form>
      <label htmlFor="query">Pick an API query:</label>
      <select onChange={(e) => { setChoice(e.target.value) }} name="query" id="query">
        <option value="" selected disabled hidden></option>
        <option value="species">Species</option>
        <option value="terrain">Terrain</option>
      </select>
      <br />

      {choice &&
        <div>
          <label htmlFor={choice}>{choice}:</label>
            <select name={choice} id={choice}>
              <option value="" selected disabled hidden></option>
              {options?.map((o)=> {
                return (
                  <option value= {o}>{o}</option>
                )
              })}
            </select>
        </div>
      }
    </form>
    <ul>
      {displayData?.map((elm) => {
        return(
          <li>{elm.name}</li>
        )
      })}
    </ul>
    </>
  );
}

export default ApiForm;


              
