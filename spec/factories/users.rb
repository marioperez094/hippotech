FactoryBot.define do
  factory :user do
    email { 'test@test.com' }
    username { 'testtest' }
    password { 'testtest' }
    first_name { 'test' }
    last_name { 'test' }
  end
end