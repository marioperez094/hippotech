json.histories do
  json.array! @histories do |history|
    json.id history.id
    json.diagnosis history.diagnosis
    json.diagnosis_date history.diagnosis_date
  end
end