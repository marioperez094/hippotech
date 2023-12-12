require 'rails_helper'

RSpec.describe Session, type: :model do
  context '.create' do
    it 'must belong to a user' do
      expect {
        Session.create!
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
    
    it 'should automatically generate a new token' do
      user = User.create(
        email: 'test@test.com',
        password: 'asdasdasd',
        username: 'test',
        first_name: 'test',
        last_name: 'test'
      )
      session = user.sessions.create

      expect(session.token).not_to be_nil
    end
  end
end
