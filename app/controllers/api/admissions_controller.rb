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
      
      @admission = Admission.new(admission_params)
      @admission.user = user
      @admission.patient = patient
      if @admission.save
        render 'api/admissions/show', status: :created
      else
        render json: { error: @admission.errors }, status: :bad_request
      end
    end

    def index
      @admissions = Admission.order(created_at: :asc)
      render 'api/admissions/index', status: :ok
    end

    def show
      @admission = search_admission
      return render json: { error: 'Admission not found.'}, status: :not_found if !@admission

      render 'api/admissions/show', status: :ok
    end

    def index_by_patient
      patient = find_patient

      @admissions = patient.admissions.order(created_at: :asc)
      render 'api/admissions/discharge', status: :ok
    end

    def update
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      @admission = search_admission
      return render json: { error: 'Admission not found.'}, status: :not_found if !@admission

      begin
        @admission.update(admission_params)
        render 'api/admissions/show', status: :ok
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end
    
    #Patients cannot be deleted, instead only updated and discharged
    def discharge
      return render json: { error: 'Not logged in '}, status: :unauthorized if !current_session

      @admission = search_admission
      return render json: { error: 'Admission not found.'}, status: :not_found if !@admission

      render json: { success: true } if @admission&.update(discharge: true)

    end

    def search_admission
      admission = Admission.find_by(id: params[:id])
      admission
    end

    private

    def admission_params
      params.require(:admission).permit(:phone_number, :address, :occupation, :diagnosis, :code_status, :diet, :emergency_contact, :emergency_relationship, :emergency_phone)
    end
  end
end