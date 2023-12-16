json.allergies do
  json.array! @allergies do |allergy|
    json.id allergy.id
    json.name allergy.name
    json.reaction allergy.reaction
    json.symptoms allergy.symptoms
  end
end