# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  name                   :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
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

  validates :email, uniqueness: true
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates_format_of :name, with: /^[a-zA-Z0-9_\.]*$/, multiline: true
  validates :password, presence: true, on: :create

  validate :validate_name
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :jwt_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, jwt_revocation_strategy: JwtDenylist, authentication_keys: [:login]

  def login
    @login || self.name || self.email
  end

  def validate_name
    if User.where(email: name).exists?
      errors.add(:name, :invalid)
    end
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if (login = conditions.delete(:login))
      where(conditions.to_h).where(
        ["lower(name) = :value OR lower(email) = :value",
        { value: login.downcase }]).first
    elsif conditions.has_key?(:name) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
  end

  self.skip_session_storage = [:http_auth, :params_auth]
end
