require 'rails_helper'

RSpec.describe Api::AllergiesController, type: :controller do
  render_views

  context 'POST /allergies' do
    it 'does not render a new allergy object no user' do
      post :create, params: {
        allergy: {
          name: 'penicillin',
          reaction: 'severe',
          symptoms: 'anaphylaxis'
        }
      }
      expect(Admission.count).to eq(0)
      expect(response.body).to eq({
        error: 'Not logged in'
      }.to_json)
    end

    it 'does not render a new allergy object no patient' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      post :create, params: {
        allergy: {
          name: 'penicillin',
          reaction: 'severe',
          symptoms: 'anaphylaxis'
        }
      }
      expect(Admission.count).to eq(0)
      expect(response.body).to eq({
        error: 'Cannot find patient'
      }.to_json)
    end

    it 'renders a new allergy object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)

      post :create, params: {
        allergy: {
          patient_id: patient.id,
          name: 'penicillin',
          reaction: 'severe',
          symptoms: 'anaphylaxis'
        }
      }
      
      expect(Allergy.count).to eq(1)
      expect(response.body).to eq({
        allergy: {
          id: 1,
          name: 'penicillin',
          reaction: 'severe',
          symptoms: 'anaphylaxis', 
          user: {
            user_first_name: user.first_name,
            user_last_name: user.last_name
          }
        }
      }.to_json)
    end
  end

  context 'GET /patients/:id/allergies' do
    it 'renders all allergies object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient1 = FactoryBot.create(:patient, user: user)
      patient2 = FactoryBot.create(:patient, user: user)

      allergy1 = FactoryBot.create(:allergy, user: user, patient: patient1)
      allergy2 = FactoryBot.create(:allergy, user: user, patient: patient2)
      allergy3 = FactoryBot.create(:allergy, user: user, patient: patient1)

      get :index_by_patient, params: { id: patient1.id }

      expect(response.body).to eq({
        allergies: [{
          id: allergy1.id,
          name: 'penicillin',
          reaction: 'severe',
          symptoms: 'anaphylaxis'
        },
        {
          id: allergy3.id,
          name: 'penicillin',
          reaction: 'severe',
          symptoms: 'anaphylaxis'
        }]
      }.to_json)
    end
  end

  context 'DELETE /allergies/:id' do
    it 'does not delete allergies' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)
      allergy = FactoryBot.create(:allergy, user: user, patient: patient)

      user = nil
      session = nil
      @request.cookie_jar.signed['hippotech_session_token'] = nil

      delete :destroy, params: { id: allergy.id }

      expect(Allergy.count).to eq(1)
      expect(response.body).to eq({ error: 'Not logged in' }.to_json)
    end

    it 'deletes allergy object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)
      allergy = FactoryBot.create(:allergy, user: user, patient: patient)

      delete :destroy, params: { id: allergy.id }

      expect(Allergy.count).to eq(0)
      expect(response.body).to eq({ success: true }.to_json)
    end
  end
end