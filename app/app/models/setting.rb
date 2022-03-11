# == Schema Information
#
# Table name: settings
#
#  id         :bigint           not null, primary key
#  value      :text
#  var        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_settings_on_var  (var) UNIQUE
#
class Setting < RailsSettings::Base
  # cache_prefix { "v1" }

  # Define your fields
  # field :host, type: :string, default: "http://localhost:3000"
  # field :default_locale, default: "en", type: :string
  # field :confirmable_enable, default: "0", type: :boolean
  # field :admin_emails, default: "admin@rubyonrails.org", type: :array
  # field :omniauth_google_client_id, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_ID"] || ""), type: :string, readonly: true
  # field :omniauth_google_client_secret, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_SECRET"] || ""), type: :string, readonly: true

  # class << self
  #   def has_module?(name)
  #     return true if modules.blank? || modules.include?("all")
  #     modules.map { |str| str.strip }.include?(name.to_s)
  #   end
  # end

  field :wechat_api_id, default:  Figaro.env.OMNIAUTH_OPEN_WECHAT_APP_ID, type: :string, readonly: true
  field :wechat_api_secret, default: Figaro.env.OMNIAUTH_OPEN_WECHAT_APP_SECRET, type: :string, readonly: true

end
