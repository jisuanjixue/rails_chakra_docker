# frozen_string_literal: true

# == Schema Information
#
# Table name: documents
#
#  id                :bigint           not null, primary key
#  content_type      :string
#  documentable_type :string
#  name              :string           not null
#  url               :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  documentable_id   :integer
#
require "test_helper"

class DocumentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
