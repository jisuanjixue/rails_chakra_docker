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
require "test_helper"

class MarketTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
