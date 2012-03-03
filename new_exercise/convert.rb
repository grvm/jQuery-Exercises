#!/home/gaurav/.rvm/rubies/ruby-1.9.2-p136/bin/ruby

require 'json'

file = File.open("lib/product_data.csv", "r")
hash = {}
file.readlines.each do |line|
		values = line.gsub!("\n","").split(',')
		hash[values[0]] =  values
end
file.close

f = File.new("lib/product_data.json", "w")

f.write(hash.to_json)