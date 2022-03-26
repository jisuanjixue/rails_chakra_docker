class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :phone
      t.string :avatar_url
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
