class CreateUrls < ActiveRecord::Migration
  def change
    create_table :urls do |t|
      t.string :short_url, null: false
      t.text :long_url, null: false
      t.integer :num_times_shortened, default: 1

      t.timestamps null: false
    end
    add_index :urls, :short_url, unique: true
    add_index :urls, :long_url, unique: true
  end
end
