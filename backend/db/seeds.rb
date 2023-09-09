5.times do
  Team.create(
    name: Faker::Lorem.sentence(word_count: 5),
    title: Faker::Lorem.sentence(word_count: 8),
  )

end
