# frozen_string_literal: true

class Users::ProfilesController < ApplicationController
  before_action :authenticate_user!

  def upload
    profile = current_user.profile

    profile.avatar.attach(params[:file])
    render(
      status: :ok,
      json: { data: profile.avatar_url }
    )
  end

  def update
    @profile = current_user.profile
    if @profile.update(profile_params)
      render(
        status: :ok,
        json: { data: profile }
      )
    else
      error = profile.errors.full_messages.to_sentence
      render(status: :unprocessable_entity, json: { error: })
    end
  end

  def update_anme
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

    def profile_params
      params.require(:profile).permit(:avatar, :phone, :description, :avatar_url)
    end

    def user_params
      params.permit(:name)
    end
end
