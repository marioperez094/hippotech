class CreateAdmissions < ActiveRecord::Migration[6.1]
  def change
    create_table :admissions do |t|

      t.timestamps
    end
  end
end
