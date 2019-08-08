// HELPER FUNCTIONS
function random(start,end) {
  start = Math.min(start,end);
  end = Math.max(start,end);
  return Math.random()*(end-start)+start;
}

function stretch(num,min,max,targetMin,targetMax){
  return (num-min)/(max-min)*(targetMax-targetMin)+targetMin;
}

function sample(array){
  let rand = Math.random();
  let randIdx = Math.floor(rand*array.length);
  return array[randIdx];
}

function mask_object(obj) {
  let newObj = {...obj};
  for (let k of Object.keys(obj)) {
    if (obj[k]===null || k==="RST") {
      continue;
    }
    else {
      if (Math.random()<0.5) {
        newObj[k] = null;
      }
    }
  }
  return newObj;
}

// HELPER CONSTANTS
const RESPIRATORY_SUPPORT_VARIABLE_TEMPLATE = {
  "AIRWAY_ASSESSMENT": "xxxx",
  "APRV_PHIGH": 10,
  "APRV_PLOW": 10,
  "APRV_PS": 10,
  "BIPAP_EPAP": 10,
  "BIPAP_IPAP": 10,
  "BIPAP_RATE": 10,
  "C_STAT": 10,
  "CPAP": 10,
  "CPAP_FLOW": 10,
  "ETCO2": 10,
  "ETT_SIZE": 10,
  "FIO2": 10,
  "FLOW_RATE": 10,
  "HE": 10,
  "HFJV_ITIME": 10,
  "HFJV_MAP": 10,
  "HFJV_MONITORED_PEEP": 10,
  "HFJV_PIP": 10,
  "HFJV_RATE": 10,
  "HFNC": 10,
  "HFOV_AMPLITUDE": 10,
  "HFOV_BIAS_FLOW": 10,
  "HFOV_FREQUENCY": 10,
  "HFOV_ITIME": "%",
  "HFOV_MODEL": 10,
  "HFOV_POWER": 10,
  "INO_DOSE": 10,
  "ITIME": 10,
  "MAP": 10,
  "MASK": "Small",
  "MODE": 10,
  "MVE": 10,
  "NAVA": 10,
  "OXYGEN_FIO2_DELIVERY_DEVICE": 10,
  "OXYGEN_LMIN_DELIVERY_DEVICE": 10,
  "OXYGEN_SOURCE": 10,
  "PEEP": 10,
  "PIP": 10,
  "PPLAT": 10,
  "PS": 10,
  "RESPIRATORY_RATE": 10,
  "RISE_TIME": 10,
  "TV": 10,
  "TV_MAND": 10,
  "TV_SPONT": 10,
  "VENT_RATE": 10,
  "RST": null,
  "RSS": null,
  };

const RST_CHOICE = ["RA","MASK","BB","NC","HFNC",
                    "CPAP","BIPAP","BVM","PSV",
                    "PCV","VCV","HFOV","HFJV"];

// SAMPLE DATA
export const DATA_MIN_X = 1508076120000;

export const DATA_MAX_X = 1509915960000;

export const RESPIRTORY_SUPPORT_VARIABLE = (function(){
  let dataPointCount = 100;
  let ret = [];
  let last = null;
  for (let i=0;i<dataPointCount;i++){
    if (last===null) {
      last = {"TIME":0,"RST":sample(RST_CHOICE),"RSS":random(0,100),"ID":i};
    }
    else {
      last = {"TIME":last["TIME"]+Math.random(),"RST":sample(RST_CHOICE),"RSS":random(0,100),"ID":i};
    }
    last = {...mask_object(RESPIRATORY_SUPPORT_VARIABLE_TEMPLATE),...last};
    ret.push(last);
  }
  let timeMin = 0;
  let timeMax = Math.max(...ret.map( ({TIME})=>TIME ));
  ret.forEach( (rec)=>{
      rec["TIME"] = stretch(rec["TIME"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
    });
  return ret;
})();

export const ECMO_VARIABLES = [];

export const INO_ADMINISTRATION = (function(){
  let dataPointCount = 3;
  let ret = [];
  let last = null;
  for (let i=0;i<dataPointCount;i++){
    if (last===null) {
      last = {"ID":i,"START":Math.random()};
      last["END"] = last["START"]+Math.random()*3;
    }
    else {
      last = {"ID":i,"START":last["END"]+Math.random()};
      last["END"] = last["START"]+Math.random()*3;
    }
    ret.push(last);
  }
  let timeMin = 0;
  let timeMax = Math.random()+Math.max(...ret.map( ({END})=>END ));
  ret.forEach( (rec)=>{
      rec["START"] = stretch(rec["START"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
      rec["END"] = stretch(rec["END"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
    });
  return ret;
})();

export const ANESTHETICS_ADMINISTRATION = (function(){
  let dataPointCount = 3;
  let ret = [];
  let last = null;
  for (let i=0;i<dataPointCount;i++){
    if (last===null) {
      last = {"ID":i,"START":Math.random()};
      last["END"] = last["START"]+Math.random()*3;
    }
    else {
      last = {"ID":i,"START":last["END"]+Math.random()};
      last["END"] = last["START"]+Math.random()*3;
    }
    ret.push(last);
  }
  let timeMin = 0;
  let timeMax = Math.random()+Math.max(...ret.map( ({END})=>END ));
  ret.forEach( (rec)=>{
      rec["START"] = stretch(rec["START"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
      rec["END"] = stretch(rec["END"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
    });
  return ret;
})();

export const LOCATION = ( function(){
  let dataPointCount = 10;
  let name = ["other","home","8s","8e"];
  let ret = [];
  let last = null;
  for (let i=0;i<dataPointCount;i++){
    if (last===null) {
      last = {'NAME':sample(name),'START':0,'END':Math.random(),'ID':i};
    }
    else {
      last = {'NAME':sample(name.filter( n=>n!==last["NAME"] )),'START':last["END"],'END':last["END"]+Math.random(),'ID':i};
    }
    ret.push(last);
  }
  let timeMin = 0;
  let timeMax = Math.max(...ret.map( (rec)=>rec["END"] ));
  ret.forEach( (rec)=>{
      rec["END"] = stretch(rec["END"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
      rec["START"] = stretch(rec["START"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
    });
  return ret;
})();


export const PROCEDURES = [
  {"id":'a',"end":1483135800000,"name":"HLHS STAGE I, CARDIAC","start":1483104300000},
  {"id":'b',"end":1483552800000,"name":"CHEST CLOSURE, CARDIAC OFF UNIT","start":1483547400000},
  {"id":'c',"end":1488291060000,"name":"GASTROSTOMY, LAPAROSCOPIC, GENSURG","start":1488287040000},
  {"id":'d',"end":1494281220000,"name":"VESICOSTOMY CREATION/CLOSURE, GU","start":1494271440000},
  {"id":'e',"end":1497321480000,"name":"BIDIRECTIONAL GLEN SHUNT, CARDIAC","start":1497298500000}
  ];
