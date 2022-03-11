class AddAddressToMarkets < ActiveRecord::Migration[7.0]
  def change
    add_column :markets, :address, :string, array: true, default: []
  end
end
