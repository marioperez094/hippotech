FactoryBot.define do
  factory :vital do
    temperature { 36.5 }
    temp_source { 'oral' }
    heart_rate { 80 }
    systolic { 115 }
    diastolic { 75 }
    respirations { 18 }
    o2_source { 'NC' }
    fio2 { 28 }
    liters { 2 }
    intake { 100 }
    output { 50 }
    comment { 'Normal vital signs' }
    service_time { '2023-01-01 01:00:00 UTC' }
  end
end
