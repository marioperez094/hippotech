require 'rails_helper'

RSpec.describe History, type: :model do
  context 'create' do
    it 'must belong a patient' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        History.create!(
          diagnosis: 'Diabetes Mellitus',
          diagnosis_date: '01-01-2000',
          user: user
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must belong a user' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        History.create!(
          diagnosis: 'Diabetes Mellitus',
          diagnosis_date: '01-01-2000',
          patient: patient
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a diagnosis' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:history, diagnosis: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a diagnosis with min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:history, diagnosis: 'c' * 2, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a diagnosis with max 20 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:history, diagnosis: 'c' * 21, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a diagnosis date' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:history, diagnosis_date: nil, patient: patient, user: user)
      }.to raise_error(ArgumentError)
    end

    it 'diagnosis date must be a date ' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:history, diagnosis_date: 'c', patient: patient, user: user)
      }.to raise_error(ArgumentError)
    end

    it 'diagnosis date must have a date smaller than today ' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:history, diagnosis_date: '01-01-2030', patient: patient, user: user)
      }.to raise_error(ArgumentError)
    end
  end
end
