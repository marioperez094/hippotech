class Vital < ApplicationRecord
  belongs_to :patient
  belongs_to :user

  validates :temperature, numericality: { allow_nil: true, greater_than_or_equal_to: 10, less_than_or_equal_to: 45 }
  validates :heart_rate, numericality: { allow_nil: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 500 }
  validates :respirations, numericality: { allow_nil: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :systolic, numericality: { allow_nil: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 400 }
  validates :diastolic, numericality: { allow_nil: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 400 }
  validates :liters, numericality: { allow_nil: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :fio2, numericality: { allow_nil: true, greater_than_or_equal_to: 20, less_than_or_equal_to: 100 }
  validates :intake, numericality: { allow_nil: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 99999 }
  validates :output, numericality: { allow_nil: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 99999 }
  validates :comment, length: { maximum: 500 }
  validates :service_time, presence: true
end
