class Users::UpdateUserController < ApplicationController
  before_action :authenticate_user!

    def update
      if current_user.update(user_params)
        render(
          status: :ok,
          json: { data: current_user }
        )
      else
        error = current_user.errors.full_messages.to_sentence
        render(status: :unprocessable_entity, json: { error: })
      end
    end

    protected

    def user_params
      params.permit(:name, :email, :provider, :role, :uid)
    end

end