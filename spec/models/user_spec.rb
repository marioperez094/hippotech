require 'rails_helper'

RSpec.describe User, type: :model do
  context 'create' do
    it 'should have many sessions' do
      user = FactoryBot.create(:user)
      expect(user.sessions).to eq([])
    end

    it 'must have an email' do
      expect {
        FactoryBot.create(:user, email: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a username' do
      expect {
        FactoryBot.create(:user, username: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a password' do
      expect {
        FactoryBot.create(:user, password: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a first name' do
      expect {
        FactoryBot.create(:user, first_name: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a last name' do
      expect {
        FactoryBot.create(:user, last_name: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a username with min 3 characters' do
      expect {
        FactoryBot.create(:user, username: 'c' * 2)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a password with min 8 characters' do
      expect {
        FactoryBot.create(:user, password: 'c' * 7)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a last name with min 5 characters' do
      expect {
        FactoryBot.create(:user, email: 'c' * 4)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a first name with min 3 characters' do
      expect {
        FactoryBot.create(:user, first_name: 'c' * 2)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a last name with min 3 characters' do
      expect {
        FactoryBot.create(:user, last_name: 'c' * 2)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a username with max 64 characters' do
      expect {
        FactoryBot.create(:user, username: 'c' * 65)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a password with max 64 characters' do
      expect {
        FactoryBot.create(:user, password: 'c' * 65)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a email with max 500 characters' do
      expect {
        FactoryBot.create(:user, email: 'c' * 501)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a first name with max 64 characters' do
      expect {
        FactoryBot.create(:user, first_name: 'c' * 65)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a last name with max 64 characters' do
      expect {
        FactoryBot.create(:user, last_name: 'c' * 65)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a unique email' do
      FactoryBot.create(:user, email: 'unique@test.com')

      expect {
        FactoryBot.create(:user, email: 'unique@test.com')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a unique username' do
      FactoryBot.create(:user, username: '12345678')

      expect {
        FactoryBot.create(:user, username: '12345678')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end