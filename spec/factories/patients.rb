FactoryBot.define do
  factory :patient do
    first_name { 'test' }
    last_name { 'test' }
    date_of_birth { '2023-01-31' }
    bio_sex { 'male' }
  end
end