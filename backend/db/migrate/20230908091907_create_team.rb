class CreateTeam < ActiveRecord::Migration[7.0]
  def change
    create_table :teams, id: :uuid do |t|
      t.string :name
      t.string :title
      t.binary :image

      t.timestamps
    end
  end
end
