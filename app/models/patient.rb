class Patient < ApplicationRecord
  belongs_to :user
  has_many :admissions
  has_many :vitals
  has_many :allergies
  has_many :histories
  has_one_attached :image

  validates :first_name, presence: true, length: { minimum: 3, maximum: 64 }
  validates :last_name, presence: true, length: { minimum: 3, maximum: 64 }
  validates :date_of_birth, presence: true
  validates :bio_sex, presence: true, length: { minimum: 4, maximum: 6 }

  before_validation :date_must_be_a_date
  validate :date_smaller_than_current_date, on: :create

  private

  #Date of birth must be a valid date
  def date_must_be_a_date
    if self.date_of_birth == nil
      errors.add(:diagnosis_date, "must be a date")
    end
  end

  #Date of birth must be before current date
  def date_smaller_than_current_date
    if self.date_of_birth > Date.today
      errors.add(:diagnosis_date, "cannot be after today's date")
    end
  end
end