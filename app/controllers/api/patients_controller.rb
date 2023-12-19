module Api
  class PatientsController < ApplicationController
    def index
      @patients = Patient.all
      render 'api/patients/index'
    end

    def create
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      user = current_session.user
      return render json: { error: 'cannot find user' }, status: :not_found if !user

      begin 
        @patient = user.patients.create!(patient_params)
        render 'api/patients/show', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def show
      search_patient

      render 'api/patients/show', status: :ok
    end

    def update
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      search_patient

      begin
        @patient.update(patient_params)
        render 'api/patients/show', status: :ok
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def search_patient
      @patient = Patient.find_by(id: params[:id])
      return render json: { error: 'Patient not found.' }, status: :not_found if !@patient
    end
    
    private

    def patient_params
      params.require(:patient).permit(:first_name, :last_name, :date_of_birth, :bio_sex, :image)
    end
  end
end