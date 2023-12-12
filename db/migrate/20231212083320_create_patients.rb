class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|

      t.string :first_name
      t.string :last_name
      t.date :date_of_birth
      t.string :bio_sex
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
