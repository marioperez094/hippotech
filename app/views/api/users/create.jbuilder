json.user do
  json.success true
  json.first_name @user.first_name
  json.last_name @user.last_name
  json.username @user.username
  json.email @user.email
end