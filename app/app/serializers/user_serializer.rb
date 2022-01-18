class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :email, :created_at

  attribute :created_date do |user|
    user.created_at && user.created_at.strftime('%d/%m/%Y')
  end
end
