module Api
  class SessionsController < ApplicationController
    def create
      #Username to find user
      @user = User.find_by(username: params[:user][:username])

      if @user && (BCrypt::Password.new(@user.password) == params[:user][:password])
        session = @user.sessions.create
        #User logged out after browser closing for privacy
        cookies.signed[:hippotech_session_token] = {
          value: session.token,
          httponly: true
        }

        render 'api/sessions/create'
      else
        render json: {
          success: false,
          error: 'Invalid username or password.'
        }
      end
    end

    def authenticated
      token = cookies.signed[:hippotech_session_token]
      session = Session.find_by(token: token)

      if session
        @user = session.user
        render 'api/sessions/authenticated'
      else
        render json: {
          authenticated: false
        }
      end
    end

    def destroy
      token = cookies.signed[:hippotech_session_token]
      session = Session.find_by(token: token)

      if session&.destroy
        render json: {
          success: true
        }
      end
    end

  end
end