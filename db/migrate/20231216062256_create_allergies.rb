class CreateAllergies < ActiveRecord::Migration[6.1]
  def change
    create_table :allergies do |t|
      t.string :name
      t.string :reaction
      t.string :symptoms
      t.belongs_to :patient, index: true, foreign_key: true
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
