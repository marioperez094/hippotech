require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::UsersController, type: :controller do
  render_views

  context 'POST /users' do
    it 'renders new user object' do
      post :create, params: {
        user: {
          email: 'test@test.com',
          password: 'asdasdasd',
          username: 'test',
          first_name: 'test',
          last_name: 'test'
        }
      }

      expect(response.body).to eq({
        user: {
          first_name: 'test',
          last_name: 'test',
          username: 'test',
          email: 'test@test.com'
        }
      }.to_json)
    end
  end
end