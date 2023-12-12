require 'rails_helper'

RSpec.describe Patient, type: :model do
  context 'create' do
    it 'should have many admissions' do
      patient = FactoryBot.create(:patient)
      expect(patient.admissions).to eq([])
    end

    it 'should have many vitals' do
      patient = FactoryBot.create(:patient)
      expect(patient.vitals).to eq([])
    end

    it 'must have a first name' do
      expect {
        FactoryBot.create(:patient, first_name: nil).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name' do
      expect {
        FactoryBot.create(:patient, last_name: nil).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a date of birth' do
      expect {
        FactoryBot.create(:patient, date_of_birth: nil).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a biological sex' do
      expect {
        FactoryBot.create(:patient, bio_sex: nil).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a first name with min 3 characters' do
      expect {
        FactoryBot.create(:patient, first_name: 'c' * 2).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name with min 3 characters' do
      expect {
        FactoryBot.create(:patient, last_name: 'c' * 2).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a first name with max 64 characters' do
      expect {
        FactoryBot.create(:patient, first_name: 'c' * 65).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name with max 64 characters' do
      expect {
        FactoryBot.create(:patient, last_name: 'c' * 65).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a date' do
      expect {
        FactoryBot.create(:patient, date_of_birth: '22-22-22').to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a biological sex with min 4 characters' do
      expect {
        FactoryBot.create(:patient, bio_sex: 'c' * 3).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a first name with max 6 characters' do
      expect {
        FactoryBot.create(:patient, bio_sex: 'c' * 7).to raise_error(ActiveRecord::RecordInvalid)
      }
    end
  end
end