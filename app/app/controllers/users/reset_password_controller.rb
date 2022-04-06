# frozen_string_literal: true

class Users::ResetPasswordController < ApplicationController
  def send
    @user = User.find_by(email: params[:email])
    UserMailer.with(user: @user).welcome_reset_password_instructions.deliver_now
  end
end
