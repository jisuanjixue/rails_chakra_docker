# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  name                   :string           not null
#  provider               :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  role                   :integer          default("user")
#  uid                    :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  attr_writer :login
  enum role: [:user, :vip, :admin]

  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :user
  end

  has_one :profile, dependent: :destroy

  validates :email, uniqueness: true
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates_format_of :name, with: /^[a-zA-Z0-9_\.]*$/, multiline: true
  validates :password, presence: true, on: :create

  validate :validate_name
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, :database_authenticatable, :jwt_authenticatable, :registerable, :recoverable, :rememberable, :validatable, jwt_revocation_strategy: JwtDenylist, authentication_keys: [:login], omniauth_providers: [:wechat]


  def login
    @login || self.name || self.email
  end

  def validate_name
    if User.where(email: name).exists?
      errors.add(:name, :invalid)
    end
  end

  # def update_without_current_password(params, *options)
  #   params.delete(:current_password)

  #   if params[:password].blank? && params[:password_confirmation].blank?
  #     params.delete(:password)
  #     params.delete(:password_confirmation)
  #   end

  #   result = update_attributes(params, *options)
  #   clean_up_passwords
  #   result
  # end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.nickname = auth.extra.raw_info.nickname
      user.token = auth.credentials.token
      user.openid = auth.extra.raw_info.openid
      user.headimgurl = auth.extra.raw_info.headimgurl   # assuming the user model has a name
      user.sex = auth.extra.raw_info.sex   # assuming the user model has a name
      user.city = auth.extra.raw_info.city   # assuming the user model has a name
      user.province = auth.extra.raw_info.province   # assuming the user model has a name
      user.headimgurl = auth.extra.raw_info.headimgurl   # assuming the user model has a name
      # user.image = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails, 
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if (login = conditions.delete(:login))
      where(conditions.to_h).where(
        [
          "lower(name) = :value OR lower(email) = :value",
        { value: login.downcase }
        ]
).first
    elsif conditions.has_key?(:name) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
  end

  self.skip_session_storage = [:http_auth, :params_auth]
end
