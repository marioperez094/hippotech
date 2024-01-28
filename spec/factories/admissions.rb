FactoryBot.define do
  factory :admission do
    phone_number { '1234567890' }
    address { '1234 S. First St. Paris, France 12345' }
    occupation { 'unemployed' }
    diagnosis { 'Shortness of breath' }
    code_status { 'Full' }
    diet { 'cardiac' }
    emergency_contact { 'Test Test' }
    emergency_relationship { 'Spouse' }
    emergency_phone { '1234567890' }
  end
end