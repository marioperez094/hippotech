module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create'
      else
        render json: { 
          success: false,
          error: @user.errors.full_messages 
        }
      end
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :username, :password)
    end
  end
end