# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit
  include Pundit::Authorization
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized
  protect_from_forgery with: :null_session

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

    def configure_permitted_parameters
      added_attrs = [:name, :email, :password]
      devise_parameter_sanitizer.permit(:sign_up, keys: added_attrs)
      devise_parameter_sanitizer.permit(:sign_in, keys: [:login, :password, :password_confirmation])
    end

    def not_authorized
      render(
        status: :forbidden,
        json: { error: "You are not authorized to perform this action." }
      )
    end
end
