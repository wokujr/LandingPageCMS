# frozen_string_literal: true
class CreateTeamImage < ActiveRecord::Migration[7.0]
  def change
    create_table :team_images, id: :uuid do |t|
      t.string :image
      t.references :team, foreign_keys: true, type: :uuid

      t.timestamps
    end
  end
end
