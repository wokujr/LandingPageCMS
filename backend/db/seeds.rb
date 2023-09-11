# 5.times do
#   Team.first_or_create(
#     name: Faker::Lorem.sentence(word_count: 5),
#     title: Faker::Lorem.sentence(word_count: 8),
#   )
# end

User.first_or_create(email: 'admin@email.com',
                     password: 'password',
                     password_confirmation: 'password',
                     role: User.roles[:admin] )