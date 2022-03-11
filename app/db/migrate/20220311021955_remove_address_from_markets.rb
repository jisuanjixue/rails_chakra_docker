class RemoveAddressFromMarkets < ActiveRecord::Migration[7.0]
  def change
    remove_column :markets, :address, :string
  end
end
