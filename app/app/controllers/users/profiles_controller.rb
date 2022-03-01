# frozen_string_literal: true

class Users::ProfilesController < ApplicationController
    # before_action :authenticate_user!

    def create
      profile = Profile.new(profile_params)
      if profile.save
      render(json: {
        status: { code: 200, message: "创建成功" },
        data: { profile: ProfileSerializer.new(profile).serializable_hash }
      })
    end

    private

    def profile_params
      params.require(:profile).permit(:user_name, :phone, :description, :avatar, :user_id)
    end

  end