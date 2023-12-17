# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  {
  username: 'user',
  email: 'user@test.com',
  password: 'password',
  first_name: 'User',
  last_name: 'Name'
}
])

patients = Patient.create([{
  first_name: 'Test',
  last_name: 'Test',
  date_of_birth: '2000-01-01',
  bio_sex: 'male',
  user: users.first
}])

allergies = Allergy.create([{
  name: 'Penicillin',
  reaction: 'Severe',
  symptoms: 'Hives',
  user: users.first,
  patient: patients.first
}])

histories = History.create([{
  diagnosis: 'Diabetes Mellitus',
  diagnosis_date: '2005-02-02',
  user: users.first,
  patient: patients.first
}])

admissions = Admission.create([{
  phone_number: '1234567890',
  address: '1234 s. first st. Somewhere, UK 12345',
  occupation: 'unemployed',
  diagnosis: 'Diabetes Ketone Acidosis',
  code_status: 'Full',
  diet: 'Carb Consistent',
  emergency_contact: 'User Test',
  emergency_relationship: 'Mother',
  emergency_phone: '0987654321',
  patient: patients.first,
  user: users.first
}])
