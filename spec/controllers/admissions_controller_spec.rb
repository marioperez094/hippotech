require 'rails_helper'

RSpec.describe Api::AdmissionsController, type: :controller do
  render_views

  context 'POST /admissions' do
    it 'does not render a new admission object no user' do
      post :create, params: {
        admission: {
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
        }
      }
      expect(Admission.count).to eq(0)
      expect(response.body).to eq({
        error: 'Not logged in'
      }.to_json)
    end

    it 'does not render a new admission object no patient' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      post :create, params: {
        admission: {
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
        }
      }
      expect(Admission.count).to eq(0)

      expect(response.body).to eq({
        error: 'Cannot find patient'
      }.to_json)
    end

    it 'renders a new admission object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)

      post :create, params: {
        admission: {
          patient_id: patient.id,
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
        }
      }
      expect(Admission.count).to eq(1)

      expect(response.body).to eq({
        admission: {
          id: 1,
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
          discharge: false,
          created_at: Admission.first.created_at,
          patient: {
            id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            date_of_birth: patient.date_of_birth,
            bio_sex: patient.bio_sex,
            image: nil,
            allergies: 'NKDA',
            histories: 'No Past Medical History',
          },
          user: {
            first_name: user.first_name,
            last_name: user.last_name
          }
        }
      }.to_json)
    end
  end

  context 'GET /admissions' do
    it 'renders all admissions object' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient1 = FactoryBot.create(:patient, user: user)
      patient2 = FactoryBot.create(:patient, user: user)

      allergy = FactoryBot.create(:allergy, patient: patient1, user: user)
      history = FactoryBot.create(:history, patient: patient2, user: user)

      admission1 = FactoryBot.create(:admission, patient: patient1, user: user)
      admission2 = FactoryBot.create(:admission, patient: patient2, user: user)

      get :index

      expect(response.body).to eq({
        admissions: [{
          id: admission1.id,
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
          discharge: false,
          created_at: Admission.first.created_at,
          patient: {
            id: patient1.id,
            first_name: patient1.first_name,
            last_name: patient1.last_name,
            date_of_birth: patient1.date_of_birth,
            bio_sex: patient1.bio_sex
          },
          allergies: [{
              name: allergy.name
          }],
          histories: 'No Past Medical History'
        },
        {
          id: admission2.id,
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
          discharge: false,
          created_at: Admission.second.created_at,
          patient: {
            id: patient2.id,
            first_name: patient2.first_name,
            last_name: patient2.last_name,
            date_of_birth: patient2.date_of_birth,
            bio_sex: patient2.bio_sex
          },
          allergies: 'NKDA',
          histories: [{
            name: history.diagnosis
          }]
        }]
      }.to_json)
    end
  end

  context 'GET /admissions/:id' do
    it 'searches for an admission' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      patient = FactoryBot.create(:patient, user: user)

      admission = FactoryBot.create(:admission, patient: patient, user: user)
  
      get :show, params: { id: admission.id }
  
      expect(response.body).to eq({
        admission: {
          id: 1,
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
          discharge: false,
          created_at: Admission.first.created_at,
          patient: {
            id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            date_of_birth: patient.date_of_birth,
            bio_sex: patient.bio_sex,
            image: nil,
            allergies: 'NKDA',
            histories: 'No Past Medical History',
          },
          user: {
            first_name: user.first_name,
            last_name: user.last_name
          }
        }
      }.to_json)
    end

    it 'admissions can have allergies' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      patient = FactoryBot.create(:patient, user: user)

      admission = FactoryBot.create(:admission, patient: patient, user: user)

      allergy = FactoryBot.create(:allergy, patient: patient, user: user)
  
      get :show, params: { id: admission.id }
  
      expect(response.body).to eq({
        admission: {
          id: 1,
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
          discharge: false,
          created_at: Admission.first.created_at,
          patient: {
            id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            date_of_birth: patient.date_of_birth,
            bio_sex: patient.bio_sex,
            image: nil,
            allergies: [{
              name: allergy.name,
              reaction: allergy.reaction,
              symptoms: allergy.symptoms
            }],
            histories: 'No Past Medical History'
          },
          user: {
            first_name: user.first_name,
            last_name: user.last_name
          }
        }
      }.to_json)
    end

    it 'admissions can have histories' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      patient = FactoryBot.create(:patient, user: user)

      admission = FactoryBot.create(:admission, patient: patient, user: user)

      history = FactoryBot.create(:history, patient: patient, user: user)
  
      get :show, params: { id: admission.id }
  
      expect(response.body).to eq({
        admission: {
          id: 1,
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
          discharge: false,
          created_at: Admission.first.created_at,
          patient: {
            id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            date_of_birth: patient.date_of_birth,
            bio_sex: patient.bio_sex,
            image: nil,
            allergies: 'NKDA',
            histories: [{
              diagnosis: history.diagnosis,
              diagnosis_date: history.diagnosis_date
            }]
          },
          user: {
            first_name: user.first_name,
            last_name: user.last_name
          }
        }
      }.to_json)
    end
  end

  context 'GET /patients/:id/admissions' do
    it 'renders a list of admissions for a patient' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      patient1 = FactoryBot.create(:patient, user: user)
      patient2 = FactoryBot.create(:patient, user: user)

      admission1 = FactoryBot.create(:admission, patient: patient1, user: user)
      admission2 = FactoryBot.create(:admission, patient: patient2, user: user)
      admission3 = FactoryBot.create(:admission, patient: patient1, user: user)
  
      get :index_by_patient, params: { id: patient1.id }
  
      expect(response.body).to eq({
        admissions: [{
          id: admission1.id,
          diagnosis: 'Shortness of breath',
          discharge: false,
          created_at: Admission.first.created_at,
          updated_at: Admission.first.updated_at
        },
        {
          id: admission3.id,
          diagnosis: 'Shortness of breath',
          discharge: false,
          created_at: Admission.third.created_at,
          updated_at: Admission.third.updated_at
        }]
      }.to_json)
    end
  end

  context 'PUT /admissions/:id' do
    it 'updates admission' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      patient = FactoryBot.create(:patient, user: user)

      admission = FactoryBot.create(:admission, patient: patient, user: user)

      post :update, params: { id: admission.id,
        admission: {
          id: admission.id,
          phone_number: '1234567891',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
        }
      }
 
      expect(response.body).to eq({
        admission: {
          id: 1,
          phone_number: '1234567891',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
          discharge: false,
          created_at: Admission.first.created_at,
          patient: {
            id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            date_of_birth: patient.date_of_birth,
            bio_sex: patient.bio_sex,
            image: nil,
            allergies: 'NKDA',
            histories: 'No Past Medical History',
          },
          user: {
            first_name: user.first_name,
            last_name: user.last_name
          }
        }
      }.to_json)
    end

    it 'does not update admission' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token
  
      patient = FactoryBot.create(:patient, user: user)

      admission = FactoryBot.create(:admission, patient: patient, user: user)

      user = nil
      session = nil
      @request.cookie_jar.signed['hippotech_session_token'] = nil
  
      post :update, params: { id: admission.id,
        admission: {
          phone_number: '1234567890',
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact_name: 'Test Test',
          relationship_to_patient: 'Spouse',
          emergency_contact_number: '1234567890',
        }
      }
 
      expect(response.body).to eq({
        error: 'Not logged in'
      }.to_json)
    end
  end

  context 'PUT /admissions/:id/discharge' do
    it 'discharges a patient' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      patient = FactoryBot.create(:patient, user: user)

      admission = FactoryBot.create(:admission, user: user, patient: patient)

      put :discharge, params: { id: admission.id }

      expect(Admission.where(discharge: true).count).to eq(1)

      admission.reload
      expect(response.body).to eq({
        success: true
      }.to_json)
    end
  end
end