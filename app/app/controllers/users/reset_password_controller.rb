class Users::ResetPassword < ApplicationController

    def send
        user = User.new(email: params[:email])
        user.save
        UserMailer.welcome_reset_password_instructions(user).deliver
    end
end