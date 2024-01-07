class Allergy < ApplicationRecord
  belongs_to :patient
  belongs_to :user

  validates :name, presence: true, length: { minimum: 3, maximum: 20 }
  validates :reaction, presence: true, length: { minimum: 4, maximum: 10 }
  validates :symptoms, presence: true, length: { minimum: 3, maximum: 500 }

end
