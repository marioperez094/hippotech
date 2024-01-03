class ApplicationController < ActionController::Base

  def current_session
    token = cookies.signed[:hippotech_session_token]
    session = Session.find_by(token: token)
    session
  end

  def find_patient
    patient = Patient.find_by(id: params[:id])
  end
end
