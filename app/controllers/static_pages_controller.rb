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

  def new_patient
    render 'new_patient'
  end

  def patient
    @data = { admission_id: params[:id] }.to_json
    render 'patient'
  end

  def allergies
    @data = { admission_id: params[:id] }.to_json
    render 'allergies'
  end

  def histories
    @data = { admission_id: params[:id] }.to_json
    render 'histories'
  end
end
