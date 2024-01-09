import React, { useEffect, useState } from "react";
import FlowsheetTimeSlot from "./flowsheetTimeSlot";

const FilterVitals = (props) => {
  const { date, vitals } = props;
  const [ currentVitals, setCurrentVitals ] = useState({})
  
  useEffect(() => {
    filteredVitals();
  }, [date, vitals])

  const filteredVitals = () => {
    const dateVitals = vitals.filter((vital) => {
      const serviceTimeInMilli = Date.parse(vital.service_time);
      const setDateInMilli = Date.parse(date);
      return (
        serviceTimeInMilli >= setDateInMilli && serviceTimeInMilli < setDateInMilli + 86400000
      );
    });

    setCurrentVitals(dateVitals)
  };

  
  return (
    <>
      {currentVitals.length > 0 &&
        currentVitals.map((vital) => {
          return (
            <FlowsheetTimeSlot key ={vital.id} vital={vital} />
          )
        })
      }
    </> 
  )
};

export default FilterVitals;