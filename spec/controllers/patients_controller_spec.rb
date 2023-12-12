require 'rails_helper'

RSpec.describe Api::PatientsController, type: :controller do
  render_views

  context 'POST /patients' do
    it 'does not render a new object' do
      post :create, params: {
        patient: {
          first_name: 'test',
          last_name: 'test',
          date_of_birth: '2023-01-31',
          bio_sex: 'male'
        }
      }
      expect(Patient.count).to eq(0)
      expect(response.body).to eq({
        error: 'Not logged in'
      }.to_json)

    end

    it 'renders new patient object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      post :create, params: {
        patient: {
          first_name: 'test',
          last_name: 'test',
          date_of_birth: '2023-01-31',
          bio_sex: 'male'
        }
      }

      expect(Patient.count).to eq(1)

      expect(response.body).to eq({
        patient: {
          id: 1,
          first_name: 'test',
          last_name: 'test', 
          date_of_birth: '2023-01-31',
          bio_sex: 'male',
          image: nil
        }
      }.to_json)

      expect(JSON.parse(response.body)['patient']['first_name']).to eq('test')
      expect(JSON.parse(response.body)['patient']['image']).to eq(nil)
    end

    it 'Ok with image attachments' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      post :create, params: {
        patient: {
          first_name: 'test',
          last_name: 'test', 
          date_of_birth: '2023-01-31',
          bio_sex: 'male',
          image: fixture_file_upload('test.png')
        }
      } 

      expect(JSON.parse(response.body)['patient']['first_name']).to eq('test')
      expect(JSON.parse(response.body)['patient']['image']).to include('test.png')
    end
  end

  context 'GET /patients' do
    it 'renders all patients object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token


      patient1 = FactoryBot.create(:patient)
      patient2 = FactoryBot.create(:patient)

      get :index

      expect(response.body).to eq({
        patients: [
          {
            id: patient1.id,
            first_name: 'test',
            last_name: 'test', 
            date_of_birth: '2023-01-31',
            bio_sex: 'male',
            image: nil
          }, 
          {
            id: patient2.id,
            first_name: 'test',
            last_name: 'test', 
            date_of_birth: '2023-01-31',
            bio_sex: 'male',
            image: nil
          }, 
        ]
      }.to_json)
    end
  end

  context 'GET /patients/:id' do
    it 'renders a patient' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient)

      get :show, params: { id: patient.id }

      expect(response.body).to eq({
        patient: {
          id: patient.id,
          first_name: 'test',
          last_name: 'test',
          date_of_birth: '2023-01-31',
          bio_sex: 'male',
          image: nil
        }
      }.to_json)
    end
  end

  context 'PUT /patients/:id' do
    it 'updates a patient'do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient)

      post :update, params: { id: patient.id,
        patient: {
          first_name: 'New',
          last_name: 'test',
          date_of_birth: '2023-01-31',
          bio_sex: 'male'
        }
      }

       expect(response.body).to eq({
        patient: {
          id: patient.id,
          first_name: 'New',
          last_name: 'test',
          date_of_birth: '2023-01-31',
          bio_sex: 'male',
          image: nil
        }
      }.to_json)
    end
  end
end