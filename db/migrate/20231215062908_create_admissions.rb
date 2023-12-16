class CreateAdmissions < ActiveRecord::Migration[6.1]
  def change
    create_table :admissions do |t|
      t.string :phone_number
      t.string :address
      t.string :occupation
      t.string :diagnosis
      t.string :code_status
      t.string :diet
      t.string :emergency_contact
      t.string :emergency_relationship
      t.string :emergency_phone
      t.boolean :discharge, default: false
      t.belongs_to :patient, index: true, foreign_key: true
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
