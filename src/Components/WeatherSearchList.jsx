import  React from 'react'
import data from "../current.city.list.json"

function WeatherSearchList(props) {
    const filteredData = data.filter((el) => {
        if (props.input === '') {
            return el[0];
        }
        else {
            return el[0].toLowerCase().includes(props.input.toLowerCase())
        }
    })

    const filteringData = ()=>{
        // filteredData.map((item) => (
        //     <button key={item[0] +item[1]+item[2]}>{item[0]}</button>
        // ))
        let i = 0;
        filteredData.map((item) => {
           i++;
        })
        console.log(props.input)
        if(props.input === ""){
            return(
                <h5></h5>
            )
        }

        if(i>75){
            return(
                <h5 className="search-item error">There are too many results. Try with more specific keywords. 😊 </h5>
            )
        }
        else if(i===0){
            return(
                <h5 className="search-item error">There are no results. 😞</h5>
            )
        }
        else{
            return(filteredData.map((item) => (
                 <button className="search-item"key={item[0] +item[1]+item[2]}>{item[0]}</button>
            )))
        }
    }
    return (
        <div className="search-bar-results">
            {filteringData()}
        </div>
    )
}

export default WeatherSearchList