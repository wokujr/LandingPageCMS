class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.string :telephone
      t.string :email
      t.string :line
      t.string :instagram
      t.string :whatsapp
      t.string :facebook
      t.string :twitter
      t.string :linked

      t.timestamps
    end
  end
end
