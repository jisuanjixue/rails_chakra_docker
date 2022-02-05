# frozen_string_literal: true

# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  parent_id  :integer
#
class Category < ApplicationRecord
  has_closure_tree
  validates :name, presence: true, length: { maximum: 60 }
end
