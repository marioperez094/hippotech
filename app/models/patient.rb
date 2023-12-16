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

  def date_must_be_a_date
    if self.date_of_birth == nil
      raise ArgumentError.new("Diagnosis date must be a date")
    end
  end

  def date_smaller_than_current_date
    if self.date_of_birth > Date.today
      raise ArgumentError.new("Diagnosis date cannot be after today's date")
    end
  end
end
