
import React from "react";

export interface RequestBody{
  query: {
    adt: string;
    chd: string;
    cls: string;
    dirt: string;
    dt1: string;
    dt2: string;
    dt3: string;
    dt4: string;
    dt5: string;
    dt6: string;
    fr1: string;
    fr1City: string;
    fr1Country: string;
    fr2: string;
    fr2City: string;
    fr2Country: string;
    fr3: string;
    fr3City: string;
    fr4: string;
    fr4City: string;
    fr4Country: string;
    fr5: string;
    fr5City: string;
    fr5Country: string;
    fr6: string;
    fr6City: string;
    fr6Country: string;
    inf: string;
    said: string;
    segCount: string;
    to1: string;
    to1City: string;
    to1Country: string;
    to2: string;
    to2City: string;
    to2Country: string;
    to3: string;
    to3City: string;
    to3Country: string;
    to4: string;
    to4City: string;
    to4Country: string;
    to5: string;
    to5City: string;
    to5Country: string;
    to6: string;
    to6City: string;
    to6Country: string;
    typ: string;
    uid: string;
    zone: string;
  }
}

interface legs  {
  "segid": number,
  "legid": number,
  "rid": number,
  "lddt": string,
  "ldti": string,
  "ladt": string,
  "lati": string,
  "ldap": null,
  "laap": null,
  "opc": string,
  "ofn": string,
  "mkc": string,
  "mfn": string,
  "aty":string,
  "actyp": string,
  "fcl": string,
  "fdt": string,
  "fat": string,
  "fla": string,
  "ldur": string,
  "mcn": string,
  "ocn": string,
  "lff": string,
  "fct": string,
  "frmcon": string,
  "lfia": null,
  "lft": string,
  "tct": string,
  "tocon": string,
  "ltia": null,
  "lord": number,
  "item_Refs": string,
  "segment_Type": string,
  "baggage": [
      {
          "rid": number,
          "legid": number,
          "frm": string,
          "fto": string,
          "segtyp": string,
          "baggtyp": string,
          "fa": string,
          "type": null,
          "qty": number
      },
      {
          "rid": number,
          "legid": number,
          "frm": string,
          "fto": string,
          "segtyp": string,
          "baggtyp": string,
          "fa": string,
          "type": null,
          "qty": number
      }
  ],
  "bkgcode": null,
  "fbcode": null,
  "group": number,
  "participantlevel": null,
  "linkavailability": Boolean,
  "polledavailoption": null,
  "avldisplaytype": null,
  "segmentindex": number,
  "freemeal": number
}
export interface segment
  {
    "rid": number,
    "segid": number,
    "frm": string,
    "fto": string,
    "ddt": string,
    "adt": string,
    "fdu": string,
    "stp": number,
    "segdet": string,
    "refund": number,
    "bag": string,
    "legs": legs[],
    "frmcity": string,
    "ftocity": string

}
interface fares {
  "rid": number,
  "px": string,
  "bf": number,
  "tx": number,
  "tot": number,
  "bft": number,
  "cha_Pen": string,
  "can_Pen": string,
  "disc": number,
  "segsellkey": null,
  "fbcode": null,
  "fccode": null,
  "cos": null,
  "pcls": null,
  "bpt": null,
  "segref": number,
  "fareid": number,
  "lord": number,
  "bagrefno": null,
  "fallow": number,
  "qtycode": null,
  "qtyqf": null,
  "pentxqf": null,
  "pentxdesc": null,
  "penamttyp": null,
  "penamt": number,
  "pencurr": null,
  "refundable": number,
  "faretype": null,
  "bundleservice": number,
  "bundleservicecode": string
}
export interface flt{
  
    "rid": number,
    "cid": number,
    "vcn": string,
    "vc": string,
    "mc": string,
    "oc": string,
    "fdu": string,
    "bft": number,
    "cls": string,
    "sav": number,
    "nomeal": number,
    "dmt": string,
    "ft": string,
    "act": number,
    "zone": string,
    "isma": number,
    "refund": number,
    "hbo": number,
    "ff": number,
    "dtins": number,
    "atins": number,
    "dt_min": number,
    "arr_min": number,
    "fdu_min": number,
    "dt_min2": number,
    "arr_min2": number,
    "fdu_min2": number,
    "dt_min3": number,
    "arr_min3": number,
    "fdu_min3": number,
    "dt_min4": number,
    "arr_min4": number,
    "fdu_min4": number,
    "dt_min5": number,
    "arr_min5": number,
    "fdu_min5": number,
    "dt_min6": number,
    "arr_min6": number,
    "fdu_min6": number,
    "styp": string,
    "segs": segment[],
    "taxes": [
        {
            "amt": number,
            "taxCode": string,
            "tax": string,
            "fare_Type": string,
            "rid": number,
            "fareid": number
        }
    ],
    "fares": fares[],
    "carr": [
        {
            "ma": string,
            "rid": number
        }
    ],
    "item_refs": string,
    "item_refs2": null,
    "item_refs3": null,
    "item_refs4": null,
    "item_refs5": null,
    "item_refs6": null,
    "supp_id": number,
    "adt_qty": number,
    "chd_qty": number,
    "inf_qty": number,
    "adt_fare": number,
    "chd_fare": number,
    "inf_fare": number,
    "adt_fare_wmu": number,
    "chd_fare_wmu": number,
    "inf_fare_wmu": number,
    "curr": null,
    "rid_ow1": number,
    "rid_ow2": number,
    "rtdisamt": number,
    "flag": number,
    "fdu_min_tot": number
}
interface fltstops{
  
    "stops": number,
    "minfare": string,
    "flights": number,
    "sel": number

}
export interface fltal{
  
    "aln": string,
    "al": string,
    "minfare": string,
    "sel": number

}
interface airports{
  
    "iata": string,
    "apn": string,
    "sel": number

}
interface deal{
  
    "hl": string,
    "pcd": string,
    "dealtext": string

}
export interface flightdata {
  "res": [
    {
        "records": number,
        "searchid": number
    }
  ],
  "flt":flt[],
"fltStops": fltstops[],
"fltAl": fltal[],
"pxqty": [
    {
        "aqty": number,
        "cqty": number,
        "iqty": number,
        "sdt": string,
        "sdt2": null,
        "mindept": number,
        "minarr": number,
        "maxdept": number,
        "maxarr": number,
        "mindept2": number,
        "minarr2": number,
        "maxdept2": number,
        "maxarr2": number,
        "mindept3": number,
        "minarr3": number,
        "maxdept3": number,
        "maxarr3": number,
        "mindur": number,
        "maxdur": number,
        "mindur2": number,
        "maxdur2": number,
        "mindur3": number,
        "maxdur3": number,
        "conperpax": number,
        "mindept4": number,
        "minarr4": number,
        "maxdept4": number,
        "maxarr4": number,
        "mindur4": number,
        "maxdur4": number,
        "mindept5": number,
        "minarr5": number,
        "maxdept5": number,
        "maxarr5": number,
        "mindur5": number,
        "maxdur5": number,
        "mindept6": number,
        "minarr6": number,
        "maxdept6": number,
        "maxarr6": number,
        "mindur6": number,
        "maxdur6": number
    }
],
"ap": airports[],
"fltStops2": null,
"fltStops3": null,
"fltStops4": null,
"fltStops5": null,
"fltStops6": null,
"dealdesc":deal[],
"mdl": null,
"faredesc": null,
"resrt": null,
"flt2": [],
"rfltStops": [],
"rfltAl": [],
"drt": null,
"rtap": null,
"errorMain": {
    "error": Boolean,
    "errmsg": string
}
}

