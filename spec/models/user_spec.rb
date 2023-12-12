require 'rails_helper'

RSpec.describe User, type: :model do
  context 'create' do
    it 'should have many sessions' do
      user = User.create(
        email: 'test@test.com',
        password: 'asdasdasd',
        username: 'test',
        first_name: 'test',
        last_name: 'test'
      )
      expect(user.sessions).to eq([])
    end

    it 'must have an email' do
      expect {
        User.create(
          email: nil,
          password: 'asdasdasd',
          username: 'test',
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a username' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: nil,
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end
    
    it 'must have a password' do
      expect {
        User.create(
          email: 'test@test.com',
          password: nil,
          username: 'test',
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end
    
    it 'must have a first name' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'test',
          first_name: nil,
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'test',
          first_name: 'test',
          last_name: nil
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a password' do
      expect {
        User.create(
          email: 'test@test.com',
          password: nil,
          username: 'test',
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a username with min 3 characters' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'c' * 2,
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a username with max 64 characters' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'c' * 65,
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a password with min 8 characters' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'c' * 7,
          username: 'test',
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a password with max 64 characters' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'c' * 65,
          username: 'test',
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end
    
    it 'must have a first name with min 3 characters' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'test',
          first_name: 't' * 2,
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a first name with max 64 characters' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'test',
          first_name: 't' * 65,
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name with min 3 characters' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'test',
          first_name: 'test',
          last_name: 't' * 2
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have a last name with max 64 characters' do
      expect {
        User.create(
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'test',
          first_name: 'test',
          last_name: 't' * 65
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end
    
    it 'must have an email with min 5 characters' do
      expect {
        User.create(
          email: 't' * 4,
          password: 'asdasdasd',
          username: 'test',
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    it 'must have an email with max 500 characters' do
      expect {
        User.create(
          email: 't' * 501,
          password: 'asdasdasd',
          username: 'test',
          first_name: 'test',
          last_name: 'test'
        ).to raise_error(ActiveRecord::RecordInvalid)
      }
    end

    #it 'must have a unique username' do
      #User.create(
          #email: 'test@test.com',
          #password: 'asdasdasd',
          #username: 'unique',
          #first_name: 'test',
          #last_name: 'test'
        #)

        #expect {
          #User.create(
            #email: 'test@test.com',
            #password: 'asdasdasd',
            #username: 'unique',
            #first_name: 'test',
            #last_name: 'test'
          #)
        #}.to raise_error(ActiveRecord::RecordInvalid)
    #end

    #it 'must have a unique email' do
      #User.create(
          #email: 'unique@test.com',
          #password: 'asdasdasd',
          #username: 'test',
          #first_name: 'test',
          #last_name: 'test'
        #)

        #expect {
          #User.create(
            #email: 'unique@test.com',
            #password: 'asdasdasd',
            #username: 'test',
            #first_name: 'test',
            #last_name: 'test'
          #)
        #}.to raise_error(ActiveRecord::RecordInvalid)
    #end
      
  end
end
