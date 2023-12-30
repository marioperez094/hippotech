# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([{
  username: 'user',
  email: 'user@test.com',
  password: 'password',
  first_name: 'User',
  last_name: 'Name'
}])

patients = Patient.create([{
  first_name: 'Test',
  last_name: 'Test',
  date_of_birth: '2000-01-01',
  bio_sex: 'male',
  user: users.first
}, {
  first_name: 'Est2',
  last_name: 'Est2',
  date_of_birth: '2001-01-01',
  bio_sex: 'female',
  user: users.first
}])

allergies = Allergy.create([{
  name: 'Penicillin',
  reaction: 'Severe',
  symptoms: 'Hives',
  user: users.first,
  patient: patients.first
},{
  name: 'Tylenol',
  reaction: 'Mild',
  symptoms: 'Stomach upset',
  user: users.first,
  patient: patients.first
},{
  name: 'Iodine',
  reaction: 'Severe', 
  symptoms: 'Hives', 
  user: users.first,
  patient: patients.first
},{
  name: 'Sulfa Antibiotics',
  reaction: 'Severe', 
  symptoms: 'Hives', 
  user: users.first,
  patient: patients.first
},{
  name: 'Cepholasporins',
  reaction: 'Severe', 
  symptoms: 'Hives', 
  user: users.first,
  patient: patients.first
},{
  name: 'Morphine',
  reaction: 'Severe', 
  symptoms: 'Hives', 
  user: users.first,
  patient: patients.first
}])

histories = History.create([{
  diagnosis: 'Diabetes Mellitus',
  diagnosis_date: '2005-02-02',
  patient: patients.first,
  user: users.first
},{
  diagnosis: 'Congestive Heart Failure',
  diagnosis_date: '2005-02-02',
  patient: patients.first,
  user: users.first
},{
  diagnosis: 'Coronary Artery Disease',
  diagnosis_date: '2005-02-02',
  patient: patients.first,
  user: users.first
},{
  diagnosis: 'Hyperlipedemea',
  diagnosis_date: '2005-02-02', 
  user: users.first,
  patient: patients.first
},{
  diagnosis: 'Asthma',
  diagnosis_date: '2005-02-02',
  user: users.first,
  patient: patients.first
}])

admissions = Admission.create([{
  phone_number: '1234567890',
  address: '1234 s. first st. Somewhere, UK 12345',
  occupation: 'unemployed',
  diagnosis: 'Diabetic Ketone Acidosis',
  code_status: 'Full',
  diet: 'Carb Consistent',
  emergency_contact: 'User Test',
  emergency_relationship: 'Mother',
  emergency_phone: '0987654321',
  patient: patients.first,
  user: users.first
}, {
  phone_number: '1111111111',
  address: '1111 s. second st. Somewhere, UK 11111',
  occupation: 'Web Developer',
  diagnosis: 'Seizures',
  code_status: 'Full',
  diet: 'Regular',
  emergency_contact: 'Test User',
  emergency_relationship: 'Father',
  emergency_phone: '2222222222',
  patient: patients.second,
  user: users.first
}, {
  phone_number: '1111111111',
  address: '1111 s. second st. Somewhere, UK 11111',
  occupation: 'Web Developer',
  diagnosis: 'Seizures',
  code_status: 'Full',
  diet: 'Regular',
  emergency_contact: 'Test User',
  emergency_relationship: 'Father',
  emergency_phone: '2222222222',
  patient: patients.second,
  user: users.first
}])


vitals = Vital.create([{
  temperature: 36.5,
    temp_source: 'oral',
    heart_rate: 80,
    systolic: 115,
    diastolic: 75,
    respirations: 18,
    o2_source: 'NC',
    fio2: 28,
    liters: 2,
    intake: 100,
    output: 50,
    comment: 'Normal vital signs',
    service_time: '2023-12-29 01:00:00 UTC',
    patient: patients.first,
    user: users.first
    

},{
  temperature: 36.5,
    temp_source: 'oral',
    heart_rate: 80,
    systolic: 115,
    diastolic: 75,
    respirations: 18,
    o2_source: 'NC',
    fio2: 28,
    liters: 2,
    intake: 100,
    output: 50,
    comment: 'Normal vital signs',
    service_time: '2023-12-29 03:00:00 UTC',
    patient: patients.first,
    user: users.first

},{
  temperature: 36.5,
    temp_source: 'oral',
    heart_rate: 80,
    systolic: 115,
    diastolic: 75,
    respirations: 18,
    o2_source: 'NC',
    fio2: 28,
    liters: 2,
    intake: 100,
    output: 50,
    comment: 'Normal vital signs',
    service_time: '2023-12-29 02:00:00 UTC',
    patient: patients.first,
    user: users.first

},{
    temperature: 38,
    temp_source: 'oral',
    heart_rate: 80,
    systolic: 115,
    diastolic: 75,
    respirations: 18,
    o2_source: 'NC',
    fio2: 28,
    liters: 2,
    intake: 100,
    output: 50,
    comment: 'Normal vital signs',
    service_time: '2023-12-29 23:00:00 UTC',
    patient: patients.first,
    user: users.first
},{
  temperature: 39.1,
    temp_source: 'oral',
    heart_rate: 80,
    systolic: 115,
    diastolic: 75,
    respirations: 18,
    o2_source: 'NC',
    fio2: 28,
    liters: 2,
    intake: 100,
    output: 50,
    comment: 'Normal vital signs',
    service_time: '2023-12-29 23:58:00 UTC',
    patient: patients.first,
    user: users.first
}])