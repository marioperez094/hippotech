require 'rails_helper'

RSpec.describe Admission, type: :model do
  context 'create' do
    it 'must belong to a patient' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Admission.create!(
          phone_number: '123-456-7890', 
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact: 'Test Test',
          emergency_relationship: 'Spouse',
          emergency_phone: '123-456-7890',
          user: user,
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must belong to a User' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Admission.create!(
          phone_number: '123-456-7890', 
          address: '1234 S. First St. Paris, France 12345',
          occupation: 'unemployed',
          diagnosis: 'Shortness of breath',
          code_status: 'Full',
          diet: 'cardiac',
          emergency_contact: 'Test Test',
          emergency_relationship: 'Spouse',
          emergency_phone: '123-456-7890',
          patient: patient
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a phone_number' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, phone_number: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'phone_number must be min 10 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, phone_number: '1' * 9, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'phone_number must be max 15 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, phone_number: '1' * 16, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an address' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, address: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'address must be min 10 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, address: 'c' * 9, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'address must be max 45 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, address: 'c' * 46, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an occupation' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, occupation: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'occupation must be min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, occupation: 'c' * 2, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'occupation must be max 20 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, occupation: 'c' * 21, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a diagnosis' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, diagnosis: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'diagnosis must be min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, diagnosis: 'c' * 2, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'diagnosis must be max 21 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, diagnosis: 'c' * 21, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'code status must be min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, code_status: 'c' * 2, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'code status must be max 10 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, code_status: 'c' * 11, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'diet must be max 20 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, diet: 'c' * 21, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'emergency contact must be min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_contact: 'c' * 2, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'emergency contact must be max 50 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_contact: 'c' * 51, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'emergency relationship must be min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_relationship: 'c' * 2, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'emergency relationship must be max 20 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_relationship: 'c' * 21, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'emergency phone must be min 10 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_phone: 'c' * 9, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'emergency phone must be max 15 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_phone: 'c' * 16, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a code_status' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, code_status: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'diet can be nil' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, diet: nil, patient: patient, user: user)
        expect(Admission.count).to eq(1)
      }.not_to raise_error
    end

    it 'must have an emergency contact' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_contact: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an emergency relationship' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_relationship: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an emergency phone' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:admission, emergency_phone: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
