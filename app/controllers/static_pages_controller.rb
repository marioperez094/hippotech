class StaticPagesController < ApplicationController
  def landing_page
    render "landing_page"
  end

  def login
    render "login"
  end

  def patient_list
    render "patient_list"
  end

  def reset_password
    render "reset_password"
  end

  def new_patient
    render "new_patient" 
  end
end
