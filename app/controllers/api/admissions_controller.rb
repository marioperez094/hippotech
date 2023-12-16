module Api
  class AdmissionsController < ApplicationController

    def create
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      user = current_session.user

      patient = Patient.find_by(id: params[:admission][:patient_id])
      return render json: { error: 'Cannot find patient' }, status: :not_found if !patient

      begin
        @admission = Admission.create({user_id: user.id, patient_id: patient.id, phone_number: params[:admission][:phone_number], address: params[:admission][:address], occupation: params[:admission][:occupation], diagnosis: params[:admission][:diagnosis], code_status: params[:admission][:code_status], diet: params[:admission][:diet], emergency_contact: params[:admission][:emergency_contact], emergency_relationship: params[:admission][:emergency_relationship], emergency_phone: params[:admission][:emergency_phone]})
        render 'api/admissions/show', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def index
      @admissions = Admission.order(created_at: :asc)
      render 'api/admissions/index', status: :ok
    end

    def show
      search_admission

      render 'api/admissions/show', status: :ok
    end

    def index_by_patient
      patient = Patient.find_by(id: params[:id])
      return render json: { error: 'Cannot find patient' }, status: :not_found if !patient

      @admissions = patient.admissions.order(created_at: :asc)
      render 'api/admissions/index', status: :ok
    end

    def update
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      search_admission

      begin
        @admission.update(admission_params)
        render 'api/admissions/show', status: :ok
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def search_admission
      @admission = Admission.find_by(id: params[:id])
      return render json: { error: 'Admission not found.' }, status: :not_found if !@admission
    end

    def discharge
      @admission = Admission.find_by(id: params[:id])

      render 'api/admissions/discharge' if @admission&.update(discharge: true)

    end

    private

    def admission_params
      params.require(:admission).permit(:phone_number, :address, :occupation, :diagnosis, :code_status, :diet, :emergency_contact, :emergency_relationship, :emergency_phone)
    end
  end
end