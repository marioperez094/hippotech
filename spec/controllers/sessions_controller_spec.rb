require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  render_views 
  
  describe 'POST /sessions' do
    it 'renders new session object' do
      user = User.create(
        email: 'test@test.com',
        password: 'asdasdasd',
        username: 'test',
        first_name: 'test',
        last_name: 'test'
      )

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
    it 'renders delete session object' do
      user = User.create(
        email: 'test@test.com',
        password: 'asdasdasd',
        username: 'test',
        first_name: 'test',
        last_name: 'test'
      )

      post :create, params: {
        user: {
          username: 'test',
          password: 'asdasdasd'
        }
      }

      post :destroy

      expect(response.body).to eq({ 
        success: true 
      }.to_json)
    end
  end

end


#describe 'DELETE /sessions' do
  #it 'renders success'
    #user = User.create(
      #email: 'test@test.com',
      #password: 'asdasdasd',
      #username: 'test',
      #first_name: 'test',
      #last_name: 'test'
    #)
    #session = user.sessions.create

    #delete :destroy

    #expect(response.body).to eq({ success: true }.to_json)
  #end
#end