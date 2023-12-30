module Api
  class VitalsController < ApplicationController

    def create
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      user = current_session.user

      patient = find_patient
      return render json: { error: 'Cannot find patient' }, status: :not_found if !patient
    
      #Vitals belongs to a patient, the user is charting on the patient
      #Vitals is an array, allowing for multiple records
      begin 
          @vitals = Vital.create!(vitals_params)
          render 'api/vitals/index', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def show
      search_vital

      render 'api/vitals/show', status: :ok
    end

    def index_by_patient
      patient = find_patient

      @vitals = patient.vitals.order(service_time: :asc)
      render 'api/vitals/index', status: :ok
    end

    def update
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      search_vital

      begin
        @vital.update(vital_params)
        render 'api/vitals/show', status: :ok
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def search_vital
      @vital = Vital.find_by(id: params[:id])
      return render json: { error: 'Vital not found.' }, status: :not_found if !@vital
    end

    private

    def vitals_params
      params.permit(vitals: [:patient_id, :user_id, :temperature, :temp_source, :heart_rate, :systolic, :diastolic, :respirations, :o2_source, :fio2, :liters, :intake, :output, :comment, :service_time]).require(:vitals)
    end
  end
end