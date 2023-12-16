module Api
  class HistoriesController < ApplicationController
    def create
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      user = current_session.user

      patient = Patient.find_by(id: params[:history][:patient_id])
      return render json: { error: 'Cannot find patient' }, status: :not_found if !patient

      begin 
        @history = History.create({user_id: user.id, patient_id: patient.id, diagnosis: params[:history][:diagnosis], diagnosis_date: params[:history][:diagnosis_date]})
        render 'api/histories/show', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def index_by_patient
      patient = find_patient

      @histories = patient.histories.order(name: :asc)
      render 'api/histories/index', status: :ok
    end

    def destroy
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end
      
      @history = History.find_by(id: params[:id])

      if @history&.destroy
        render json: { success: true }
      else
        render json: { success: false }
      end
    end

    private

    def history_params
      params.require(:history).permit(:diagnosis, :diagnosis_date)
    end
  end
end
