class User < ApplicationRecord
  has_many :sessions
  has_many :patients
  has_many :vitals
  has_many :admissions
  has_many :allergies
  has_many :histories

  validates :first_name, presence: true, length: { minimum: 3, maximum: 64 }
  validates :last_name, presence: true, length: { minimum: 3, maximum: 64 }
  validates :username, presence: true, length: { minimum: 3, maximum: 64 }
  validates :password, presence: true, length: { minimum: 8, maximum: 64 }
  validates :email, presence: true, length: { minimum: 5, maximum: 500 }

  validates_uniqueness_of :username
  validates_uniqueness_of :email

  after_validation :hash_password

  def needs_new_password
    return Date.parse(self.updated_at.to_s) + 93 <= Date.today
  end

  private 

  def hash_password
    self.password = BCrypt::Password.create(self.password)
  end
end
