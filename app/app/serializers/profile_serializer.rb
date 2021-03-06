# frozen_string_literal: true

# == Schema Information
#
# Table name: profiles
#
#  id          :bigint           not null, primary key
#  avatar_url  :string
#  description :text
#  phone       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_profiles_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class ProfileSerializer
  include FastJsonapi::ObjectSerializer
  include Rails.application.routes.url_helpers

  attributes :id, :user_name, :phone, :avatar, :description, :created_at
  has_one :user

  def avatar
    # if object.avatar.attached?
    #   {
    #     url: rails_blob_url(object.avatar),
    #     signed_id: object.avatar.signed_id
    #   }
    # end
    return unless object.avatar.attached?

    object.avatar.blob.attributes
      .slice("filename", "byte_size")
      .merge(url: avatar_url)
      .tap { |attrs| attrs["name"] = attrs.delete("filename") }
  end

  def avatar_url
    url_for(object.avatar)
  end
end
