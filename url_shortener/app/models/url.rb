class Url < ActiveRecord::Base
  before_validation :generate_short_url,  unless: :short_url

  validates :short_url, :long_url, presence: true
  validates :short_url, :long_url, uniqueness: true

  URL_SAFE_CHARS = ("0".."9").to_a.concat(('a'..'z').to_a).concat(('A'..'Z').to_a).concat(['-', '_'])

  DOMAINS_FOR_ENV = {
    'development' => ['localhost.com'],
    'production' => ['bvus.herokuapp.com']
  }

  def self.create_uri(url)
    if url.index("http") != 0
      url = "http://" + url
    end
    URI(url)
  end

  def self.extract_short_hash(url)
    uri = create_uri(url)
    uri.path.split("/")[1]
  end

  def self.valid_short_url_host?(url)
    uri = create_uri(url)
    DOMAINS_FOR_ENV[Rails.env].any? {|domain| domain.include?(uri.host) }
  end

private
  def generate_short_url
    id = ActiveRecord::Base.connection.select_value(
                      'select last_value from urls_id_seq'
                        ).to_i + 2
    hash = ""
    while id > 0
      idx = id % URL_SAFE_CHARS.length
      hash.concat(URL_SAFE_CHARS[idx])
      id /= URL_SAFE_CHARS.length
    end
    self.short_url = hash
  end
end
