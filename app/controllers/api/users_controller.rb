module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render "api/users/create"
      else
        render json: { 
          error: @user.errors 
        }, status: :bad_request
      end
    end

    def password_reset
      if !current_session
        return render json: {
          authenticated: false
        }
      end

      @user = current_session.user
      return render json: { error: "User not found." }, status: :not_found if !@user

      render json: { success: true } if @user&.update(password: params[:user][:password])
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :username, :password, :new_password)
    end
  end
end