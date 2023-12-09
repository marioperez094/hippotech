json.user do
  json.user_id @user.id
  json.user_first_name @user.first_name
  json.user_last_name @user.last_name
  json.username @user.username
  json.email @user.email
end