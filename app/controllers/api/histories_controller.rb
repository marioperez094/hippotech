module Api
  class HistoriesController < ApplicationController
    def create
      if !current_session
        return render json: { error: 'Not logged in' }, status: :unauthorized
      end

      user = current_session.user

      patient = Patient.find_by(id: params[:history][:patient_id])
      return render json: { error: 'Cannot find patient' }, status: :not_found if !patient

      #History belong to a patient and are charted by a user
      begin 
        @history = History.new(history_params)
        @history.user = user
        @history.patient = patient
        @history.save!
        render 'api/histories/show', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def index_by_patient
      patient = find_patient

      @histories = patient.histories.order(diagnosis: :asc)
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