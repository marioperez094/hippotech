module Api
  class VitalsController < ApplicationController

    def create
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      user = current_session.user

      patient = Patient.find_by(id: params[:vital][:patient_id])
      return render json: { error: 'Cannot find patient' }, status: :not_found if !patient
    
      begin 
        @vital = Vital.create({user_id: user.id, patient_id: patient.id, temperature: params[:vital][:temperature], temp_source: params[:vital][:temp_source], heart_rate: params[:vital][:heart_rate], systolic: params[:vital][:systolic], diastolic: params[:vital][:diastolic], respirations: params[:vital][:respirations], o2_source: params[:vital][:o2_source], fio2: params[:vital][:fio2], liters: params[:vital][:liters], intake: params[:vital][:intake], output: params[:vital][:output], comment: params[:vital][:comment], service_time: params[:vital][:service_time]})
        render 'api/vitals/show', status: :created
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

    def vital_params
      params.require(:vital).permit(:temperature, :temp_source, :heart_rate, :systolic, :diastolic, :respirations, :o2_source, :fio2, :liters, :intake, :output, :comment, :service_time)
    end
  end
end