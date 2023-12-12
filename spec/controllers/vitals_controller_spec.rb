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

    it 'renders new vitals object' do
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

      expect(Patient.count).to eq(1)

      expect(response.body).to eq({
        vital: {
          id: 1,
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
      }.to_json)
    end
  end

  context 'GET /vitals' do
    it 'renders all patients object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
  
      vital1 = FactoryBot.create(:vital)
      vital2 = FactoryBot.create(:vital)
  
      get :index
  
      expect(response.body).to eq({
        patients: [
          {
            id: vital1.id,
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
          }, 
          {
            id: vital2.id,
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
          }, 
        ]
      }.to_json)
    end
  end

  context 'GET /vitals/:id' do
    it 'renders a set of vitals' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      vital = FactoryBot.create(:vital)
  
      get :show, params: { id: vital.id }
  
      expect(response.body).to eq({
        patient: {
          id: vital.id,
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
      }.to_json)
    end
  end

  context 'PUT /patients/:id' do
    it 'does not update patient info' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      vital = FactoryBot.create(:vital)
  
      user = nil
      session = nil
      @request.cookie_jar.signed['hippotech_session_token'] = nil
  
      post :update, params: { id: vital.id,
        patient: {
          id: vital.id,
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
  
  
    it 'updates a patient'do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      vital = FactoryBot.create(:vital)
  
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
        vital: {
          id: vital.id,
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
      }.to_json)
    end
  end
end