class StaticPagesController < ApplicationController
  
  def landing_page
    render 'landing_page'
  end

  def login
    render 'login'
  end

  def patient_list
    render 'patient_list'
  end
end
