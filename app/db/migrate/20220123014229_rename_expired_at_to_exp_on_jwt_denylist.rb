class RenameExpiredAtToExpOnJwtDenylist < ActiveRecord::Migration[7.0]
  def change
    rename_column :jwt_denylist, :expired_at, :exp
  end
end
