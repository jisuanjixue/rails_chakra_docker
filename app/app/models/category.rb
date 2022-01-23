# frozen_string_literal: true

class Category < ApplicationRecord
  has_closure_tree
  validates :name, presence: true, length: { maximum: 60 }
end
