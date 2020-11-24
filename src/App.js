  
import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Table from './Table';
import Map from './Map';
import LineGraph from './LineGraph';
import { prettyPrintStat, sortData } from "./util";
import numeral from 'numeral';
import './App.css';
import "leaflet/dist/leaflet.css";


function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data=>{
      setCountryInfo(data);
    })
  },[]);

  useEffect(()=>{
    const getCountries = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) =>response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name : country.country,
            value : country.countryInfo.iso2
          }
        ));
        const sortedData=sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountries();
  },[]);


  const onCountryChange = async(event) =>{
    const countryCode=event.target.value;
    const url = countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then(response=>response.json())
    .then(data =>{
      const location=[data.countryInfo.lat,data.countryInfo.long];
      console.log("changed",location);
      console.log(countryCode);
      setInputCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })
  }
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select
        variant="outlined"
        value={country}
        onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
{
  countries.map((country) =>(
  <MenuItem value={country.value}>{country.name}</MenuItem>
  ))
}
        </Select>
      </FormControl>
      </div>
      <div className="app__stats">
          <InfoBox 
          isRed
          active={caseType==="cases"}
          onClick={(e)=>setCaseType("cases")}
          title="Coronavirus cases" 
          cases={prettyPrintStat(countryInfo.todayCases)} 
          total={numeral(countryInfo.cases).format("0.0a")}/>
          <InfoBox
          active={caseType==="recovered"}
          onClick={(e)=>setCaseType("recovered")} 
          title="Recovered" 
          cases={prettyPrintStat(countryInfo.todayRecovered)} 
          total={numeral(countryInfo.recovered).format("0.0a")}/>
          <InfoBox 
          isRed
          active={caseType==="deaths"}
          onClick={(e)=>setCaseType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={numeral(countryInfo.deaths).format("0.0a")}/>
      </div>
      <Map 
      selectedCountry={country}
      countries={mapCountries}
      caseType={caseType}
      center={mapCenter}
      zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
        <h3>
          Live cases by Country
        </h3>
        <Table countries={tableData}/>
        <h3 className="app__graphTitle">Worldwide  new {caseType}</h3>
        <LineGraph className="app__graph" caseType={caseType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
