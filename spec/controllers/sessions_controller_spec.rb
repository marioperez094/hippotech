require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  render_views 
  
  describe 'POST /sessions' do
    it 'renders new session object' do
      FactoryBot.create(:user, username: 'test', password: 'asdasdasd')

      post :create, params: {
        user: {
          username: 'test',
          password: 'asdasdasd'
        }
      }

      expect(response.body).to eq({
        success: true
      }.to_json)
    end
  end

  describe 'DELETE /sessions' do
    it 'renders success' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['hippotech_session_token'] = session.token

      delete :destroy

      expect(user.sessions.count).to be(0)
    end
  end

end