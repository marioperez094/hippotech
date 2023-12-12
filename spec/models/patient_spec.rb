require 'rails_helper'

RSpec.describe Patient, type: :model do
  context 'create' do
    it 'should have many admissions' do
      patient = Patient.create(
        first_name: 'test',
        last_name: 'test',
        date_of_birth: '2023-01-31',
        bio_sex: 'male'
      )
      expect(patient.admissions).to eq([])
    end
  end 
end