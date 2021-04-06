require 'sinatra'

get '/' do
  send_file 'index.html'
end
