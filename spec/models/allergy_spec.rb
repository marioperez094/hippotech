require 'rails_helper'

RSpec.describe Allergy, type: :model do
  context 'create' do
    it 'must belong to a patient' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Allergy.create!(
          name: 'penicillin',
          reaction: 'severe',
          symptoms: 'anaphylaxis',
          user: user
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must belong to a user' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Allergy.create!(
          name: 'penicillin',
          reaction: 'severe',
          symptoms: 'anaphylaxis',
          patient: patient
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a name' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, name: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end

    it 'must have a name with min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, name: 'c' * 2, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end

    it 'must have a name with max 20 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, name: 'c' * 21, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end

    it 'must have a reaction' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, reaction: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end

    it 'must have a reaction with min 4 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, reaction: 'c' * 3, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end

    it 'must have a reaction with max 10 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, reaction: 'c' * 11, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end

    it 'must have symptoms' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, symptoms: nil, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end

    it 'must have symptoms with min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, symptoms: 'c' * 2, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end

    it 'must have symptoms with max 500 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:allergy, symptoms: 'c' * 501, patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)  
    end
  end
end
