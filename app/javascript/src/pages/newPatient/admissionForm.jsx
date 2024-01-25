import React, { useState } from "react";

class AdmissionForm extends React.Component {
  render() {
    return(
      <div>Hi</div>
    )
  };
};

export default AdmissionForm;

function admissionMultiStep(forms) {
  const [currentFormIndex, setCurrentForm] = useState(0);

  function next() {
    setCurrentForm(formCount => {
      if (formCount >= forms.length) return formCount;
      return formCount + 1;
    });
  };

  function previous() {
    setCurrentForm(formCount => {
      if (formCount <= 0 ) return formCount;
      return formCount - 1;
    });
  };

  function setForm(formCount) {
    setCurrentForm(formCount);
  };

  return {
    currentFormIndex,
    currentForm: forms[currentFormIndex],
    forms,
    firstFormBoolean: currentFormIndex === 0,
    lastFormBoolean: currentFormIndex === forms.length - 1,
    setForm, 
    next, 
    previous,
  };
};