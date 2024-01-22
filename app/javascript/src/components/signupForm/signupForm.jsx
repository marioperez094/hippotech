import React from "react";

import SpecialInput from "@components/specialInput";

function SignupForm(props) {
  const { first_name, last_name, email, password, username, handleChange } = props;
  return (
    <>
      <div className="form-group labeled-border col-12 col-md-6">
        <SpecialInput
          name="first_name"
          value={ first_name }
          handleChange={ handleChange }
        />
      </div>
      <div className="form-group labeled-border col-12 col-md-6 mt-3 mt-md-0">
        <SpecialInput
          name="last_name"
          value={last_name}
          handleChange={ handleChange }
        />
      </div>
      <div className="form-group labeled-border col-12 mt-3">
        <SpecialInput
          name="username"
          value={ username }
          handleChange={ handleChange }
        />
      </div>
      <div className="form-group labeled-border col-12 mt-3">
        <SpecialInput
          name="email"
          value={ email }
          type="email"
          handleChange={ handleChange }
        />
      </div>
      <div className="form-group labeled-border col-12 mt-3">
        <SpecialInput
          name="password"
          value={ password }
          type="password"
          handleChange={ handleChange }
        />
      </div>
    </>
  )

};

export default SignupForm;