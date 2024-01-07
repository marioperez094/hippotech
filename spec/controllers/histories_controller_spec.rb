require 'rails_helper'

RSpec.describe Api::HistoriesController, type: :controller do 
  render_views

  context 'POST /histories' do
    it 'does not render new history due to no user' do
      post :create, params: {
        history: {
          diagnosis: 'Diabetes Mellitus',
          diagnosis_date: '01-01-2000'
        }
      }
      expect(Admission.count).to eq(0)
      expect(response.body).to eq({
        error: 'Not logged in'
      }.to_json)
    end

    it 'does not render new history due to no patient' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      post :create, params: {
        history: {
          diagnosis: 'Diabetes Mellitus',
          diagnosis_date: '01-01-2000'
        }
      }
      expect(Admission.count).to eq(0)
      expect(response.body).to eq({
        error: 'Cannot find patient'
      }.to_json)
    end

    it 'renders a new history object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)

      post :create, params: {
        history: {
          patient_id: patient.id,
          diagnosis: 'Diabetes Mellitus',
          diagnosis_date: '2000-01-01'
        }
      }

      expect(History.count).to eq(1)
      expect(response.body).to eq({
        history: {
          id: 1,
          diagnosis: 'Diabetes Mellitus',
          diagnosis_date: '2000-01-01',
          user: {
            user_first_name: user.first_name,
            user_last_name: user.last_name
          }
        }
      }.to_json)
    end
  end

  context 'GET /patients/:id/histories' do
    it 'renders all histories' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient1 = FactoryBot.create(:patient, user: user)
      patient2 = FactoryBot.create(:patient, user: user)


      history1 = FactoryBot.create(:history, user: user, patient: patient1)
      history2 = FactoryBot.create(:history, user: user, patient: patient2)
      history3 = FactoryBot.create(:history, user: user, patient: patient1)

      get :index_by_patient, params: { id: patient1.id }

      expect(response.body).to eq({
        histories: [{
          id: history1.id,
          diagnosis: 'Diabetes Mellitus',
          diagnosis_date: '2020-01-01'
        },
        {
          id: history3.id,
          diagnosis: 'Diabetes Mellitus',
          diagnosis_date: '2020-01-01'
        }]
      }.to_json)
    end
  end

  context 'DELETE /histories/:id' do
    it 'does not delete history' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)
      history = FactoryBot.create(:history, user: user, patient: patient)

      user = nil
      session = nil
      @request.cookie_jar.signed['hippotech_session_token'] = nil

      delete :destroy, params: { id: history.id }

      expect(History.count).to eq(1)
      expect(response.body).to eq({ error: 'Not logged in' }.to_json)
    end
    
    it 'delete history object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)
      history = FactoryBot.create(:history, user: user, patient: patient)

      delete :destroy, params: { id: history.id }

      expect(History.count).to eq(0)
      expect(response.body).to eq({ success: true }.to_json)
    end
  end
end