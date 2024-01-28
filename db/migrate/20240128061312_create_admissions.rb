class CreateAdmissions < ActiveRecord::Migration[6.1]
  def change
    create_table :admissions do |t|
      t.string :phone_number
      t.string :address
      t.string :occupation
      t.string :admission_diagnosis
      t.string :code_status
      t.string :diet
      t.string :emergency_contact_name
      t.string :relationship_to_patient
      t.string :emergency_contact_number
      t.boolean :discharge, default: false
      t.belongs_to :patient, index: true, foreign_key: true
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end