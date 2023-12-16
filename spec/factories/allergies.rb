FactoryBot.define do
  factory :allergy do
    name { 'penicillin' }
    reaction { 'severe' }
    symptoms { 'anaphylaxis' }
  end
end
