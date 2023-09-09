class CreateTeam < ActiveRecord::Migration[7.0]
  def change
    create_table :teams, id: :uuid do |t|
      t.string :name
      t.string :title

      t.timestamps
    end
  end
end
