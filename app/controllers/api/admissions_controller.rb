module Api
  class AdmissionsController < ApplicationController

    def create
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      user = current_session.user

      patient = Patient.find_by(id: params[:admission][:patient_id])
      return render json: { error: 'Cannot find patient' }, status: :not_found if !patient

      #Admissions belong to a patient and are charted by a user
      begin
        @admission = Admission.new(admission_params)
        @admission.user = user
        @admission.patient = patient
        @admission.save!
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
      patient = find_patient

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

    #Patients cannot be deleted, instead only updated and discharged
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
