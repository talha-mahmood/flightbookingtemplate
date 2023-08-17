import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AOS from 'aos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import 'aos/dist/aos.css';
import fetch from "isomorphic-fetch";
import Link from "next/link";
type Option = String | null

const Flights = () => {
  var months=[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const today = (new Date());
  const [loading,setLoading]= useState<Boolean>(false)
  const [current_search, setCurrentSearch] = useState<string>("oneway")
  const [adult_pass, setAdultPass] = useState(1);
  const [children_pass, setChildPass] = useState(0);
  const [search_city, setSearchCity] = useState<Array<Object>>([]);
  const [infant_pass, setInfantPass] = useState(0);
  const [departure, setDeparture] = useState<string>("");
  const [arrival, setArrival] = useState<string>("");
  const [loadingcity,setLoadingCity] = useState<Boolean>(false)
  const [value, onChange] = useState<Date>(new Date());
  const [datefor, setDateFor] = useState("oneway");
  const [current_option, setCurrentOption] = useState<string>("");
  const [tofrom, setToFrom] = useState({
    frcode: "",
    frcity: "",
    frcountry: "",
    tocode: "",
    tocity: "",
    tocountry: "",
    currentmonth: "",
    returnmonth:""
  })

  const handleSearch = (val : string) => {
    setCurrentSearch(val)
  
  }

  function interchange() {
    const v1 = tofrom.frcity;
    const v2 = tofrom.frcode;
    const v3 = tofrom.frcountry;
    tofrom.frcity = tofrom.tocity;
    tofrom.frcode = tofrom.tocode;
    tofrom.frcountry = tofrom.tocountry;
    tofrom.tocity = v1;
    tofrom.tocode = v2;
    tofrom.tocountry = v3
    setArrival(tofrom.tocode);
    setToFrom(tofrom)
   
    //console.log(tofrom)
  }
  const [current_date, setCurrentDate] = useState<Array<String>>([]);
  const [return_date, setReturnDate] = useState<Array<String>>([]);
  // useEffect(() => {
  //   const today = (new Date());
  //   //console.log(today.toString().split(" "))
  //   setCurrentDate(today.toString().split(" "))
    
  // },[])
  useEffect(() => {
    const date = value.toString().split(" ");
   
    setReturnDate(date);
    const mon = parseInt(months.indexOf(date[1])) + 1
    tofrom.returnmonth = ((mon < 10 ? '0' : '') + mon).toString();

  },[])
  useEffect(() => {
   
   
              
    if (datefor == "oneway") {
      const date = value.toString().split(" ");
   
      setCurrentDate(date);
      const mon = parseInt(months.indexOf(date[1])) + 1
      tofrom.currentmonth = ((mon < 10 ? '0' : '') + mon).toString();
  
      //console.log(months.indexOf(date[1]))
    } else {
      const date = value.toString().split(" ");
   
      setReturnDate(date);
      const mon = parseInt(months.indexOf(date[1])) + 1
      tofrom.returnmonth = ((mon < 10 ? '0' : '') + mon).toString();
  
      //console.log(months.indexOf(date[1])) 
    }
    AOS.init({
      disable: false,
     
      offset:300
    
    })
  },[value])

  const [fromState, setFormState] = useState<Option>(null);
  
  function selectCity(val: string) {
    setCurrentOption(val);
    setFormState("selectcity")
    if (search_city.length != 0) {
      setSearchCity([])
    }
  }
  function changeDate(val) {
    setDateFor(val);

    setFormState("calender");
  }
  async function searchCity(search_val: string,) {
    var letters = /^[A-Za-z]+$/;
    setLoadingCity(true)
    if (search_val.length >= 3) {
      if (!search_val.match(letters)) {
        alert('Please enter valid airport')
      }
    }
    if (search_val.length >= 3 && search_val.match(letters)) {
      const body:Object = {
        Input : search_val.toString()
      }
      await fetch("https://api.travelxp.com/flights/searchairports", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
       return res.json()
      }).then((re) => {
        //console.log(re)
        setSearchCity(re);
        setLoadingCity(false)
      })
        .catch((err) => {
        setSearchCity([])
      })
    } else if (search_city.length != 0) {
      setLoadingCity(false)
      setSearchCity([])
    } else {
      setLoadingCity(false)
    }
  }
  async function selectFinalCity(val) {
    //console.log(val)
    const sp = val.city.split(",");
    if (current_option === "departure") {
     
      setDeparture(val.iatacode);
      tofrom.frcode = val.iatacode;
      tofrom.frcity = sp[0].trim();
      tofrom.frcountry = sp[1].split("-")[0].trim()
      //console.log(tofrom)
      setFormState(null)

    } else if (current_option === "arrival") {
      setArrival(val.iatacode);
      tofrom.tocode = val.iatacode;
      tofrom.tocity = sp[0].trim();
      tofrom.tocountry = sp[1].split("-")[0].trim()
      setFormState(null)
    }
  }
  return (
    <div>
      <img className="noshow" src="https://images.travelxp.com/images/txpin/general/flighthomebannerspicejetdec.jpg?tr=w-1447,h-576,c-force"/>
      <div className="search-form">
        {fromState === null && (
          <>
        <div className="tab">
          <p className={`tab-name ${current_search == "oneway" ? "selected-tab" : null}`}
            onClick={() => handleSearch("oneway")}>ONE WAY</p>
          <p className={`tab-name ${current_search == "return" ? "selected-tab" : null}`}
          onClick={()=>handleSearch("return")}>RETURN</p>
         
        </div>
        <div className="form">
          <div className="city">
                <input type="text" className="input" placeholder="From" readOnly value={tofrom.frcode} onClick={()=>{selectCity("departure")}}/>
                <img src="https://images.travelxp.com/images/txpin/vector/general/returndirection.svg"
                  style={{ cursor: "pointer" }} onClick={()=>interchange()}/>
            <input type="text" className="input" placeholder="To" readOnly value={arrival} onClick={()=>{selectCity("arrival")}}/>
              </div>
              
                <div className="dates">
                  <div style={{marginLeft:"20px"}}>
                  <span className="departure">DEPARTURE</span>
                  {current_date.length > 0 && (
                    <div className="date-format" onClick={()=>changeDate("oneway")}>
                      <p className="date">{current_date[2]}</p>
                      <div className="month-day">
                        <p className="month">{current_date[1]},{current_date[3].substr(2)}</p>
                        <p className="day">{current_date[0]}</p>
                      </div>
                    </div>
                     )}
                </div>
                {current_search === "return" && (
                  <div style={{marginRight:"20px"}}>
                    <span className="departure">ARRIVAL</span>
                    {current_date.length > 0 && (
                      <div className="date-format arrival" onClick={()=>changeDate("return")}>
                        <p className="date">{return_date[2]}</p>
                        <div className="month-day">
                          <p className="month">{return_date[1]},{return_date[3].substr(2)}</p>
                          <p className="day">{return_date[0]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="travellers">
                <p className="departure">TRAVELLERS</p>
                <div className="pass-count">
                  <div className="passenger">
                    <FontAwesomeIcon icon={faChevronUp} size="2x" className="arrow"
                      color={adult_pass<=4?'#D9243D':'black'}
                      onClick={() => {
                        if (adult_pass < 5) {
                          setAdultPass(adult_pass + 1)
                        }
                      }} />
                    <span className="pass_no">{adult_pass}</span>
                    <FontAwesomeIcon icon={faChevronDown} size="2x" className="arrow"
                       color={adult_pass>1?'#D9243D':'black'}
                      onClick={() => {
                        if (adult_pass > 1) {
                          setAdultPass(adult_pass - 1)
                        }
                      }} />
                    <p className="pass-desc">Adult (12+ yrs)</p>
                  </div>
                  <div className="passenger">
                    <FontAwesomeIcon icon={faChevronUp} size="2x" className="arrow"
                      color={children_pass<=4?'#D9243D':'black'}
                      onClick={() => {
                        if (children_pass < 5) {
                          setChildPass(children_pass + 1)
                        }
                      }} />
                    <span className="pass_no">{children_pass}</span>
                    <FontAwesomeIcon icon={faChevronDown} size="2x" className="arrow"
                     color={children_pass>0?'#D9243D':'black'}
                     onClick={() => {
                       if (children_pass > 0) {
                         setChildPass(children_pass - 1)
                       }
                     }} />
                     <p className="pass-desc">Children (2-12 yrs)</p>
                  </div>
                  <div className="passenger">
                    <FontAwesomeIcon icon={faChevronUp} size="2x" className="arrow"
                       color={infant_pass<=4?'#D9243D':'black'}
                       onClick={() => {
                         if (infant_pass < 5) {
                           setInfantPass(infant_pass + 1)
                         }
                       }}/>
                    <span className="pass_no">{infant_pass}</span>
                    <FontAwesomeIcon icon={faChevronDown} size="2x" className="arrow"
                  color={infant_pass>0?'#D9243D':'black'}
                  onClick={() => {
                    if (infant_pass > 0) {
                      setInfantPass(infant_pass - 1)
                    }
                  }}/>
                     <p className="pass-desc">Infant (0-2 yrs)</p>
                  </div>
                </div>
              </div>
              {loading ?  <div className="search-flight lowop">
                    
<p className="loader"></p>

                 </div> : <>
                {tofrom.frcode === "" && tofrom.tocode === "" ?
              
                  <p className="search-flight lowop">
                    Search Flight
                 </p>
                  :
                  <>
                    {current_search == "oneway" ?
                      <div onClick={() => setLoading(true)} style={{ width: "90%" }}>
                        <Link href={{
                          pathname: "/search", query: {
                            adt: adult_pass.toString(),
                            chd: children_pass.toString(),
                            cls: "Economy",
                            dirt: "1",
                            dt1: `${current_date[3]}-${tofrom.currentmonth}-${current_date[2]}`,
                            dt2: "1900-01-01",
                            dt3: "1900-01-01",
                            dt4: "1900-01-01",
                            dt5: "1900-01-01",
                            dt6: "1900-01-01",
                            fr1: tofrom.frcode,
                            fr1City: tofrom.frcity,
                            fr1Country: tofrom.frcountry,
                            fr2: "",
                            fr2City: "",
                            fr2Country: "",
                            fr3: "",
                            fr3City: "",
                            fr4: "",
                            fr4City: "",
                            fr4Country: "",
                            fr5: "",
                            fr5City: "",
                            fr5Country: "",
                            fr6: "",
                            fr6City: "",
                            fr6Country: "",
                            inf: "0",
                            said: 1,
                            segCount: "1",
                            to1: tofrom.tocode,
                            to1City: tofrom.tocity,
                            to1Country: tofrom.tocountry,
                            to2: "",
                            to2City: "",
                            to2Country: "",
                            to3: "",
                            to3City: "",
                            to3Country: "",
                            to4: "",
                            to4City: "",
                            to4Country: "",
                            to5: "",
                            to5City: "",
                            to5Country: "",
                            to6: "",
                            to6City: "",
                            to6Country: "",
                            typ: "ow",
                            uid: 0,
                            zone: "Dom"
                          }
                        }}>
                          <p className="search-flight">
                            Search Flight
             </p>
                        </Link></div> :
                      <div onClick={() => setLoading(true)} style={{ width: "90%" }}>
                        <Link href={{
                          pathname: "/search", query: {
                            adt: adult_pass.toString(),
                            chd: children_pass.toString(),
                            cls: "Economy",
                            dirt: "1",
                            dt1: `${current_date[3]}-${tofrom.currentmonth}-${current_date[2]}`,
                            dt2: `${return_date[3]}-${tofrom.returnmonth}-${return_date[2]}`,
                            dt3: "1900-01-01",
                            dt4: "1900-01-01",
                            dt5: "1900-01-01",
                            dt6: "1900-01-01",
                            fr1: tofrom.frcode,
                            fr1City: tofrom.frcity,
                            fr1Country: tofrom.frcountry,
                            fr2: tofrom.tocode,
                            fr2City: tofrom.tocity,
                            fr2Country: tofrom.tocountry,
                            fr3: "",
                            fr3City: "",
                            fr4: "",
                            fr4City: "",
                            fr4Country: "",
                            fr5: "",
                            fr5City: "",
                            fr5Country: "",
                            fr6: "",
                            fr6City: "",
                            fr6Country: "",
                            inf: "0",
                            said: 1,
                            segCount: "2",
                            to1: tofrom.tocode,
                            to1City: tofrom.tocity,
                            to1Country: tofrom.tocountry,
                            to2: tofrom.frcode,
                            to2City: tofrom.frcity,
                            to2Country: tofrom.frcountry,
                            to3: "",
                            to3City: "",
                            to3Country: "",
                            to4: "",
                            to4City: "",
                            to4Country: "",
                            to5: "",
                            to5City: "",
                            to5Country: "",
                            to6: "",
                            to6City: "",
                            to6Country: "",
                            typ: "rt",
                            uid: 0,
                            zone: "Dom"
                          }
                        }}>
                          <p className="search-flight">
                            Search Flight
             </p>
                        </Link></div>}</>}</>}
        </div>
          </>
        )}
        {fromState === "calender" && (
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          
          style={{marginTop:"50px"}}>
            
             <p onClick={()=>setFormState(null)} className="header-form">Select departure date</p>
          <Calendar
              onChange={(val) => {
                //console.log(val)
                onChange(val);
                setFormState(null)
              }}
              minDate={new Date()}
              value={value}
              className="cal"
            />
            </div>
        )}
        {fromState === "selectcity" && (
          <div>
             <p style={{display:"flex",justifyContent:"flex-end",margin:"10px",cursor:"pointer"}}>
            <img onClick={() => setFormState(null)}
         src="https://images.travelxp.com/images/txpin/vector/general/closebutton.svg" className="jsx-1982818570"/>
          </p>
            
            <input
              type="text"
              placeholder="Search for airports"
              onChange={(e)=>searchCity(e.target.value.toString())}
              className="searchcity" />
            <div className="search-list">
              {loadingcity ? <div className="loader spaceup"></div> : <>
            {search_city.map((item, key) => (
                <div key={key} className="search-item" onClick={() => selectFinalCity(item)}>
                  <img src={item.imgsrc} className="search-flag" />
                  <p className="search-name">{item.city}</p>
                </div>
              ))}
              </>}
              </div>
          </div>
        )}
      </div>
      </div>
  )
}


export default Flights;