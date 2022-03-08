# frozen_string_literal: true

# == Schema Information
#
# Table name: markets
#
#  id         :integer          not null, primary key
#  address    :string           default([]), not null
#  is_show    :boolean          default(TRUE)
#  name       :string
#  remark     :text
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Market < ApplicationRecord
  attr_accessor :id, :name, :type, :is_show, :address, :remark

  serialize :address, Array

  enum type: { p_area: "产区", s_area: "销区" }, _default: "产区"

  validates :name, uniqueness: true, presence: true, length: { maximum: 60 }
  validates :type, presence: true
  validates :is_show, presence: true
end
