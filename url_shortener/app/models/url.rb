class Url < ActiveRecord::Base
  before_validation :generate_short_url,  unless: :short_url
  
  validates :short_url, :long_url, presence: true
  validates :short_url, :long_url, uniqueness: true

  URL_SAFE_CHARS = ("0".."9").to_a.concat(('a'..'z').to_a).concat(('A'..'Z').to_a).concat(['-', '_'])

private
  def generate_short_url
    id = ActiveRecord::Base.connection.select_value(
                      'select last_value from urls_id_seq'
                        ).to_i + 1
    hash = ""
    while id > 0
      idx = id % URL_SAFE_CHARS.length
      hash.concat(URL_SAFE_CHARS[idx])
      id /= URL_SAFE_CHARS.length
    end
    self.short_url = hash
  end
end
