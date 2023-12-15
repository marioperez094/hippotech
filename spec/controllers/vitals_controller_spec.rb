require 'rails_helper'

RSpec.describe Api::VitalsController, type: :controller do
  render_views

  context 'POST /vitals' do
    it 'does not render a new vitals object' do
      post :create, params: {
        vital: {
          temperature: 36.5,
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs'
        }
      }
      expect(Vital.count).to eq(0)
      expect(response.body).to eq({
        error: 'Not logged in'
      }.to_json)
    end

    it 'does not render a new vitals object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      post :create, params: {
        vital: {
          temperature: 36.5,
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs'
        }
      }

      expect(Vital.count).to eq(0)

      expect(response.body).to eq({
        error: 'Cannot find patient'
      }.to_json)
    end

    it 'renders new vitals object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)

      post :create, params: {
        vital: {
          patient_id: patient.id,
          temperature: 36.5,
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2023-01-01 01:00:00 UTC'
        }
      }

      expect(Vital.count).to eq(1)

      expect(response.body).to eq({
        vital: {
          id: 1,
          temperature: '36.5',
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time:'2023-01-01T01:00:00.000Z',
          patient: {
            patient_id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name
          },
          user: {
            user_first_name: user.first_name,
            user_last_name: user.last_name
          }
        }
      }.to_json)
    end
  end

  context 'GET /vitals/:id' do
    it 'renders a set of vitals' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)
  
      vital = FactoryBot.create(:vital, patient_id: patient.id, user: user)
  
      get :show, params: { id: vital.id }
  
      expect(response.body).to eq({
        vital: {
          id: 1,
          temperature: '36.5',
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2023-01-01T01:00:00.000Z',
          patient: {
            patient_id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name
          },
          user: {
            user_first_name: user.first_name,
            user_last_name: user.last_name
          }
        }
      }.to_json)
    end
  end

  context 'GET /patients/:id/vitals' do
    it 'renders a list of vitals belonging to a specific patient' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient1 = FactoryBot.create(:patient, user: user)
      patient2 = FactoryBot.create(:patient, user: user)

      vital1 = FactoryBot.create(:vital, patient: patient1, user: user)
      vital2 = FactoryBot.create(:vital, patient: patient2, user: user)
      vital3 = FactoryBot.create(:vital, patient: patient1, user: user)

      get :index_by_patient, params: { id: patient1.id }
  
      expect(response.body).to eq({
        vitals: [{
          id: vital1.id,
          temperature: '36.5',
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2023-01-01T01:00:00.000Z'
        },
        {
          id: vital3.id,
          temperature: '36.5',
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2023-01-01T01:00:00.000Z'
        }]
      }.to_json)
    end

    it 'renders a set of vitals in chronological order' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)

      
      vital1 = FactoryBot.create(:vital, service_time: '2023-01-01 02:00:00 UTC', patient: patient, user: user)
      vital2 = FactoryBot.create(:vital, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
      vital3 = FactoryBot.create(:vital, service_time: '2022-01-01 03:00:00 UTC', patient: patient, user: user)

      get :index_by_patient, params: { id: patient.id }
  
      expect(response.body).to eq({
        vitals: [{
          id: vital3.id,
          temperature: '36.5',
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2022-01-01T03:00:00.000Z'
        },
        {
          id: vital2.id,
          temperature: '36.5',
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2023-01-01T01:00:00.000Z'
        },
        {
          id: vital1.id,
          temperature: '36.5',
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2023-01-01T02:00:00.000Z'
        }]
      }.to_json)
    end
  end

  context 'PUT /vitals/:id' do
    it 'does not update vital info' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      patient = FactoryBot.create(:patient, user: user)
  
      vital = FactoryBot.create(:vital, patient_id: patient.id, user: user)
  
      user = nil
      session = nil
      @request.cookie_jar.signed['hippotech_session_token'] = nil
  
      post :update, params: { id: vital.id,
        vital: {
          temperature: 36.5,
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs'
        }
      }
  
      expect(response.body).to eq({
        error: 'Not logged in'
      }.to_json)
  
    end
  
  
    it 'updates vital'do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      patient = FactoryBot.create(:patient, user: user)
  
      vital = FactoryBot.create(:vital, patient_id: patient.id, user: user)
  
      post :update, params: { id: vital.id,
        vital: {
          temperature: 36.5,
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2023-01-01 01:00:00 UTC'
        }
      }
  
      expect(response.body).to eq({
        vital: {
          id: 1,
          temperature: '36.5',
          temp_source: 'oral',
          heart_rate: 80,
          systolic: 115,
          diastolic: 75,
          respirations: 18,
          o2_source: 'NC',
          fio2: 28,
          liters: 2,
          intake: 100,
          output: 50,
          comment: 'Normal vital signs',
          service_time: '2023-01-01T01:00:00.000Z',
          patient: {
            patient_id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name
          },
          user: {
            user_first_name: user.first_name,
            user_last_name: user.last_name
          }
        }
      }.to_json)
    end
  end
end