FactoryBot.define do
  factory :admission do
    phone_number { '1234567890' }
    address { '1234 S. First St. Paris, France 12345' }
    occupation { 'unemployed' }
    admission_diagnosis { 'Shortness of breath' }
    code_status { 'Full' }
    diet { 'cardiac' }
    emergency_contact_name { 'Test Test' }
    relationship_to_patient { 'Spouse' }
    emergency_contact_number { '1234567890' }
  end
end