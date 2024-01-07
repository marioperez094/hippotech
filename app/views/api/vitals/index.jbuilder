json.vitals do
  json.array! @vitals do |vital|
    json.id vital.id
    json.temperature vital.temperature
    json.temp_source vital.temp_source
    json.heart_rate vital.heart_rate
    json.systolic vital.systolic
    json.diastolic vital.diastolic
    json.respirations vital.respirations
    json.o2_source vital.o2_source
    json.fio2 vital.fio2
    json.liters vital.liters
    json.intake vital.intake
    json.output vital.output
    json.comment vital.comment
    json.service_time vital.service_time
  end
end