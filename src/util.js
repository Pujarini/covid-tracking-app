import React from 'react';
import numeral from 'numeral';
import{Circle,Popup} from "react-leaflet";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      selected:"#2b0000",
      multiplier: 500,
    },
    recovered: {
      hex: "#7dd71d",
      selected:"#2b0000",
      multiplier: 700,
    },
    deaths: {
      hex: "#fb4443",
      selected:"#2b0000",
      multiplier: 1000,
    },
  };

export  const sortData=(data)=>{

    const sortedData=[...data];
    return sortedData.sort((a,b)=> (a.cases > b.cases ? -1: 1))
}

export const prettyPrintStat =(stat)=>(
    stat ?<div style={{display:"flex" , alignItems:"center", flexWrap:"wrap"}}><ArrowUpwardIcon/><p>{numeral(stat).format("0.0a")}</p></div> : <div style={{display:"flex" , alignItems:"center", flexWrap:"wrap"}}><ArrowUpwardIcon/><p>0</p></div>
    
)

export const showDataOnMap = (data, caseType,selectedCountry) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={
        country.countryInfo.iso2 === selectedCountry
        ? casesTypeColors[caseType].selected
        :casesTypeColors[caseType].hex
      }
      fillColor={casesTypeColors[caseType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));