json.vital do
  json.id @vital.id
  json.temperature @vital.temperature
  json.temp_source @vital.temp_source
  json.heart_rate @vital.heart_rate
  json.systolic @vital.systolic
  json.diastolic @vital.diastolic
  json.respirations @vital.respirations
  json.o2_source @vital.o2_source
  json.fio2 @vital.fio2
  json.liters @vital.liters
  json.intake @vital.intake
  json.output @vital.output
  json.comment @vital.comment
  json.service_time @vital.service_time

  json.patient do
    json.patient_id @vital.patient.id
    json.first_name @vital.patient.first_name
    json.last_name @vital.patient.last_name
  end

  json.user do
    json.user_first_name @vital.user.first_name
    json.user_last_name @vital.user.last_name
  end
end