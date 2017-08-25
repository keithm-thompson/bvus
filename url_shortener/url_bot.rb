require 'nokogiri'
require 'open-uri'
require 'net/http'
require 'json'

def populate
  num = rand(20)
  doc = Nokogiri::HTML(open("https://www.google.com/search?source=hp&q=#{num}&oq=2&gs_l=psy-ab.3..35i39k1l2j0j0i131k1.836.836.0.1119.2.1.0.0.0.0.249.249.2-1.1.0....0...1.1.64.psy-ab..1.1.249.0.z8rOsIfuzGY"))
  links = get_links(doc)
  add_links_to_app(links)
end

def get_links(doc)
  links = []
  doc.xpath("//cite").each do |link|
    url = link.child.to_s
    links << url if url.include?(".")
  end
  links
end

def add_links_to_app(links)
  uri = URI('http://bvus.herokuapp.com/api/urls')
  req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
  links.each do |link|
    req.body = { long_url: link }.to_json
    Net::HTTP.start(uri.hostname, uri.port) do |http|
      http.request(req)
    end
    sleep(5)
  end
end

counter = 0
until counter > 50
  puts "populating"
  populate
  counter += 1
end
