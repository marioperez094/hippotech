class CreateVitals < ActiveRecord::Migration[6.1]
  def change
    create_table :vitals do |t|
      t.decimal :temperature
      t.string :temp_source
      t.integer :heart_rate
      t.integer :systolic
      t.integer :diastolic
      t.integer :respirations
      t.string :o2_source
      t.integer :fio2
      t.integer :liters
      t.integer :intake
      t.integer :output
      t.string :comment
      t.datetime :service_time
      t.belongs_to :patient, index: true, foreign_key: true
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
