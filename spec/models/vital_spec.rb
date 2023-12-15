require 'rails_helper'

RSpec.describe Vital, type: :model do
  context 'create' do
    it 'must belong to a patient' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create!(temperature: 36.5, service_time: '2023-01-01 01:00:00 UTC', user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must belong to a user' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)

        user = nil
        Vital.create!(temperature: 36.5, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'can have just a temperature' do
      expect {
        
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(temperature: 36.5, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)

      }.not_to raise_error
    end

    it 'can have just a heart rate' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(heart_rate: 80, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'can have just a systolic' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(systolic: 115, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'can have just a diastolic' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(diastolic: 75, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'can have just a respirations' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(respirations: 18, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'can have just a fio2' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(fio2: 28, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'can have just a liters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(liters: 2, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'can have just an intake' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(intake: 200, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'can have just a output' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(output: 0, service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'can have just a comment' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        Vital.create(comment: 'Normal vital signs', service_time: '2023-01-01 01:00:00 UTC', patient: patient, user: user)
        expect(Vital.count).to eq(1)
      }.not_to raise_error
    end

    it 'must have a temperature min of 10' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, temperature: 9, patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a temperature max of 45' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, temperature: 46, patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical temp' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, temperature: 'c', patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a heart rate max of 500' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, heart_rate: 501, patient: patient, user: user)
        expect(Vital.count).to eq(0)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical heart rate' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, heart_rate: 'c', patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a respirations max of 100' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, respirations: 101, patient: patient, user: user)
        expect(Vital.count).to eq(0)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical respirations' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, respirations: 'c', patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a systolic pressure max of 400' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, systolic: 401, patient: patient, user: user)
        expect(Vital.count).to eq(0)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical systolic' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, systolic: 'c', patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a diastolic pressure max of 400' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, diastolic: 401, patient: patient, user: user)
        expect(Vital.count).to eq(0)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical diastolic' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, temperature: 'c', patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a oxygen liters max of 100' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, liters: 101, patient: patient, user: user)
        expect(Vital.count).to eq(0)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical liters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, liters: 'c', patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an fio2 max of 100' do
      expect {  
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, fio2: 101, patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an fio2 min of 20' do
      expect {  
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, fio2: 19, patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical fio2' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, fio2: 'c', patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an intake max of 99,999' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, intake: 100000, patient: patient, user: user)
        expect(Vital.count).to eq(0)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an output max of 99,999' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, output: 100000, patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a comment with max 500 characters' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, comment: 'c' * 501, patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a service time' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, service_time: nil, patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'service time must be a date and time' do
      expect {
        user = FactoryBot.create(:user)
        patient = FactoryBot.create(:patient, user: user)
        FactoryBot.create(:vital, service_time: 'c', patient: patient, user: user)
        expect(Vital.count).to eq(0)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
