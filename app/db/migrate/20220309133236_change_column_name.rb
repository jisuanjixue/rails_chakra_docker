# frozen_string_literal: true

class ChangeColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column(:markets, :type, :area)
  end
end
