require 'rails_helper'

RSpec.describe Vital, type: :model do
  context 'create' do
    it 'must belong to a patient' do
      expect {
        Vital.create!(temperature: 36.5)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a temperature min of 10' do
      expect {
        FactoryBot.create(:vitals, temperature: 9)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a temperature max of 45' do
      expect {
        FactoryBot.create(:vitals, temperature: 46)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical temp' do
      expect {
        FactoryBot.create(:vitals, temperature: 'c')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a heart rate max of 500' do
      expect {
        FactoryBot.create(:vitals, heart_rate: 501)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical heart rate' do
      expect {
        FactoryBot.create(:vitals, heart_rate: 'c')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a respirations max of 100' do
      expect {
        FactoryBot.create(:vitals, respirations: 101)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical respirations' do
      expect {
        FactoryBot.create(:vitals, respirations: 'c')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a systolic pressure max of 400' do
      expect {
        FactoryBot.create(:vitals, systolic: 401 )
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical systolic' do
      expect {
        FactoryBot.create(:vitals, systolic: 'c')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a diastolic pressure max of 400' do
      expect {
        FactoryBot.create(:vitals, diastolic: 401 )
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical diastolic' do
      expect {
        FactoryBot.create(:vitals, diastolic: 'c')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a oxygen liters max of 15' do
      expect {
        FactoryBot.create(:vitals, liters: 16 )
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical liters' do
      expect {
        FactoryBot.create(:vitals, liters: 'c')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an fio2 max of 100' do
      expect {  
        FactoryBot.create(:vitals, liters: 16 )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an fio2 min of 20' do
      expect {  
        FactoryBot.create(:vitals, fio2: 19 )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical fio2' do
      expect {
        FactoryBot.create(:vitals, fio2: 'c')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an intake max of 99,999' do
      expect {
        FactoryBot.create(:vitals, intake: 100000 )
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an output max of 99,999' do
      expect {
        FactoryBot.create(:vitals, output: 100000 )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a comment with max 500 characters' do
      expect {
        FactoryBot.create(:vitals, comment: 'c' * 501)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
