# frozen_string_literal: true

# == Schema Information
#
# Table name: markets
#
#  id         :bigint           not null, primary key
#  address    :string           default([]), is an Array
#  area       :string
#  is_show    :boolean          default(TRUE)
#  name       :string
#  remark     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class MarketSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :area, :is_show, :address, :remark, :created_at, :updated_at

  attribute :created_date do |market|
    market.created_at && market.created_at.strftime("%d/%m/%Y")
    market.updated_at && market.updated_at.strftime("%d/%m/%Y")
  end
end
