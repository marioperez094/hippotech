require 'rails_helper'

RSpec.describe Patient, type: :model do
  context 'create' do
    it 'should have many admissions' do
      user = FactoryBot.create(:user)
      patient = FactoryBot.create(:patient, user: user)
      expect(patient.admissions).to eq([])
    end

    it 'should have many vitals' do
      user = FactoryBot.create(:user)
      patient = FactoryBot.create(:patient, user: user)
      expect(patient.vitals).to eq([])
    end

    it 'must have a first name' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, first_name: nil, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, last_name: nil, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a date of birth' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, date_of_birth: nil, user: user).to raise_error(ArgumentError)
      }
    end

    it 'must have a biological sex' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, bio_sex: nil, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a first name with min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, first_name: 'c' * 2, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name with min 3 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, last_name: 'c' * 2, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a first name with max 64 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, first_name: 'c' * 65, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name with max 64 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, last_name: 'c' * 65, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a date' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, date_of_birth: '22-22-22', user: user).to raise_error(ArgumentError)
      }
    end

    it 'must have a biological sex with min 4 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, bio_sex: 'c' * 3, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a first name with max 6 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient, bio_sex: 'c' * 7, user: user).to raise_error(ActiveRecord::RecordInvalid)
      }
    end
  end
end