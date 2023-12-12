require 'rails_helper'

RSpec.describe 'Route Definition', :type => :routing do
  it 'of POST /sessions' do
    expect(:post => '/api/sessions').to route_to(:controller => 'api/sessions', :action => 'create')
  end

  it 'of DELETE /sessions' do
    expect(:delete => '/api/sessions').to route_to(:controller => 'api/sessions', :action => 'destroy')
  end

  it 'of POST /users' do
    expect(:post => '/api/users').to route_to(:controller => 'api/users', :action => 'create')
  end

  it 'of Post /patients' do
    expect(:post => '/api/patients').to route_to(:controller => 'api/patients', :action => 'create')
  end
end