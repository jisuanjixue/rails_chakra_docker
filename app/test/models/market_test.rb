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
require "test_helper"

class MarketTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
