class Admission < ApplicationRecord
  belongs_to :patient
  belongs_to :user

  validates :phone_number, numericality: true, presence: true, length: { minimum: 10, maximum: 15 }
  validates :address, presence: true, length: { minimum: 10, maximum: 150 }
  validates :occupation, presence: true, length: { minimum: 3, maximum: 20 }
  validates :admission_diagnosis, presence: true, length: { minimum: 3, maximum: 50 }
  validates :code_status, presence: true, length: { minimum: 3, maximum: 10 }
  validates :diet, length: { maximum: 25 }
  validates :emergency_contact_name, presence: true, length: { minimum: 3, maximum: 50 }
  validates :relationship_to_patient, presence: true, length: { minimum: 3, maximum: 20 }
  validates :emergency_contact_number, numericality: true, presence: true, length: { minimum: 10, maximum: 15 }
end