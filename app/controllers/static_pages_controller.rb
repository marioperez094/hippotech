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

  def patient
    @data = { patient_id: params[:id] }.to_json
    render 'patient'
  end
end
