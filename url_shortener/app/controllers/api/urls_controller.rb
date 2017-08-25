require 'uri'

class Api::UrlsController < ApplicationController
  DOMAINS_FOR_ENV = {
    'development' => ['localhost.com'],
    'production' => ['bvus.herokuapp.com']
  }
  before_action :verify_url, only: [:create, :long_to_short, :short_to_long]

  def create
    uri = create_uri(params['long_url'])
    url = Url.where(long_url: uri.to_s)[0]
    if url
      update(url)
    else
      url = Url.new(long_url: uri.to_s)
      url.save!
      render status: 200, json: url.to_json
    end
  end

  def index
    urls = Url.order(num_times_shortened: :desc).limit(100)
    render status: 200, json: urls.to_json
  end

  def redir_to
    short_hash = params['hash']
    url = Url.where(short_url: short_hash)[0]

    if url
      if url.long_url.index("http") != 0
        url.long_url = "http://" + url.long_url
      end

      redirect_to url.long_url
    else
      render file: 'public/404.html', status: 404
    end
  end

  def short_to_long
    short_hash = extract_short_hash(params['short_url'])
    url = Url.where(short_url: short_hash)[0]
    if url && valid_short_url_host?(params['short_url'])
      render status: 200, json: url.to_json
    else
      render status: 404, json: ["URL not found"]
    end
  end

private
  def create_uri(url)
    if url.index("http") != 0
      url = "http://" + url
    end
    URI(url)
  end

  def extract_short_hash(url)
    uri = create_uri(url)
    uri.path.split("/")[1]
  end

  def update(url)
    url.num_times_shortened += 1
    url.save!
    render status: 200, json: url.to_json
  end

  def verify_url
    url = params['long_url'] || params['short_url']
    uri = create_uri(url)
    unless uri.host.include?(".")
      render status: 422, json: ["Invalid URL"]
    end
  end

  def valid_short_url_host?(url)
    uri = create_uri(url)
    DOMAINS_FOR_ENV[Rails.env].any? {|domain| domain.include?(uri.host) }
  end
end
