class Patient < ApplicationRecord
  belongs_to :user
  has_many :admissions
  has_many :vitals
  has_many :allergies
  has_one_attached :image

  validates :first_name, presence: true, length: { minimum: 3, maximum: 64 }
  validates :last_name, presence: true, length: { minimum: 3, maximum: 64 }
  validates :date_of_birth, presence: true
  validates :bio_sex, presence: true, length: { minimum: 4, maximum: 6 }
end
