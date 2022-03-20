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
class Market < ApplicationRecord
  # enum area: { p_area: '0', s_area: '1' }

  validates :name, uniqueness: true, presence: true, length: { maximum: 60 }
  validates :area, presence: true
  validates :is_show, inclusion: { in: [ true, false ] }
  # validates :address, presence: true
end
