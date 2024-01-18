module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create'
      else
        render json: { 
          error: @user.errors 
        }, status: :bad_request
      end
    end

    def password_reset
      @user = User.find_by(username: params[:user][:username])

    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :username, :password, :new_password)
    end
  end
end