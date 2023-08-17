import React,{useState,useRef,useContext} from 'react'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
  
import type { GetServerSidePropsContext, NextPage } from 'next';
import fetch from "isomorphic-fetch";
import Flights from "../components/Flights";
import FilterIcons from "../components/FilterIcons";
import Backdrop from "../components/Backdrop";
import {GlobalContext} from "../context/globalState";
import FlightDetails from "../components/FlightDetails";
import type {RequestBody,flt,flightdata,fltal} from "../interfaces";
type ContextType = {
  show: Boolean,
  flightdetails:flt,
  changeShow: () => void,
  flightDetails: (details: flt) => void,
  twowayjourney: (details: { "going": flt, "coming": flt }) => void,
  return_journey:flt,
  twowaydetails:{ "going": flt, "coming": flt }
}
type Props = {
  data: flightdata,
  error: Boolean,
  from: String,
  to: String,
  date: String,
  adt: String,
  chd:String,
  return_:Boolean
}


export async function getServerSideProps(context:RequestBody) {

  
  let data:flightdata;
  var return_:Boolean = false;
  var error:Boolean = false;
   await fetch("https://api.travelxp.com/flights/searchflights",
  {
    method: 'POST',
    body: JSON.stringify(context.query),
    headers: {
      "dev": "1",
      "said": "1",
      "Accept-Encoding": "gzip, deflate, br",
    "Content-Type":"application/json"},
  }
   ).then((re) => {
     return re.json();
  }).then((r)=>{
    data = r;
    if (data.flt2.length>0) {
      return_ = true;
    }
  }).catch((err) => {
    error = true
    //console.log(err)
  })

  return {
    props: { data,error,from: context.query.fr1City, to: context.query.to1City, date: context.query.dt1, adt: context.query.adt, chd:context.query.chd,return_}, 
  }
}
const Search: NextPage<Props> =(props:Props)=> {
  //console.log(props)
  const [returnJourney, setReturnJourney] = useState(false);
  React.useEffect(() => {
    if (props.return_) {
      setReturnJourney(true)
      
    }
  }, [])
  const [current_way, setCurrentWay] = useState("going");
  const [oneway, setOneway] = useState<flt>({});
  const [returnway, setReturnWay] = useState<flt>({});
  
  const { show,changeShow,flightDetails,twowayjourney} = useContext(GlobalContext) as ContextType
  const [current_filter, setCurrentFilter] = useState("price");
  const airlines =React.useRef<HTMLParagraphElement >({});
  const stops = React.useRef<HTMLParagraphElement>({});
  const time = React.useRef<HTMLParagraphElement>({});
  const price =React.useRef<HTMLParagraphElement>({});
  const [slider_value, setSliderValue] = useState<number>(50000);
  const [max_slider_value, setMaxSlider] = useState(0);
  const [filterstate,setFilterState] = useState(false);
  const [filter_data, setFilterData] = useState({
    price:50000,
    dpt: {val1:"",val2:""},
    arv: {val1:"",val2:""},
    stops:-1,
    airlines:[],
    
  });
  const [sort_tech, setSortTech] = useState("price");
  
  const [data, setData] = useState(props.data);
  async function filterDepTime(val_time1: string, val_time2: string) {
    if (filter_data.dpt.val1 == val_time1 && filter_data.dpt.val2 == val_time2) {
      filter_data.dpt.val1 = "";
      filter_data.dpt.val2 = ""
    } else {
      filter_data.dpt.val1 = val_time1;
      filter_data.dpt.val2 = val_time2
    }
    filterData()
  }
  async function filterArrivalTime(val_time1:string, val_time2:string) {
    if (filter_data.arv.val1 == val_time1 && filter_data.arv.val2 == val_time2) {
      filter_data.arv.val1 = "";
      filter_data.arv.val2 = ""
    } else {
      filter_data.arv.val1 = val_time1;
      filter_data.arv.val2 = val_time2
    }
    filterData()
  }
  async function filterStops(stops: number) {
    if (filter_data.stops == stops) {
      filter_data.stops = -1;
    
  
}else
filter_data.stops = stops;
    filterData()

  }
  async function filterPrice() {
    filter_data.price = slider_value;
    filterData()

  }
  async function filterAirline(val: never) {
    if (filter_data.airlines.indexOf(val) != -1) {
      filter_data.airlines.splice(filter_data.airlines.indexOf(val), 1)
      
    } else {
      const airline_comp:never[] = filter_data.airlines;
      airline_comp.push(val)
      filter_data.airlines = airline_comp;
      
    }
    filterData()
  }
  function resetFilter() {
  setFilterData({  price:50000,
    dpt: {val1:"",val2:""},
    arv: {val1:"",val2:""},
    stops:-1,
    airlines: [],
  })
    setSliderValue(50000)
    if (returnJourney) {
    
     
    } else {
      setData(props.data)
    }
  
}
  function filterData() {
    
    var f_data:flt[] = [];
    if (current_way == "going") {
      f_data = props.data.flt.filter(index => parseInt(index.fares[0].tot) < slider_value);
    } else if (current_way == "coming") {
      f_data = props.data.flt2.filter((index: { fares: { tot: string; }[]; }) => parseInt(index.fares[0].tot) < slider_value);
    }
    if (filter_data.dpt.val1 != "") {
      
      f_data = f_data.filter(index => filter_data.dpt.val1.toString() < index.segs[0].ddt.toString().substr(11) && index.segs[0].ddt.toString().substr(11) < filter_data.dpt.val2.toString());
    }
    if (filter_data.arv.val1 != "") {
      f_data = f_data.filter(index => filter_data.arv.val1.toString() < index.segs[0].adt.toString().substr(11) && index.segs[0].adt.toString().substr(11) < filter_data.arv.val2.toString());
    }
    if (filter_data.stops != -1) {
      if (filter_data.stops == 0 || filter_data.stops == 1) {
        f_data = f_data.filter(index => index.segs[0].stp == filter_data.stops)
         
      } else {
        f_data = f_data.filter(index => index.segs[0].stp > 1)
   
      }
    
    }
    if (filter_data.airlines.length != 0) {
      f_data = f_data.filter(index => filter_data.airlines.indexOf(index.segs[0].legs[0].mcn.toString()) != -1)
    }
    setData({...data,flt:f_data})
  }
  function sortTech(val:string) {
    setSortTech(val);
    if (val == "price") {
      const s_data:flt[] = data.flt.sort(function (a:flt, b:flt) { return a.fares[0].tot - b.fares[0].tot})
      setData({...data,flt:s_data})
    }
    if (val == "landing") {
      const s_data:flt[] = data.flt.sort(function (a:flt, b:flt) { return a.arr_min - b.arr_min })

      setData({...data,flt:s_data})
    }
    if (val == "takeoff") {
      const s_data:flt[] = data.flt.sort(function (a:flt, b:flt) { return a.dt_min - b.dt_min })

      setData({...data,flt:s_data})
    }
    if (val == "fastest") {
      const s_data:flt[] = data.flt.sort(function (a:flt, b:flt) { return a.fdu_min - b.fdu_min })

      setData({...data,flt:s_data})
    }
  }
  function handleFlightData(val:string) {
  
    if (val == "going") {
      setCurrentWay(val);
      setData({ ...data, flt: props.data.flt })
      
    } else if (val == "coming") {
      setCurrentWay(val)
      setData({ ...data, flt: props.data.flt2 })
    
    }
    resetFilter()
  }
  function booktwoway() {
    changeShow();
    twowayjourney({ going: oneway, coming: returnway });
  }
    function selectionReturnFlights(val:flt) {
    if (current_way == "going") {
      setOneway(val)
    } else if (current_way == "coming") {
      setReturnWay(val)
    }
  
}
  return (
    
    <div className="main-search-page">
      {show && (
        <>
            <FlightDetails/>
      <Backdrop /></>)}
      <div className={`main-filter  ${filterstate?'disp':'dontdisp'}`}>
        <div className="flight-details">
          <p className="airports">{props.from}
            {returnJourney ? <img src="https://images.travelxp.com/images/txpin/vector/general/returndirection.svg" alt="return" className="arrow"></img> : <img src="https://images.travelxp.com/images/txpin/vector/general/onewaydirection.svg" alt="oneway" className="arrow"></img>} {props.to}</p>
          <div className="other-details">
            <p>
              <img src="https://images.travelxp.com/images/txpin/vector/general/calendar.svg" alt="calendar" /> <span className="item">{props.date} </span></p>
            <p><img src="https://images.travelxp.com/images/txpin/vector/general/economyclass.svg" alt="economy" /><span className="item">Economy</span> </p>
            <p><img src="https://images.travelxp.com/images/txpin/vector/general/pax.svg" alt="pax" /><span className="item"> {props.adt} Adult | { props.chd} Child </span></p>
      
          </div>
       </div>
        <div className="filter-option">
          <p className={`item ${current_filter == "price" && 'filter-option-red'}`} onClick={() => {
            price.current.scrollIntoView()
          setCurrentFilter("price")}}>PRICE</p>
          <p className={`item ${current_filter == "time" && 'filter-option-red'}`} onClick={() => {
            time.current.scrollIntoView()
          setCurrentFilter("time")}}>TIME</p>
          <p className={`item ${current_filter == "stops" && 'filter-option-red'}`} onClick={() => {
            stops.current.scrollIntoView()
          setCurrentFilter("stops")}}>STOPS</p>
          <p className={`item ${current_filter == "airlines" && 'filter-option-red'}`} onClick={() => {
            airlines.current.scrollIntoView()
          setCurrentFilter("airlines")}}>AIRLINES</p>
          <p className="closefilter">
            <img onClick={() => {
                if (filterstate) {
                  setFilterState(!filterstate)
                }
          }} src="https://images.travelxp.com/images/txpin/vector/general/closebutton.svg" className="jsx-1982818570"/>
          </p>

        </div>
     
        <div className="filter-all-opt">
        <p onClick={()=>resetFilter()} className="reset-button">RESET</p>
          <div className="slider-val" ref={price}>
          <p className="filtersecheader">PRICE</p>
        <input type="range" min="2000" max="50000" value={slider_value} className="slider"
            onChange={e => {
              setSliderValue(parseInt(e.target.value))
              
            }}
            onMouseUp={()=>filterPrice()} id="myRange"></input>
        <div className="range-value">
          <span>
            
          </span>
          <span>
            {slider_value}
          </span>
          </div>
         
          </div>
          <div>
        <div ref={time}>
          <p className="filtersecheader">DEPARTURE TIME</p>
          <div className="filterdepoptions">
          <div  onClick={()=>filterDepTime("00:00","06:00")}>
                  <FilterIcons timing="Before 6:00 AM" iconname="sun"
                    border_val={filter_data.dpt.val1 == "00:00" ? true : false} />
          </div>
          <div onClick={() => filterDepTime("06:01", "12:00")}>
                  <FilterIcons timing="6:00 AM - 12:00 PM" iconname="cloudsun"
                  border_val={filter_data.dpt.val1 == "06:01"?true:false}/>
          </div>
          <div  onClick={()=>filterDepTime("12:01","18:00")}>
                  <FilterIcons timing="12:00 PM - 6:00 PM" iconname="sun"
                  border_val={filter_data.dpt.val1 == "12:01"?true:false}/>
          </div>
          <div  onClick={()=>filterDepTime("18:01","23:59")}>
                  <FilterIcons timing="After 6:00 PM" iconname="moon"
                  border_val={filter_data.dpt.val1 == "18:01"?true:false}/>
            </div>
            </div>
        </div>
        
        <div>
          <p className="filtersecheader">ARRIVAL TIME</p>
          <div className="filterdepoptions">
          <div  onClick={()=>filterArrivalTime("00:00","06:00")}>
                  <FilterIcons timing="Before 6:00 AM" iconname="sun"
                  border_val={filter_data.arv.val1 == "00:00"?true:false}/>
          </div>
          <div onClick={() => filterArrivalTime("06:01", "12:00")}>
                  <FilterIcons timing="6:00 AM - 12:00 PM" iconname="cloudsun"
                    border_val={filter_data.arv.val1 == "06:01"?true:false}/>
          </div>
          <div  onClick={()=>filterArrivalTime("12:01","18:00")}>
                  <FilterIcons timing="12:00 PM - 6:00 PM" iconname="sun"
            border_val={filter_data.arv.val1 == "12:01"?true:false}      />
          </div>
          <div  onClick={()=>filterArrivalTime("18:01","23:59")}>
                  <FilterIcons timing="After 6:00 PM" iconname="moon"
                   border_val={filter_data.arv.val1 == "18:01"?true:false}/>
            </div>
            </div>
         
    
        </div>
        </div>
            <div ref={stops}>
          <p className="filtersecheader">STOPS</p>
          <div className="filterdepoptions">
          <div  onClick={()=>filterStops(0)}>
                <FilterIcons timing="Non Stop" iconname="nonstop"
            border_val={filter_data.stops == 0?true:false}    />
          </div>
          <div  onClick={()=>filterStops(1)}>
                <FilterIcons timing="One Stop" iconname="onestop"
             border_val={filter_data.stops == 1?true:false}    />
          </div>
          <div  onClick={()=>filterStops(2)}>
                <FilterIcons timing="Any Stop" iconname="morestop"
                 border_val={filter_data.stops == 2?true:false}/>
            </div>
            </div>
         
        </div>
          <div ref={airlines}>
            <p className="filtersecheader">AIRLINES</p>
            {props.data.fltAl != null && (
              <>
                {current_way == "going" ?
                  <>
                    {props.data.fltAl.map((item:fltal, index) => (
                      <div className="airline" key={index}>
                        <div>
                          <input type="checkbox" readOnly id={item.aln} name={item.aln} value={item.aln} checked={filter_data.airlines.indexOf(item.aln) != -1 ? true : false} className="airline-check" onClick={() => filterAirline(item.aln.toString())} />
                          <label htmlFor={item.aln}> {item.aln}</label>
                        </div>
                        <p><span style={{ fontSize: "15px", opacity: 0.5 }}>₹</span> <span className="airlines-cost">{item.minfare}</span></p>
                      </div>
                    ))
                    }
                  </> :
                   <>
                   {props.data.rfltAl.map((item:fltal, index) => (
                     <div className="airline" key={index}>
                       <div>
                         <input type="checkbox" id={item.aln} name={item.aln} value={item.aln} checked={filter_data.airlines.indexOf(item.aln) != -1 ? true : false} className="airline-check" onClick={() => filterAirline(item.aln.toString())} />
                         <label htmlFor={item.aln}> {item.aln}</label>
                       </div>
                       <p><span style={{ fontSize: "15px", opacity: 0.5 }}>₹</span> <span className="airlines-cost">{item.minfare}</span></p>
                     </div>
                   ))
                   }
                 </>}
            </>
            )}
</div>
        </div>
        </div>
      <div className={`search-listi ${!filterstate?'displaytrue':'displayfalse'} `}>
        {returnJourney && <div className="return-details">
          <div className="return-details-box">
          <div className={`item ${current_way == "going" && 'currentbox'}`} onClick={() => handleFlightData("going")}>
            <div>
            <p className="name">{props.from.toString().split("-")[0]} - {props.to.toString().split("-")[0]}</p> 
            {oneway.segs && (
              <>
              <p className="fares">{oneway.ft}</p>
              <p className="time">{oneway.segs[0].ddt.toString().substr(11)}-{oneway.segs[0].adt.toString().substr(11)}</p>
          </>
              )}
            </div>
            {oneway.mc && (
              <img src={`https://images.travelxp.com/images/txpin/vector/airlines/${oneway.mc.toString().toLowerCase()}.svg`} className="airlineimg" />
            )}
            </div>
          <div className={`item ${current_way == "coming" && 'currentbox'}`} onClick={() => handleFlightData("coming")}>
            <div>
            <p className="name" > {props.to.toString().split("-")[0]} - {props.from.toString().split("-")[0]}</p> 
            {returnway.segs && (
              <>
                <p className="fares">{returnway.ft}</p>
                <p className="time">{returnway.segs[0].ddt.toString().substr(11)}-{returnway.segs[0].adt.toString().substr(11)}</p>
                </>
              )}
            </div>
            {returnway.mc && (
              <img src={`https://images.travelxp.com/images/txpin/vector/airlines/${returnway.mc.toString().toLowerCase()}.svg`} className="airlineimg" />
            )}
          </div>
          </div>
            {(oneway.ft && returnway.ft) && (
            <a onClick={()=>booktwoway()} className="jsx-4035712791 button booknow">Book Now</a>
          )}
        </div>
        }
        <div className="sort-options">
          <p
          onClick={()=>sortTech("takeoff")}
            className={`sort-item ${sort_tech == "takeoff" && 'sort-item-selected'}`}>TAKE OFF</p>
          <p 
          onClick={()=>sortTech("landing")}
            className={`sort-item ${sort_tech == "landing" && 'sort-item-selected'}`}>LANDING</p>
          <p
          onClick={()=>sortTech("fastest")}
            className={`sort-item ${sort_tech == "fastest" && 'sort-item-selected'}`}>FASTEST</p>
          <p 
          onClick={()=>sortTech("price")}
            className={`sort-item ${sort_tech == "price" && 'sort-item-selected'}`}>PRICE</p>
        </div>
        {props.error ? <div className="error-img"><img src="https://images.travelxp.com/images/txpin/vector/general/error_filter.svg" ></img>
          <p className="error-message">Opps! No flights</p>
        </div> : <>
            {data.flt.length > 0 ?
              <>
                {data.flt.map((item, index) => {
                  if (index === data.flt.length - 1) {
                    //console.log(item.ft)
                  }
                  return (
                    <div key={index} className="search-card" onClick={() => {
                      if (!returnJourney) {
                        changeShow()
              
                        flightDetails(item)
                      } else {
                        selectionReturnFlights(item)
                      }
                    }}>
                      <Flights
                        from={item.segs[0].frm}
                        to={item.segs[0].fto}
                        fdu={item.segs[0].fdu}
                        ddt={item.segs[0].ddt}
                        adt={item.segs[0].adt}
                        stop={item.segs[0].stp}
                        amount={item.ft}
                        airline={item.mc.toString().toLowerCase()} />
                    </div>
                  )
                })}
              </> :
              <div className="error-img"><img src="https://images.travelxp.com/images/txpin/vector/general/error_filter.svg" ></img>
                <p className="error-message">Opps! No flights</p>
              </div>}</>}
        <div className="filteritem" onClick={()=>setFilterState(!filterstate)}>
          <div className="item">
          <img src="https://images.travelxp.com/images/txpin/vector/general/filtericon.svg" alt="filter"/>
            <span className="textStyle">Filter</span>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default Search;