# frozen_string_literal: true

#
class CategorySerializer
  include JSONAPI::Serializer
  attributes :id, :name, :parent_id, :created_at, :updated_at
  set_id :parent_id
  attribute :created_date do |category|
    category.created_at && category.created_at.strftime("%d/%m/%Y")
    category.updated_at && category.updated_at.strftime("%d/%m/%Y")
  end
end
