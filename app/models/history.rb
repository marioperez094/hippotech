class History < ApplicationRecord
  belongs_to :patient
  belongs_to :user

  validates :diagnosis, presence: true, length: { minimum: 3, maximum: 20 }
  validates :diagnosis_date, presence: true

  before_validation :date_must_be_a_date
  validate :date_smaller_than_current_date, on: :create

  private

  #Input must be a valid date or error
  def date_must_be_a_date
    if self.diagnosis_date == nil
      raise ArgumentError.new("Diagnosis date must be a date")
    end
  end

  #Diagnosis date must be before current date
  def date_smaller_than_current_date
    if self.diagnosis_date > Date.today
      raise ArgumentError.new("Diagnosis date cannot be after today's date")
    end
  end
end
