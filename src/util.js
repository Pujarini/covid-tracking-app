import React from 'react';
import numeral from 'numeral';
import{Circle,Popup} from "react-leaflet";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 500,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 700,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 1000,
    },
  };

export  const sortData=(data)=>{

    const sortedData=[...data];
    return sortedData.sort((a,b)=> (a.cases > b.cases ? -1: 1))
}

export const prettyPrintStat =(stat)=>(
    stat ? `+${numeral(stat).format("0.0a")}`: "+0"
)

export const showDataOnMap = (data, caseType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[caseType].hex}
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