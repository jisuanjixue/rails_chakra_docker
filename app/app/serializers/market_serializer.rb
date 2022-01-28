# frozen_string_literal: true

class MarketSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :type, :is_show, :address, :remark, :created_at, :updated_at

  attribute :created_date do |market|
    market.created_at && market.created_at.strftime("%d/%m/%Y")
    market.updated_at && market.updated_at.strftime("%d/%m/%Y")
  end
end
