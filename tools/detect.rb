require 'json'
require 'digest'
require 'linguist'
root = File.expand_path('..', __dir__)
lock = JSON.parse(File.read(File.join(root, 'catalog/upstream/linguist.lock.json')))
spec = Gem.loaded_specs.fetch('github-linguist')
actual = Digest::SHA256.file(File.join(spec.full_gem_path, lock.fetch('path'))).hexdigest
abort 'Loaded Linguist inventory differs from pinned baseline' unless actual == lock.fetch('sha256')
input = JSON.parse(STDIN.read)
results = input.map do |item|
  begin
    blob = Linguist::FileBlob.new(File.join(root, item.fetch('path')), root)
    language = Linguist.detect(blob)
    {id: item.fetch('id'), detected: language&.name, error: nil}
  rescue StandardError => error
    {id: item.fetch('id'), detected: nil, error: error.message}
  end
end
puts JSON.generate({version: Linguist::VERSION, inventory_sha256: actual, results: results})
