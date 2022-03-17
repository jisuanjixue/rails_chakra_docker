# frozen_string_literal: true

class CreateMarkets < ActiveRecord::Migration[7.0]
  def change
    create_table(:markets) do |t|
      t.string(:name)
      t.string(:type)
      t.boolean(:is_show, default: true)
      t.string(:address, array: true, default: [])
      t.text(:remark)

      t.timestamps
    end
  end
end
