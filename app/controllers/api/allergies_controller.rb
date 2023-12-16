module Api
  class AllergiesController < ApplicationController
    
    def create
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      user = current_session.user

      patient = Patient.find_by(id: params[:allergy][:patient_id])
      return render json: { error: 'Cannot find patient' }, status: :not_found if !patient

      #Allergies belong to a patient and are charted by a user
      begin 
        @allergy = Allergy.create({user_id: user.id, patient_id: patient.id, name: params[:allergy][:name], reaction: params[:allergy][:reaction], symptoms: params[:allergy][:symptoms]})
        render 'api/allergies/show', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def index_by_patient
      patient = find_patient

      @allergies = patient.allergies.order(name: :asc)
      render 'api/allergies/index', status: :ok
    end

    def destroy
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end
      
      @allergy = Allergy.find_by(id: params[:id])

      if @allergy&.destroy
        render json: { success: true }
      else
        render json: { success: false }
      end
    end

    private

    def allergy_params
      params.require(:allergy).permit(:name, :reaction, :symptoms)
    end
  end
end
