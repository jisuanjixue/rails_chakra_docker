# == Schema Information
#
# Table name: profiles
#
#  id          :bigint           not null, primary key
#  avatar      :string
#  description :text
#  phone       :string
#  user_name   :string
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
class Profile < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar 
  before_create :set_defaults

  validates :avatar, file_size: { less_than_or_equal_to: 5.megabytes },
              file_content_type: { allow: ['image/jpeg', 'image/png', 'image/gif'] }

  validates :user_name, presence: true
  validates :phone,      presence: true
  validates :description, length: { maximum: 300 }


  def set_defaults
    if self.new_record?
      self.avatar = Rack::Test::UploadedFile.new(
        Rails.root.join('app/assets/images/avatar.png'),
        'image/png',
      )
    end
  end
end
