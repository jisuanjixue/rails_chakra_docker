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

  enum type: { p_area: "p_area", s_area: "s_area" }, _default: "p_area"

  validates :name, uniqueness: true, presence: true, length: { maximum: 60 }
  validates :type, presence: true
  validates :is_show, presence: true
end
