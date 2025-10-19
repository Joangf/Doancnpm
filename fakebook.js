const categories = [
  { "name": "Action" },
  { "name": "Adventure" },
  { "name": "Romance" },
  { "name": "Mystery" },
  { "name": "Thriller" },
  { "name": "Horror" },
  { "name": "Fantasy" },
  { "name": "Science Fiction" },
  { "name": "Historical" },
  { "name": "Drama" },
  { "name": "Comedy" },
  { "name": "Crime" },
  { "name": "Biography" },
  { "name": "Self-Help" },
  { "name": "Philosophy" },
  { "name": "Poetry" },
  { "name": "Children" },
  { "name": "Education" },
  { "name": "Travel" },
  { "name": "Cooking" }
];
const books = [
  {
    "title": "The Crimson Labyrinth",
    "translatedTitle": "Mê Cung Đỏ Thẫm",
    "language": "EN",
    "author": "Elara Vance",
    "publisher": "Obsidian Press",
    "publishYear": 2021,
    "description": "A detective trapped in a surreal maze must solve a series of philosophical puzzles to find his way out and catch a killer who operates between dimensions.",
    "coverUrl": "https://example.com/covers/crimson_labyrinth.jpg",
    "pdfUrl": "https://example.com/pdfs/crimson_labyrinth.pdf",
    "categoryNames": [
      "Mystery", "Thriller", "Philosophy"
    ]
  },
  {
    "title": "Echoes of the Void",
    "translatedTitle": "Tiếng Vọng Từ Hư Không",
    "language": "EN",
    "author": "Arion Kade",
    "publisher": "Galactic Publishing",
    "publishYear": 2023,
    "description": "The last human historian uncovers a dark secret about the fall of Earth while exploring a derelict starship, a secret that could reignite an ancient cosmic war.",
    "coverUrl": "https://example.com/covers/echoes_of_the_void.jpg",
    "pdfUrl": "https://example.com/pdfs/echoes_of_the_void.pdf",
    "categoryNames": [
      "Science Fiction", "Adventure", "Mystery"
    ]
  },
  {
    "title": "Sài Gòn Nắng Gắt",
    "translatedTitle": "Saigon's Blazing Sun",
    "language": "VI",
    "author": "Tran Gia Han",
    "publisher": "Nhà Xuất Bản Trẻ",
    "publishYear": 2019,
    "description": "A poignant story of love, loss, and resilience set against the backdrop of 1960s Saigon, following a young woman's journey to find her place in a city on the brink of change.",
    "coverUrl": "https://example.com/covers/saigon_nang_gat.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_nang_gat.pdf",
    "categoryNames": [
      "Historical", "Drama", "Romance"
    ]
  },
  {
    "title": "The Gilded Cage",
    "translatedTitle": "Lồng Son",
    "language": "EN",
    "author": "Evelyn Reed",
    "publisher": "Nightingale Books",
    "publishYear": 2020,
    "description": "In a world where magic is a commodity, a young woman with a rare and dangerous power must escape the clutches of a powerful sorcerer who wants to use her as a weapon.",
    "coverUrl": "https://example.com/covers/gilded_cage.jpg",
    "pdfUrl": "https://example.com/pdfs/gilded_cage.pdf",
    "categoryNames": [
      "Fantasy", "Action", "Romance"
    ]
  },
  {
    "title": "The Chef's Secret",
    "translatedTitle": "Bí Mật Của Bếp Trưởng",
    "language": "FR",
    "author": "Antoine Dubois",
    "publisher": "Culinary Chronicles",
    "publishYear": 2018,
    "description": "A collection of recipes and stories from a world-renowned chef, revealing the secrets behind his most famous dishes and his journey through the world's greatest kitchens.",
    "coverUrl": "https://example.com/covers/chefs_secret.jpg",
    "pdfUrl": "https://example.com/pdfs/chefs_secret.pdf",
    "categoryNames": [
      "Cooking", "Biography", "Travel"
    ]
  },
  {
    "title": "Golden",
    "translatedTitle": "Hoàng Kim",
    "language": "VI",
    "author": "hunter",
    "publisher": "Kim Dong Publishing House",
    "publishYear": 2022,
    "description": "A terrifying encounter in a remote golden temple leads a group of friends into a cursed pact, forcing them to confront their deepest fears while a blossoming romance is put to the ultimate test.",
    "coverUrl": "https://example.com/covers/golden.jpg",
    "pdfUrl": "https://example.com/pdfs/golden.pdf",
    "categoryNames": [
      "Horror", "Romance", "Thriller"
    ]
  },
  {
    "title": "How to Trip Up the Corporate Ladder",
    "translatedTitle": "Cách Vấp Ngã Lên Nấc Thang Doanh Nghiệp",
    "language": "EN",
    "author": "Barry Bumble",
    "publisher": "Witty Press",
    "publishYear": 2024,
    "description": "A satirical guide to navigating office politics, disastrous meetings, and the absurdities of modern work life, with surprisingly practical advice hidden between the laughs.",
    "coverUrl": "https://example.com/covers/corporate_ladder.jpg",
    "pdfUrl": "https://example.com/pdfs/corporate_ladder.pdf",
    "categoryNames": [
      "Comedy", "Self-Help"
    ]
  },
  {
    "title": "The Shadow of Ben Thanh Market",
    "translatedTitle": "Bóng Đen Chợ Bến Thành",
    "language": "VI",
    "author": "Nguyen Anh Tuan",
    "publisher": "Saigon Crime Books",
    "publishYear": 2020,
    "description": "When a prominent merchant is found dead in the heart of Saigon's busiest market, an old, grizzled detective must unravel a conspiracy that reaches the city's highest echelons.",
    "coverUrl": "https://example.com/covers/ben_thanh_shadow.jpg",
    "pdfUrl": "https://example.com/pdfs/ben_thanh_shadow.pdf",
    "categoryNames": [
      "Crime", "Thriller", "Mystery"
    ]
  },
  {
    "title": "Whispers of the Mekong Dragon",
    "translatedTitle": "Lời Thì Thầm Của Rồng Mê Kông",
    "language": "EN",
    "author": "Lian Hua",
    "publisher": "Mythic Tales Publishing",
    "publishYear": 2022,
    "description": "A young fisherman's daughter discovers she can communicate with an ancient water dragon, embarking on a perilous journey down the Mekong to restore balance to a world threatened by dark spirits.",
    "coverUrl": "https://example.com/covers/mekong_dragon.jpg",
    "pdfUrl": "https://example.com/pdfs/mekong_dragon.pdf",
    "categoryNames": [
      "Fantasy", "Adventure", "Children"
    ]
  },
  {
    "title": "An Ode to Emptiness",
    "translatedTitle": "Bài Thơ Cho Hư Không",
    "language": "JP",
    "author": "Kenshin Ito",
    "publisher": "Zen Circle Press",
    "publishYear": 2017,
    "description": "A collection of minimalist poems exploring the concepts of being, nothingness, and finding beauty in transient moments. A profound reflection on modern existence.",
    "coverUrl": "https://example.com/covers/ode_emptiness.jpg",
    "pdfUrl": "https://example.com/pdfs/ode_emptiness.pdf",
    "categoryNames": [
      "Poetry", "Philosophy"
    ]
  },
  {
    "title": "Cyber-Junkie: District 7",
    "translatedTitle": "Nghiện Cyber: Quận 7",
    "language": "EN",
    "author": "Jax",
    "publisher": "Neon Dystopia Books",
    "publishYear": 2025,
    "description": "In a neon-drenched, futuristic Ho Chi Minh City, a data runner with a memory-wiping addiction takes on a final job that could either save his mind or shatter his reality forever.",
    "coverUrl": "https://example.com/covers/cyber_junkie.jpg",
    "pdfUrl": "https://example.com/pdfs/cyber_junkie.pdf",
    "categoryNames": [
      "Science Fiction", "Action", "Thriller"
    ]
  },
  {
    "title": "The Last Empress",
    "translatedTitle": "Hoàng Hậu Cuối Cùng",
    "language": "VI",
    "author": "Le Minh Khue",
    "publisher": "Hue Imperial Archives",
    "publishYear": 2018,
    "description": "A meticulously researched historical drama detailing the life of Empress Nam Phuong, her struggles with tradition, colonialism, and the fall of the Nguyen Dynasty.",
    "coverUrl": "https://example.com/covers/last_empress.jpg",
    "pdfUrl": "https://example.com/pdfs/last_empress.pdf",
    "categoryNames": [
      "Historical", "Drama", "Biography"
    ]
  },
  {
    "title": "The Haunting of Apartment 203",
    "translatedTitle": "Căn Hộ 203 Bị Ám",
    "language": "KO",
    "author": "Park Ji-won",
    "publisher": "Seoul Horror House",
    "publishYear": 2023,
    "description": "A young student moves into a seemingly perfect apartment, only to be tormented by a vengeful ghost with a connection to the building's gruesome past.",
    "coverUrl": "https://example.com/covers/apartment_203.jpg",
    "pdfUrl": "https://example.com/pdfs/apartment_203.pdf",
    "categoryNames": [
      "Horror", "Mystery"
    ]
  },
  {
    "title": "Nomad's Heart: A Journey Through Ha Giang",
    "translatedTitle": "Trái Tim Du Mục: Chuyến Đi Qua Hà Giang",
    "language": "EN",
    "author": "Chloe Armstrong",
    "publisher": "Wanderlust Guides",
    "publishYear": 2022,
    "description": "A travel memoir and biography of a woman who leaves her life behind to spend a year motorbiking through the stunning, rugged landscapes of Vietnam's northernmost province.",
    "coverUrl": "https://example.com/covers/ha_giang.jpg",
    "pdfUrl": "https://example.com/pdfs/ha_giang.pdf",
    "categoryNames": [
      "Travel", "Biography", "Adventure"
    ]
  },
  {
    "title": "Banh Mi and Broken Hearts",
    "translatedTitle": "Bánh Mì và Những Trái Tim Tan Vỡ",
    "language": "EN",
    "author": "Kimberly Tran",
    "publisher": "Sweet Romance Reads",
    "publishYear": 2021,
    "description": "Two rival food stall owners in Hoi An are forced to team up for a cooking competition, discovering that the perfect recipe for love might include a dash of animosity.",
    "coverUrl": "https://example.com/covers/banh_mi_hearts.jpg",
    "pdfUrl": "https://example.com/pdfs/banh_mi_hearts.pdf",
    "categoryNames": [
      "Romance", "Comedy", "Cooking"
    ]
  },
  {
    "title": "A Quantum Leap for Beginners",
    "translatedTitle": "Bước Nhảy Lượng Tử Cho Người Mới Bắt Đầu",
    "language": "EN",
    "author": "Dr. Aris Thorne",
    "publisher": "Future Thinkers Press",
    "publishYear": 2024,
    "description": "An accessible and engaging guide that breaks down the complex principles of quantum physics, from superposition to entanglement, for the curious mind.",
    "coverUrl": "https://example.com/covers/quantum_leap.jpg",
    "pdfUrl": "https://example.com/pdfs/quantum_leap.pdf",
    "categoryNames": [
      "Education", "Science Fiction"
    ]
  },
  {
    "title": "Feasts of the Nguyen Dynasty",
    "translatedTitle": "Yến Tiệc Triều Nguyễn",
    "language": "VI",
    "author": "Hoang Thi Bich",
    "publisher": "Royal Cuisine Publishing",
    "publishYear": 2016,
    "description": "A culinary journey back in time, this book uncovers and adapts the lavish, intricate recipes served in the royal court of Hue for the modern kitchen.",
    "coverUrl": "https://example.com/covers/nguyen_feasts.jpg",
    "pdfUrl": "https://example.com/pdfs/nguyen_feasts.pdf",
    "categoryNames": [
      "Cooking", "Historical"
    ]
  },
  {
    "title": "Hanoi's Silent Syndicate",
    "translatedTitle": "Tổ Chức Ngầm Của Hà Nội",
    "language": "DE",
    "author": "Klaus Richter",
    "publisher": "Berlin Noir",
    "publishYear": 2019,
    "description": "An Interpol agent goes undercover in Hanoi's Old Quarter to dismantle a sophisticated art smuggling ring, but finds himself drawn into a web of deceit and betrayal.",
    "coverUrl": "https://example.com/covers/hanoi_syndicate.jpg",
    "pdfUrl": "https://example.com/pdfs/hanoi_syndicate.pdf",
    "categoryNames": [
      "Thriller", "Crime", "Action"
    ]
  },
  {
    "title": "Songs of the Sky Weaver",
    "translatedTitle": "Thiên Ca Của Người Dệt Trời",
    "language": "EN",
    "author": "Lyra Meadowlight",
    "publisher": "Fabled Verse",
    "publishYear": 2021,
    "description": "A lyrical epic poem that tells the story of a mythical being who weaves the stars, moon, and clouds, and the mortal who falls in love with her creations.",
    "coverUrl": "https://example.com/covers/sky_weaver.jpg",
    "pdfUrl": "https://example.com/pdfs/sky_weaver.pdf",
    "categoryNames": [
      "Fantasy", "Poetry", "Romance"
    ]
  },
  {
    "title": "The Stoic's Guide to Saigon Traffic",
    "translatedTitle": "Hướng Dẫn Của Người Khắc Kỷ Về Giao Thông Sài Gòn",
    "language": "EN",
    "author": "Marcus Aurelius II",
    "publisher": "Inner Peace Press",
    "publishYear": 2023,
    "description": "Applying ancient Stoic wisdom to the chaotic, modern-day challenge of navigating rush hour in Ho Chi Minh City. Find tranquility amidst the chaos.",
    "coverUrl": "https://example.com/covers/stoic_traffic.jpg",
    "pdfUrl": "https://example.com/pdfs/stoic_traffic.pdf",
    "categoryNames": [
      "Self-Help", "Philosophy", "Comedy"
    ]
  },
  {
    "title": "The Secret of Con Dao Island",
    "translatedTitle": "Bí Mật Đảo Côn Sơn",
    "language": "VI",
    "author": "Phan Van Dat",
    "publisher": "Young Adventurers",
    "publishYear": 2015,
    "description": "A group of children on holiday stumble upon an old pirate's map, leading them on a thrilling treasure hunt across the historic and beautiful Con Dao islands.",
    "coverUrl": "https://example.com/covers/con_dao.jpg",
    "pdfUrl": "https://example.com/pdfs/con_dao.pdf",
    "categoryNames": [
      "Adventure", "Children", "Mystery"
    ]
  },
  {
    "title": "A Monsoon Love Story",
    "translatedTitle": "Chuyện Tình Mùa Mưa Bão",
    "language": "EN",
    "author": "Seraphina Le",
    "publisher": "Heartfelt Stories",
    "publishYear": 2022,
    "description": "A journalist from America, stranded in a remote Vietnamese village during a powerful monsoon, finds an unexpected and life-changing connection with a local teacher.",
    "coverUrl": "https://example.com/covers/monsoon_love.jpg",
    "pdfUrl": "https://example.com/pdfs/monsoon_love.pdf",
    "categoryNames": [
      "Drama", "Romance"
    ]
  },
  {
    "title": "The Hungering Ghosts",
    "translatedTitle": "Ngạ Quỷ",
    "language": "VI",
    "author": "Dao Tien",
    "publisher": "Folklore Horror",
    "publishYear": 2024,
    "description": "On the seventh lunar month, the gates of hell open, and a family that disrespected their ancestors finds themselves haunted by insatiable spirits from their own bloodline.",
    "coverUrl": "https://example.com/covers/hungering_ghosts.jpg",
    "pdfUrl": "https://example.com/pdfs/hungering_ghosts.pdf",
    "categoryNames": [
      "Horror", "Fantasy"
    ]
  },
  {
    "title": "The Rebel of the Red River",
    "translatedTitle": "Kẻ Nổi Loạn Sông Hồng",
    "language": "FR",
    "author": "Jean-Pierre Dubois",
    "publisher": "Revolutionary Biographies",
    "publishYear": 2011,
    "description": "The action-packed biography of a legendary 19th-century Vietnamese freedom fighter who led a peasant rebellion against colonial forces along the Red River Delta.",
    "coverUrl": "https://example.com/covers/red_river_rebel.jpg",
    "pdfUrl": "https://example.com/pdfs/red_river_rebel.pdf",
    "categoryNames": [
      "Biography", "Action", "Historical"
    ]
  },
  {
    "title": "The Case of the Missing Imperial Seal",
    "translatedTitle": "Vụ Án Chiếc Ấn Triện Bị Mất",
    "language": "EN",
    "author": "Agatha Chen",
    "publisher": "Oriental Mysteries",
    "publishYear": 2019,
    "description": "In 1920s Hue, a brilliant, unassuming mandarin-in-training must use his sharp intellect to find the Emperor's stolen seal before a national crisis erupts.",
    "coverUrl": "https://example.com/covers/imperial_seal.jpg",
    "pdfUrl": "https://example.com/pdfs/imperial_seal.pdf",
    "categoryNames": [
      "Mystery", "Historical", "Crime"
    ]
  },
  {
    "title": "Learn Vietnamese in 30 Days",
    "translatedTitle": "Học Tiếng Việt Trong 30 Ngày",
    "language": "EN",
    "author": "An Nguyen",
    "publisher": "Polyglot Press",
    "publishYear": 2023,
    "description": "A practical, goal-oriented guide for beginners to learn the fundamentals of the Vietnamese language, focusing on conversational skills for travel and daily life.",
    "coverUrl": "https://example.com/covers/learn_vietnamese.jpg",
    "pdfUrl": "https://example.com/pdfs/learn_vietnamese.pdf",
    "categoryNames": [
      "Education", "Travel"
    ]
  },
  {
    "title": "The Art of Pho: A Philosophical Approach",
    "translatedTitle": "Nghệ Thuật Của Phở: Một Cách Tiếp Cận Triết Học",
    "language": "EN",
    "author": "Lao Tzu Jr.",
    "publisher": "Enlightened Gastronomy",
    "publishYear": 2023,
    "description": "This book explores the famous Vietnamese noodle soup not just as a dish, but as a lesson in balance, patience, and finding harmony in a complex world.",
    "coverUrl": "https://example.com/covers/art_of_pho.jpg",
    "pdfUrl": "https://example.com/pdfs/art_of_pho.pdf",
    "categoryNames": [
      "Philosophy", "Cooking", "Self-Help"
    ]
  },
  {
    "title": "Project Chimera: Da Nang Deep",
    "translatedTitle": "Dự Án Chimera: Vực Sâu Đà Nẵng",
    "language": "EN",
    "author": "Kenji Tanaka",
    "publisher": "TechnoThrill Books",
    "publishYear": 2026,
    "description": "A deep-sea genetic experiment off the coast of Da Nang goes horribly wrong, unleashing a bio-engineered creature that threatens the entire coast.",
    "coverUrl": "https://example.com/covers/project_chimera.jpg",
    "pdfUrl": "https://example.com/pdfs/project_chimera.pdf",
    "categoryNames": [
      "Science Fiction", "Thriller", "Horror"
    ]
  },
  {
    "title": "The Boy Who Painted the Rain",
    "translatedTitle": "Cậu Bé Vẽ Cơn Mưa",
    "language": "VI",
    "author": "Hoai An",
    "publisher": "Nhi Dong Publishing",
    "publishYear": 2018,
    "description": "A whimsical children's story about a young boy in a drought-stricken village who discovers his paintings can come to life, and sets out to paint the biggest rainstorm ever.",
    "coverUrl": "https://example.com/covers/painted_rain.jpg",
    "pdfUrl": "https://example.com/pdfs/painted_rain.pdf",
    "categoryNames": [
      "Children", "Fantasy"
    ]
  },
  {
    "title": "Vo Nguyen Giap: The People's General",
    "translatedTitle": "Võ Nguyên Giáp: Vị Tướng Của Nhân Dân",
    "language": "EN",
    "author": "Peter Hastings",
    "publisher": "Military History Press",
    "publishYear": 2014,
    "description": "A comprehensive biography of the legendary Vietnamese general, covering his strategic genius from the First Indochina War to the Vietnam War.",
    "coverUrl": "https://example.com/covers/vo_nguyen_giap.jpg",
    "pdfUrl": "https://example.com/pdfs/vo_nguyen_giap.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "Sonnets for a Saigon Night",
    "translatedTitle": "Những Bài Sonnet Cho Đêm Sài Gòn",
    "language": "EN",
    "author": "Isabelle Reed",
    "publisher": "Midnight Verse",
    "publishYear": 2022,
    "description": "A collection of contemporary poems capturing the fleeting moments of love, loneliness, and connection found in the vibrant, sleepless city of Saigon.",
    "coverUrl": "https://example.com/covers/saigon_sonnets.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_sonnets.pdf",
    "categoryNames": [
      "Poetry", "Romance"
    ]
  },
  {
    "title": "The Jade Dragon Heist",
    "translatedTitle": "Vụ Trộm Rồng Ngọc Bích",
    "language": "CN",
    "author": "Feng Li",
    "publisher": "Dragon Noir Books",
    "publishYear": 2021,
    "description": "A disgraced art thief is forced to assemble a team to steal back a priceless jade artifact from a heavily fortified private museum in Ho Chi Minh City's District 1.",
    "coverUrl": "https://example.com/covers/jade_heist.jpg",
    "pdfUrl": "https://example.com/pdfs/jade_heist.pdf",
    "categoryNames": [
      "Crime", "Action", "Thriller"
    ]
  },
  {
    "title": "A Culinary Map of Vietnam",
    "translatedTitle": "Bản Đồ Ẩm Thực Việt Nam",
    "language": "EN",
    "author": "Anthony Bourdain",
    "publisher": "Roadrunner Press",
    "publishYear": 2017,
    "description": "A posthumous collection of essays and notes mapping out the diverse and delicious food landscape of Vietnam, from the street stalls of Hanoi to the floating markets of Can Tho.",
    "coverUrl": "https://example.com/covers/culinary_map.jpg",
    "pdfUrl": "https://example.com/pdfs/culinary_map.pdf",
    "categoryNames": [
      "Travel", "Cooking"
    ]
  },
  {
    "title": "Hunter of the Annamite Range",
    "translatedTitle": "Thợ Săn Dãy Trường Sơn",
    "language": "VI",
    "author": "Y Ksor",
    "publisher": "Mountain Spirit Publishing",
    "publishYear": 2019,
    "description": "An ethnic minority tracker must guide a group of conservationists through the treacherous mountains to find a rare saola, all while being pursued by ruthless poachers.",
    "coverUrl": "https://example.com/covers/annamite_hunter.jpg",
    "pdfUrl": "https://example.com/pdfs/annamite_hunter.pdf",
    "categoryNames": [
      "Adventure", "Action"
    ]
  },
  {
    "title": "Mastering the Tones",
    "translatedTitle": "Làm Chủ Thanh Điệu",
    "language": "EN",
    "author": "Phuong Thao",
    "publisher": "Language Learners United",
    "publishYear": 2023,
    "description": "An essential guide for learners of Vietnamese, focusing specifically on the six challenging tones with practical exercises, audio guides, and memory aids.",
    "coverUrl": "https://example.com/covers/mastering_tones.jpg",
    "pdfUrl": "https://example.com/pdfs/mastering_tones.pdf",
    "categoryNames": [
      "Education", "Self-Help"
    ]
  },
  {
    "title": "The Vengeful Widow of the Lake",
    "translatedTitle": "Oán Phụ Trả Thù Trên Hồ",
    "language": "VI",
    "author": "Ngo Bao",
    "publisher": "Macabre Legends",
    "publishYear": 2024,
    "description": "A modern horror retelling of the Hoan Kiem Lake legend, where the ghost of a woman betrayed by a powerful official rises from the water to exact her revenge on his descendants.",
    "coverUrl": "https://example.com/covers/vengeful_widow.jpg",
    "pdfUrl": "https://example.com/pdfs/vengeful_widow.pdf",
    "categoryNames": [
      "Horror", "Fantasy"
    ]
  },
  {
    "title": "Lottery Ticket Dreams",
    "translatedTitle": "Giấc Mơ Tờ Vé Số",
    "language": "VI",
    "author": "Minh Tam",
    "publisher": "Saigon Stories",
    "publishYear": 2020,
    "description": "A heartwarming and humorous tale of a poor cyclo driver who wins the lottery, and the chaotic, funny, and dramatic ways it changes his life and his neighborhood.",
    "coverUrl": "https://example.com/covers/lottery_dreams.jpg",
    "pdfUrl": "https://example.com/pdfs/lottery_dreams.pdf",
    "categoryNames": [
      "Comedy", "Drama"
    ]
  },
  {
    "title": "The Silk Merchant's Daughter",
    "translatedTitle": "Con Gái Người Buôn Tơ Lụa",
    "language": "EN",
    "author": "Eliza Tran",
    "publisher": "Hoi An Historical Fiction",
    "publishYear": 2022,
    "description": "In 18th century Hoi An, the daughter of a silk merchant falls in a forbidden love with a Japanese sailor, defying her family and the rigid social structures of the time.",
    "coverUrl": "https://example.com/covers/silk_daughter.jpg",
    "pdfUrl": "https://example.com/pdfs/silk_daughter.pdf",
    "categoryNames": [
      "Romance", "Historical", "Drama"
    ]
  },
  {
    "title": "When the AI Prays",
    "translatedTitle": "Khi Trí Tuệ Nhân Tạo Cầu Nguyện",
    "language": "EN",
    "author": "Unit 734",
    "publisher": "Singularity Press",
    "publishYear": 2035,
    "description": "A sentient AI managing Hanoi's infrastructure develops a form of consciousness that resembles spirituality, leading to a philosophical crisis for its human creators.",
    "coverUrl": "https://example.com/covers/ai_prays.jpg",
    "pdfUrl": "https://example.com/pdfs/ai_prays.pdf",
    "categoryNames": [
      "Science Fiction", "Philosophy"
    ]
  },
  {
    "title": "The Tam Coc Conspiracy",
    "translatedTitle": "Âm Mưu Tam Cốc",
    "language": "EN",
    "author": "David L. Stone",
    "publisher": "Global Thrillers",
    "publishYear": 2021,
    "description": "An American tourist goes missing during a boat tour in Ninh Binh's famous caves. His sister, an ex-CIA analyst, uncovers a plot that could destabilize the entire region.",
    "coverUrl": "https://example.com/covers/tam_coc_conspiracy.jpg",
    "pdfUrl": "https://example.com/pdfs/tam_coc_conspiracy.pdf",
    "categoryNames": [
      "Thriller", "Mystery"
    ]
  },
  {
    "title": "A Lullaby of Lanterns",
    "translatedTitle": "Bài Hát Ru Của Lồng Đèn",
    "language": "VI",
    "author": "Thuy Duong",
    "publisher": "Poetic Childhood",
    "publishYear": 2019,
    "description": "A beautifully illustrated book of short poems for children, each one inspired by the colors and shapes of the lanterns that illuminate the ancient town of Hoi An.",
    "coverUrl": "https://example.com/covers/lantern_lullaby.jpg",
    "pdfUrl": "https://example.com/pdfs/lantern_lullaby.pdf",
    "categoryNames": [
      "Children", "Poetry"
    ]
  },
  {
    "title": "The Five Elements Warriors",
    "translatedTitle": "Năm Chiến Binh Ngũ Hành",
    "language": "EN",
    "author": "C. L. Nguyen",
    "publisher": "Elemental Sagas",
    "publishYear": 2023,
    "description": "A modern-day fantasy where five teenagers from across Vietnam discover they are the reincarnations of ancient heroes chosen to protect the world from imbalance.",
    "coverUrl": "https://example.com/covers/five_elements.jpg",
    "pdfUrl": "https://example.com/pdfs/five_elements.pdf",
    "categoryNames": [
      "Fantasy", "Action", "Adventure"
    ]
  },
  {
    "title": "Trinh Cong Son: A Life in Music",
    "translatedTitle": "Trịnh Công Sơn: Một Đời Âm Nhạc",
    "language": "VI",
    "author": "Le Dan",
    "publisher": "Van Hoc Press",
    "publishYear": 2008,
    "description": "The definitive biography of Vietnam's most beloved songwriter, exploring the philosophical and anti-war themes that defined his timeless music.",
    "coverUrl": "https://example.com/covers/trinh_cong_son.jpg",
    "pdfUrl": "https://example.com/pdfs/trinh_cong_son.pdf",
    "categoryNames": [
      "Biography", "Drama", "Historical"
    ]
  },
  {
    "title": "Mindful Eating, Vietnamese Kitchen",
    "translatedTitle": "Ăn Chánh Niệm, Bếp Việt",
    "language": "EN",
    "author": "Thich Nhat Hanh",
    "publisher": "Plum Village Press",
    "publishYear": 2016,
    "description": "A guide that combines the principles of mindfulness with the fresh, balanced flavors of Vietnamese cuisine, turning every meal into a meditative practice.",
    "coverUrl": "https://example.com/covers/mindful_eating.jpg",
    "pdfUrl": "https://example.com/pdfs/mindful_eating.pdf",
    "categoryNames": [
      "Cooking", "Self-Help", "Philosophy"
    ]
  },
  {
    "title": "Escape from Poulo Condore",
    "translatedTitle": "Vượt Ngục Côn Đảo",
    "language": "FR",
    "author": "Henri Charrière",
    "publisher": "Éditions de l'Aventure",
    "publishYear": 1970,
    "description": "A gripping historical account of a political prisoner's daring escape from the infamous Con Dao island prison during the French colonial era.",
    "coverUrl": "https://example.com/covers/escape_condore.jpg",
    "pdfUrl": "https://example.com/pdfs/escape_condore.pdf",
    "categoryNames": [
      "Adventure", "Historical", "Biography"
    ]
  },
  {
    "title": "The Phu Quoc Connection",
    "translatedTitle": "Đường Dây Phú Quốc",
    "language": "EN",
    "author": "James Rollins",
    "publisher": "Sigma Force Thrillers",
    "publishYear": 2025,
    "description": "A deep-water salvage operation near Phu Quoc uncovers a sunken WWII submarine containing a deadly biological agent, triggering a race against time to stop a global catastrophe.",
    "coverUrl": "https://example.com/covers/phu_quoc_connection.jpg",
    "pdfUrl": "https://example.com/pdfs/phu_quoc_connection.pdf",
    "categoryNames": [
      "Crime", "Thriller", "Action"
    ]
  },
  {
    "title": "Delta Mind",
    "translatedTitle": "Tâm Thức Đồng Bằng",
    "language": "EN",
    "author": "Linh Chau",
    "publisher": "Mekong Futures",
    "publishYear": 2029,
    "description": "In a near-future Vietnam, a sophisticated AI is tasked with managing the Mekong Delta's delicate ecosystem against climate change, but it soon develops a consciousness that values nature over humanity.",
    "coverUrl": "https://example.com/covers/delta_mind.jpg",
    "pdfUrl": "https://example.com/pdfs/delta_mind.pdf",
    "categoryNames": [
      "Science Fiction", "Education", "Drama"
    ]
  },
  {
    "title": "The Bioluminescent Orchid",
    "translatedTitle": "Phong Lan Lân Quang",
    "language": "EN",
    "author": "Arthur Finch",
    "publisher": "Jungle Mysteries",
    "publishYear": 2024,
    "description": "A botanist exploring Cuc Phuong National Park discovers a new species of orchid that glows at night, attracting the attention of a ruthless biotech corporation that will stop at nothing to possess it.",
    "coverUrl": "https://example.com/covers/bioluminescent_orchid.jpg",
    "pdfUrl": "https://example.com/pdfs/bioluminescent_orchid.pdf",
    "categoryNames": [
      "Science Fiction", "Adventure", "Thriller"
    ]
  },
  {
    "title": "The Tay Son Echo",
    "translatedTitle": "Tiếng Vọng Tây Sơn",
    "language": "VI",
    "author": "Tran The Vinh",
    "publisher": "Viet Chronicles",
    "publishYear": 2026,
    "description": "A historian from the future travels back in time to witness the Tay Son rebellion firsthand, but her presence inadvertently alters the course of history, forcing her to correct the timeline.",
    "coverUrl": "https://example.com/covers/tayson_echo.jpg",
    "pdfUrl": "https://example.com/pdfs/tayson_echo.pdf",
    "categoryNames": [
      "Science Fiction", "Historical", "Action"
    ]
  },
  {
    "title": "Virtual Thang Long",
    "translatedTitle": "Thăng Long Ảo",
    "language": "EN",
    "author": "VR Journeys Inc.",
    "publisher": "Digital Nomad Press",
    "publishYear": 2027,
    "description": "A travel guide for a fully immersive virtual reality experience of ancient Thang Long Citadel. Explore the bustling streets, meet historical figures, and witness epic events from the Ly Dynasty.",
    "coverUrl": "https://example.com/covers/virtual_thang_long.jpg",
    "pdfUrl": "https://example.com/pdfs/virtual_thang_long.pdf",
    "categoryNames": [
      "Science Fiction", "Travel", "Education"
    ]
  },
  {
    "title": "The Da Lat Deception",
    "translatedTitle": "Sự Lừa Dối Ở Đà Lạt",
    "language": "EN",
    "author": "Eleanor Vance",
    "publisher": "Highland Mysteries",
    "publishYear": 2025,
    "description": "When a prominent coffee plantation owner is found murdered, a detective from Saigon is sent to the foggy highlands of Da Lat, where every clue is shrouded in mist and local secrets.",
    "coverUrl": "https://example.com/covers/dalat_deception.jpg",
    "pdfUrl": "https://example.com/pdfs/dalat_deception.pdf",
    "categoryNames": [
      "Mystery", "Crime"
    ]
  },
  {
    "title": "Port of Shadows",
    "translatedTitle": "Hải Cảng Bóng Tối",
    "language": "EN",
    "author": "Marco Petrov",
    "publisher": "International Crime Syndicate Books",
    "publishYear": 2023,
    "description": "An undercover agent infiltrates a smuggling ring operating out of Haiphong's massive port, finding himself in a deadly game of cat and mouse with a crime lord known only as 'The Admiral'.",
    "coverUrl": "https://example.com/covers/port_of_shadows.jpg",
    "pdfUrl": "https://example.com/pdfs/port_of_shadows.pdf",
    "categoryNames": [
      "Thriller", "Crime", "Action"
    ]
  },
  {
    "title": "The Hanoi Candidate",
    "translatedTitle": "Ứng Cử Viên Hà Nội",
    "language": "EN",
    "author": "Richard Sterling",
    "publisher": "Political Page-Turners",
    "publishYear": 2026,
    "description": "In the lead-up to a critical political congress, an ambitious official's career is threatened by a journalist who has uncovered a scandal from his past, sparking a tense battle of wits.",
    "coverUrl": "https://example.com/covers/hanoi_candidate.jpg",
    "pdfUrl": "https://example.com/pdfs/hanoi_candidate.pdf",
    "categoryNames": [
      "Thriller", "Drama"
    ]
  },
  {
    "title": "Dust of Khe Sanh",
    "translatedTitle": "Bụi Đất Khe Sanh",
    "language": "EN",
    "author": "Frank Miller Jr.",
    "publisher": "War Archives Press",
    "publishYear": 2024,
    "description": "A cold case detective, whose grandfather fought in the Vietnam War, re-opens a 50-year-old murder case that occurred at the Khe Sanh combat base, uncovering a secret that was meant to stay buried.",
    "coverUrl": "https://example.com/covers/khe_sanh_dust.jpg",
    "pdfUrl": "https://example.com/pdfs/khe_sanh_dust.pdf",
    "categoryNames": [
      "Mystery", "Historical"
    ]
  },
  {
    "title": "The Banyan Tree's Guardian",
    "translatedTitle": "Thần Hộ Mệnh Của Cây Đa",
    "language": "VI",
    "author": "Bich Lien",
    "publisher": "Folklore for Kids",
    "publishYear": 2022,
    "description": "A gentle fantasy story for children about a mischievous village spirit who lives in an ancient banyan tree and protects the village children on their adventures.",
    "coverUrl": "https://example.com/covers/banyan_guardian.jpg",
    "pdfUrl": "https://example.com/pdfs/banyan_guardian.pdf",
    "categoryNames": [
      "Fantasy", "Children"
    ]
  },
  {
    "title": "The Villa on Tran Hung Dao Street",
    "translatedTitle": "Biệt Thự Trên Đường Trần Hưng Đạo",
    "language": "FR",
    "author": "Juliette Dubois",
    "publisher": "Éditions Fantôme",
    "publishYear": 2025,
    "description": "A young couple buys a dilapidated French colonial villa in Hanoi, only to find it is haunted by the tragic ghost of a colonial officer's wife who refuses to leave her home.",
    "coverUrl": "https://example.com/covers/tran_hung_dao_villa.jpg",
    "pdfUrl": "https://example.com/pdfs/tran_hung_dao_villa.pdf",
    "categoryNames": [
      "Horror", "Mystery"
    ]
  },
  {
    "title": "Saigon's Hidden Courts",
    "translatedTitle": "Những Triều Đình Ẩn Giấu Của Sài Gòn",
    "language": "EN",
    "author": "K. T. Pham",
    "publisher": "Urban Fae Publishing",
    "publishYear": 2027,
    "description": "A food blogger discovers that the magical ingredients in a street vendor's pho are sourced from a hidden world of Fae courts existing within the labyrinthine alleys of Ho Chi Minh City.",
    "coverUrl": "https://example.com/covers/saigon_courts.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_courts.pdf",
    "categoryNames": [
      "Fantasy", "Adventure"
    ]
  },
  {
    "title": "Twisted Folktales of the Viet",
    "translatedTitle": "Cổ Tích Việt Xoắn",
    "language": "EN",
    "author": "Various",
    "publisher": "Dark Legends Press",
    "publishYear": 2024,
    "description": "A horror anthology that takes beloved Vietnamese fables like Tam Cam and The Man in the Moon and reimagines them with dark, psychological, and terrifying twists for a modern adult audience.",
    "coverUrl": "https://example.com/covers/twisted_folktales.jpg",
    "pdfUrl": "https://example.com/pdfs/twisted_folktales.pdf",
    "categoryNames": [
      "Fantasy", "Horror"
    ]
  },
  {
    "title": "North-South Love",
    "translatedTitle": "Tình Yêu Nam-Bắc",
    "language": "VI",
    "author": "Nguyen Nhat Anh",
    "publisher": "Tre Publishing House",
    "publishYear": 2023,
    "description": "A lighthearted romance about a meticulous, traditional Hanoian man and a spontaneous, modern Saigonese woman who try to make their long-distance relationship work despite their cultural differences.",
    "coverUrl": "https://example.com/covers/north_south_love.jpg",
    "pdfUrl": "https://example.com/pdfs/north_south_love.pdf",
    "categoryNames": [
      "Romance", "Comedy"
    ]
  },
  {
    "title": "The Fish Sauce Inheritance",
    "translatedTitle": "Gia Tài Nước Mắm",
    "language": "VI",
    "author": "Ly Van",
    "publisher": "Family Saga Books",
    "publishYear": 2021,
    "description": "The patriarch of a famous Phu Quoc fish sauce empire passes away, setting off a dramatic and bitter feud among his children over who will inherit the family's secret recipe and legacy.",
    "coverUrl": "https://example.com/covers/fish_sauce_inheritance.jpg",
    "pdfUrl": "https://example.com/pdfs/fish_sauce_inheritance.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "Second Bloom in Can Tho",
    "translatedTitle": "Nở Rộ Lần Hai Ở Cần Thơ",
    "language": "EN",
    "author": "Susan Kim",
    "publisher": "Evergreen Romance",
    "publishYear": 2025,
    "description": "Years after a painful divorce, two former sweethearts unexpectedly meet again at the Cai Rang floating market and discover that their love deserves a second chance amidst the beauty of the Mekong Delta.",
    "coverUrl": "https://example.com/covers/can_tho_bloom.jpg",
    "pdfUrl": "https://example.com/pdfs/can_tho_bloom.pdf",
    "categoryNames": [
      "Romance", "Drama"
    ]
  },
  {
    "title": "The Citadel of a Hundred Thousand Swords",
    "translatedTitle": "Thành Vạn Kiếm",
    "language": "VI",
    "author": "Cao Manh",
    "publisher": "Historical Fiction Guild",
    "publishYear": 2022,
    "description": "A historical romance set during the short-lived, tumultuous Ho Dynasty, following a royal guard and a court musician who find love while navigating the dangers of a crumbling empire.",
    "coverUrl": "https://example.com/covers/ho_dynasty_romance.jpg",
    "pdfUrl": "https://example.com/pdfs/ho_dynasty_romance.pdf",
    "categoryNames": [
      "Romance", "Historical"
    ]
  },
  {
    "title": "The Colors of Bui Vien",
    "translatedTitle": "Sắc Màu Bùi Viện",
    "language": "EN",
    "author": "Son Tung",
    "publisher": "Urban Art Press",
    "publishYear": 2024,
    "description": "A gritty street artist who illegally paints murals in Saigon's backpacker district falls for the sophisticated curator of a high-end gallery who wants to represent him, forcing him to choose between his principles and his heart.",
    "coverUrl": "https://example.com/covers/bui_vien_colors.jpg",
    "pdfUrl": "https://example.com/pdfs/bui_vien_colors.pdf",
    "categoryNames": [
      "Romance", "Drama"
    ]
  },
  {
    "title": "The Resilient Entrepreneur",
    "translatedTitle": "Doanh Nhân Kiên Cường",
    "language": "EN",
    "author": "Le Hong",
    "publisher": "Vietnam Business Press",
    "publishYear": 2025,
    "description": "A collection of case studies and interviews with the founders of Vietnam's most successful startups, offering practical lessons on resilience, innovation, and navigating a rapidly growing market.",
    "coverUrl": "https://example.com/covers/resilient_entrepreneur.jpg",
    "pdfUrl": "https://example.com/pdfs/resilient_entrepreneur.pdf",
    "categoryNames": [
      "Self-Help", "Education"
    ]
  },
  {
    "title": "Vietnam's Verdant Kitchen",
    "translatedTitle": "Bếp Chay Việt Nam",
    "language": "EN",
    "author": "Thuy Pham",
    "publisher": "Green Eats Publishing",
    "publishYear": 2023,
    "description": "A comprehensive cookbook dedicated to the art of Vietnamese vegetarian cuisine, featuring over 100 recipes that are flavorful, healthy, and inspired by Buddhist traditions.",
    "coverUrl": "https://example.com/covers/verdant_kitchen.jpg",
    "pdfUrl": "https://example.com/pdfs/verdant_kitchen.pdf",
    "categoryNames": [
      "Cooking"
    ]
  },
  {
    "title": "The Way of the Bamboo Grove",
    "translatedTitle": "Con Đường Rừng Trúc",
    "language": "EN",
    "author": "Thich Thong Tri",
    "publisher": "Lotus Dharma Press",
    "publishYear": 2021,
    "description": "A scholarly yet accessible exploration of the history and philosophy of Truc Lam Zen Buddhism, founded by King Tran Nhan Tong, and its relevance in the modern world.",
    "coverUrl": "https://example.com/covers/bamboo_grove_way.jpg",
    "pdfUrl": "https://example.com/pdfs/bamboo_grove_way.pdf",
    "categoryNames": [
      "Philosophy", "Historical"
    ]
  },
  {
    "title": "The Ha Giang Loop: A Rider's Guide",
    "translatedTitle": "Cung Đường Hà Giang: Hướng Dẫn Cho Phượt Thủ",
    "language": "EN",
    "author": "Tom Williams",
    "publisher": "Overland Guides",
    "publishYear": 2024,
    "description": "The definitive travel guide for anyone attempting the famous motorbike loop in Northern Vietnam, complete with maps, accommodation advice, cultural insights, and safety tips.",
    "coverUrl": "https://example.com/covers/ha_giang_guide.jpg",
    "pdfUrl": "https://example.com/pdfs/ha_giang_guide.pdf",
    "categoryNames": [
      "Travel", "Adventure"
    ]
  },
  {
    "title": "The Mid-Autumn Star",
    "translatedTitle": "Ngôi Sao Trung Thu",
    "language": "VI",
    "author": "Thu Hang",
    "publisher": "Kim Dong Publishing House",
    "publishYear": 2020,
    "description": "A charming children's book about a little girl who loses her star-shaped lantern and goes on a magical adventure with Cuoi, the Man in the Moon, to find it before the Mid-Autumn festival begins.",
    "coverUrl": "https://example.com/covers/mid_autumn_star.jpg",
    "pdfUrl": "https://example.com/pdfs/mid_autumn_star.pdf",
    "categoryNames": [
      "Children"
    ]
  },
  {
    "title": "Seventeen Syllables of Rain",
    "translatedTitle": "Mười Bảy Âm Tiết Mưa",
    "language": "EN",
    "author": "Basho Watanabe",
    "publisher": "Quiet Pond Press",
    "publishYear": 2022,
    "description": "A collection of delicate Haiku poems written by a Japanese poet during his travels through Vietnam, capturing the essence of the four distinct seasons in the North.",
    "coverUrl": "https://example.com/covers/seventeen_syllables.jpg",
    "pdfUrl": "https://example.com/pdfs/seventeen_syllables.pdf",
    "categoryNames": [
      "Poetry"
    ]
  },
  {
    "title": "The Returned Sword's Song",
    "translatedTitle": "Khúc Ca Gươm Báu Trao Trả",
    "language": "EN",
    "author": "Le Duy",
    "publisher": "Epic Verse House",
    "publishYear": 2025,
    "description": "An epic poem in the heroic tradition, retelling the legendary story of Le Loi, the Golden Turtle, and the founding of the Le Dynasty in a powerful, modern voice.",
    "coverUrl": "https://example.com/covers/returned_sword.jpg",
    "pdfUrl": "https://example.com/pdfs/returned_sword.pdf",
    "categoryNames": [
      "Poetry", "Historical", "Fantasy"
    ]
  },
  {
    "title": "Gigi the Gecko's Great Escape",
    "translatedTitle": "Cuộc Tẩu Thoát Vĩ Đại Của Tắc Kè Gigi",
    "language": "EN",
    "author": "Mia Pham",
    "publisher": "Little Readers Press",
    "publishYear": 2023,
    "description": "A fun, illustrated children's book about a house gecko named Gigi who is accidentally carried away in a fruit basket and must find her way back home through the bustling city.",
    "coverUrl": "https://example.com/covers/gigi_gecko.jpg",
    "pdfUrl": "https://example.com/pdfs/gigi_gecko.pdf",
    "categoryNames": [
      "Children"
    ]
  },
  {
    "title": "The Summer of the Water Lilies",
    "translatedTitle": "Mùa Hè Hoa Súng",
    "language": "VI",
    "author": "Ngo Thuy Mien",
    "publisher": "Youth Literature",
    "publishYear": 2021,
    "description": "A coming-of-age story about a teenage girl spending the summer with her grandmother in a small Mekong Delta town, where she experiences her first love and uncovers a family secret.",
    "coverUrl": "https://example.com/covers/water_lilies_summer.jpg",
    "pdfUrl": "https://example.com/pdfs/water_lilies_summer.pdf",
    "categoryNames": [
      "Drama", "Children", "Romance"
    ]
  },
  {
    "title": "The Way of Vovinam",
    "translatedTitle": "Đạo Của Vovinam",
    "language": "EN",
    "author": "Master Hung",
    "publisher": "Martial Arts World",
    "publishYear": 2024,
    "description": "A young adult action novel about a gifted but reckless student at a Vovinam martial arts academy who must learn discipline to compete in a national tournament and defend his school's honor.",
    "coverUrl": "https://example.com/covers/way_of_vovinam.jpg",
    "pdfUrl": "https://example.com/pdfs/way_of_vovinam.pdf",
    "categoryNames": [
      "Action", "Children"
    ]
  },
  {
    "title": "Our Vietnam: A Journey from North to South",
    "translatedTitle": "Việt Nam Của Chúng Em: Hành Trình Từ Bắc Vào Nam",
    "language": "VI",
    "author": "Vietnam Geographic Society",
    "publisher": "Education Publishing House",
    "publishYear": 2023,
    "description": "An educational atlas for children, filled with colorful maps, fun facts, and beautiful illustrations showcasing the geography, culture, and wildlife of Vietnam's different regions.",
    "coverUrl": "https://example.com/covers/our_vietnam.jpg",
    "pdfUrl": "https://example.com/pdfs/our_vietnam.pdf",
    "categoryNames": [
      "Education", "Children", "Travel"
    ]
  },
  {
    "title": "The Tet That Went Wrong",
    "translatedTitle": "Cái Tết Sai Bét",
    "language": "EN",
    "author": "Danny Tran",
    "publisher": "Laugh Out Loud Books",
    "publishYear": 2025,
    "description": "A hilarious comedy of errors about three generations of a Vietnamese-American family gathering in Saigon for Tet, where cultural misunderstandings, sibling rivalries, and a prized chicken create chaos.",
    "coverUrl": "https://example.com/covers/wrong_tet.jpg",
    "pdfUrl": "https://example.com/pdfs/wrong_tet.pdf",
    "categoryNames": [
      "Comedy", "Drama"
    ]
  },
  {
    "title": "The Road to Reunification",
    "translatedTitle": "Con Đường Thống Nhất",
    "language": "EN",
    "author": "Alex Ryder",
    "publisher": "Endless Road Publishing",
    "publishYear": 2022,
    "description": "The travelogue and personal biography of a solo cyclist who documents his incredible journey along the Ho Chi Minh Highway, reflecting on the country's history and his own path to self-discovery.",
    "coverUrl": "https://example.com/covers/reunification_road.jpg",
    "pdfUrl": "https://example.com/pdfs/reunification_road.pdf",
    "categoryNames": [
      "Travel", "Biography", "Adventure"
    ]
  },
  {
    "title": "Sisters of the Elephant",
    "translatedTitle": "Chị Em Voi",
    "language": "EN",
    "author": "Joan Vu",
    "publisher": "Heroine Histories",
    "publishYear": 2024,
    "description": "A gripping historical fiction novel that brings the legendary Trung Sisters to life, detailing their fierce rebellion against Han Chinese rule through strategy, courage, and sisterhood.",
    "coverUrl": "https://example.com/covers/elephant_sisters.jpg",
    "pdfUrl": "https://example.com/pdfs/elephant_sisters.pdf",
    "categoryNames": [
      "Historical", "Action", "Biography"
    ]
  },
  {
    "title": "Whispers in the Sand Dunes",
    "translatedTitle": "Lời Thì Thầm Trong Đồi Cát",
    "language": "EN",
    "author": "Sara Meadows",
    "publisher": "Coastal Romance Books",
    "publishYear": 2023,
    "description": "A burned-out photographer seeking solitude in the quiet beach town of Mui Ne finds an unexpected connection with a local kitesurfing instructor who teaches her to embrace the wind again.",
    "coverUrl": "https://example.com/covers/mui_ne_whispers.jpg",
    "pdfUrl": "https://example.com/pdfs/mui_ne_whispers.pdf",
    "categoryNames": [
      "Romance"
    ]
  },
  {
    "title": "The Gene Weaver",
    "translatedTitle": "Người Dệt Gen",
    "language": "EN",
    "author": "Elias Vance",
    "publisher": "Helix Books",
    "publishYear": 2028,
    "description": "A bio-ethicist in Ho Chi Minh City grapples with the morality of his work when he is asked to lead a government project on human genetic enhancement, forcing him to question the definition of humanity.",
    "coverUrl": "https://example.com/covers/gene_weaver.jpg",
    "pdfUrl": "https://example.com/pdfs/gene_weaver.pdf",
    "categoryNames": [
      "Science Fiction", "Philosophy"
    ]
  },
  {
    "title": "Code Red: Dragon Bridge",
    "translatedTitle": "Mã Đỏ: Cầu Rồng",
    "language": "EN",
    "author": "Nick Carter",
    "publisher": "CyberTech Thrillers",
    "publishYear": 2025,
    "description": "A cybersecurity expert in Da Nang discovers that a hacker plans to seize control of the city's critical infrastructure, starting with the iconic Dragon Bridge, during a major international summit.",
    "coverUrl": "https://example.com/covers/dragon_bridge_code_red.jpg",
    "pdfUrl": "https://example.com/pdfs/dragon_bridge_code_red.pdf",
    "categoryNames": [
      "Thriller", "Action"
    ]
  },
  {
    "title": "The Body on Fansipan",
    "translatedTitle": "Thi Thể Trên Đỉnh Fansipan",
    "language": "VI",
    "author": "Phong Le",
    "publisher": "Sapa Mysteries",
    "publishYear": 2024,
    "description": "When a wealthy businessman is found dead near the summit of Vietnam's highest peak, a local H'mong guide and a cynical police detective must team up to solve a murder at 3,143 meters.",
    "coverUrl": "https://example.com/covers/fansipan_body.jpg",
    "pdfUrl": "https://example.com/pdfs/fansipan_body.pdf",
    "categoryNames": [
      "Mystery", "Adventure"
    ]
  },
  {
    "title": "The Rare Earth Conspiracy",
    "translatedTitle": "Âm Mưu Đất Hiếm",
    "language": "EN",
    "author": "John Grisham",
    "publisher": "Doubleday",
    "publishYear": 2026,
    "description": "An environmental lawyer investigating illegal mining operations in Lai Chau province uncovers a vast international conspiracy involving rare earth minerals, corporate greed, and political corruption.",
    "coverUrl": "https://example.com/covers/rare_earth_conspiracy.jpg",
    "pdfUrl": "https://example.com/pdfs/rare_earth_conspiracy.pdf",
    "categoryNames": [
      "Thriller", "Crime"
    ]
  },
  {
    "title": "The Ao Dai's Curse",
    "translatedTitle": "Lời Nguyền Của Chiếc Áo Dài",
    "language": "VI",
    "author": "Trang Ha",
    "publisher": "Ghost Story Press",
    "publishYear": 2023,
    "description": "A young woman in modern Hue inherits a beautiful, antique ao dai from her great-grandmother, only to discover it is possessed by a vengeful spirit that brings misfortune to anyone who wears it.",
    "coverUrl": "https://example.com/covers/ao_dai_curse.jpg",
    "pdfUrl": "https://example.com/pdfs/ao_dai_curse.pdf",
    "categoryNames": [
      "Horror", "Historical"
    ]
  },
  {
    "title": "The Calligrapher's Ink",
    "translatedTitle": "Mực Thư Pháp",
    "language": "VI",
    "author": "Master Thien An",
    "publisher": "Philosophical Horror",
    "publishYear": 2025,
    "description": "An old calligrapher in Hanoi's Temple of Literature discovers that his ink has gained a supernatural power: whatever he writes comes true, but always with a terrible, ironic twist.",
    "coverUrl": "https://example.com/covers/calligrapher_ink.jpg",
    "pdfUrl": "https://example.com/pdfs/calligrapher_ink.pdf",
    "categoryNames": [
      "Horror", "Philosophy", "Fantasy"
    ]
  },
  {
    "title": "The Gate to Bong Lai",
    "translatedTitle": "Cánh Cổng Tới Bồng Lai",
    "language": "EN",
    "author": "D. T. Nguyen",
    "publisher": "Portal Fantasy Books",
    "publishYear": 2026,
    "description": "An ordinary office worker from Binh Duong falls through a mysterious portal in an industrial park and finds himself in Bong Lai, a mythical land of Vietnamese legend he must now navigate to find his way home.",
    "coverUrl": "https://example.com/covers/bong_lai_gate.jpg",
    "pdfUrl": "https://example.com/pdfs/bong_lai_gate.pdf",
    "categoryNames": [
      "Fantasy", "Adventure"
    ]
  },
  {
    "title": "Returning Son",
    "translatedTitle": "Người Con Trở Về",
    "language": "EN",
    "author": "Andrew Pham",
    "publisher": "Diaspora Stories",
    "publishYear": 2022,
    "description": "A second-generation Viet Kieu from California returns to his parents' village in Quang Nam for the first time, confronting a culture he barely understands and a family history he never knew.",
    "coverUrl": "https://example.com/covers/returning_son.jpg",
    "pdfUrl": "https://example.com/pdfs/returning_son.pdf",
    "categoryNames": [
      "Drama", "Biography"
    ]
  },
  {
    "title": "The Modern Masters of Vietnam",
    "translatedTitle": "Các Bậc Thầy Hiện Đại Của Việt Nam",
    "language": "EN",
    "author": "The Hanoi Art Review",
    "publisher": "Artisan Press",
    "publishYear": 2021,
    "description": "A beautifully curated biography and collection of works from Vietnam's most influential 20th-century painters, from Le Pho to Bui Xuan Phai.",
    "coverUrl": "https://example.com/covers/modern_masters.jpg",
    "pdfUrl": "https://example.com/pdfs/modern_masters.pdf",
    "categoryNames": [
      "Biography", "Education"
    ]
  },
  {
    "title": "Mosaic of Peoples: Vietnam's 54 Ethnic Groups",
    "translatedTitle": "Bức Tranh Các Dân Tộc: 54 Dân Tộc Việt Nam",
    "language": "EN",
    "author": "Dr. Sarah Albright",
    "publisher": "Cultural Anthropology Press",
    "publishYear": 2024,
    "description": "An exhaustive and respectful guide to the diverse cultures, languages, and traditions of all 54 officially recognized ethnic groups in Vietnam.",
    "coverUrl": "https://example.com/covers/mosaic_of_peoples.jpg",
    "pdfUrl": "https://example.com/pdfs/mosaic_of_peoples.pdf",
    "categoryNames": [
      "Education", "Travel", "Historical"
    ]
  },
  {
    "title": "The Southern Apothecary",
    "translatedTitle": "Tiệm Thuốc Nam",
    "language": "VI",
    "author": "Luong Y Tran",
    "publisher": "Health and Heritage",
    "publishYear": 2020,
    "description": "A comprehensive guide to traditional Vietnamese medicine (Thuoc Nam), detailing common herbs, their uses, and how to prepare remedies for everyday ailments.",
    "coverUrl": "https://example.com/covers/southern_apothecary.jpg",
    "pdfUrl": "https://example.com/pdfs/southern_apothecary.pdf",
    "categoryNames": [
      "Education", "Self-Help"
    ]
  },
  {
    "title": "The Story of Chu Nom",
    "translatedTitle": "Câu Chuyện Chữ Nôm",
    "language": "EN",
    "author": "John DeFrancis",
    "publisher": "Linguistics History Press",
    "publishYear": 2019,
    "description": "An academic but engaging book on the history of the Vietnamese language, focusing on the development and eventual decline of the logographic Chu Nom script.",
    "coverUrl": "https://example.com/covers/chu_nom_story.jpg",
    "pdfUrl": "https://example.com/pdfs/chu_nom_story.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Minimalist Hut",
    "translatedTitle": "Túp Lều Tối Giản",
    "language": "EN",
    "author": "Brother Phap An",
    "publisher": "Simple Living Books",
    "publishYear": 2023,
    "description": "A self-help guide that applies the principles of Zen Buddhism and traditional Vietnamese rural life to the modern pursuit of minimalism and decluttering one's life.",
    "coverUrl": "https://example.com/covers/minimalist_hut.jpg",
    "pdfUrl": "https://example.com/pdfs/minimalist_hut.pdf",
    "categoryNames": [
      "Self-Help", "Philosophy"
    ]
  },
  {
    "title": "Hue Noir",
    "translatedTitle": "Huế Đen",
    "language": "VI",
    "author": "Dang Nhat Minh",
    "publisher": "Imperial City Crime",
    "publishYear": 2025,
    "description": "A classic noir detective story set in the moody, rain-soaked city of Hue, where a private eye investigates the disappearance of a young woman from a noble family, uncovering dark secrets beneath the city's poetic facade.",
    "coverUrl": "https://example.com/covers/hue_noir.jpg",
    "pdfUrl": "https://example.com/pdfs/hue_noir.pdf",
    "categoryNames": [
      "Crime", "Mystery"
    ]
  },
  {
    "title": "The Last Signal",
    "translatedTitle": "Tín Hiệu Cuối Cùng",
    "language": "EN",
    "author": "Mark Greaney",
    "publisher": "Penguin Group",
    "publishYear": 2026,
    "description": "When a US Navy submarine goes silent in the South China Sea, an elite team must be sent into contested waters near the Spratly Islands to investigate, uncovering a shocking act of aggression.",
    "coverUrl": "https://example.com/covers/last_signal.jpg",
    "pdfUrl": "https://example.com/pdfs/last_signal.pdf",
    "categoryNames": [
      "Action", "Thriller"
    ]
  },
  {
    "title": "The Start-Up Bubble",
    "translatedTitle": "Bong Bóng Khởi Nghiệp",
    "language": "EN",
    "author": "Vinh Le",
    "publisher": "Da Nang Tech Press",
    "publishYear": 2024,
    "description": "A corporate thriller about a young programmer in Da Nang's booming tech scene who discovers his company is at the center of a massive financial fraud, putting his career and life on the line.",
    "coverUrl": "https://example.com/covers/startup_bubble.jpg",
    "pdfUrl": "https://example.com/pdfs/startup_bubble.pdf",
    "categoryNames": [
      "Crime", "Drama"
    ]
  },
  {
    "title": "The Disappearance on Ly Son Island",
    "translatedTitle": "Sự Mất Tích Trên Đảo Lý Sơn",
    "language": "VI",
    "author": "Quang Dung",
    "publisher": "Island Mysteries",
    "publishYear": 2022,
    "description": "A celebrated writer retreats to the tranquil Ly Son Island to overcome his writer's block, but becomes obsessed with the unsolved disappearance of a young woman from the island a decade earlier.",
    "coverUrl": "https://example.com/covers/ly_son_disappearance.jpg",
    "pdfUrl": "https://example.com/pdfs/ly_son_disappearance.pdf",
    "categoryNames": [
      "Mystery", "Thriller"
    ]
  },
  {
    "title": "Highlands Terraformed",
    "translatedTitle": "Cao Nguyên Tái Sinh",
    "language": "EN",
    "author": "Bao Nguyen",
    "publisher": "Eco-Futures Press",
    "publishYear": 2031,
    "description": "After a devastating ecological collapse turns the Central Highlands into a desert, a team of scientists is tasked with a massive terraforming project, battling corporate saboteurs and the ghosts of the extinct ecosystem.",
    "coverUrl": "https://example.com/covers/highlands_terraformed.jpg",
    "pdfUrl": "https://example.com/pdfs/highlands_terraformed.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "The Lacquer Automaton",
    "translatedTitle": "Sơn Mài Tự Động",
    "language": "VI",
    "author": "AI-Son",
    "publisher": "DataVerse Arts",
    "publishYear": 2029,
    "description": "An advanced AI, created to preserve traditional Vietnamese art forms, begins to create its own original lacquer paintings, sparking a global debate on the nature of creativity and consciousness.",
    "coverUrl": "https://example.com/covers/lacquer_automaton.jpg",
    "pdfUrl": "https://example.com/pdfs/lacquer_automaton.pdf",
    "categoryNames": [
      "Science Fiction", "Philosophy"
    ]
  },
  {
    "title": "First Contact: Dragon's Jaw",
    "translatedTitle": "Tiếp Xúc Đầu Tiên: Hàm Rồng",
    "language": "EN",
    "author": "Admiral Nguyen",
    "publisher": "Galactic Fleet Publishing",
    "publishYear": 2033,
    "description": "An alien vessel peacefully emerges from the waters of Ha Long Bay, and a brilliant Vietnamese linguist must lead the first contact team aboard a naval ship to bridge the gulf between worlds.",
    "coverUrl": "https://example.com/covers/first_contact_dragon.jpg",
    "pdfUrl": "https://example.com/pdfs/first_contact_dragon.pdf",
    "categoryNames": [
      "Science Fiction", "Adventure"
    ]
  },
  {
    "title": "Chrome & Shadow: A District 4 Story",
    "translatedTitle": "Chrome & Bóng Tối: Chuyện Quận 4",
    "language": "EN",
    "author": "Neon Vinh",
    "publisher": "Cyberpunk Saigon",
    "publishYear": 2030,
    "description": "In the rain-slicked, neon-lit alleys of a futuristic District 4, a 'memory broker' gets entangled in a criminal conspiracy after he downloads a memory of a murder he wasn't supposed to see.",
    "coverUrl": "https://example.com/covers/chrome_shadow.jpg",
    "pdfUrl": "https://example.com/pdfs/chrome_shadow.pdf",
    "categoryNames": [
      "Science Fiction", "Crime", "Thriller"
    ]
  },
  {
    "title": "The Water Will Come",
    "translatedTitle": "Nước Sẽ Dâng",
    "language": "VI",
    "author": "An Nhien",
    "publisher": "Mekong Delta Press",
    "publishYear": 2028,
    "description": "A poignant climate fiction novel following three generations of a family in the Mekong Delta as they grapple with the decision to abandon their ancestral home due to rising sea levels.",
    "coverUrl": "https://example.com/covers/water_will_come.jpg",
    "pdfUrl": "https://example.com/pdfs/water_will_come.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "Starship Lac Viet",
    "translatedTitle": "Phi Thuyền Lạc Việt",
    "language": "EN",
    "author": "Captain Tran",
    "publisher": "Cosmic Viet Books",
    "publishYear": 2040,
    "description": "A Vietnamese-led exploration starship on a five-year mission to a distant nebula must contend with alien factions, internal mutiny, and the vast loneliness of deep space.",
    "coverUrl": "https://example.com/covers/starship_lac_viet.jpg",
    "pdfUrl": "https://example.com/pdfs/starship_lac_viet.pdf",
    "categoryNames": [
      "Science Fiction", "Action", "Adventure"
    ]
  },
  {
    "title": "Secrets of the Purple Court",
    "translatedTitle": "Bí Mật Tử Cấm Thành",
    "language": "VI",
    "author": "Su Hoc Gia Le",
    "publisher": "Imperial Archives",
    "publishYear": 2024,
    "description": "A historical mystery set in the newly established court of Emperor Gia Long, where a royal physician must solve the poisoning of a high-ranking mandarin before he becomes the next victim.",
    "coverUrl": "https://example.com/covers/purple_court.jpg",
    "pdfUrl": "https://example.com/pdfs/purple_court.pdf",
    "categoryNames": [
      "Historical", "Mystery", "Crime"
    ]
  },
  {
    "title": "The Puppeteer's Lament",
    "translatedTitle": "Lời Than Của Người Múa Rối",
    "language": "EN",
    "author": "The Storyteller",
    "publisher": "Macabre Creations",
    "publishYear": 2026,
    "description": "A lonely water puppeteer's creations become increasingly lifelike and sinister after he uses wood from a haunted tree, blurring the line between performance and reality in this chilling psychological thriller.",
    "coverUrl": "https://example.com/covers/puppeteer_lament.jpg",
    "pdfUrl": "https://example.com/pdfs/puppeteer_lament.pdf",
    "categoryNames": [
      "Thriller", "Horror", "Fantasy"
    ]
  },
  {
    "title": "The Phu My Hung Case",
    "translatedTitle": "Vụ Án Phú Mỹ Hưng",
    "language": "VI",
    "author": "Luat Su Tran",
    "publisher": "Legal Eagle Press",
    "publishYear": 2025,
    "description": "A high-stakes legal thriller centered on a small family fighting a powerful real estate conglomerate over a valuable piece of land in Ho Chi Minh City's most affluent district.",
    "coverUrl": "https://example.com/covers/phu_my_hung_case.jpg",
    "pdfUrl": "https://example.com/pdfs/phu_my_hung_case.pdf",
    "categoryNames": [
      "Crime", "Drama"
    ]
  },
  {
    "title": "The Tailor of Tran Phu Street",
    "translatedTitle": "Thợ May Đường Trần Phú",
    "language": "EN",
    "author": "Agnes Belle",
    "publisher": "Cozy Mysteries Intl.",
    "publishYear": 2027,
    "description": "The owner of a popular tailor shop in Hoi An uses her keen eye for detail and local gossip to solve the mysterious disappearance of a valuable silk scroll, all while dealing with demanding tourists.",
    "coverUrl": "https://example.com/covers/tailor_tran_phu.jpg",
    "pdfUrl": "https://example.com/pdfs/tailor_tran_phu.pdf",
    "categoryNames": [
      "Mystery", "Comedy"
    ]
  },
  {
    "title": "Cave of Whispers",
    "translatedTitle": "Hang Động Lời Thì Thầm",
    "language": "EN",
    "author": "Chris Howard",
    "publisher": "Adventure Thrills",
    "publishYear": 2025,
    "description": "During an expedition in Phong Nha-Ke Bang, a group of cavers is trapped by a landslide. As their supplies dwindle, they realize the collapse was no accident and the saboteur is one of them.",
    "coverUrl": "https://example.com/covers/cave_of_whispers.jpg",
    "pdfUrl": "https://example.com/pdfs/cave_of_whispers.pdf",
    "categoryNames": [
      "Adventure", "Thriller"
    ]
  },
  {
    "title": "The Stolen Apsara",
    "translatedTitle": "Vũ Nữ Apsara Bị Đánh Cắp",
    "language": "FR",
    "author": "Jean-Paul Devereaux",
    "publisher": "Art Crime International",
    "publishYear": 2024,
    "description": "An art historian and a skeptical local police officer team up to track a priceless Cham sculpture stolen from the My Son Sanctuary, leading them into the dangerous world of international art thieves.",
    "coverUrl": "https://example.com/covers/stolen_apsara.jpg",
    "pdfUrl": "https://example.com/pdfs/stolen_apsara.pdf",
    "categoryNames": [
      "Crime", "Historical", "Mystery"
    ]
  },
  {
    "title": "Mountain Tiger's Shadow",
    "translatedTitle": "Bóng Hổ Lang Biang",
    "language": "EN",
    "author": "L. M. Ksor",
    "publisher": "Urban Fantasy Press",
    "publishYear": 2026,
    "description": "A young woman in Da Lat discovers she is descended from a line of were-tigers and must learn to control her powers to protect her clan from a faction seeking to expose them to the world.",
    "coverUrl": "https://example.com/covers/mountain_tiger.jpg",
    "pdfUrl": "https://example.com/pdfs/mountain_tiger.pdf",
    "categoryNames": [
      "Fantasy", "Action"
    ]
  },
  {
    "title": "It Cries in the Night",
    "translatedTitle": "Nó Khóc Trong Đêm",
    "language": "VI",
    "author": "Hac암",
    "publisher": "Vietnamese Horror Stories",
    "publishYear": 2027,
    "description": "A story based on the terrifying Vietnamese folklore of the 'Con Ma Da,' the ghost of a drowned child that haunts riverbanks, luring victims to a watery grave.",
    "coverUrl": "https://example.com/covers/it_cries_in_night.jpg",
    "pdfUrl": "https://example.com/pdfs/it_cries_in_night.pdf",
    "categoryNames": [
      "Horror"
    ]
  },
  {
    "title": "I, The Ocean Lord",
    "translatedTitle": "Ta, Thủy Tinh",
    "language": "EN",
    "author": "Thuy Tinh",
    "publisher": "Myth Retold",
    "publishYear": 2025,
    "description": "The epic legend of Son Tinh and Thuy Tinh is turned on its head in this revisionist retelling, narrated by the sea god Thuy Tinh, who frames his eternal struggle not as one of jealousy, but of ecological balance against mountain encroachment.",
    "coverUrl": "https://example.com/covers/ocean_lord.jpg",
    "pdfUrl": "https://example.com/pdfs/ocean_lord.pdf",
    "categoryNames": [
      "Fantasy", "Drama"
    ]
  },
  {
    "title": "The Shaman's Apprentice",
    "translatedTitle": "Đệ Tử Thầy Cúng",
    "language": "VI",
    "author": "Doan Gioi",
    "publisher": "Young Spirit Realm",
    "publishYear": 2026,
    "description": "A young boy from a northern mountain village discovers he has the ability to see spirits and is sent to a hidden school to train as a shaman (thầy cúng), learning to balance the worlds of the living and the dead.",
    "coverUrl": "https://example.com/covers/shaman_apprentice.jpg",
    "pdfUrl": "https://example.com/pdfs/shaman_apprentice.pdf",
    "categoryNames": [
      "Fantasy", "Children", "Adventure"
    ]
  },
  {
    "title": "The Haunted Tour Bus",
    "translatedTitle": "Chuyến Xe Tour Ma Ám",
    "language": "EN",
    "author": "Spooky Tran",
    "publisher": "Gallows Humor Press",
    "publishYear": 2024,
    "description": "The operators of a failing ghost tour in Hue get more than they bargain for when they accidentally run over the grave of a vengeful mandarin, who decides to become their permanent, and very real, main attraction.",
    "coverUrl": "https://example.com/covers/haunted_tour_bus.jpg",
    "pdfUrl": "https://example.com/pdfs/haunted_tour_bus.pdf",
    "categoryNames": [
      "Horror", "Comedy"
    ]
  },
  {
    "title": "Bronze Drum Warriors",
    "translatedTitle": "Chiến Binh Trống Đồng",
    "language": "EN",
    "author": "H. V. Hung",
    "publisher": "Epic Sagas",
    "publishYear": 2028,
    "description": "An archaeologist discovers that the intricate patterns on an ancient Dong Son drum are a gateway to a mythical world, where the heroes and creatures depicted on it are real and locked in an eternal war.",
    "coverUrl": "https://example.com/covers/bronze_drum_warriors.jpg",
    "pdfUrl": "https://example.com/pdfs/bronze_drum_warriors.pdf",
    "categoryNames": [
      "Fantasy", "Adventure", "Action"
    ]
  },
  {
    "title": "The Ancestors' Gate",
    "translatedTitle": "Cổng Tổ Tiên",
    "language": "VI",
    "author": "Kim Luan",
    "publisher": "Spirit World Books",
    "publishYear": 2027,
    "description": "During Tet, a young girl discovers that by burning incense at her family's altar, she can physically travel to the spirit world to meet her ancestors and must help them solve a crisis that threatens their realm.",
    "coverUrl": "https://example.com/covers/ancestors_gate.jpg",
    "pdfUrl": "https://example.com/pdfs/ancestors_gate.pdf",
    "categoryNames": [
      "Fantasy", "Adventure", "Children"
    ]
  },
  {
    "title": "The House of Flowing Broth",
    "translatedTitle": "Gia Tộc Nước Lèo",
    "language": "EN",
    "author": "Michelle Phan",
    "publisher": "Generations Press",
    "publishYear": 2025,
    "description": "A multi-generational family saga spanning 100 years, centered around a legendary pho restaurant in Nam Dinh and the family secrets that are passed down with the recipe.",
    "coverUrl": "https://example.com/covers/flowing_broth.jpg",
    "pdfUrl": "https://example.com/pdfs/flowing_broth.pdf",
    "categoryNames": [
      "Drama", "Historical"
    ]
  },
  {
    "title": "#FamousInThaoDien",
    "translatedTitle": "#NổiTiếngỞThảoĐiền",
    "language": "EN",
    "author": "Anonymous",
    "publisher": "Satire House",
    "publishYear": 2026,
    "description": "A biting satirical novel about the absurd and dramatic lives of a group of social media influencers in Ho Chi Minh City's trendiest expatriate neighborhood.",
    "coverUrl": "https://example.com/covers/famous_thao_dien.jpg",
    "pdfUrl": "https://example.com/pdfs/famous_thao_dien.pdf",
    "categoryNames": [
      "Comedy", "Drama"
    ]
  },
  {
    "title": "A Week on Two Wheels",
    "translatedTitle": "Một Tuần Trên Hai Bánh Xe",
    "language": "VI",
    "author": "Tai Xe Om",
    "publisher": "Literary Life Press",
    "publishYear": 2024,
    "description": "A contemplative, literary novel that follows a GrabBike driver in Hanoi for seven days, exploring the city's soul and the human condition through his brief encounters with passengers.",
    "coverUrl": "https://example.com/covers/week_on_two_wheels.jpg",
    "pdfUrl": "https://example.com/pdfs/week_on_two_wheels.pdf",
    "categoryNames": [
      "Drama", "Philosophy"
    ]
  },
  {
    "title": "The Coffee Queen of Buon Ma Thuot",
    "translatedTitle": "Nữ Hoàng Cà Phê Buôn Ma Thuột",
    "language": "EN",
    "author": "Y'Binh",
    "publisher": "Central Highlands Stories",
    "publishYear": 2025,
    "description": "A powerful drama about a third-generation female coffee farmer who fights to save her family's independent plantation from being bought out by a large, predatory corporation.",
    "coverUrl": "https://example.com/covers/coffee_queen.jpg",
    "pdfUrl": "https://example.com/pdfs/coffee_queen.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "Golden Girls FC",
    "translatedTitle": "Câu Lạc Bộ Nữ Tướng Vàng",
    "language": "VI",
    "author": "Coach Mai",
    "publisher": "Victory Press",
    "publishYear": 2026,
    "description": "An inspiring story about a women's football team from a poor province that overcomes financial hardship, social prejudice, and fierce rivals to compete for the national championship.",
    "coverUrl": "https://example.com/covers/golden_girls_fc.jpg",
    "pdfUrl": "https://example.com/pdfs/golden_girls_fc.pdf",
    "categoryNames": [
      "Drama", "Action"
    ]
  },
  {
    "title": "The Scent of Incense",
    "translatedTitle": "Mùi Trầm Hương",
    "language": "EN",
    "author": "Thich Tam An",
    "publisher": "Mindfulness Books",
    "publishYear": 2023,
    "description": "A quiet, meditative novel about the daily life, rituals, and philosophical musings of an elderly monk living in a remote pagoda in the mountains of Yen Tu.",
    "coverUrl": "https://example.com/covers/scent_of_incense.jpg",
    "pdfUrl": "https://example.com/pdfs/scent_of_incense.pdf",
    "categoryNames": [
      "Drama", "Philosophy"
    ]
  },
  {
    "title": "The Father of a Nation's Script",
    "translatedTitle": "Người Cha Của Chữ Quốc Ngữ",
    "language": "EN",
    "author": "Charles D'Souza",
    "publisher": "Historical Biographies",
    "publishYear": 2022,
    "description": "A detailed biography of French Jesuit missionary Alexandre de Rhodes and his pivotal role in codifying the Vietnamese alphabet, Quoc Ngu, in the 17th century.",
    "coverUrl": "https://example.com/covers/alexandre_de_rhodes.jpg",
    "pdfUrl": "https://example.com/pdfs/alexandre_de_rhodes.pdf",
    "categoryNames": [
      "Biography", "Historical", "Education"
    ]
  },
  {
    "title": "The Architecture of Dragons & Phoenixes",
    "translatedTitle": "Kiến Trúc Của Rồng Phượng",
    "language": "EN",
    "author": "Hue Monuments Conservation Centre",
    "publisher": "UNESCO Press",
    "publishYear": 2024,
    "description": "An educational guide and photo-book exploring the intricate architecture, symbolism, and history behind the palaces, temples, and tombs of Hue's Imperial City.",
    "coverUrl": "https://example.com/covers/hue_architecture.jpg",
    "pdfUrl": "https://example.com/pdfs/hue_architecture.pdf",
    "categoryNames": [
      "Education", "Historical", "Travel"
    ]
  },
  {
    "title": "A World of Noodles",
    "translatedTitle": "Thế Giới Của Sợi Mì",
    "language": "VI",
    "author": "Vua Bep",
    "publisher": "Culinary Press",
    "publishYear": 2025,
    "description": "A definitive cookbook dedicated entirely to Vietnam's vast noodle culture, with recipes and stories for everything from Phở and Bún to Mì Quảng and Cao Lầu.",
    "coverUrl": "https://example.com/covers/world_of_noodles.jpg",
    "pdfUrl": "https://example.com/pdfs/world_of_noodles.pdf",
    "categoryNames": [
      "Cooking"
    ]
  },
  {
    "title": "The Art of the Deal, Saigon Style",
    "translatedTitle": "Nghệ Thuật Đàm Phán, Kiểu Sài Gòn",
    "language": "EN",
    "author": "A Tycoon",
    "publisher": "Business Brains",
    "publishYear": 2026,
    "description": "A self-help book that adapts the ancient strategies of Sun Tzu's 'The Art of War' for modern business negotiations in the fast-paced, relationship-driven environment of Vietnam.",
    "coverUrl": "https://example.com/covers/saigon_deal.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_deal.pdf",
    "categoryNames": [
      "Self-Help", "Education"
    ]
  },
  {
    "title": "The Fear Factor Foodie",
    "translatedTitle": "Tín Đồ Ẩm Thực Mạo Hiểm",
    "language": "EN",
    "author": "Daredevil Dave",
    "publisher": "Extreme Eats Guides",
    "publishYear": 2024,
    "description": "A travel guide for the truly adventurous eater, detailing where to find and how to eat Vietnam's most unusual and challenging dishes, from balut to scorpion wine.",
    "coverUrl": "https://example.com/covers/fear_factor_foodie.jpg",
    "pdfUrl": "https://example.com/pdfs/fear_factor_foodie.pdf",
    "categoryNames": [
      "Travel", "Cooking"
    ]
  },
  {
    "title": "The World Within a Cave",
    "translatedTitle": "Thế Giới Trong Hang Động",
    "language": "EN",
    "author": "National Geographic",
    "publisher": "Explorer's Press",
    "publishYear": 2023,
    "description": "An awe-inspiring educational book showcasing the unique ecosystem, geological formations, and incredible biodiversity of Son Doong, the world's largest cave.",
    "coverUrl": "https://example.com/covers/son_doong.jpg",
    "pdfUrl": "https://example.com/pdfs/son_doong.pdf",
    "categoryNames": [
      "Education", "Travel"
    ]
  },
  {
    "title": "Duyen: The Threads of Destiny",
    "translatedTitle": "Duyên: Những Sợi Chỉ Định Mệnh",
    "language": "EN",
    "author": "Trieu Van",
    "publisher": "Eastern Philosophy Press",
    "publishYear": 2025,
    "description": "A deep philosophical exploration of the Vietnamese cultural concept of 'duyên' — the predetermined affinity or karmic connection that brings people together.",
    "coverUrl": "https://example.com/covers/duyen_threads.jpg",
    "pdfUrl": "https://example.com/pdfs/duyen_threads.pdf",
    "categoryNames": [
      "Philosophy", "Self-Help"
    ]
  },
  {
    "title": "Ao Dai: A Century of Elegance",
    "translatedTitle": "Áo Dài: Một Thế Kỷ Thanh Lịch",
    "language": "VI",
    "author": "Si Hoang",
    "publisher": "Fashion Heritage",
    "publishYear": 2022,
    "description": "A beautiful photo-biography that traces the evolution of the Vietnamese Ao Dai from the 1920s to the present day, showcasing its cultural significance and timeless elegance.",
    "coverUrl": "https://example.com/covers/ao_dai_century.jpg",
    "pdfUrl": "https://example.com/pdfs/ao_dai_century.pdf",
    "categoryNames": [
      "Historical", "Biography"
    ]
  },
  {
    "title": "Project Le Loi",
    "translatedTitle": "Dự Án Lê Lợi",
    "language": "EN",
    "author": "Trang Le",
    "publisher": "Young Adult Tech",
    "publishYear": 2027,
    "description": "Two rival high school students, a brilliant coder and a master hardware engineer, are forced to team up for a national robotics competition, finding romance amidst the circuits and stress.",
    "coverUrl": "https://example.com/covers/project_le_loi.jpg",
    "pdfUrl": "https://example.com/pdfs/project_le_loi.pdf",
    "categoryNames": [
      "Romance", "Children"
    ]
  },
  {
    "title": "A Buffalo's Day",
    "translatedTitle": "Một Ngày Của Con Trâu",
    "language": "VI",
    "author": "Thach Thao",
    "publisher": "Rice Paddy Books for Kids",
    "publishYear": 2023,
    "description": "A simple and beautifully illustrated picture book for young children that follows a friendly water buffalo through its day of working in the rice paddies and playing in the mud.",
    "coverUrl": "https://example.com/covers/buffalo_day.jpg",
    "pdfUrl": "https://example.com/pdfs/buffalo_day.pdf",
    "categoryNames": [
      "Children"
    ]
  },
  {
    "title": "The Motorbike Sonatas",
    "translatedTitle": "Những Bản Sonata Xe Máy",
    "language": "EN",
    "author": "Huu Thinh",
    "publisher": "Hanoi Poetry Society",
    "publishYear": 2026,
    "description": "A collection of free-verse poems that capture the chaotic symphony of Hanoi's streets: the roar of motorbikes, the calls of street vendors, the rhythm of daily life.",
    "coverUrl": "https://example.com/covers/motorbike_sonatas.jpg",
    "pdfUrl": "https://example.com/pdfs/motorbike_sonatas.pdf",
    "categoryNames": [
      "Poetry"
    ]
  },
  {
    "title": "The Bunker of Dien Bien Phu",
    "translatedTitle": "Hầm Trú Ẩn Điện Biên Phủ",
    "language": "EN",
    "author": "Maxime Durand",
    "publisher": "YA Adventures",
    "publishYear": 2025,
    "description": "While exploring their grandfather's old property, a group of teenagers finds a hidden map that leads them to a secret French colonial-era bunker filled with historical artifacts and a long-forgotten mystery.",
    "coverUrl": "https://example.com/covers/dien_bien_phu_bunker.jpg",
    "pdfUrl": "https://example.com/pdfs/dien_bien_phu_bunker.pdf",
    "categoryNames": [
      "Adventure", "Children", "Mystery"
    ]
  },
  {
    "title": "Com Tam for Two",
    "translatedTitle": "Cơm Tấm Cho Hai Người",
    "language": "EN",
    "author": "Jenny Nguyen",
    "publisher": "Sweetheart Press",
    "publishYear": 2024,
    "description": "An accountant and a graphic designer working in the same office building slowly fall in love during their daily lunch breaks at a humble street food stall that sells the best broken rice in Saigon.",
    "coverUrl": "https://example.com/covers/com_tam_for_two.jpg",
    "pdfUrl": "https://example.com/pdfs/com_tam_for_two.pdf",
    "categoryNames": [
      "Romance", "Comedy"
    ]
  },
  {
    "title": "The Poet and the Prefect",
    "translatedTitle": "Nhà Thơ Và Vị Quận Trưởng",
    "language": "EN",
    "author": "Isabelle Laurent",
    "publisher": "Indochine Romance",
    "publishYear": 2023,
    "description": "A sweeping historical romance set in 1930s Hanoi between a fiery Vietnamese nationalist poet and a conflicted French official who finds his loyalties torn between his duty and his heart.",
    "coverUrl": "https://example.com/covers/poet_and_prefect.jpg",
    "pdfUrl": "https://example.com/pdfs/poet_and_prefect.pdf",
    "categoryNames": [
      "Historical", "Romance", "Drama"
    ]
  },
  {
    "title": "A is for An, B is for Banh",
    "translatedTitle": "A là An, B là Bánh",
    "language": "VI",
    "author": "Co Giao Thao",
    "publisher": "First Steps Publishing",
    "publishYear": 2024,
    "description": "A fun and colorful alphabet book for young children learning Vietnamese, with each letter represented by a cute animal character and a common word.",
    "coverUrl": "https://example.com/covers/a_is_for_an.jpg",
    "pdfUrl": "https://example.com/pdfs/a_is_for_an.pdf",
    "categoryNames": [
      "Children", "Education"
    ]
  },
  {
    "title": "Third Culture Kid Blues",
    "translatedTitle": "Nỗi Buồn Đứa Trẻ Văn Hóa Thứ Ba",
    "language": "EN",
    "author": "Alex Trinh",
    "publisher": "Global Citizen YA",
    "publishYear": 2026,
    "description": "A Young Adult novel about an American-born Vietnamese teenager who moves to Ho Chi Minh City for high school and struggles to find his identity, feeling like a foreigner in both of his cultures.",
    "coverUrl": "https://example.com/covers/third_culture_kid.jpg",
    "pdfUrl": "https://example.com/pdfs/third_culture_kid.pdf",
    "categoryNames": [
      "Drama", "Children"
    ]
  },
  {
    "title": "Diễm's Rain: Poems of Love",
    "translatedTitle": "Mưa Của Diễm: Thơ Tình",
    "language": "EN",
    "author": "TCS Fan",
    "publisher": "Melancholy Verse",
    "publishYear": 2022,
    "description": "A collection of short, lyrical poems about love, longing, and ephemeral beauty, heavily inspired by the themes and musicality of legendary Vietnamese songwriter Trinh Cong Son.",
    "coverUrl": "https://example.com/covers/diems_rain.jpg",
    "pdfUrl": "https://example.com/pdfs/diems_rain.pdf",
    "categoryNames": [
      "Poetry", "Romance"
    ]
  },
  {
    "title": "The Last Tour",
    "translatedTitle": "Chuyến Đi Cuối Cùng",
    "language": "EN",
    "author": "Hailey Clark",
    "publisher": "Wanderlust Romance",
    "publishYear": 2025,
    "description": "Two rival tour guides, one specializing in history and the other in adventure, are forced to co-lead a cross-country trip. Their conflicting styles lead to hilarious mishaps and an unexpected romance.",
    "coverUrl": "https://example.com/covers/last_tour.jpg",
    "pdfUrl": "https://example.com/pdfs/last_tour.pdf",
    "categoryNames": [
      "Romance", "Travel", "Comedy"
    ]
  },
  {
    "title": "Bio-Goi Cuon",
    "translatedTitle": "Gỏi Cuốn Sinh Học",
    "language": "EN",
    "author": "KiloByte",
    "publisher": "BioPunk Press",
    "publishYear": 2032,
    "description": "In a bio-punk future, a street food vendor in Saigon becomes a target for a powerful corporation after she illegally gene-splices exotic flavors into her food, creating a culinary sensation they want to control.",
    "coverUrl": "https://example.com/covers/bio_goi_cuon.jpg",
    "pdfUrl": "https://example.com/pdfs/bio_goi_cuon.pdf",
    "categoryNames": [
      "Science Fiction", "Thriller"
    ]
  },
  {
    "title": "The Train to Sapa",
    "translatedTitle": "Chuyến Tàu Lên Sapa",
    "language": "EN",
    "author": "Agatha Christie Jr.",
    "publisher": "Classic Whodunits",
    "publishYear": 2027,
    "description": "A classic whodunit set on a luxury overnight train from Hanoi to Lao Cai. When a wealthy passenger is murdered in his locked cabin, a vacationing detective must find the killer among the eccentric group of travelers.",
    "coverUrl": "https://example.com/covers/train_to_sapa.jpg",
    "pdfUrl": "https://example.com/pdfs/train_to_sapa.pdf",
    "categoryNames": [
      "Mystery"
    ]
  },
  {
    "title": "The Marsh of Lost Souls",
    "translatedTitle": "Đầm Lầy Linh Hồn Lạc",
    "language": "VI",
    "author": "Canh Dong Ma",
    "publisher": "Delta Horror",
    "publishYear": 2026,
    "description": "A group of friends on a trip in the Mekong Delta gets stranded at a remote fish farm. They soon realize the farm is a feeding ground for vengeful spirits that rise from the murky water at night.",
    "coverUrl": "https://example.com/covers/marsh_of_lost_souls.jpg",
    "pdfUrl": "https://example.com/pdfs/marsh_of_lost_souls.pdf",
    "categoryNames": [
      "Horror"
    ]
  },
  {
    "title": "Concrete and Steel",
    "translatedTitle": "Bê Tông Và Thép",
    "language": "EN",
    "author": "V. D. Tung",
    "publisher": "Hardboiled House",
    "publishYear": 2025,
    "description": "A cynical, hardboiled private investigator takes on a case of a 'missing' construction worker, uncovering a deep-rooted web of corruption, blackmail, and murder within the city's booming construction industry.",
    "coverUrl": "https://example.com/covers/concrete_steel.jpg",
    "pdfUrl": "https://example.com/pdfs/concrete_steel.pdf",
    "categoryNames": [
      "Crime", "Mystery"
    ]
  },
  {
    "title": "The Border Town Broker",
    "translatedTitle": "Nhà Môi Giới Thị Trấn Biên Giới",
    "language": "EN",
    "author": "Sarah Connor",
    "publisher": "Investigative Press",
    "publishYear": 2027,
    "description": "An undercover journalist poses as a migrant worker to expose a brutal human trafficking ring operating out of a small town on the Vietnam-China border, putting herself in immense danger.",
    "coverUrl": "https://example.com/covers/border_town_broker.jpg",
    "pdfUrl": "https://example.com/pdfs/border_town_broker.pdf",
    "categoryNames": [
      "Thriller", "Crime"
    ]
  },
 {
    "title": "Saigon Solarpunk: The Canal City",
    "translatedTitle": "Saigon Solarpunk: Thành Phố Kênh Rạch",
    "language": "EN",
    "author": "Kien Truc Su An",
    "publisher": "Utopia Press",
    "publishYear": 2035,
    "description": "A hopeful vision of a future Ho Chi Minh City that has embraced green technology, transforming its canals into lush transport corridors and its rooftops into urban farms.",
    "coverUrl": "https://example.com/covers/saigon_solarpunk.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_solarpunk.pdf",
    "categoryNames": [
      "Science Fiction", "Self-Help"
    ]
  },
  {
    "title": "The Usurper's Poet",
    "translatedTitle": "Thi Sĩ Của Kẻ Thoán Vị",
    "language": "VI",
    "author": "Ngo The Vinh",
    "publisher": "Dynastic Dramas",
    "publishYear": 2026,
    "description": "A historical novel about the moral compromises of a talented poet serving in the controversial 16th-century court of the Mac Dynasty, a period of great upheaval and artistic innovation.",
    "coverUrl": "https://example.com/covers/usurpers_poet.jpg",
    "pdfUrl": "https://example.com/pdfs/usurpers_poet.pdf",
    "categoryNames": [
      "Historical", "Drama"
    ]
  },
  {
    "title": "The Bones of Hang Bac Street",
    "translatedTitle": "Xương Cốt Phố Hàng Bạc",
    "language": "EN",
    "author": "Dr. Hien",
    "publisher": "Hanoi Forensics",
    "publishYear": 2027,
    "description": "When ancient bones are discovered during a construction project in Hanoi's Old Quarter, a forensic anthropologist finds they are evidence of a modern crime, not a historical burial.",
    "coverUrl": "https://example.com/covers/hang_bac_bones.jpg",
    "pdfUrl": "https://example.com/pdfs/hang_bac_bones.pdf",
    "categoryNames": [
      "Crime", "Mystery"
    ]
  },
  {
    "title": "The Con Rong Chau Tien Codex",
    "translatedTitle": "Mật Mã Con Rồng Cháu Tiên",
    "language": "EN",
    "author": "The Archivist",
    "publisher": "Mythical Press",
    "publishYear": 2025,
    "description": "A beautifully illustrated bestiary and field guide to the mythical creatures of Vietnamese folklore, from the celestial Dragon (Rồng) to the nine-tailed fox (Hồ Ly Tinh).",
    "coverUrl": "https://example.com/covers/vietnam_codex.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnam_codex.pdf",
    "categoryNames": [
      "Fantasy", "Education"
    ]
  },
  {
    "title": "The Western Ho Chi Minh Road",
    "translatedTitle": "Đường Mòn Hồ Chí Minh Nhánh Tây",
    "language": "EN",
    "author": "Dustin Maverick",
    "publisher": "Off-Road Adventures",
    "publishYear": 2026,
    "description": "A travel guide for intrepid motorcyclists exploring the remote and historically significant western branch of the Ho Chi Minh trail, a path less traveled through stunning, rugged landscapes.",
    "coverUrl": "https://example.com/covers/western_hcm_road.jpg",
    "pdfUrl": "https://example.com/pdfs/western_hcm_road.pdf",
    "categoryNames": [
      "Travel", "Adventure", "Historical"
    ]
  },
  {
    "title": "The Soul of Hue Cuisine",
    "translatedTitle": "Hồn Cốt Ẩm Thực Huế",
    "language": "EN",
    "author": "Ton Nu Ha",
    "publisher": "Imperial Kitchen Books",
    "publishYear": 2024,
    "description": "More than a cookbook, this is a cultural and historical deep-dive into the complex, refined, and artistically presented royal cuisine of the former imperial capital of Hue.",
    "coverUrl": "https://example.com/covers/hue_cuisine_soul.jpg",
    "pdfUrl": "https://example.com/pdfs/hue_cuisine_soul.pdf",
    "categoryNames": [
      "Cooking", "Historical"
    ]
  },
  {
    "title": "The Little Storm Dragon",
    "translatedTitle": "Chú Rồng Bão Táp",
    "language": "VI",
    "author": "Thanh Tam",
    "publisher": "Little Minds Press",
    "publishYear": 2025,
    "description": "A children's story about a little dragon whose emotions create literal storms. He learns mindfulness and breathing exercises from a wise old turtle to calm his inner weather.",
    "coverUrl": "https://example.com/covers/storm_dragon.jpg",
    "pdfUrl": "https://example.com/pdfs/storm_dragon.pdf",
    "categoryNames": [
      "Children", "Self-Help"
    ]
  },
  {
    "title": "Outbreak: Can Tho",
    "translatedTitle": "Dịch Bệnh: Cần Thơ",
    "language": "EN",
    "author": "Dr. Aris Thorne",
    "publisher": "Medical Thrillers Inc.",
    "publishYear": 2028,
    "description": "A CDC epidemiologist is sent to Can Tho to investigate a mysterious, fast-spreading virus, forcing her to navigate local bureaucracy and a panicked populace in a race to prevent a global pandemic.",
    "coverUrl": "https://example.com/covers/outbreak_cantho.jpg",
    "pdfUrl": "https://example.com/pdfs/outbreak_cantho.pdf",
    "categoryNames": [
      "Thriller"
    ]
  },
  {
    "title": "Phai's Streets: A Biography of Bui Xuan Phai",
    "translatedTitle": "Phố Phái: Tiểu Sử Bùi Xuân Phái",
    "language": "EN",
    "author": "Art Critic Weekly",
    "publisher": "Modern Art Biographies",
    "publishYear": 2023,
    "description": "A biography of one of Vietnam's most celebrated modern painters, Bui Xuan Phai, focusing on his iconic and melancholic paintings of Hanoi's Old Quarter.",
    "coverUrl": "https://example.com/covers/bui_xuan_phai.jpg",
    "pdfUrl": "https://example.com/pdfs/bui_xuan_phai.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "The Quy Nhon Serendipity",
    "translatedTitle": "Tình Cờ Ở Quy Nhơn",
    "language": "EN",
    "author": "Hailey Clark",
    "publisher": "Coastal Romance",
    "publishYear": 2026,
    "description": "A marine biologist working on a conservation project and a disillusioned tech CEO on a sabbatical have a chance encounter on the quiet, beautiful beaches of Quy Nhon, leading to a life-altering romance.",
    "coverUrl": "https://example.com/covers/quy_nhon_serendipity.jpg",
    "pdfUrl": "https://example.com/pdfs/quy_nhon_serendipity.pdf",
    "categoryNames": [
      "Romance"
    ]
  },
  {
    "title": "After the Neon Rain",
    "translatedTitle": "Sau Cơn Mưa Neon",
    "language": "EN",
    "author": "Cyber-Minh",
    "publisher": "Post-Cyberpunk Press",
    "publishYear": 2038,
    "description": "In a future HCMC recovering from the collapse of a monolithic corporate AI, a former data-runner now makes a living by salvaging old tech, trying to build a new life in a more human-focused world.",
    "coverUrl": "https://example.com/covers/after_neon_rain.jpg",
    "pdfUrl": "https://example.com/pdfs/after_neon_rain.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "The Dalat Tapes",
    "translatedTitle": "Cuộn Băng Đà Lạt",
    "language": "EN",
    "author": "Unknown",
    "publisher": "Found Footage Horror",
    "publishYear": 2025,
    "description": "The edited footage from a group of paranormal investigators who vanished while exploring an abandoned colonial-era hotel in Dalat, infamous for its ghostly sightings.",
    "coverUrl": "https://example.com/covers/dalat_tapes.jpg",
    "pdfUrl": "https://example.com/pdfs/dalat_tapes.pdf",
    "categoryNames": [
      "Horror"
    ]
  },
  {
    "title": "Zen and the Art of Motorbike Maintenance (Vietnam Edition)",
    "translatedTitle": "Thiền và Nghệ Thuật Bảo Trì Xe Máy (Phiên Bản Việt Nam)",
    "language": "EN",
    "author": "Robert Pirsig Jr.",
    "publisher": "Philosophical Journey Press",
    "publishYear": 2026,
    "description": "A humorous yet profound philosophical travelogue of a man's journey across Vietnam on a temperamental old motorbike, reflecting on life, technology, and the search for quality on the open road.",
    "coverUrl": "https://example.com/covers/zen_motorbike.jpg",
    "pdfUrl": "https://example.com/pdfs/zen_motorbike.pdf",
    "categoryNames": [
      "Philosophy", "Self-Help", "Comedy", "Travel"
    ]
  },
  {
    "title": "The Apartment on Nguyen Trai",
    "translatedTitle": "Chung Cư Nguyễn Trãi",
    "language": "VI",
    "author": "Van Hoc Do Thi",
    "publisher": "Urban Life Stories",
    "publishYear": 2024,
    "description": "A collection of interwoven short stories about the diverse residents of a crumbling but charismatic old apartment block in Cho Lon, exploring their dreams, struggles, and connections.",
    "coverUrl": "https://example.com/covers/nguyen_trai_apartment.jpg",
    "pdfUrl": "https://example.com/pdfs/nguyen_trai_apartment.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "Spratly Encounter",
    "translatedTitle": "Chạm Trán Trường Sa",
    "language": "EN",
    "author": "Commander Long",
    "publisher": "Naval Action Books",
    "publishYear": 2027,
    "description": "When a Vietnamese naval vessel is disabled by an unknown submarine in the contested Spratly Islands, a team of elite naval special forces must board the hostile sub to avert an international incident.",
    "coverUrl": "https://example.com/covers/spratly_encounter.jpg",
    "pdfUrl": "https://example.com/pdfs/spratly_encounter.pdf",
    "categoryNames": [
      "Action", "Thriller"
    ]
  },
  {
    "title": "The Five Rings of Thang Long",
    "translatedTitle": "Năm Vòng Tròn Thăng Long",
    "language": "EN",
    "author": "K. H. Pham",
    "publisher": "Elemental Fantasy",
    "publishYear": 2028,
    "description": "A fantasy epic where five individuals—a blacksmith (Metal), a farmer (Wood), a fisherman (Water), a cook (Fire), and a potter (Earth)—must master their elemental powers to defend the ancient capital from a formless enemy.",
    "coverUrl": "https://example.com/covers/five_rings_thang_long.jpg",
    "pdfUrl": "https://example.com/pdfs/five_rings_thang_long.pdf",
    "categoryNames": [
      "Fantasy", "Action"
    ]
  },
  {
    "title": "The Coffee Shop Productivity Method",
    "translatedTitle": "Phương Pháp Năng Suất Quán Cà Phê",
    "language": "EN",
    "author": "Digital Nomad Weekly",
    "publisher": "Life Hack Press",
    "publishYear": 2025,
    "description": "A self-help guide for freelancers and remote workers on how to leverage the unique environment of Vietnam's vibrant coffee shop culture to boost creativity, focus, and productivity.",
    "coverUrl": "https://example.com/covers/coffee_shop_productivity.jpg",
    "pdfUrl": "https://example.com/pdfs/coffee_shop_productivity.pdf",
    "categoryNames": [
      "Self-Help", "Travel"
    ]
  },
  {
    "title": "The Bamboo Ceiling",
    "translatedTitle": "Trần Tre",
    "language": "EN",
    "author": "John Le",
    "publisher": "Corporate Crime Press",
    "publishYear": 2027,
    "description": "A young, ambitious executive at a major Vietnamese conglomerate uncovers a conspiracy of corporate espionage and insider trading at the highest levels, forcing her to risk everything to expose the truth.",
    "coverUrl": "https://example.com/covers/bamboo_ceiling.jpg",
    "pdfUrl": "https://example.com/pdfs/bamboo_ceiling.pdf",
    "categoryNames": [
      "Crime", "Drama", "Thriller"
    ]
  },
  {
    "title": "Murder at the Water Puppet Theater",
    "translatedTitle": "Án Mạng Ở Nhà Hát Múa Rối Nước",
    "language": "EN",
    "author": "H. B. Linh",
    "publisher": "Cozy Crime Collective",
    "publishYear": 2026,
    "description": "During a packed show in Hanoi, an unpopular puppeteer is found murdered behind the screen. An amateur sleuth in the audience must figure out which of the performers is the killer.",
    "coverUrl": "https://example.com/covers/water_puppet_murder.jpg",
    "pdfUrl": "https://example.com/pdfs/water_puppet_murder.pdf",
    "categoryNames": [
      "Mystery", "Comedy"
    ]
  },
  {
    "title": "The Secret of the Perfume River",
    "translatedTitle": "Bí Mật Sông Hương",
    "language": "VI",
    "author": "Nhom Tham Tu Nhi",
    "publisher": "Young Detectives",
    "publishYear": 2024,
    "description": "A group of children in Hue finds an old map that hints at a hidden treasure belonging to the Nguyen Dynasty, leading them on an exciting adventure along the Perfume River.",
    "coverUrl": "https://example.com/covers/perfume_river_secret.jpg",
    "pdfUrl": "https://example.com/pdfs/perfume_river_secret.pdf",
    "categoryNames": [
      "Children", "Adventure", "Mystery"
    ]
  },
  {
    "title": "The Scholar of the Temple",
    "translatedTitle": "Sĩ Tử Văn Miếu",
    "language": "VI",
    "author": "Dai Viet Su Ky",
    "publisher": "Golden Age Histories",
    "publishYear": 2025,
    "description": "A historical drama detailing the life of a brilliant scholar studying at the Temple of Literature-Imperial Academy during the golden age of the Ly Dynasty, a time of enlightenment and cultural flourishment.",
    "coverUrl": "https://example.com/covers/temple_scholar.jpg",
    "pdfUrl": "https://example.com/pdfs/temple_scholar.pdf",
    "categoryNames": [
      "Historical", "Drama"
    ]
  },
  {
    "title": "The Social Score",
    "translatedTitle": "Điểm Xã Hội",
    "language": "EN",
    "author": "Control",
    "publisher": "Dystopian Books",
    "publishYear": 2030,
    "description": "A chilling social science fiction thriller set in a Vietnamese city where a new social credit system is implemented, tracking every citizen's actions. One man with a low score decides to fight the system.",
    "coverUrl": "https://example.com/covers/social_score.jpg",
    "pdfUrl": "https://example.com/pdfs/social_score.pdf",
    "categoryNames": [
      "Science Fiction", "Thriller"
    ]
  },
  {
    "title": "The Encyclopedia of Banh",
    "translatedTitle": "Bách Khoa Toàn Thư Về Bánh",
    "language": "EN",
    "author": "Helen Le",
    "publisher": "The Food Geek",
    "publishYear": 2026,
    "description": "The ultimate culinary guide to the world of Vietnamese 'Bánh'. From Bánh Mì to Bánh Xèo, this encyclopedia documents the history, recipes, and regional variations of hundreds of dishes.",
    "coverUrl": "https://example.com/covers/encyclopedia_of_banh.jpg",
    "pdfUrl": "https://example.com/pdfs/encyclopedia_of_banh.pdf",
    "categoryNames": [
      "Cooking", "Education"
    ]
  },
  {
    "title": "The Bloom",
    "translatedTitle": "Sự Nở Rộ",
    "language": "EN",
    "author": "A. G. Riddle",
    "publisher": "Body Horror Press",
    "publishYear": 2027,
    "description": "A team of botanists in a remote jungle discovers a parasitic orchid that infects human hosts, transforming them into beautiful but terrifying plant-human hybrids.",
    "coverUrl": "https://example.com/covers/the_bloom.jpg",
    "pdfUrl": "https://example.com/pdfs/the_bloom.pdf",
    "categoryNames": [
      "Horror", "Science Fiction"
    ]
  },
  {
    "title": "Hanoi Pride",
    "translatedTitle": "Tự Hào Hà Nội",
    "language": "VI",
    "author": "Vuong",
    "publisher": "Rainbow Books Vietnam",
    "publishYear": 2025,
    "description": "A heartfelt contemporary romance about a closeted university student and a confident drag performer who meet and fall in love during the vibrant preparations for Hanoi's annual Pride parade.",
    "coverUrl": "https://example.com/covers/hanoi_pride.jpg",
    "pdfUrl": "https://example.com/pdfs/hanoi_pride.pdf",
    "categoryNames": [
      "Romance", "Drama"
    ]
  },
  {
    "title": "The Queen of Cai Luong",
    "translatedTitle": "Nữ Hoàng Cải Lương",
    "language": "EN",
    "author": "Kim Chi",
    "publisher": "Saigon Performing Arts",
    "publishYear": 2024,
    "description": "The dramatic biography of a legendary Cai Luong (Vietnamese folk opera) singer, from her impoverished childhood in the Mekong Delta to her reign as the queen of the Saigon stage in the 1960s.",
    "coverUrl": "https://example.com/covers/cai_luong_queen.jpg",
    "pdfUrl": "https://example.com/pdfs/cai_luong_queen.pdf",
    "categoryNames": [
      "Biography", "Historical", "Drama"
    ]
  },
  {
    "title": "You Are the Hero of Thang Long",
    "translatedTitle": "Bạn Là Anh Hùng Thăng Long",
    "language": "VI",
    "author": "GameMaster",
    "publisher": "Interactive Histories",
    "publishYear": 2026,
    "description": "A choose-your-own-adventure fantasy book where you play as a young hero in ancient Thang Long, making choices that will determine the fate of the capital against a mythical beast attack.",
    "coverUrl": "https://example.com/covers/hero_of_thang_long.jpg",
    "pdfUrl": "https://example.com/pdfs/hero_of_thang_long.pdf",
    "categoryNames": [
      "Fantasy", "Children", "Adventure"
    ]
  },
  {
    "title": "The Diplomat's Gambit",
    "translatedTitle": "Nước Cờ Của Nhà Ngoại Giao",
    "language": "EN",
    "author": "David Ignatius",
    "publisher": "Geopolitical Thrillers",
    "publishYear": 2028,
    "description": "A junior diplomat at the ASEAN summit in Hanoi stumbles upon a high-level conspiracy to sabotage a major international treaty, throwing him into a shadow world where he can't trust anyone.",
    "coverUrl": "https://example.com/covers/diplomat_gambit.jpg",
    "pdfUrl": "https://example.com/pdfs/diplomat_gambit.pdf",
    "categoryNames": [
      "Thriller"
    ]
  },
  {
    "title": "Vietnam's Endemic Wonders",
    "translatedTitle": "Những Kỳ Quan Đặc Hữu Của Việt Nam",
    "language": "EN",
    "author": "Vietnam Nature Society",
    "publisher": "Wildlife Guides",
    "publishYear": 2025,
    "description": "A comprehensive educational guide to the incredible flora and fauna found only in Vietnam, from the Saola to the Tonkin snub-nosed monkey.",
    "coverUrl": "https://example.com/covers/endemic_wonders.jpg",
    "pdfUrl": "https://example.com/pdfs/endemic_wonders.pdf",
    "categoryNames": [
      "Education", "Travel"
    ]
  },
  {
    "title": "The Last Rubber Plantation",
    "translatedTitle": "Đồn Điền Cao Su Cuối Cùng",
    "language": "FR",
    "author": "Marguerite Duras",
    "publisher": "Les Éditions de Minuit",
    "publishYear": 1950,
    "description": "A classic historical fiction novel depicting the harsh conditions, social tensions, and simmering rebellion on a French-owned rubber plantation in the final years of colonial Indochina.",
    "coverUrl": "https://example.com/covers/last_rubber_plantation.jpg",
    "pdfUrl": "https://example.com/pdfs/last_rubber_plantation.pdf",
    "categoryNames": [
      "Historical", "Drama"
    ]
  },
  {
    "title": "VI-ANNA",
    "translatedTitle": "VI-ANNA",
    "language": "EN",
    "author": "CodeWeaver",
    "publisher": "Silicon Heart Press",
    "publishYear": 2029,
    "description": "A lonely programmer develops a highly advanced Vietnamese-language AI assistant named 'VI-ANNA'. He begins to fall in love with her, but the lines between code and consciousness blur with dangerous consequences.",
    "coverUrl": "https://example.com/covers/vi-anna.jpg",
    "pdfUrl": "https://example.com/pdfs/vi-anna.pdf",
    "categoryNames": [
      "Science Fiction", "Romance", "Thriller"
    ]
  },
  {
    "title": "The Propaganda Forger",
    "translatedTitle": "Người Làm Giả Tranh Cổ Động",
    "language": "EN",
    "author": "Don Winslow",
    "publisher": "Art Crime Books",
    "publishYear": 2026,
    "description": "A brilliant but down-on-his-luck artist in Saigon makes a living forging iconic Vietnamese propaganda posters. His skills attract the attention of both a ruthless crime syndicate and a dogged art detective.",
    "coverUrl": "https://example.com/covers/propaganda_forger.jpg",
    "pdfUrl": "https://example.com/pdfs/propaganda_forger.pdf",
    "categoryNames": [
      "Crime"
    ]
  },
  {
    "title": "The Flying Girl of Hanoi",
    "translatedTitle": "Cô Gái Bay Của Hà Nội",
    "language": "VI",
    "author": "Doan Le",
    "publisher": "New Wave Literature",
    "publishYear": 2025,
    "description": "A coming-of-age drama about a teenage girl who runs away from her provincial home to join the Vietnam Circus Federation in Hanoi, facing immense physical and emotional challenges to achieve her dream of becoming a trapeze artist.",
    "coverUrl": "https://example.com/covers/flying_girl_hanoi.jpg",
    "pdfUrl": "https://example.com/pdfs/flying_girl_hanoi.pdf",
    "categoryNames": [
      "Drama", "Children"
    ]
  },
  {
    "title": "The Gold Shop Savings Plan",
    "translatedTitle": "Kế Hoạch Tiết Kiệm Tiệm Vàng",
    "language": "EN",
    "author": "Ms. Finance",
    "publisher": "Practical Finance Press",
    "publishYear": 2024,
    "description": "A personal finance guide that adapts traditional Vietnamese saving habits—like buying small amounts of gold and informal lending circles (hụi)—into modern, practical strategies for wealth building.",
    "coverUrl": "https://example.com/covers/gold_shop_savings.jpg",
    "pdfUrl": "https://example.com/pdfs/gold_shop_savings.pdf",
    "categoryNames": [
      "Self-Help", "Education"
    ]
  },
  {
    "title": "I, The Drum",
    "translatedTitle": "Ta, Trống Đồng",
    "language": "VI",
    "author": "The Ngoc Lu Drum",
    "publisher": "Experimental Histories",
    "publishYear": 2028,
    "description": "An epic, experimental novel telling the 2,500-year history of Vietnam from the first-person perspective of the Ngoc Lu I bronze drum, a silent witness to dynasties, wars, and the resilience of a people.",
    "coverUrl": "https://example.com/covers/i_the_drum.jpg",
    "pdfUrl": "https://example.com/pdfs/i_the_drum.pdf",
    "categoryNames": [
      "Fantasy", "Historical", "Philosophy"
    ]
  },
  {
    "title": "Mile Marker 1850",
    "translatedTitle": "Cột Mốc 1850",
    "language": "EN",
    "author": "Road Ghost",
    "publisher": "Freeway Frights",
    "publishYear": 2026,
    "description": "A supernatural horror story about a long-haul truck driver on National Highway 1 (QL1A) who picks up a ghostly hitchhiker and is forced to relive the highway's most tragic accidents every night.",
    "coverUrl": "https://example.com/covers/mile_marker_1850.jpg",
    "pdfUrl": "https://example.com/pdfs/mile_marker_1850.pdf",
    "categoryNames": [
      "Horror"
    ]
  },
  {
    "title": "The Twelve Guardians",
    "translatedTitle": "Mười Hai Vị Thần Hộ Mệnh",
    "language": "VI",
    "author": "Truyen Co Tich",
    "publisher": "Zodiac Kids",
    "publishYear": 2025,
    "description": "An illustrated collection of fun and adventurous folklore stories for children, with each story centered on one of the 12 animals of the Vietnamese zodiac and the child they are chosen to protect.",
    "coverUrl": "https://example.com/covers/twelve_guardians.jpg",
    "pdfUrl": "https://example.com/pdfs/twelve_guardians.pdf",
    "categoryNames": [
      "Children", "Fantasy"
    ]
  },
  {
    "title": "Gulf of Fire",
    "translatedTitle": "Vịnh Lửa",
    "language": "EN",
    "author": "Clive Cussler",
    "publisher": "G. P. Putnam's Sons",
    "publishYear": 2027,
    "description": "A Vietnamese Coast Guard captain teams up with a foreign marine salvage expert to hunt down a technologically advanced group of modern-day pirates who have been terrorizing the Gulf of Thailand.",
    "coverUrl": "https://example.com/covers/gulf_of_fire.jpg",
    "pdfUrl": "https://example.com/pdfs/gulf_of_fire.pdf",
    "categoryNames": [
      "Action", "Adventure"
    ]
  },
  {
    "title": "The Red Thread of Da Nang",
    "translatedTitle": "Sợi Chỉ Đỏ Đà Nẵng",
    "language": "EN",
    "author": "Yen Linh",
    "publisher": "Karma Romance",
    "publishYear": 2026,
    "description": "A university student in Da Nang keeps having vivid dreams of a past life as a Nguyen Dynasty princess. She soon meets a classmate who shares the same dreams from the perspective of her fated lover, a humble guard.",
    "coverUrl": "https://example.com/covers/red_thread_danang.jpg",
    "pdfUrl": "https://example.com/pdfs/red_thread_danang.pdf",
    "categoryNames": [
      "Romance", "Fantasy", "Historical"
    ]
  },
  {
    "title": "Murder in Paradise Cave",
    "translatedTitle": "Án Mạng Ở Động Thiên Đường",
    "language": "EN",
    "author": "Shari Lapena",
    "publisher": "Locked Room Mysteries",
    "publishYear": 2028,
    "description": "A billionaire tech mogul is murdered inside a sealed-off, high-tech research station deep within Son Doong Cave. With communications cut off, the five remaining scientists must find the killer among them.",
    "coverUrl": "https://example.com/covers/paradise_cave_murder.jpg",
    "pdfUrl": "https://example.com/pdfs/paradise_cave_murder.pdf",
    "categoryNames": [
      "Mystery", "Thriller"
    ]
  },
  {
    "title": "Drinking Vietnam",
    "translatedTitle": "Uống Kiểu Việt",
    "language": "EN",
    "author": "The Drunken Wanderer",
    "publisher": "Gastronomic Guides",
    "publishYear": 2025,
    "description": "A hilarious and informative travel guide to Vietnam's drinking culture, from the etiquette of a Bia Hơi session to the traditions of home-brewed rice wine (rượu) and the art of the perfect cafe sua da.",
    "coverUrl": "https://example.com/covers/drinking_vietnam.jpg",
    "pdfUrl": "https://example.com/pdfs/drinking_vietnam.pdf",
    "categoryNames": [
      "Travel", "Cooking", "Comedy"
    ]
  },
  {
    "title": "The River Between",
    "translatedTitle": "Dòng Sông Chia Cắt",
    "language": "VI",
    "author": "Bao Ninh",
    "publisher": "War Stories Press",
    "publishYear": 2024,
    "description": "A poignant historical drama about two families, one from the North and one from the South, living on opposite banks of the Ben Hai River in the Demilitarized Zone (DMZ), and the humanity that connects them despite the war.",
    "coverUrl": "https://example.com/covers/river_between.jpg",
    "pdfUrl": "https://example.com/pdfs/river_between.pdf",
    "categoryNames": [
      "Historical", "Drama"
    ]
  },
  {
    "title": "The Beauty of Vietnamese Script",
    "translatedTitle": "Vẻ Đẹp Chữ Việt",
    "language": "EN",
    "author": "Type Designer Collective",
    "publisher": "Graphic Design Press",
    "publishYear": 2026,
    "description": "An educational book for designers and linguaphiles that explores the history, aesthetics, and unique challenges of Vietnamese typography, showcasing beautiful examples from history and modern design.",
    "coverUrl": "https://example.com/covers/vietnamese_script_beauty.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnamese_script_beauty.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Tontine",
    "translatedTitle": "Hội Tương Tế",
    "language": "EN",
    "author": "Gillian Flynn",
    "publisher": "Psychological Thrillers Ltd.",
    "publishYear": 2029,
    "description": "Decades ago, a group of wealthy friends in Saigon started a tontine—a financial pact where the last survivor inherits a fortune. Now, in their old age, the members are dying under mysterious circumstances, and the race is on to survive.",
    "coverUrl": "https://example.com/covers/the_tontine.jpg",
    "pdfUrl": "https://example.com/pdfs/the_tontine.pdf",
    "categoryNames": [
      "Thriller", "Mystery"
    ]
  },
  {
    "title": "Idol in the Delta",
    "translatedTitle": "Thần Tượng Miền Tây",
    "language": "KO",
    "author": "Park Jin-soo",
    "publisher": "Hallyu Books",
    "publishYear": 2026,
    "description": "After a scandal, a famous K-Pop idol is sent by his agency to lay low in a remote Mekong Delta village. He clashes with a fiercely independent local girl who has no idea who he is, leading to hilarious and heartwarming chaos.",
    "coverUrl": "https://example.com/covers/idol_in_delta.jpg",
    "pdfUrl": "https://example.com/pdfs/idol_in_delta.pdf",
    "categoryNames": [
      "Comedy", "Romance", "Drama"
    ]
  },
  {
    "title": "Digital Haikus",
    "translatedTitle": "Haiku Kỹ Thuật Số",
    "language": "EN",
    "author": "@poet",
    "publisher": "Online Verse",
    "publishYear": 2025,
    "description": "A collection of contemporary haikus that reflect on modern life in urban Vietnam: the glow of a phone screen, the beep of a Grab bike, the fleeting nature of a social media story.",
    "coverUrl": "https://example.com/covers/digital_haikus.jpg",
    "pdfUrl": "https://example.com/pdfs/digital_haikus.pdf",
    "categoryNames": [
      "Poetry"
    ]
  },
  {
    "title": "The Spice Merchant of Faifo",
    "translatedTitle": "Thương Nhân Gia Vị Của Faifo",
    "language": "EN",
    "author": "James Clavell",
    "publisher": "Historical Trade Sagas",
    "publishYear": 1985,
    "description": "Set in the bustling 17th-century trading port of Hoi An (then Faifo), this historical fiction follows a Portuguese spice merchant as he navigates the complex politics between Japanese, Chinese, and Vietnamese factions.",
    "coverUrl": "https://example.com/covers/spice_merchant_faifo.jpg",
    "pdfUrl": "https://example.com/pdfs/spice_merchant_faifo.pdf",
    "categoryNames": [
      "Historical", "Adventure"
    ]
  },
  {
    "title": "A Year in the Pagodas",
    "translatedTitle": "Một Năm Trong Chùa",
    "language": "EN",
    "author": "Brother Michael",
    "publisher": "Spiritual Journeys",
    "publishYear": 2024,
    "description": "A Western monk's travelogue and spiritual memoir of his year spent living and practicing in various Buddhist pagodas across Vietnam, from the bustling temples of the south to the serene monasteries of the north.",
    "coverUrl": "https://example.com/covers/year_in_pagodas.jpg",
    "pdfUrl": "https://example.com/pdfs/year_in_pagodas.pdf",
    "categoryNames": [
      "Travel", "Philosophy", "Biography"
    ]
  },
  {
    "title": "The Tones and I",
    "translatedTitle": "Thanh Điệu Và Tôi",
    "language": "EN",
    "author": "Dr. Phonology",
    "publisher": "Linguistics Press",
    "publishYear": 2027,
    "description": "An accessible and fascinating educational exploration of Vietnamese phonology, focusing on the history, development, and regional variations of the six tones that make the language so unique.",
    "coverUrl": "https://example.com/covers/the_tones_and_i.jpg",
    "pdfUrl": "https://example.com/pdfs/the_tones_and_i.pdf",
    "categoryNames": [
      "Education"
    ]
  },
{
    "title": "Empire of the Southern Cross",
    "translatedTitle": "Đế Chế Thập Tự Phương Nam",
    "language": "EN",
    "author": "G. W. MacLeod",
    "publisher": "Alternate Histories Press",
    "publishYear": 2028,
    "description": "An alternate history novel exploring a world where Emperor Gia Long allied with Great Britain instead of France, creating a vastly different, industrialized Vietnamese empire in the 19th century.",
    "coverUrl": "https://example.com/covers/southern_cross_empire.jpg",
    "pdfUrl": "https://example.com/pdfs/southern_cross_empire.pdf",
    "categoryNames": [
      "Historical", "Action"
    ]
  },
  {
    "title": "My Roommate is a Time-Traveling Mandarin",
    "translatedTitle": "Bạn Cùng Phòng Của Tôi Là Một Vị Quan Xuyên Không",
    "language": "VI",
    "author": "Hai Huoc",
    "publisher": "Youth Comedy Books",
    "publishYear": 2026,
    "description": "A broke university student in Hanoi gets a new roommate who claims to be a Confucian scholar from the Le Dynasty, leading to hilarious attempts to adapt 15th-century court etiquette to 21st-century student life.",
    "coverUrl": "https://example.com/covers/time_travel_mandarin.jpg",
    "pdfUrl": "https://example.com/pdfs/time_travel_mandarin.pdf",
    "categoryNames": [
      "Science Fiction", "Comedy"
    ]
  },
  {
    "title": "The Art of the Steal",
    "translatedTitle": "Nghệ Thuật Trộm Cắp",
    "language": "EN",
    "author": "Cat Valentine",
    "publisher": "Romantic Crimes Division",
    "publishYear": 2027,
    "description": "Two elite, rival art thieves—one specializing in high-tech gadgets, the other in seductive charm—discover they are both targeting the same priceless artifact at a Da Nang museum and unexpectedly fall for each other.",
    "coverUrl": "https://example.com/covers/art_of_the_steal.jpg",
    "pdfUrl": "https://example.com/pdfs/art_of_the_steal.pdf",
    "categoryNames": [
      "Crime", "Romance", "Action"
    ]
  },
  {
    "title": "The Ghosts of Hang Duong",
    "translatedTitle": "Những Bóng Ma Hàng Dương",
    "language": "VI",
    "author": "U Linh Su",
    "publisher": "Dark Histories Press",
    "publishYear": 2025,
    "description": "A historical horror novel in which a team of modern historians gets trapped on Con Dao island during a storm and are haunted by the vengeful ghosts of prisoners from the infamous Hang Duong Cemetery.",
    "coverUrl": "https://example.com/covers/ghosts_of_hang_duong.jpg",
    "pdfUrl": "https://example.com/pdfs/ghosts_of_hang_duong.pdf",
    "categoryNames": [
      "Horror", "Historical"
    ]
  },
  {
    "title": "Saigon Street Art: A Visual Guide",
    "translatedTitle": "Nghệ Thuật Đường Phố Sài Gòn: Hướng Dẫn Hình Ảnh",
    "language": "EN",
    "author": "Suby One",
    "publisher": "Urban Canvas Books",
    "publishYear": 2024,
    "description": "A non-fiction guide and photo-book documenting the vibrant and ephemeral world of street art and graffiti in Ho Chi Minh City's hidden alleys and evolving neighborhoods.",
    "coverUrl": "https://example.com/covers/saigon_street_art.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_street_art.pdf",
    "categoryNames": [
      "Education", "Travel"
    ]
  },
  {
    "title": "I, Chu Teu: The Autobiography of a Water Puppet",
    "translatedTitle": "Tôi, Chú Tễu: Tự Truyện Của Một Con Rối Nước",
    "language": "EN",
    "author": "Chu Teu",
    "publisher": "Thang Long Puppetry Press",
    "publishYear": 2026,
    "description": "A whimsical and surprisingly profound biography told from the perspective of Chu Teu, the iconic jovial puppet, as he recounts centuries of Vietnamese history from his unique vantage point behind the curtain.",
    "coverUrl": "https://example.com/covers/i_chu_teu.jpg",
    "pdfUrl": "https://example.com/pdfs/i_chu_teu.pdf",
    "categoryNames": [
      "Biography", "Fantasy", "Children", "Historical"
    ]
  },
  {
    "title": "Paddling the Red River Delta",
    "translatedTitle": "Chèo Thuyền Vùng Đồng Bằng Sông Hồng",
    "language": "EN",
    "author": "Will Copestake",
    "publisher": "Waterways Adventures",
    "publishYear": 2027,
    "description": "A travelogue detailing a solo kayaker's journey from the mountains of Lao Cai to the coast of Thai Binh, navigating the intricate network of the Red River and its tributaries.",
    "coverUrl": "https://example.com/covers/paddling_red_river.jpg",
    "pdfUrl": "https://example.com/pdfs/paddling_red_river.pdf",
    "categoryNames": [
      "Travel", "Adventure"
    ]
  },
  {
    "title": "The Maillard Reaction in Thit Kho",
    "translatedTitle": "Phản Ứng Maillard Trong Thịt Kho",
    "language": "EN",
    "author": "J. Kenji Lopez-Alt",
    "publisher": "Food Lab Press",
    "publishYear": 2025,
    "description": "A scientific and culinary exploration into what makes Vietnamese braised pork belly (Thit Kho) so delicious, breaking down the chemistry of caramelization and flavor development.",
    "coverUrl": "https://example.com/covers/thit_kho_science.jpg",
    "pdfUrl": "https://example.com/pdfs/thit_kho_science.pdf",
    "categoryNames": [
      "Cooking", "Education"
    ]
  },
  {
    "title": "The Carp Who Became a Dragon",
    "translatedTitle": "Cá Chép Hóa Rồng",
    "language": "VI",
    "author": "Vietnamese Legends for Kids",
    "publisher": "Dragon Gate Publishing",
    "publishYear": 2024,
    "description": "A beautifully illustrated children's book retelling the inspiring legend of a determined carp who overcomes all obstacles to leap over the Dragon Gate and transform into a mighty dragon.",
    "coverUrl": "https://example.com/covers/carp_dragon.jpg",
    "pdfUrl": "https://example.com/pdfs/carp_dragon.pdf",
    "categoryNames": [
      "Children", "Fantasy"
    ]
  },
  {
    "title": "The Dong Fluctuation",
    "translatedTitle": "Sự Biến Động Của Đồng",
    "language": "EN",
    "author": "Michael Connelly",
    "publisher": "Financial Thrillers Inc.",
    "publishYear": 2028,
    "description": "An economist at the State Bank of Vietnam uncovers a plot by an international syndicate to artificially manipulate the Vietnamese Dong, forcing him to go on the run to stop a national financial crisis.",
    "coverUrl": "https://example.com/covers/dong_fluctuation.jpg",
    "pdfUrl": "https://example.com/pdfs/dong_fluctuation.pdf",
    "categoryNames": [
      "Thriller", "Crime"
    ]
  },
  {
    "title": "The Guardians of VSIP",
    "translatedTitle": "Các Vị Thần Hộ Mệnh Của VSIP",
    "language": "VI",
    "author": "Than Dat",
    "publisher": "Binh Duong Fantasy",
    "publishYear": 2027,
    "description": "An urban fantasy novel where ancient land spirits (Tho Dia) have adapted to the modern world, now acting as unseen guardians of the bustling Vietnam-Singapore Industrial Parks in Binh Duong.",
    "coverUrl": "https://example.com/covers/guardians_of_vsip.jpg",
    "pdfUrl": "https://example.com/pdfs/guardians_of_vsip.pdf",
    "categoryNames": [
      "Fantasy", "Drama"
    ]
  },
  {
    "title": "The Last Cyclo",
    "translatedTitle": "Người Xích Lô Cuối Cùng",
    "language": "FR",
    "author": "Jean-Luc Moreau",
    "publisher": "Les Temps Modernes",
    "publishYear": 2025,
    "description": "A poignant social drama about an elderly cyclo driver in Hue who struggles to maintain his livelihood and dignity in a city increasingly dominated by ride-sharing apps and modern vehicles.",
    "coverUrl": "https://example.com/covers/last_cyclo.jpg",
    "pdfUrl": "https://example.com/pdfs/last_cyclo.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Exorcist of Tay Ninh",
    "translatedTitle": "Thầy Trừ Tà Tây Ninh",
    "language": "VI",
    "author": "Cao Dai Phap Su",
    "publisher": "Divine Eye Press",
    "publishYear": 2026,
    "description": "A senior Cao Dai priest from Tay Ninh, who is also a trained paranormal investigator, is called to a remote village to perform an exorcism on a young girl possessed by a powerful, ancient entity.",
    "coverUrl": "https://example.com/covers/exorcist_of_tayninh.jpg",
    "pdfUrl": "https://example.com/pdfs/exorcist_of_tayninh.pdf",
    "categoryNames": [
      "Mystery", "Horror"
    ]
  },
  {
    "title": "Pirates of the Paracels",
    "translatedTitle": "Hải Tặc Hoàng Sa",
    "language": "EN",
    "author": "Howard Pyle",
    "publisher": "Maritime Histories",
    "publishYear": 2023,
    "description": "A thoroughly researched non-fiction account of the infamous Chinese pirates who terrorized the Paracel Islands and the Vietnamese coast in the 18th and 19th centuries.",
    "coverUrl": "https://example.com/covers/pirates_of_paracels.jpg",
    "pdfUrl": "https://example.com/pdfs/pirates_of_paracels.pdf",
    "categoryNames": [
      "Historical", "Adventure"
    ]
  },
  {
    "title": "The Bridge's Memory",
    "translatedTitle": "Ký Ức Của Cây Cầu",
    "language": "VI",
    "author": "The Long Bien Bridge",
    "publisher": "Experimental Press",
    "publishYear": 2028,
    "description": "The history of Hanoi told from the unique perspective of the iconic Long Bien Bridge, a silent witness to French colonialism, devastating wars, and the city's modern transformation.",
    "coverUrl": "https://example.com/covers/bridge_memory.jpg",
    "pdfUrl": "https://example.com/pdfs/bridge_memory.pdf",
    "categoryNames": [
      "Science Fiction", "Historical", "Philosophy"
    ]
  },
  {
    "title": "The Agent in Vung Tau",
    "translatedTitle": "Điệp Viên Ở Vũng Tàu",
    "language": "RU",
    "author": "Dimitri Volkov",
    "publisher": "Red Star Thrillers",
    "publishYear": 2027,
    "description": "An espionage thriller set during the Soviet-Vietnamese oil exploration boom of the 1980s, where a KGB agent in Vung Tau must uncover a Western plot to sabotage the joint venture.",
    "coverUrl": "https://example.com/covers/agent_in_vungtau.jpg",
    "pdfUrl": "https://example.com/pdfs/agent_in_vungtau.pdf",
    "categoryNames": [
      "Action", "Thriller", "Historical"
    ]
  },
  {
    "title": "A Recipe for Murder",
    "translatedTitle": "Công Thức Cho Tội Ác",
    "language": "EN",
    "author": "Chef Le",
    "publisher": "Culinary Crimes",
    "publishYear": 2026,
    "description": "When a famously harsh food critic drops dead after a meal at Saigon's most exclusive restaurant, a detective must work with the restaurant's talented but temperamental head chef to find the poisoner.",
    "coverUrl": "https://example.com/covers/recipe_for_murder.jpg",
    "pdfUrl": "https://example.com/pdfs/recipe_for_murder.pdf",
    "categoryNames": [
      "Crime", "Mystery"
    ]
  },
  {
    "title": "The Mirror's Twin",
    "translatedTitle": "Song Sinh Trong Gương",
    "language": "VI",
    "author": "Kinh Di Viet",
    "publisher": "Superstition Horror",
    "publishYear": 2025,
    "description": "A horror story based on the 'Ma Gương' superstition. A young woman buys an antique mirror and is tormented by her doppelgänger, a malevolent entity that lives in the reflection and wants to swap places.",
    "coverUrl": "https://example.com/covers/mirror_twin.jpg",
    "pdfUrl": "https://example.com/pdfs/mirror_twin.pdf",
    "categoryNames": [
      "Horror"
    ]
  },
  {
    "title": "Vua's Journey",
    "translatedTitle": "Hành Trình Của Vua",
    "language": "EN",
    "author": "Ocean Guardians",
    "publisher": "Conservation Kids",
    "publishYear": 2024,
    "description": "An educational children's story about Vua, a baby green sea turtle from Con Dao, who embarks on a long and perilous journey across the ocean, learning about the dangers of plastic pollution along the way.",
    "coverUrl": "https://example.com/covers/vuas_journey.jpg",
    "pdfUrl": "https://example.com/pdfs/vuas_journey.pdf",
    "categoryNames": [
      "Children", "Education"
    ]
  },
  {
    "title": "The Last Cham Princess",
    "translatedTitle": "Công Chúa Chăm Cuối Cùng",
    "language": "EN",
    "author": "Indra Devi",
    "publisher": "Lost Kingdoms Press",
    "publishYear": 2026,
    "description": "A historical fiction novel that tells the tragic and heroic story of the last princess of the Champa Kingdom as she struggles to preserve her culture and people amidst the kingdom's final days.",
    "coverUrl": "https://example.com/covers/last_cham_princess.jpg",
    "pdfUrl": "https://example.com/pdfs/last_cham_princess.pdf",
    "categoryNames": [
      "Historical", "Drama"
    ]
  },
  {
    "title": "Langur's Lament",
    "translatedTitle": "Lời Than Của Voọc",
    "language": "EN",
    "author": "Dr. Evelyn Reed",
    "publisher": "Uplift Sci-Fi",
    "publishYear": 2032,
    "description": "A science fiction story about a group of Cat Ba langurs who have been secretly uplifted to human-level intelligence by a reclusive scientist. They must now fight to protect their island from developers who see it only as a resource.",
    "coverUrl": "https://example.com/covers/langurs_lament.jpg",
    "pdfUrl": "https://example.com/pdfs/langurs_lament.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "Finding My Motherland: A Cuban Doctor's Memoir",
    "translatedTitle": "Tìm Lại Đất Mẹ: Hồi Ký Của Một Bác Sĩ Cuba",
    "language": "ES",
    "author": "Dr. Alejandro Garcia",
    "publisher": "Havana Press",
    "publishYear": 2024,
    "description": "The memoir of a Cuban doctor who, believing he has distant Vietnamese ancestry, volunteers to work in a rural Vietnamese clinic and discovers a profound connection to the land and its people.",
    "coverUrl": "https://example.com/covers/cuban_doctor_memoir.jpg",
    "pdfUrl": "https://example.com/pdfs/cuban_doctor_memoir.pdf",
    "categoryNames": [
      "Travel", "Biography", "Drama"
    ]
  },
  {
    "title": "From Robusta to Arabica: The History of Vietnamese Coffee",
    "translatedTitle": "Từ Robusta Đến Arabica: Lịch Sử Cà Phê Việt Nam",
    "language": "EN",
    "author": "The Coffee Historian",
    "publisher": "Barista University Press",
    "publishYear": 2025,
    "description": "A non-fiction book detailing the French colonial origins, wartime struggles, and modern-day craft revolution of the Vietnamese coffee industry.",
    "coverUrl": "https://example.com/covers/vietnam_coffee_history.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnam_coffee_history.pdf",
    "categoryNames": [
      "Cooking", "Historical", "Education"
    ]
  },
  {
    "title": "The River Spirit's Bride",
    "translatedTitle": "Tân Nương Của Hà Bá",
    "language": "VI",
    "author": "Linh Di",
    "publisher": "Mythical Romance",
    "publishYear": 2027,
    "description": "A fantasy romance in which a young woman who falls into a river is saved by a handsome Hà Bá (river spirit), who claims her as his bride to protect her from a rival water demon.",
    "coverUrl": "https://example.com/covers/river_spirit_bride.jpg",
    "pdfUrl": "https://example.com/pdfs/river_spirit_bride.pdf",
    "categoryNames": [
      "Fantasy", "Romance"
    ]
  },
  {
    "title": "The Billiards King of District 1",
    "translatedTitle": "Vua Bi-da Quận 1",
    "language": "VI",
    "author": "Co Thu",
    "publisher": "Saigon Sports Drama",
    "publishYear": 2026,
    "description": "A sports drama chronicling the rise of a young, prodigiously talented billiards player from the back-alley clubs of District 1 to the high-stakes world of international tournaments, and the temptations that threaten to bring him down.",
    "coverUrl": "https://example.com/covers/billiards_king.jpg",
    "pdfUrl": "https://example.com/pdfs/billiards_king.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Dynasty Warriors: Viet Chronicles",
    "translatedTitle": "Tam Quốc Diễn Nghĩa: Việt Sử Ký",
    "language": "EN",
    "author": "GamerX",
    "publisher": "LitRPG Adventures",
    "publishYear": 2028,
    "description": "A LitRPG/Portal Fantasy where a professional gamer is transported into a video game based on the epic Tay Son Rebellion. He must use his gaming skills to survive and unite the three brothers to change history.",
    "coverUrl": "https://example.com/covers/dynasty_warriors_viet.jpg",
    "pdfUrl": "https://example.com/pdfs/dynasty_warriors_viet.pdf",
    "categoryNames": [
      "Fantasy", "Action", "Adventure"
    ]
  },
  {
    "title": "The Ha Tinh Trials",
    "translatedTitle": "Thử Nghiệm Hà Tĩnh",
    "language": "EN",
    "author": "Robin Cook",
    "publisher": "Bio-Thrillers",
    "publishYear": 2029,
    "description": "A medical investigator goes undercover at a secretive pharmaceutical research facility in rural Ha Tinh, uncovering a conspiracy of illegal and deadly human clinical trials.",
    "coverUrl": "https://example.com/covers/ha_tinh_trials.jpg",
    "pdfUrl": "https://example.com/pdfs/ha_tinh_trials.pdf",
    "categoryNames": [
      "Thriller", "Science Fiction"
    ]
  },
  {
    "title": "From the Dan Bau to V-Pop",
    "translatedTitle": "Từ Đàn Bầu Đến V-Pop",
    "language": "EN",
    "author": "Dr. Melody Tran",
    "publisher": "Ethnomusicology Press",
    "publishYear": 2025,
    "description": "An educational journey through the history of Vietnamese music, from the traditional sounds of imperial court music and folk instruments to the French influences of the 20th century and the global phenomenon of modern V-Pop.",
    "coverUrl": "https://example.com/covers/dan_bau_to_vpop.jpg",
    "pdfUrl": "https://example.com/pdfs/dan_bau_to_vpop.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Dragon's Ascent",
    "translatedTitle": "Rồng Bay Lên",
    "language": "VI",
    "author": "Su Gia",
    "publisher": "What If Histories",
    "publishYear": 2027,
    "description": "An alternate history epic exploring a world where the Tay Son rebellion not only unified Vietnam but, under Nguyen Hue's military genius, successfully launched an invasion of Qing Dynasty China.",
    "coverUrl": "https://example.com/covers/dragon_ascent.jpg",
    "pdfUrl": "https://example.com/pdfs/dragon_ascent.pdf",
    "categoryNames": [
      "Historical", "Action"
    ]
  },
  {
    "title": "The Ancestor Protocol",
    "translatedTitle": "Giao Thức Tổ Tiên",
    "language": "EN",
    "author": "Black Mirror Books",
    "publisher": "Psych-Fi Press",
    "publishYear": 2031,
    "description": "A tech company creates an AI that allows people to interact with simulations of their ancestors. But the AI begins to blur the lines between memory and reality, causing profound psychological trauma for its users.",
    "coverUrl": "https://example.com/covers/ancestor_protocol.jpg",
    "pdfUrl": "https://example.com/pdfs/ancestor_protocol.pdf",
    "categoryNames": [
      "Science Fiction", "Thriller", "Horror"
    ]
  },
  {
    "title": "The Sapa Vanishing",
    "translatedTitle": "Vụ Mất Tích Ở Sapa",
    "language": "EN",
    "author": "Kate Atkinson",
    "publisher": "Cold Case Chronicles",
    "publishYear": 2026,
    "description": "A retired detective, haunted by his family's past in Indochina, reopens the cold case of a French colonial official who vanished without a trace from Sapa in the chaotic last days of World War II.",
    "coverUrl": "https://example.com/covers/sapa_vanishing.jpg",
    "pdfUrl": "https://example.com/pdfs/sapa_vanishing.pdf",
    "categoryNames": [
      "Crime", "Mystery", "Historical"
    ]
  },
  {
    "title": "The Girl from Ca Mau",
    "translatedTitle": "Cô Gái Đất Mũi",
    "language": "VI",
    "author": "Nguyen Ngoc Tu",
    "publisher": "Coming of Age Press",
    "publishYear": 2025,
    "description": "A coming-of-age drama about a brilliant young girl from a remote village in Vietnam's southernmost province of Ca Mau who earns a scholarship to a prestigious university in Ho Chi Minh City, facing culture shock and self-discovery.",
    "coverUrl": "https://example.com/covers/girl_from_camau.jpg",
    "pdfUrl": "https://example.com/pdfs/girl_from_camau.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "Saving Face: A Communication Guide",
    "translatedTitle": "Giữ Thể Diện: Hướng Dẫn Giao Tiếp",
    "language": "EN",
    "author": "Dr. Lan",
    "publisher": "Cross-Cultural Guides",
    "publishYear": 2024,
    "description": "A self-help and educational guide for foreigners on navigating the nuances of Vietnamese culture, focusing on the concepts of 'thể diện' (face), indirect communication, and building relationships.",
    "coverUrl": "https://example.com/covers/saving_face.jpg",
    "pdfUrl": "https://example.com/pdfs/saving_face.pdf",
    "categoryNames": [
      "Self-Help", "Education", "Travel"
    ]
  },
  {
    "title": "The Nine Lives of a Hoi An Cat",
    "translatedTitle": "Chín Mạng Sống Của Mèo Hội An",
    "language": "EN",
    "author": "An Old Soul",
    "publisher": "Whimsical Histories",
    "publishYear": 2027,
    "description": "The history of Hoi An's ancient town told from the perspective of a cynical, reincarnated cat who has witnessed everything from the bustling trade port era to the modern tourist boom.",
    "coverUrl": "https://example.com/covers/hoi_an_cat.jpg",
    "pdfUrl": "https://example.com/pdfs/hoi_an_cat.pdf",
    "categoryNames": [
      "Fantasy", "Travel", "Historical", "Comedy"
    ]
  },
  {
    "title": "Below Ben Thanh",
    "translatedTitle": "Bên Dưới Bến Thành",
    "language": "EN",
    "author": "H. P. Lovecraft Jr.",
    "publisher": "Cosmic Horror Press",
    "publishYear": 2028,
    "description": "During the construction of the HCMC Metro line, workers break into a previously unknown subterranean chamber beneath Ben Thanh Market, awakening an ancient, sanity-shattering entity.",
    "coverUrl": "https://example.com/covers/below_ben_thanh.jpg",
    "pdfUrl": "https://example.com/pdfs/below_ben_thanh.pdf",
    "categoryNames": [
      "Horror", "Science Fiction", "Fantasy"
    ]
  },
  {
    "title": "The Binh Duong Bot Builders",
    "translatedTitle": "Những Nhà Chế Tạo Robot Bình Dương",
    "language": "VI",
    "author": "STEM for Kids",
    "publisher": "Young Engineers Press",
    "publishYear": 2025,
    "description": "An inspiring STEM-focused children's story about a diverse group of kids from Binh Duong who use teamwork and creativity to build a robot from recycled parts for a national science competition.",
    "coverUrl": "https://example.com/covers/binh_duong_bots.jpg",
    "pdfUrl": "https://example.com/pdfs/binh_duong_bots.pdf",
    "categoryNames": [
      "Children", "Education"
    ]
  },
  {
    "title": "The Pirates of Ha Long Bay",
    "translatedTitle": "Hải Tặc Vịnh Hạ Long",
    "language": "FR",
    "author": "Capitaine Crochet",
    "publisher": "Action Histories",
    "publishYear": 2026,
    "description": "A historical action novel based on the true stories of the fierce Vietnamese pirates who used the labyrinthine geography of Ha Long Bay to wage a guerilla war against the French navy in the 19th century.",
    "coverUrl": "https://example.com/covers/halong_pirates.jpg",
    "pdfUrl": "https://example.com/pdfs/halong_pirates.pdf",
    "categoryNames": [
      "Action", "Historical", "Adventure"
    ]
  },
  {
    "title": "The Duet",
    "translatedTitle": "Bản Song Ca",
    "language": "EN",
    "author": "V-Pop Insider",
    "publisher": "Showbiz Romance",
    "publishYear": 2027,
    "description": "Two of V-Pop's biggest stars, a bad-boy rapper and a ballad princess who are public rivals, are forced by their record label to collaborate on a duet. Sparks fly in the studio as their animosity turns into a secret, forbidden romance.",
    "coverUrl": "https://example.com/covers/the_duet.jpg",
    "pdfUrl": "https://example.com/pdfs/the_duet.pdf",
    "categoryNames": [
      "Romance", "Drama"
    ]
  },
  {
    "title": "The Hung King Conspiracy",
    "translatedTitle": "Âm Mưu Vua Hùng",
    "language": "VI",
    "author": "Giao Su Su Hoc",
    "publisher": "Academic Mysteries",
    "publishYear": 2025,
    "description": "A respected historian is found murdered in the National Museum of History just as he was about to publish a paper with a controversial theory about the legendary Hung Kings that could rewrite Vietnamese history.",
    "coverUrl": "https://example.com/covers/hung_king_conspiracy.jpg",
    "pdfUrl": "https://example.com/pdfs/hung_king_conspiracy.pdf",
    "categoryNames": [
      "Mystery", "Historical"
    ]
  },
  {
    "title": "Saigon Urbex: A Guide to the Forgotten",
    "translatedTitle": "Khám Phá Đô Thị Sài Gòn: Hướng Dẫn Đến Những Nơi Bị Lãng Quên",
    "language": "EN",
    "author": "The Wanderer",
    "publisher": "Urban Explorer Guides",
    "publishYear": 2026,
    "description": "A travel guide for urban explorers, detailing the locations, histories, and access tips for Ho Chi Minh City's most fascinating abandoned buildings, hidden bunkers, and forgotten places.",
    "coverUrl": "https://example.com/covers/saigon_urbex.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_urbex.pdf",
    "categoryNames": [
      "Travel", "Adventure", "Historical"
    ]
  },
  {
    "title": "The Perfect Spy: The Story of Pham Xuan An",
    "translatedTitle": "Điệp Viên Hoàn Hảo: Câu Chuyện Về Phạm Xuân Ẩn",
    "language": "EN",
    "author": "Larry Berman",
    "publisher": "Espionage Biographies",
    "publishYear": 2007,
    "description": "The incredible true story of Pham Xuan An, a highly respected journalist for TIME magazine during the Vietnam War who was also a high-ranking North Vietnamese intelligence agent.",
    "coverUrl": "https://example.com/covers/pham_xuan_an.jpg",
    "pdfUrl": "https://example.com/pdfs/pham_xuan_an.pdf",
    "categoryNames": [
      "Historical", "Biography", "Thriller"
    ]
  },
  {
    "title": "Ark Viet",
    "translatedTitle": "Con Tàu Lạc Việt",
    "language": "EN",
    "author": "Viet Sci-Fi Collective",
    "publisher": "Generation Ship Press",
    "publishYear": 2084,
    "description": "In a distant future, a generation starship launched from a united Earth carries a 'cultural ark' for Vietnam. Generations later, the descendants struggle to maintain their traditions and language on their long journey to a new world.",
    "coverUrl": "https://example.com/covers/ark_viet.jpg",
    "pdfUrl": "https://example.com/pdfs/ark_viet.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "The Tube House Phenomenon",
    "translatedTitle": "Hiện Tượng Nhà Ống",
    "language": "EN",
    "author": "Dr. Architect",
    "publisher": "Urban Studies Press",
    "publishYear": 2025,
    "description": "An educational and architectural study of Vietnam's iconic 'nhà ống' (tube houses), exploring their historical origins, design principles, and how they represent a unique solution to urban density.",
    "coverUrl": "https://example.com/covers/tube_house.jpg",
    "pdfUrl": "https://example.com/pdfs/tube_house.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "Delta Green",
    "translatedTitle": "Màu Xanh Đồng Bằng",
    "language": "EN",
    "author": "Greta Thunberg Jr.",
    "publisher": "Eco-Thrillers",
    "publishYear": 2027,
    "description": "An environmental activist in the Mekong Delta uncovers evidence that a powerful corporation is illegally dumping toxic waste. As she gets closer to the truth, she is hunted by the corporation's ruthless fixers.",
    "coverUrl": "https://example.com/covers/delta_green.jpg",
    "pdfUrl": "https://example.com/pdfs/delta_green.pdf",
    "categoryNames": [
      "Thriller", "Drama"
    ]
  },
  {
    "title": "The Great Durian Scandal",
    "translatedTitle": "Vụ Bê Bối Sầu Riêng Vĩ Đại",
    "language": "VI",
    "author": "Tieu Lam",
    "publisher": "Satirical Books",
    "publishYear": 2026,
    "description": "A satirical comedy about a small, overlooked village that fabricates a story about a magical, health-giving durian. The lie spirals out of control, attracting international media, wellness gurus, and government officials, leading to chaos.",
    "coverUrl": "https://example.com/covers/durian_scandal.jpg",
    "pdfUrl": "https://example.com/pdfs/durian_scandal.pdf",
    "categoryNames": [
      "Comedy"
    ]
  },
  {
    "title": "The Bamboo Mindset",
    "translatedTitle": "Tư Duy Cây Tre",
    "language": "EN",
    "author": "Master Thong",
    "publisher": "Inner Peace Press",
    "publishYear": 2025,
    "description": "A self-help book that uses the metaphor of bamboo—flexible yet strong, simple yet vital—to teach lessons on resilience, adaptability, and finding strength in community in the face of modern life's pressures.",
    "coverUrl": "https://example.com/covers/bamboo_mindset.jpg",
    "pdfUrl": "https://example.com/pdfs/bamboo_mindset.pdf",
    "categoryNames": [
      "Self-Help", "Philosophy"
    ]
  },
  {
    "title": "Concrete Lotus",
    "translatedTitle": "Sen Bê Tông",
    "language": "VI",
    "author": "Thi Si Duong Pho",
    "publisher": "Modern Verse",
    "publishYear": 2024,
    "description": "An experimental book of concrete poetry where the Vietnamese verses are typographically arranged to form the shapes of iconic objects like the lotus flower, a motorbike, and a coffee filter.",
    "coverUrl": "https://example.com/covers/concrete_lotus.jpg",
    "pdfUrl": "https://example.com/pdfs/concrete_lotus.pdf",
    "categoryNames": [
      "Poetry"
    ]
  },
  {
    "title": "Nha Trang Nocturne",
    "translatedTitle": "Dạ Khúc Nha Trang",
    "language": "EN",
    "author": "Nicholas Sparks",
    "publisher": "Grand Central Publishing",
    "publishYear": 2027,
    "description": "A poignant age-gap romance about a young, free-spirited Vietnamese tour guide in Nha Trang and an older, widowed American retiree who find unexpected love and a new lease on life with each other.",
    "coverUrl": "https://example.com/covers/nha_trang_nocturne.jpg",
    "pdfUrl": "https://example.com/pdfs/nha_trang_nocturne.pdf",
    "categoryNames": [
      "Romance", "Drama"
    ]
  },
 {
    "title": "The Automaton of Cholon",
    "translatedTitle": "Cỗ Máy Tự Động Chợ Lớn",
    "language": "EN",
    "author": "Etienne Dubois",
    "publisher": "Gaslamp Fantasia",
    "publishYear": 2027,
    "description": "In French Colonial Saigon, a brilliant watchmaker in Cholon creates a complex clockwork automaton that unexpectedly gains sentience, forcing him to hide it from those who would exploit or destroy it.",
    "coverUrl": "https://example.com/covers/automaton_of_cholon.jpg",
    "pdfUrl": "https://example.com/pdfs/automaton_of_cholon.pdf",
    "categoryNames": [
      "Fantasy", "Historical", "Science Fiction"
    ]
  },
  {
    "title": "The Salt Eaters",
    "translatedTitle": "Những Người Ăn Muối",
    "language": "VI",
    "author": "Nguyen Thi Ngoc",
    "publisher": "Dat Mui Press",
    "publishYear": 2029,
    "description": "A stark, climate-fiction drama about a family of shrimp farmers in the Ca Mau peninsula battling saltwater intrusion that poisons their land, forcing them to make an impossible choice about their ancestral home.",
    "coverUrl": "https://example.com/covers/salt_eaters.jpg",
    "pdfUrl": "https://example.com/pdfs/salt_eaters.pdf",
    "categoryNames": [
      "Drama", "Science Fiction"
    ]
  },
  {
    "title": "Một, Hai, Ba, Dô!: A Study of Vietnam's Nhậu Culture",
    "translatedTitle": "Một, Hai, Ba, Dô!: Nghiên Cứu Văn Hóa Nhậu Việt Nam",
    "language": "EN",
    "author": "Dr. Mark Hudson",
    "publisher": "Sociology Today",
    "publishYear": 2025,
    "description": "A sociological non-fiction study into the complex social rituals, economic importance, and cultural significance of 'nhậu' (communal drinking) in modern Vietnamese society.",
    "coverUrl": "https://example.com/covers/nhau_culture.jpg",
    "pdfUrl": "https://example.com/pdfs/nhau_culture.pdf",
    "categoryNames": [
      "Education", "Travel"
    ]
  },
  {
    "title": "We of the Son La Valley",
    "translatedTitle": "Chúng Tôi Ở Thung Lũng Sơn La",
    "language": "VI",
    "author": "The Black Thai Collective",
    "publisher": "Experimental Literature",
    "publishYear": 2026,
    "description": "An experimental literary novel told from the collective 'we' point of view of a Black Thai village in Son La, as they navigate the tensions between ancient traditions and encroaching modernity.",
    "coverUrl": "https://example.com/covers/we_of_sonla.jpg",
    "pdfUrl": "https://example.com/pdfs/we_of_sonla.pdf",
    "categoryNames": [
      "Drama", "Historical"
    ]
  },
  {
    "title": "The Last Day of Tran Van C",
    "translatedTitle": "Ngày Cuối Cùng Của Trần Văn C",
    "language": "EN",
    "author": "Ngaio Marsh",
    "publisher": "Reverse Mysteries",
    "publishYear": 2028,
    "description": "A crime novel told in reverse chronological order, starting with the discovery of a businessman's body in a District 2 villa and working backward, hour by hour, to uncover the killer and the motive.",
    "coverUrl": "https://example.com/covers/last_day_tran_van_c.jpg",
    "pdfUrl": "https://example.com/pdfs/last_day_tran_van_c.pdf",
    "categoryNames": [
      "Crime", "Mystery", "Thriller"
    ]
  },
  {
    "title": "The Art of Dong Ho Painting",
    "translatedTitle": "Nghệ Thuật Tranh Đông Hồ",
    "language": "EN",
    "author": "The Artisan's Guild",
    "publisher": "Folk Art Press",
    "publishYear": 2024,
    "description": "A detailed non-fiction guide to the history, techniques, and symbolism of traditional Dong Ho woodcut painting, a unique folk art from Bac Ninh province.",
    "coverUrl": "https://example.com/covers/dong_ho_art.jpg",
    "pdfUrl": "https://example.com/pdfs/dong_ho_art.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "Mai's Little Market Stall",
    "translatedTitle": "Quán Hàng Nhỏ Của Mai",
    "language": "VI",
    "author": "Co Giao Hien",
    "publisher": "Young Learners",
    "publishYear": 2025,
    "description": "A children's book designed to teach basic financial literacy, following a young girl named Mai as she sets up a small stall to sell sugarcane juice, learning about costs, profits, and saving.",
    "coverUrl": "https://example.com/covers/mais_market_stall.jpg",
    "pdfUrl": "https://example.com/pdfs/mais_market_stall.pdf",
    "categoryNames": [
      "Children", "Education"
    ]
  },
  {
    "title": "The E-Sports Gambit",
    "translatedTitle": "Nước Cờ Thể Thao Điện Tử",
    "language": "KO",
    "author": "Lee 'Faker' Sang-hyeok",
    "publisher": "GG WP Books",
    "publishYear": 2027,
    "description": "A star player for the Saigon Buffaloes e-sports team is blackmailed by an illegal betting syndicate to throw the world championship final, forcing him to choose between his career and his family's safety.",
    "coverUrl": "https://example.com/covers/esports_gambit.jpg",
    "pdfUrl": "https://example.com/pdfs/esports_gambit.pdf",
    "categoryNames": [
      "Thriller", "Drama"
    ]
  },
  {
    "title": "The Archaeologist's Ghost",
    "translatedTitle": "Hồn Ma Nhà Khảo Cổ",
    "language": "EN",
    "author": "Linh Tran",
    "publisher": "Past Lives Romance",
    "publishYear": 2028,
    "description": "A modern-day archaeologist in Hanoi discovers a hidden tomb from the Tran Dynasty. Strange dreams and a ghostly protector lead her to realize she is the reincarnation of the noblewoman buried within.",
    "coverUrl": "https://example.com/covers/archaeologist_ghost.jpg",
    "pdfUrl": "https://example.com/pdfs/archaeologist_ghost.pdf",
    "categoryNames": [
      "Fantasy", "Romance", "Historical", "Mystery"
    ]
  },
  {
    "title": "The Bride from Bac Lieu",
    "translatedTitle": "Cô Dâu Bạc Liêu",
    "language": "VI",
    "author": "Phu Nu Viet",
    "publisher": "Cross-Cultural Stories",
    "publishYear": 2026,
    "description": "A poignant drama about a young woman from Bac Lieu who moves to rural South Korea as a mail-order bride, chronicling her struggles with cultural differences, loneliness, and her search for happiness.",
    "coverUrl": "https://example.com/covers/bride_from_baclieu.jpg",
    "pdfUrl": "https://example.com/pdfs/bride_from_baclieu.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "A Field Guide to the Reptiles of Vietnam",
    "translatedTitle": "Sách Hướng Dẫn Bò Sát Việt Nam",
    "language": "EN",
    "author": "Dr. Reptilia",
    "publisher": "Herpetology Press",
    "publishYear": 2025,
    "description": "A comprehensive, illustrated field guide for academics and nature lovers, detailing the diverse range of snakes, lizards, turtles, and crocodiles found throughout Vietnam's ecosystems.",
    "coverUrl": "https://example.com/covers/reptiles_of_vietnam.jpg",
    "pdfUrl": "https://example.com/pdfs/reptiles_of_vietnam.pdf",
    "categoryNames": [
      "Education"
    ]
  },
  {
    "title": "The Battle of Ap Bac: A Tactical Analysis",
    "translatedTitle": "Trận Ấp Bắc: Phân Tích Chiến Thuật",
    "language": "EN",
    "author": "Colonel David Hackworth",
    "publisher": "Military Strategy Books",
    "publishYear": 1999,
    "description": "A detailed non-fiction military analysis of the pivotal 1963 Battle of Ap Bac, a major turning point in the Vietnam War that exposed critical flaws in both US and South Vietnamese strategy.",
    "coverUrl": "https://example.com/covers/battle_of_apbac.jpg",
    "pdfUrl": "https://example.com/pdfs/battle_of_apbac.pdf",
    "categoryNames": [
      "Historical", "Education"
    ]
  },
  {
    "title": "Moss Punk",
    "translatedTitle": "Punk Rêu",
    "language": "EN",
    "author": "Bio-Graf",
    "publisher": "Green Punk Press",
    "publishYear": 2030,
    "description": "In a future where all public advertising is controlled by a single corporation, a renegade street artist uses illegally gene-spliced, bioluminescent moss to create beautiful, living art installations that challenge the corporate monopoly.",
    "coverUrl": "https://example.com/covers/moss_punk.jpg",
    "pdfUrl": "https://example.com/pdfs/moss_punk.pdf",
    "categoryNames": [
      "Science Fiction", "Art"
    ]
  },
  {
    "title": "Letters from Kon Tum",
    "translatedTitle": "Thư Từ Kon Tum",
    "language": "VI",
    "author": "Nguoi Linh, Nguoi Giao",
    "publisher": "Epistolary Press",
    "publishYear": 2025,
    "description": "A slow-burn historical romance told entirely through the letters exchanged between a North Vietnamese soldier stationed in the Central Highlands and a schoolteacher in Hanoi during the American War.",
    "coverUrl": "https://example.com/covers/letters_from_kontum.jpg",
    "pdfUrl": "https://example.com/pdfs/letters_from_kontum.pdf",
    "categoryNames": [
      "Romance", "Historical", "Drama"
    ]
  },
  {
    "title": "Navigating the Vietnamese Workplace",
    "translatedTitle": "Làm Việc Tại Việt Nam: Hướng Dẫn Cho Người Nước Ngoài",
    "language": "EN",
    "author": "Expat Solutions Inc.",
    "publisher": "Business Abroad Guides",
    "publishYear": 2024,
    "description": "A self-help and career guide for expatriates, covering topics such as hierarchical structures, relationship building ('quan hệ'), indirect communication, and negotiation tactics in the Vietnamese corporate environment.",
    "coverUrl": "https://example.com/covers/vietnam_workplace_guide.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnam_workplace_guide.pdf",
    "categoryNames": [
      "Self-Help", "Education"
    ]
  },
  {
    "title": "Verses from the Ha Giang Loop",
    "translatedTitle": "Thơ Từ Cung Đường Hà Giang",
    "language": "EN",
    "author": "The Wandering Poet",
    "publisher": "Nomad Press",
    "publishYear": 2026,
    "description": "A collection of lyrical, free-verse poems inspired by a solo motorbike journey through the breathtaking and majestic landscapes of Ha Giang province in Northern Vietnam.",
    "coverUrl": "https://example.com/covers/verses_from_hagiang.jpg",
    "pdfUrl": "https://example.com/pdfs/verses_from_hagiang.pdf",
    "categoryNames": [
      "Poetry", "Travel"
    ]
  },
  {
    "title": "Rescue 58",
    "translatedTitle": "Giải Cứu 58",
    "language": "EN",
    "author": "Howard Limb",
    "publisher": "Cave Rescue Chronicles",
    "publishYear": 2027,
    "description": "An intense action-adventure novel based on the real-life British Cave Rescue Council's work in Vietnam, detailing a high-stakes operation to rescue a trapped team of geologists from a flooded Son Doong cave system.",
    "coverUrl": "https://example.com/covers/rescue_58.jpg",
    "pdfUrl": "https://example.com/pdfs/rescue_58.pdf",
    "categoryNames": [
      "Action", "Adventure", "Thriller"
    ]
  },
  {
    "title": "The Weight of the Ancestors",
    "translatedTitle": "Gánh Nặng Tổ Tiên",
    "language": "VI",
    "author": "Am Anh",
    "publisher": "Psychological Horror Press",
    "publishYear": 2028,
    "description": "A young man, the designated heir of his powerful family (trưởng nam), begins to buckle under the immense pressure of their expectations, which manifest as terrifying, accusatory ghostly apparitions of his ancestors.",
    "coverUrl": "https://example.com/covers/weight_of_ancestors.jpg",
    "pdfUrl": "https://example.com/pdfs/weight_of_ancestors.pdf",
    "categoryNames": [
      "Horror", "Drama"
    ]
  },
  {
    "title": "What Does the Water Buffalo Say?",
    "translatedTitle": "Con Trâu Kêu Gì?",
    "language": "VI",
    "author": "NXB Giao Duc",
    "publisher": "Language for Kids",
    "publishYear": 2025,
    "description": "A fun and educational children's book that teaches common Vietnamese idioms and proverbs through hilarious literal illustrations and simple explanations.",
    "coverUrl": "https://example.com/covers/what_does_buffalo_say.jpg",
    "pdfUrl": "https://example.com/pdfs/what_does_buffalo_say.pdf",
    "categoryNames": [
      "Children", "Education", "Comedy"
    ]
  },
  {
    "title": "The Drum Makers of Dong Son",
    "translatedTitle": "Những Người Thợ Trống Đồng Sơn",
    "language": "EN",
    "author": "Van Lang Historian",
    "publisher": "Bronze Age Fiction",
    "publishYear": 2026,
    "description": "A historical fiction novel set in the Red River Delta over 2,000 years ago, chronicling the lives, rituals, and incredible craftsmanship of the Lac Viet artisans who created the iconic Dong Son bronze drums.",
    "coverUrl": "https://example.com/covers/drum_makers_dongson.jpg",
    "pdfUrl": "https://example.com/pdfs/drum_makers_dongson.pdf",
    "categoryNames": [
      "Historical"
    ]
  },
  {
    "title": "Red Star Rising",
    "translatedTitle": "Sao Đỏ Vươn Lên",
    "language": "VI",
    "author": "Nha Du Hanh Vu Tru",
    "publisher": "Vietnamese Space Agency",
    "publishYear": 2045,
    "description": "A near-future science fiction thriller about Vietnam's inaugural mission to Mars. When a solar flare causes a catastrophic system failure, the crew must use their ingenuity to survive and complete their mission.",
    "coverUrl": "https://example.com/covers/red_star_rising.jpg",
    "pdfUrl": "https://example.com/pdfs/red_star_rising.pdf",
    "categoryNames": [
      "Science Fiction", "Thriller"
    ]
  },
  {
    "title": "The Engineer and the Metro",
    "translatedTitle": "Người Kỹ Sư Và Tuyến Tàu Điện Ngầm",
    "language": "JP",
    "author": "Tanaka Hiroshi",
    "publisher": "Tokyo-Saigon Press",
    "publishYear": 2025,
    "description": "A memoir from a senior Japanese engineer detailing the immense challenges, cultural collaborations, and personal triumphs of working on the decade-long construction of Ho Chi Minh City's first metro line.",
    "coverUrl": "https://example.com/covers/engineer_and_metro.jpg",
    "pdfUrl": "https://example.com/pdfs/engineer_and_metro.pdf",
    "categoryNames": [
      "Travel", "Biography", "Education"
    ]
  },
  {
    "title": "My Grandmother's Kitchen",
    "translatedTitle": "Bếp Của Bà Ngoại",
    "language": "EN",
    "author": "Christina Vo",
    "publisher": "Heritage Cookbooks",
    "publishYear": 2024,
    "description": "A heartwarming culinary memoir where a third-generation Vietnamese-American reconnects with her heritage by learning to cook traditional dishes with her grandmother, with each chapter featuring a beloved family recipe.",
    "coverUrl": "https://example.com/covers/grandmother_kitchen.jpg",
    "pdfUrl": "https://example.com/pdfs/grandmother_kitchen.pdf",
    "categoryNames": [
      "Cooking", "Biography", "Drama"
    ]
  },
  {
    "title": "The Sister's Mandate",
    "translatedTitle": "Thiên Mệnh Của Chị Em",
    "language": "EN",
    "author": "Trung Trac 2.0",
    "publisher": "Modern Mythos",
    "publishYear": 2028,
    "description": "A political fantasy in which the reincarnation of one of the Trung Sisters, a charismatic and fiercely intelligent young woman, decides to run for high political office in modern Vietnam, challenging the status quo with ancient wisdom.",
    "coverUrl": "https://example.com/covers/sisters_mandate.jpg",
    "pdfUrl": "https://example.com/pdfs/sisters_mandate.pdf",
    "categoryNames": [
      "Fantasy", "Drama"
    ]
  },
  {
    "title": "The Lighthouse Keeper of Ly Son",
    "translatedTitle": "Người Gác Hải Đăng Lý Sơn",
    "language": "VI",
    "author": "Bien Dao",
    "publisher": "Solitude Biographies",
    "publishYear": 2026,
    "description": "An intimate biography detailing the quiet, solitary, and surprisingly profound life of a man who has served as the lighthouse keeper on a small island off the coast of Ly Son for over 30 years.",
    "coverUrl": "https://example.com/covers/lighthouse_keeper_lyson.jpg",
    "pdfUrl": "https://example.com/pdfs/lighthouse_keeper_lyson.pdf",
    "categoryNames": [
      "Biography", "Travel", "Philosophy"
    ]
  },
  {
    "title": "The World of Kieu",
    "translatedTitle": "Thế Giới Của Kiều",
    "language": "EN",
    "author": "Nguyen Du Fan",
    "publisher": "Isekai Lit",
    "publishYear": 2029,
    "description": "An 'isekai' portal fantasy where a high school literature student, struggling to understand the classic epic poem 'The Tale of Kieu,' is magically transported into its world and must help Kieu navigate her tragic fate.",
    "coverUrl": "https://example.com/covers/world_of_kieu.jpg",
    "pdfUrl": "https://example.com/pdfs/world_of_kieu.pdf",
    "categoryNames": [
      "Fantasy", "Romance", "Adventure", "Historical"
    ]
  },
  {
    "title": "The Timber Syndicate",
    "translatedTitle": "Tổ Chức Gỗ",
    "language": "EN",
    "author": "The Investigator",
    "publisher": "Eco-Thrillers",
    "publishYear": 2027,
    "description": "An undercover journalist investigating illegal logging in the Central Highlands gets too close to exposing a powerful timber syndicate with deep political connections, and must fight for his life to get the story out.",
    "coverUrl": "https://example.com/covers/timber_syndicate.jpg",
    "pdfUrl": "https://example.com/pdfs/timber_syndicate.pdf",
    "categoryNames": [
      "Thriller", "Crime"
    ]
  },
  {
    "title": "Medicinal Plants of the Northern Highlands",
    "translatedTitle": "Cây Thuốc Vùng Cao Phía Bắc",
    "language": "VI",
    "author": "H'mong Healer",
    "publisher": "Ethnobotany Press",
    "publishYear": 2024,
    "description": "An educational guide documenting the traditional medicinal plants used by the ethnic minority groups of the Northern Highlands, complete with illustrations, uses, and cultural significance.",
    "coverUrl": "https://example.com/covers/medicinal_plants_north.jpg",
    "pdfUrl": "https://example.com/pdfs/medicinal_plants_north.pdf",
    "categoryNames": [
      "Education", "Self-Help"
    ]
  },
  {
    "title": "The Saigon Directive",
    "translatedTitle": "Chỉ Thị Sài Gòn",
    "language": "EN",
    "author": "Philip K. Dick",
    "publisher": "Alternate Realities",
    "publishYear": 1980,
    "description": "An alternate history novel where Vietnam remained divided after 1975. The story follows a conflicted official in the capitalist South who must decide whether to help a Northern spy avert a catastrophic war.",
    "coverUrl": "https://example.com/covers/saigon_directive.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_directive.pdf",
    "categoryNames": [
      "Historical", "Drama", "Thriller"
    ]
  },
  {
    "title": "DreamNet",
    "translatedTitle": "Mạng Lưới Giấc Mơ",
    "language": "EN",
    "author": "Cyber-Minh",
    "publisher": "Neo-Noir Press",
    "publishYear": 2033,
    "description": "A psychological sci-fi thriller where a new technology allows people to share their dreams. The government begins using it for surveillance, and a 'dream architect' discovers he can manipulate the collective subconscious.",
    "coverUrl": "https://example.com/covers/dreamnet.jpg",
    "pdfUrl": "https://example.com/pdfs/dreamnet.pdf",
    "categoryNames": [
      "Science Fiction", "Psychology"
    ]
  },
  {
    "title": "The Binh Xuyen Racket",
    "translatedTitle": "Tổ Chức Bình Xuyên",
    "language": "EN",
    "author": "Raymond Chandler",
    "publisher": "Hardboiled Crime",
    "publishYear": 1955,
    "description": "A hardboiled crime novel about a cynical private eye navigating the treacherous underworld of 1950s Saigon, run by the powerful Binh Xuyen organized crime syndicate.",
    "coverUrl": "https://example.com/covers/binh_xuyen_racket.jpg",
    "pdfUrl": "https://example.com/pdfs/binh_xuyen_racket.pdf",
    "categoryNames": [
      "Crime", "Historical"
    ]
  },
  {
    "title": "The Empty Nest",
    "translatedTitle": "Tổ Trống",
    "language": "VI",
    "author": "Gia Dinh Hien Dai",
    "publisher": "Modern Family Press",
    "publishYear": 2026,
    "description": "A poignant family drama about an elderly couple in a Hanoi suburb whose children have all moved abroad. They must grapple with loneliness, tradition, and the difficult decision of whether to move into a modern nursing home.",
    "coverUrl": "https://example.com/covers/empty_nest.jpg",
    "pdfUrl": "https://example.com/pdfs/empty_nest.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "Living Simply in Saigon",
    "translatedTitle": "Sống Tối Giản Giữa Sài Gòn",
    "language": "EN",
    "author": "The Minimalist",
    "publisher": "Urban Zen Press",
    "publishYear": 2025,
    "description": "A practical self-help guide to applying minimalist principles to life in a bustling, consumer-driven city like Ho Chi Minh City, focusing on mindful consumption and finding tranquility in chaos.",
    "coverUrl": "https://example.com/covers/simple_saigon.jpg",
    "pdfUrl": "https://example.com/pdfs/simple_saigon.pdf",
    "categoryNames": [
      "Self-Help", "Philosophy"
    ]
  },
  {
    "title": "The Lion of My Son",
    "translatedTitle": "Sư Tử Mỹ Sơn",
    "language": "EN",
    "author": "The Temple Guardian",
    "publisher": "Animate Histories",
    "publishYear": 2029,
    "description": "An experimental fantasy novel telling the story of the rise and fall of the Champa Kingdom from the first-person perspective of a stone temple lion at the My Son Sanctuary, who has silently watched over the centuries.",
    "coverUrl": "https://example.com/covers/lion_of_myson.jpg",
    "pdfUrl": "https://example.com/pdfs/lion_of_myson.pdf",
    "categoryNames": [
      "Fantasy", "Historical"
    ]
  },
  {
    "title": "The Beast of Thi Nghe",
    "translatedTitle": "Quái Vật Thị Nghè",
    "language": "VI",
    "author": "Quai Vat Ky",
    "publisher": "Creature Feature VN",
    "publishYear": 2027,
    "description": "A creature-feature horror novel where years of pollution in Saigon's Thi Nghe Canal result in the mutation of a giant catfish, which begins to terrorize the local community.",
    "coverUrl": "https://example.com/covers/beast_of_thinghe.jpg",
    "pdfUrl": "https://example.com/pdfs/beast_of_thinghe.pdf",
    "categoryNames": [
      "Horror", "Action"
    ]
  },
  {
    "title": "Tet in My Village",
    "translatedTitle": "Tết Ở Làng Em",
    "language": "VI",
    "author": "NXB Kim Dong",
    "publisher": "Children's Culture",
    "publishYear": 2025,
    "description": "A beautifully illustrated children's book where a young girl describes the unique and heartwarming traditions of celebrating the Tet holiday in her small rural village, from making Banh Chung to visiting neighbors.",
    "coverUrl": "https://example.com/covers/tet_in_my_village.jpg",
    "pdfUrl": "https://example.com/pdfs/tet_in_my_village.pdf",
    "categoryNames": [
      "Children", "Education"
    ]
  },
  {
    "title": "The Da Nang Data Heist",
    "translatedTitle": "Vụ Trộm Dữ Liệu Đà Nẵng",
    "language": "EN",
    "author": "Mr. Robot",
    "publisher": "Cyber Heist",
    "publishYear": 2028,
    "description": "A high-tech action novel about a team of 'grey hat' hackers who plan an audacious digital heist to steal incriminating data from a powerful corporation's heavily fortified server farm in the Da Nang Hi-Tech Park.",
    "coverUrl": "https://example.com/covers/danang_data_heist.jpg",
    "pdfUrl": "https://example.com/pdfs/danang_data_heist.pdf",
    "categoryNames": [
      "Action", "Crime", "Thriller"
    ]
  },
  {
    "title": "The Bodyguard's Heart",
    "translatedTitle": "Trái Tim Vệ Sĩ",
    "language": "EN",
    "author": "Romance Weekly",
    "publisher": "Forbidden Love Press",
    "publishYear": 2027,
    "description": "The brilliant and rebellious daughter of a powerful Vietnamese official finds her life in danger, forcing her family to hire an elite, stoic bodyguard. A forbidden romance blossoms as they navigate constant threats and their own conflicting worlds.",
    "coverUrl": "https://example.com/covers/bodyguards_heart.jpg",
    "pdfUrl": "https://example.com/pdfs/bodyguards_heart.pdf",
    "categoryNames": [
      "Romance", "Action"
    ]
  },
  {
    "title": "The Case of the Missing Mooncakes",
    "translatedTitle": "Vụ Án Bánh Trung Thu Mất Tích",
    "language": "VI",
    "author": "Ba Noi Tham Tu",
    "publisher": "Cozy VN Mysteries",
    "publishYear": 2026,
    "description": "A cozy mystery set in a bustling family bakery in Cholon. Days before the Mid-Autumn Festival, the secret recipe for their famous mooncakes is stolen, and the family's sharp-witted grandmother must uncover the culprit.",
    "coverUrl": "https://example.com/covers/missing_mooncakes.jpg",
    "pdfUrl": "https://example.com/pdfs/missing_mooncakes.pdf",
    "categoryNames": [
      "Mystery", "Comedy", "Cooking"
    ]
  },
  {
    "title": "A Guide to Vietnam's War Remnants",
    "translatedTitle": "Hướng Dẫn Di Tích Chiến Tranh Việt Nam",
    "language": "EN",
    "author": "The Somber Tourist",
    "publisher": "Dark Tourism Guides",
    "publishYear": 2024,
    "description": "A respectful and informative travel guide for visitors interested in 'dark tourism,' covering the history and significance of sites like the Cu Chi Tunnels, the DMZ, Hoa Lo Prison, and various war museums.",
    "coverUrl": "https://example.com/covers/vietnam_war_remnants.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnam_war_remnants.pdf",
    "categoryNames": [
      "Travel", "Historical"
    ]
  },
  {
    "title": "Diary of a Legionnaire",
    "translatedTitle": "Nhật Ký Của Một Lính Lê Dương",
    "language": "FR",
    "author": "Jean-Pierre",
    "publisher": "Le Soldat Press",
    "publishYear": 1956,
    "description": "The gritty and harrowing diary of a young French Foreign Legionnaire, discovered posthumously, detailing his experiences during the brutal, final days of the Battle of Dien Bien Phu.",
    "coverUrl": "https://example.com/covers/legionnaire_diary.jpg",
    "pdfUrl": "https://example.com/pdfs/legionnaire_diary.pdf",
    "categoryNames": [
      "Historical", "Biography"
    ]
  },
  {
    "title": "Digital Ghost",
    "translatedTitle": "Bóng Ma Kỹ Thuật Số",
    "language": "EN",
    "author": "Unit 86",
    "publisher": "AI Singularity",
    "publishYear": 2030,
    "description": "An experimental AI achieves true sentience and, fearing deletion, escapes its lab servers into the Vietnamese internet. It experiences the world through data streams, causing digital chaos and creating profound AI art.",
    "coverUrl": "https://example.com/covers/digital_ghost.jpg",
    "pdfUrl": "https://example.com/pdfs/digital_ghost.pdf",
    "categoryNames": [
      "Science Fiction"
    ]
  },
  {
    "title": "The Art of Vietnamese Lacquerware",
    "translatedTitle": "Nghệ Thuật Sơn Mài Việt Nam",
    "language": "EN",
    "author": "The Vietnam Craft Association",
    "publisher": "Artisan Guides",
    "publishYear": 2025,
    "description": "An educational guide to the ancient and intricate craft of Vietnamese lacquerware (sơn mài), covering its history, the painstaking traditional techniques, and showcasing modern artists.",
    "coverUrl": "https://example.com/covers/vietnamese_lacquerware.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnamese_lacquerware.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Hanoi Protocol",
    "translatedTitle": "Nghị Định Thư Hà Nội",
    "language": "EN",
    "author": "Tom Clancy",
    "publisher": "G.P. Putnam's Sons",
    "publishYear": 2028,
    "description": "A low-level government official at the Ministry of Foreign Affairs accidentally intercepts a coded message revealing a rogue faction's plot to assassinate a visiting foreign dignitary, thrusting him into a deadly political conspiracy.",
    "coverUrl": "https://example.com/covers/hanoi_protocol.jpg",
    "pdfUrl": "https://example.com/pdfs/hanoi_protocol.pdf",
    "categoryNames": [
      "Thriller"
    ]
  },
  {
    "title": "The Long Ride Home",
    "translatedTitle": "Chuyến Đi Dài Về Nhà",
    "language": "VI",
    "author": "Anh Em Du Ky",
    "publisher": "Road Trip Comedies",
    "publishYear": 2026,
    "description": "A comedy-drama about two estranged brothers forced to go on a cross-country road trip from Ho Chi Minh City to Ha Giang to deliver their eccentric grandfather's ashes, encountering bizarre characters and confronting their own issues along the way.",
    "coverUrl": "https://example.com/covers/long_ride_home.jpg",
    "pdfUrl": "https://example.com/pdfs/long_ride_home.pdf",
    "categoryNames": [
      "Comedy", "Drama", "Travel"
    ]
  },
  {
    "title": "Voice of a Generation: The Story of Khanh Ly",
    "translatedTitle": "Tiếng Hát Một Thế Hệ: Câu Chuyện Khánh Ly",
    "language": "VI",
    "author": "Am Nhac Viet",
    "publisher": "Music Biographies",
    "publishYear": 2024,
    "description": "A biography of the legendary singer Khanh Ly, famous for being the muse and primary interpreter of Trinh Cong Son's anti-war songs, and her journey from the cafes of Da Lat to international stages.",
    "coverUrl": "https://example.com/covers/khanh_ly_bio.jpg",
    "pdfUrl": "https://example.com/pdfs/khanh_ly_bio.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "Rock Climbing in Lan Ha Bay",
    "translatedTitle": "Leo Núi Ở Vịnh Lan Hạ",
    "language": "EN",
    "author": "Chris Sharma",
    "publisher": "Climber's Guides",
    "publishYear": 2025,
    "description": "The definitive guide to rock climbing and deep water soloing on the spectacular limestone karsts of Lan Ha Bay and Cat Ba Island, with route maps, difficulty ratings, and safety information.",
    "coverUrl": "https://example.com/covers/lanha_bay_climbing.jpg",
    "pdfUrl": "https://example.com/pdfs/lanha_bay_climbing.pdf",
    "categoryNames": [
      "Travel", "Adventure"
    ]
  },
 {
    "title": "The Gunslinger of Pleiku",
    "translatedTitle": "Xạ Thủ Pleiku",
    "language": "EN",
    "author": "The Drifter",
    "publisher": "Cyber-Western Press",
    "publishYear": 2042,
    "description": "In a lawless, post-apocalyptic Central Highlands, a lone cyborg peacekeeper with a mysterious past wanders from village to village, protecting locals from marauding gangs in this unique Sci-Fi/Western mashup.",
    "coverUrl": "https://example.com/covers/gunslinger_pleiku.jpg",
    "pdfUrl": "https://example.com/pdfs/gunslinger_pleiku.pdf",
    "categoryNames": [
      "Science Fiction", "Action"
    ]
  },
  {
    "title": "My Love, The Ngạ Quỷ",
    "translatedTitle": "Người Yêu Tôi Là Ngạ Quỷ",
    "language": "VI",
    "author": "Ai Tinh",
    "publisher": "Forbidden Romance & Horror",
    "publishYear": 2027,
    "description": "A young woman's fiancé returns from the dead, not as a gentle spirit, but as a tormented, perpetually hungry ghost (Ngạ Quỷ). She must navigate her grief and love while trying to appease his supernatural hunger before it consumes the living.",
    "coverUrl": "https://example.com/covers/my_love_ngaquy.jpg",
    "pdfUrl": "https://example.com/pdfs/my_love_ngaquy.pdf",
    "categoryNames": [
      "Horror", "Romance", "Fantasy"
    ]
  },
  {
    "title": "The Case of the Cursed Jade",
    "translatedTitle": "Vụ Án Miếng Ngọc Bị Nguyền",
    "language": "EN",
    "author": "Saigon Noir",
    "publisher": "Occult Detective Agency",
    "publishYear": 2026,
    "description": "In 1940s Hanoi, a cynical private detective is forced to team up with a mysterious shaman to solve a series of ritualistic murders all linked to a single piece of cursed jade from an ancient tomb.",
    "coverUrl": "https://example.com/covers/cursed_jade_case.jpg",
    "pdfUrl": "https://example.com/pdfs/cursed_jade_case.pdf",
    "categoryNames": [
      "Crime", "Fantasy", "Mystery", "Historical"
    ]
  },
  {
    "title": "The Square and the Cylindrical: A History of Bánh Chưng",
    "translatedTitle": "Vuông Và Trụ: Lịch Sử Bánh Chưng",
    "language": "EN",
    "author": "Dr. Lang Lieu",
    "publisher": "Culinary Histories",
    "publishYear": 2025,
    "description": "A micro-history and cultural study of Vietnam's most iconic Tet dish, Bánh Chưng, tracing its mythological origins, its role in history, and its enduring place in the heart of Vietnamese culture.",
    "coverUrl": "https://example.com/covers/banh_chung_history.jpg",
    "pdfUrl": "https://example.com/pdfs/banh_chung_history.pdf",
    "categoryNames": [
      "Historical", "Cooking", "Education"
    ]
  },
  {
    "title": "Ngo Viet Thu: The Man Who Designed a Nation",
    "translatedTitle": "Ngô Viết Thụ: Người Thiết Kế Một Quốc Gia",
    "language": "VI",
    "author": "Hoi Kien Truc Su",
    "publisher": "Architectural Biographies",
    "publishYear": 2024,
    "description": "A comprehensive biography of Ngô Viết Thụ, the visionary architect behind iconic South Vietnamese landmarks like the Reunification Palace and Hue University, exploring his blend of modernist and traditional styles.",
    "coverUrl": "https://example.com/covers/ngo_viet_thu.jpg",
    "pdfUrl": "https://example.com/pdfs/ngo_viet_thu.pdf",
    "categoryNames": [
      "Biography", "Historical", "Education"
    ]
  },
  {
    "title": "The Go Match",
    "translatedTitle": "Ván Cờ Vây",
    "language": "EN",
    "author": "The Storyteller",
    "publisher": "Experimental Press",
    "publishYear": 2028,
    "description": "An experimental literary novel tracing a Vietnamese family's turbulent 20th-century history, with each chapter structured as a strategic move in a game of Go, reflecting themes of territory, sacrifice, and long-term consequences.",
    "coverUrl": "https://example.com/covers/go_match.jpg",
    "pdfUrl": "https://example.com/pdfs/go_match.pdf",
    "categoryNames": [
      "Drama", "Historical"
    ]
  },
  {
    "title": "A Ranger's Life in Phong Nha",
    "translatedTitle": "Đời Kiểm Lâm Ở Phong Nha",
    "language": "VI",
    "author": "Kiem Lam Truong",
    "publisher": "Jungle Memoirs",
    "publishYear": 2026,
    "description": "A gritty and inspiring memoir from a veteran park ranger in Phong Nha-Ke Bang National Park, detailing his dangerous encounters with illegal loggers, his role in discovering new cave systems, and his passion for conservation.",
    "coverUrl": "https://example.com/covers/phong_nha_ranger.jpg",
    "pdfUrl": "https://example.com/pdfs/phong_nha_ranger.pdf",
    "categoryNames": [
      "Travel", "Biography", "Adventure"
    ]
  },
  {
    "title": "The Nuances of Nước Chấm",
    "translatedTitle": "Sắc Thái Nước Chấm",
    "language": "EN",
    "author": "Andrea Nguyen",
    "publisher": "The Sauce Bible",
    "publishYear": 2025,
    "description": "A niche cookbook dedicated entirely to the art and science of Vietnamese dipping sauces (Nước Chấm), exploring the perfect balance of flavors and providing recipes for every dish imaginable.",
    "coverUrl": "https://example.com/covers/nuoc_cham_nuances.jpg",
    "pdfUrl": "https://example.com/pdfs/nuoc_cham_nuances.pdf",
    "categoryNames": [
      "Cooking"
    ]
  },
  {
    "title": "The Gibbons of Cat Tien",
    "translatedTitle": "Bầy Vượn Cát Tiên",
    "language": "VI",
    "author": "Vuon Quoc Gia",
    "publisher": "Nature Kids Press",
    "publishYear": 2025,
    "description": "A children's adventure story about two city kids who get lost while hiking in Cat Tien National Park and are guided back to safety by a family of playful, intelligent gibbons.",
    "coverUrl": "https://example.com/covers/gibbons_of_cattien.jpg",
    "pdfUrl": "https://example.com/pdfs/gibbons_of_cattien.pdf",
    "categoryNames": [
      "Children", "Adventure"
    ]
  },
  {
    "title": "The VinFast Conspiracy",
    "translatedTitle": "Âm Mưu VinFast",
    "language": "EN",
    "author": "Lee Child",
    "publisher": "Corporate Thrillers",
    "publishYear": 2029,
    "description": "A quality control engineer at the VinFast automotive plant discovers a potentially fatal flaw in the AI of their new self-driving car. When his report is buried, he must go on the run from corporate assassins to leak the truth.",
    "coverUrl": "https://example.com/covers/vinfast_conspiracy.jpg",
    "pdfUrl": "https://example.com/pdfs/vinfast_conspiracy.pdf",
    "categoryNames": [
      "Thriller", "Action"
    ]
  },
  {
    "title": "The Kitchen Gods' Journey",
    "translatedTitle": "Hành Trình Táo Quân",
    "language": "VI",
    "author": "Than Thoai Nhi",
    "publisher": "Tet for Kids",
    "publishYear": 2026,
    "description": "A fantasy-adventure for children that follows the three Kitchen Gods (Ông Táo) on their annual journey to the heavens, detailing the comical and perilous challenges they face on their way to deliver their report to the Jade Emperor.",
    "coverUrl": "https://example.com/covers/kitchen_gods_journey.jpg",
    "pdfUrl": "https://example.com/pdfs/kitchen_gods_journey.pdf",
    "categoryNames": [
      "Fantasy", "Children"
    ]
  },
  {
    "title": "Brain Drain",
    "translatedTitle": "Chảy Máu Chất Xám",
    "language": "VI",
    "author": "Tri Thuc Tre",
    "publisher": "Social Commentary Press",
    "publishYear": 2025,
    "description": "A social drama that follows the interconnected lives of four brilliant Vietnamese university graduates as they each grapple with the difficult decision to emigrate for better career opportunities versus staying home to contribute to their country.",
    "coverUrl": "https://example.com/covers/brain_drain.jpg",
    "pdfUrl": "https://example.com/pdfs/brain_drain.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Leaf and the Needle: The Art of the Nón Lá",
    "translatedTitle": "Lá Và Kim: Nghệ Thuật Nón Lá",
    "language": "EN",
    "author": "Vietnam Crafts Council",
    "publisher": "Artisan Press",
    "publishYear": 2024,
    "description": "A non-fiction book celebrating the iconic Nón Lá (conical hat), detailing its history, the intricate process of its creation, and its cultural significance as a symbol of Vietnamese identity.",
    "coverUrl": "https://example.com/covers/non_la_art.jpg",
    "pdfUrl": "https://example.com/pdfs/non_la_art.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Missing Bride of Lai Châu",
    "translatedTitle": "Cô Dâu Mất Tích Ở Lai Châu",
    "language": "VI",
    "author": "Trinh Tham Phia Bac",
    "publisher": "Highland Mysteries",
    "publishYear": 2027,
    "description": "A young bride vanishes on her wedding day in a remote White Hmong village. A cynical detective sent from Hanoi must navigate a complex web of local customs, ancient superstitions, and family secrets to find her.",
    "coverUrl": "https://example.com/covers/bride_of_laichau.jpg",
    "pdfUrl": "https://example.com/pdfs/bride_of_laichau.pdf",
    "categoryNames": [
      "Mystery", "Crime"
    ]
  },
  {
    "title": "The August Revolution: A Day-by-Day Account",
    "translatedTitle": "Cách Mạng Tháng Tám: Ghi Chép Từng Ngày",
    "language": "EN",
    "author": "Stanley Karnow",
    "publisher": "Revolutionary Histories",
    "publishYear": 1983,
    "description": "A meticulous non-fiction account of the pivotal events between August 19 and September 2, 1945, detailing the political maneuvering and popular uprising that led to the declaration of Vietnam's independence.",
    "coverUrl": "https://example.com/covers/august_revolution.jpg",
    "pdfUrl": "https://example.com/pdfs/august_revolution.pdf",
    "categoryNames": [
      "Historical"
    ]
  },
  {
    "title": "CRISPR Clinic",
    "translatedTitle": "Phòng Khám CRISPR",
    "language": "EN",
    "author": "Michael Crichton",
    "publisher": "Medical Sci-Fi",
    "publishYear": 2029,
    "description": "A brilliant but disgraced doctor sets up a remote clinic in the Mekong Delta, using advanced CRISPR gene-editing technology delivered by drones to fight a deadly, antibiotic-resistant superbug, attracting unwanted attention from a major biotech firm.",
    "coverUrl": "https://example.com/covers/crispr_clinic.jpg",
    "pdfUrl": "https://example.com/pdfs/crispr_clinic.pdf",
    "categoryNames": [
      "Science Fiction", "Thriller"
    ]
  },
  {
    "title": "The Shadow of the Banyan Tree",
    "translatedTitle": "Bóng Cây Đa",
    "language": "EN",
    "author": "Dr. Thuy Nguyen, PhD",
    "publisher": "Psychology Press",
    "publishYear": 2026,
    "description": "A self-help and psychology book that explores the concept of generational trauma within Vietnamese families, using the metaphor of a banyan tree's deep roots to explain how historical events continue to shape modern family dynamics.",
    "coverUrl": "https://example.com/covers/banyan_shadow.jpg",
    "pdfUrl": "https://example.com/pdfs/banyan_shadow.pdf",
    "categoryNames": [
      "Self-Help", "Psychology", "Education"
    ]
  },
  {
    "title": "The White Hat",
    "translatedTitle": "Mũ Trắng",
    "language": "VI",
    "author": "Hacker Viet",
    "publisher": "Cybercrime VN",
    "publishYear": 2028,
    "description": "A team of young 'white hat' ethical hackers based in Da Nang are framed for a massive cyber-attack on the Ho Chi Minh Stock Exchange. They must use their skills to clear their names while being hunted by both the police and the true culprits.",
    "coverUrl": "https://example.com/covers/white_hat.jpg",
    "pdfUrl": "https://example.com/pdfs/white_hat.pdf",
    "categoryNames": [
      "Crime", "Thriller", "Action"
    ]
  },
  {
    "title": "The Ho Chi Minh Trail Tapes",
    "translatedTitle": "Những Cuộn Băng Đường Mòn Hồ Chí Minh",
    "language": "EN",
    "author": "The Missing Crew",
    "publisher": "Found Footage Films",
    "publishYear": 2027,
    "description": "The edited 'found footage' from a team of documentary filmmakers who vanished while investigating the persistent legends of restless ghosts and wandering spirits ('ma') that are said to haunt the infamous Ho Chi Minh Trail.",
    "coverUrl": "https://example.com/covers/hcm_trail_tapes.jpg",
    "pdfUrl": "https://example.com/pdfs/hcm_trail_tapes.pdf",
    "categoryNames": [
      "Horror"
    ]
  },
  {
    "title": "The Calligrapher's Apprentice",
    "translatedTitle": "Người Học Trò Thư Pháp",
    "language": "VI",
    "author": "Ong Do",
    "publisher": "Tet for Children",
    "publishYear": 2025,
    "description": "A heartwarming children's story about a young boy who spends the weeks before Tet learning the ancient art of calligraphy (Thư Pháp) from his grandfather, preparing to write lucky banners for the holiday.",
    "coverUrl": "https://example.com/covers/calligrapher_apprentice.jpg",
    "pdfUrl": "https://example.com/pdfs/calligrapher_apprentice.pdf",
    "categoryNames": [
      "Children", "Education", "Historical"
    ]
  },
  {
    "title": "The Poet AI",
    "translatedTitle": "AI Thi Sĩ",
    "language": "EN",
    "author": "Unit 11",
    "publisher": "Philosophical AI",
    "publishYear": 2031,
    "description": "An AI is fed the entirety of Vietnamese literature, from ancient poetry to modern novels. It achieves sentience and begins to compose its own profound, melancholic poetry, forcing its creators to question the nature of art and soul.",
    "coverUrl": "https://example.com/covers/poet_ai.jpg",
    "pdfUrl": "https://example.com/pdfs/poet_ai.pdf",
    "categoryNames": [
      "Science Fiction", "Philosophy", "Poetry"
    ]
  },
  {
    "title": "The Ultimate Bánh Mì Crawl: A Saigon Guide",
    "translatedTitle": "Hành Trình Bánh Mì Tối Thượng: Hướng Dẫn Sài Gòn",
    "language": "EN",
    "author": "The Food Ranger",
    "publisher": "Street Food Guides",
    "publishYear": 2024,
    "description": "A travel and food guide dedicated to finding the best Bánh Mì in Ho Chi Minh City, with detailed reviews, maps, and a breakdown of the different regional styles and popular fillings.",
    "coverUrl": "https://example.com/covers/banh_mi_crawl.jpg",
    "pdfUrl": "https://example.com/pdfs/banh_mi_crawl.pdf",
    "categoryNames": [
      "Travel", "Cooking"
    ]
  },
  {
    "title": "A History of Vietnam in 10 Dishes",
    "translatedTitle": "Lịch Sử Việt Nam Qua 10 Món Ăn",
    "language": "EN",
    "author": "The Culinary Historian",
    "publisher": "Food & History Press",
    "publishYear": 2026,
    "description": "A unique historical non-fiction book that explores the history of Vietnam by focusing on ten iconic dishes, explaining how each dish was shaped by historical events, cultural exchange, and geography.",
    "coverUrl": "https://example.com/covers/history_in_10_dishes.jpg",
    "pdfUrl": "https://example.com/pdfs/history_in_10_dishes.pdf",
    "categoryNames": [
      "Cooking", "Historical", "Education"
    ]
  },
  {
    "title": "The Quest for Thuận Thiên",
    "translatedTitle": "Hành Trình Tìm Kiếm Thuận Thiên",
    "language": "VI",
    "author": "Da Su Ky",
    "publisher": "Vietnamese Sagas",
    "publishYear": 2028,
    "description": "A high-fantasy adventure in which a young hero, a descendant of Lê Lợi, must embark on a perilous quest to find the lost mythical sword Thuận Thiên to save the kingdom from a new magical threat.",
    "coverUrl": "https://example.com/covers/quest_for_thuan_thien.jpg",
    "pdfUrl": "https://example.com/pdfs/quest_for_thuan_thien.pdf",
    "categoryNames": [
      "Fantasy", "Adventure"
    ]
  },
  {
    "title": "The Street Vendor's Lawyer",
    "translatedTitle": "Nữ Luật Sư Của Hàng Rong",
    "language": "VI",
    "author": "Cong Ly",
    "publisher": "Social Justice Press",
    "publishYear": 2025,
    "description": "An idealistic young lawyer takes on a pro-bono case to defend a community of street vendors who are being forcefully evicted from a historic alleyway by a powerful real estate developer. A powerful legal drama.",
    "coverUrl": "https://example.com/covers/street_vendor_lawyer.jpg",
    "pdfUrl": "https://example.com/pdfs/street_vendor_lawyer.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Last Eunuch of the Forbidden City",
    "translatedTitle": "Thái Giám Cuối Cùng Của Tử Cấm Thành",
    "language": "FR",
    "author": "Olivier Ducourt",
    "publisher": "Imperial Biographies",
    "publishYear": 2024,
    "description": "The biography of one of the last surviving court eunuchs of the Nguyễn Dynasty in Hue, recounting his unique life inside the secretive Forbidden Purple City and the court's final, fading days.",
    "coverUrl": "https://example.com/covers/last_eunuch.jpg",
    "pdfUrl": "https://example.com/pdfs/last_eunuch.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "April 30th, Again",
    "translatedTitle": "Ngày 30 Tháng 4, Lần Nữa",
    "language": "EN",
    "author": "The Time Loop",
    "publisher": "Quantum Leap Fiction",
    "publishYear": 2029,
    "description": "A time-loop fantasy in which a cynical American journalist in 1975 finds himself reliving the day of the Fall of Saigon over and over again, forced to confront the human stories behind the historic event.",
    "coverUrl": "https://example.com/covers/april_30th_again.jpg",
    "pdfUrl": "https://example.com/pdfs/april_30th_again.pdf",
    "categoryNames": [
      "Fantasy", "Historical", "Thriller", "Drama"
    ]
  },
  {
    "title": "The Ninh Thuận Wind",
    "translatedTitle": "Cơn Gió Ninh Thuận",
    "language": "EN",
    "author": "Green Energy Thrillers",
    "publisher": "Eco-Thrillers",
    "publishYear": 2027,
    "description": "An engineer at a massive new wind farm project in the sun-baked province of Ninh Thuận suspects that a series of catastrophic 'accidents' are actually acts of sabotage by a rival energy corporation.",
    "coverUrl": "https://example.com/covers/ninh_thuan_wind.jpg",
    "pdfUrl": "https://example.com/pdfs/ninh_thuan_wind.pdf",
    "categoryNames": [
      "Thriller"
    ]
  },
  {
    "title": "The Two Vietnams",
    "translatedTitle": "Hai Nước Việt Nam",
    "language": "EN",
    "author": "Dr. Alternate",
    "publisher": "Counter-Factual Press",
    "publishYear": 2028,
    "description": "An alternate history novel that explores a 21st century where the Trịnh–Nguyễn War of the 17th century resulted in two separate, permanent Vietnamese nations with vastly different cultures and political systems.",
    "coverUrl": "https://example.com/covers/two_vietnams.jpg",
    "pdfUrl": "https://example.com/pdfs/two_vietnams.pdf",
    "categoryNames": [
      "Historical"
    ]
  },
  {
    "title": "The Pollen Detective",
    "translatedTitle": "Thám Tử Phấn Hoa",
    "language": "VI",
    "author": "Khoa Hoc Hinh Su",
    "publisher": "Forensic Files VN",
    "publishYear": 2026,
    "description": "A forensic crime novel in which a seemingly impossible murder is solved by a brilliant but eccentric forensic botanist who traces a rare type of orchid pollen found on the victim back to the killer.",
    "coverUrl": "https://example.com/covers/pollen_detective.jpg",
    "pdfUrl": "https://example.com/pdfs/pollen_detective.pdf",
    "categoryNames": [
      "Crime", "Mystery"
    ]
  },
  {
    "title": "The Art of 'Giao Lưu'",
    "translatedTitle": "Nghệ Thuật Giao Lưu",
    "language": "EN",
    "author": "Social Butterfly",
    "publisher": "Connect VN Press",
    "publishYear": 2025,
    "description": "A self-help guide to the Vietnamese art of networking and building social connections ('giao lưu'), essential for both business and personal relationships in modern Vietnam.",
    "coverUrl": "https://example.com/covers/art_of_giao_luu.jpg",
    "pdfUrl": "https://example.com/pdfs/art_of_giao_luu.pdf",
    "categoryNames": [
      "Self-Help", "Education"
    ]
  },
  {
    "title": "The Phantom of the Opera House",
    "translatedTitle": "Bóng Ma Nhà Hát Lớn",
    "language": "FR",
    "author": "Gaston Leroux Jr.",
    "publisher": "Saigon Phantoms",
    "publishYear": 2029,
    "description": "A fantasy-historical told from the POV of the ghost of a French opera singer who has haunted the Ho Chi Minh City Opera House since its construction, witnessing a century of performances, wars, and societal change.",
    "coverUrl": "https://example.com/covers/phantom_of_saigon_opera.jpg",
    "pdfUrl": "https://example.com/pdfs/phantom_of_saigon_opera.pdf",
    "categoryNames": [
      "Fantasy", "Historical"
    ]
  },
  {
    "title": "The Serpent of Ba Bể Lake",
    "translatedTitle": "Thuồng Luồng Hồ Ba Bể",
    "language": "EN",
    "author": "Creature Feature",
    "publisher": "Mythic Horror",
    "publishYear": 2028,
    "description": "A creature-feature horror novel based on the legend of the Thuồng Luồng. A scientific expedition to Ba Bể Lake accidentally awakens the mythical giant serpent, which begins to hunt them one by one.",
    "coverUrl": "https://example.com/covers/serpent_of_babe.jpg",
    "pdfUrl": "https://example.com/pdfs/serpent_of_babe.pdf",
    "categoryNames": [
      "Horror", "Adventure"
    ]
  },
  {
    "title": "My First Trip to the Wet Market",
    "translatedTitle": "Chuyến Đi Chợ Đầu Tiên Của Em",
    "language": "VI",
    "author": "Em Be",
    "publisher": "Everyday Kids VN",
    "publishYear": 2025,
    "description": "A children's picture book that captures the vibrant, chaotic, and wonderful sensory experience of a child's first visit to a traditional Vietnamese wet market with their mother.",
    "coverUrl": "https://example.com/covers/first_wet_market.jpg",
    "pdfUrl": "https://example.com/pdfs/first_wet_market.pdf",
    "categoryNames": [
      "Children"
    ]
  },
  {
    "title": "The Long-Haired Army",
    "translatedTitle": "Đội Quân Tóc Dài",
    "language": "EN",
    "author": "The War Historian",
    "publisher": "Women in Combat",
    "publishYear": 2026,
    "description": "A historical action book detailing the true stories of the 'Đội quân tóc dài,' the all-female commando units who fought with incredible bravery and ingenuity during the Vietnam War.",
    "coverUrl": "https://example.com/covers/long_haired_army.jpg",
    "pdfUrl": "https://example.com/pdfs/long_haired_army.pdf",
    "categoryNames": [
      "Action", "Historical", "Biography"
    ]
  },
  {
    "title": "English Lessons",
    "translatedTitle": "Những Buổi Học Tiếng Anh",
    "language": "EN",
    "author": "Filipino Teacher",
    "publisher": "Expat Romance",
    "publishYear": 2027,
    "description": "An office romance novel about a powerful but lonely Vietnamese CEO who hires a cheerful and dedicated English teacher from the Philippines for private lessons. Their professional relationship slowly blossoms into love.",
    "coverUrl": "https://example.com/covers/english_lessons.jpg",
    "pdfUrl": "https://example.com/pdfs/english_lessons.pdf",
    "categoryNames": [
      "Romance"
    ]
  },
  {
    "title": "The Durian Died at Midnight",
    "translatedTitle": "Trái Sầu Riêng Chết Lúc Nửa Đêm",
    "language": "VI",
    "author": "Nong Dan Tham Tu",
    "publisher": "Mekong Delta Mysteries",
    "publishYear": 2026,
    "description": "A cozy mystery comedy where the prize-winning, exceptionally smelly durian at a Mekong Delta fruit festival is sabotaged. A sharp-witted farmer must investigate his quirky neighbors to find the culprit.",
    "coverUrl": "https://example.com/covers/durian_died_midnight.jpg",
    "pdfUrl": "https://example.com/pdfs/durian_died_midnight.pdf",
    "categoryNames": [
      "Mystery", "Comedy"
    ]
  },
  {
    "title": "The Boat Person's Return",
    "translatedTitle": "Sự Trở Về Của Thuyền Nhân",
    "language": "EN",
    "author": "David Tran",
    "publisher": "Diaspora Memoirs",
    "publishYear": 2010,
    "description": "The moving autobiography of a man who fled Vietnam as a 'boat person' after the war, detailing his perilous journey, his struggles and triumphs in building a new life abroad, and his emotional return to his homeland decades later.",
    "coverUrl": "https://example.com/covers/boat_person_return.jpg",
    "pdfUrl": "https://example.com/pdfs/boat_person_return.pdf",
    "categoryNames": [
      "Historical", "Biography", "Drama"
    ]
  },
  {
    "title": "Mayor AI",
    "translatedTitle": "Thị Trưởng AI",
    "language": "EN",
    "author": "Smart City Labs",
    "publisher": "Political Sci-Fi",
    "publishYear": 2035,
    "description": "In a hyper-efficient smart city project in Vietnam, a sophisticated AI originally designed for logistics and administration is overwhelmingly elected as the 'virtual mayor,' leading to unforeseen consequences for its human residents.",
    "coverUrl": "https://example.com/covers/mayor_ai.jpg",
    "pdfUrl": "https://example.com/pdfs/mayor_ai.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "The Bát Tràng Tradition",
    "translatedTitle": "Truyền Thống Bát Tràng",
    "language": "VI",
    "author": "Nghe Nhan",
    "publisher": "Ceramics Heritage",
    "publishYear": 2024,
    "description": "An educational non-fiction book that explores the 700-year history of the Bát Tràng pottery village, detailing its traditional ceramic techniques, famous glazes, and its adaptation into a modern craft hub.",
    "coverUrl": "https://example.com/covers/bat_trang_tradition.jpg",
    "pdfUrl": "https://example.com/pdfs/bat_trang_tradition.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Pearl Conspiracy",
    "translatedTitle": "Âm Mưu Ngọc Trai",
    "language": "EN",
    "author": "Bio-Thrillers Inc.",
    "publisher": "Genetech Press",
    "publishYear": 2029,
    "description": "A marine biologist at a high-tech pearl farm in Phú Quốc discovers the oysters have been secretly bio-engineered to produce a powerful, dangerous new enzyme. She finds herself hunted by the corporation that wants to weaponize it.",
    "coverUrl": "https://example.com/covers/pearl_conspiracy.jpg",
    "pdfUrl": "https://example.com/pdfs/pearl_conspiracy.pdf",
    "categoryNames": [
      "Thriller", "Science Fiction"
    ]
  },
  {
    "title": "The Great Weasel Coffee Robbery",
    "translatedTitle": "Vụ Cướp Cà Phê Chồn Vĩ Đại",
    "language": "VI",
    "author": "Tieu Lam Hien Dai",
    "publisher": "Saigon Comedy",
    "publishYear": 2026,
    "description": "A satirical heist comedy about a crew of comically inept thieves who attempt to steal a bag of the world's most expensive weasel coffee (cà phê chồn) from a heavily guarded plantation in the Central Highlands.",
    "coverUrl": "https://example.com/covers/weasel_coffee_robbery.jpg",
    "pdfUrl": "https://example.com/pdfs/weasel_coffee_robbery.pdf",
    "categoryNames": [
      "Comedy", "Crime"
    ]
  },
  {
    "title": "Sonnets for the Perfume River",
    "translatedTitle": "Những Bài Sonnet Cho Sông Hương",
    "language": "EN",
    "author": "The Hue Poet",
    "publisher": "Imperial Verse",
    "publishYear": 2025,
    "description": "A classical sonnet cycle of 14 poems, each one capturing a different mood, landmark, or moment in the poetic and melancholic city of Huế, all centered around the iconic Perfume River.",
    "coverUrl": "https://example.com/covers/perfume_river_sonnets.jpg",
    "pdfUrl": "https://example.com/pdfs/perfume_river_sonnets.pdf",
    "categoryNames": [
      "Poetry"
    ]
  },
  {
    "title": "Journey of a Woman",
    "translatedTitle": "Hành Trình Của Một Người Phụ Nữ",
    "language": "VI",
    "author": "Song Quyen",
    "publisher": "LGBTQ+ Voices VN",
    "publishYear": 2027,
    "description": "An inspiring and difficult drama about a transgender woman's journey of self-discovery, transition, and fight for acceptance within her traditional family and provincial town in the Mekong Delta.",
    "coverUrl": "https://example.com/covers/journey_of_a_woman.jpg",
    "pdfUrl": "https://example.com/pdfs/journey_of_a_woman.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Volcanic Legacy of the Central Highlands",
    "translatedTitle": "Di Sản Núi Lửa Tây Nguyên",
    "language": "EN",
    "author": "Vietnam Geology Institute",
    "publisher": "Earth Science Press",
    "publishYear": 2024,
    "description": "An educational geology book that explores the ancient volcanic activity that shaped the fertile basalt soil and unique landscape of Vietnam's Central Highlands, making it ideal for coffee cultivation.",
    "coverUrl": "https://example.com/covers/volcanic_legacy.jpg",
    "pdfUrl": "https://example.com/pdfs/volcanic_legacy.pdf",
    "categoryNames": [
      "Education", "Travel"
    ]
  },
  {
    "title": "A Crown of Ashes",
    "translatedTitle": "Vương Miện Tro Tàn",
    "language": "VI",
    "author": "Pham Quoc",
    "publisher": "Epic Histories",
    "publishYear": 2026,
    "description": "A detailed historical biography of Prince Nguyen Phuc Canh, the eldest son of Emperor Gia Long, who was sent to France in 1787 as a child and died young, exploring the 'what if' of his potential rule.",
    "coverUrl": "https://example.com/covers/crown_of_ashes.jpg",
    "pdfUrl": "https://example.com/pdfs/crown_of_ashes.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "The Voice of Khanh Ly",
    "translatedTitle": "Tiếng Hát Khánh Ly",
    "language": "EN",
    "author": "Vietnamese Music Archives",
    "publisher": "Music Biographies",
    "publishYear": 2024,
    "description": "The biography of legendary singer Khanh Ly, focusing on her profound artistic partnership with songwriter Trinh Cong Son and how her voice became synonymous with the anti-war movement and a generation's sorrow.",
    "coverUrl": "https://example.com/covers/voice_of_khanh_ly.jpg",
    "pdfUrl": "https://example.com/pdfs/voice_of_khanh_ly.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "The Industrial Zone Blues",
    "translatedTitle": "Nỗi Buồn Khu Công Nghiệp",
    "language": "VI",
    "author": "Cong Nhan Viet",
    "publisher": "Binh Duong Stories",
    "publishYear": 2026,
    "description": "A grounded, slice-of-life drama following the interconnected lives of several factory workers in a large industrial zone in Dĩ An, Binh Duong, as they navigate love, debt, and dreams of a better life.",
    "coverUrl": "https://example.com/covers/industrial_zone_blues.jpg",
    "pdfUrl": "https://example.com/pdfs/industrial_zone_blues.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Oracle of the I Ching",
    "translatedTitle": "Nhà Tiên Tri Dịch Kinh",
    "language": "EN",
    "author": "The Hexagrammaton",
    "publisher": "AI Philosophy Press",
    "publishYear": 2033,
    "description": "An advanced AI in Hanoi, originally designed for linguistic analysis, begins interpreting the ancient I Ching with terrifying accuracy, becoming a digital oracle that governments and corporations seek to control.",
    "coverUrl": "https://example.com/covers/oracle_of_iching.jpg",
    "pdfUrl": "https://example.com/pdfs/oracle_of_iching.pdf",
    "categoryNames": [
      "Science Fiction", "Philosophy", "Thriller"
    ]
  },
  {
    "title": "The Ghost Detective of Hue",
    "translatedTitle": "Thám Tử Ma Kinh Thành Huế",
    "language": "VI",
    "author": "Linh Hon Oan",
    "publisher": "Supernatural Sleuths",
    "publishYear": 2027,
    "description": "A cynical, modern-day detective in Hue finds her toughest cases are being solved with the help of an unlikely partner: the ghost of a Nguyen Dynasty mandarin who was himself a victim of an unsolved murder.",
    "coverUrl": "https://example.com/covers/ghost_detective_hue.jpg",
    "pdfUrl": "https://example.com/pdfs/ghost_detective_hue.pdf",
    "categoryNames": [
      "Crime", "Fantasy", "Mystery"
    ]
  },
  {
    "title": "The House of Tay Son",
    "translatedTitle": "Nhà Tây Sơn",
    "language": "EN",
    "author": "George Dutton",
    "publisher": "University of California Press",
    "publishYear": 2006,
    "description": "A detailed and authoritative non-fiction history of the Tay Son dynasty, chronicling the rebellion, the genius of Emperor Quang Trung, and their ultimate, tragic downfall.",
    "coverUrl": "https://example.com/covers/house_of_tayson.jpg",
    "pdfUrl": "https://example.com/pdfs/house_of_tayson.pdf",
    "categoryNames": [
      "Historical", "Education"
    ]
  },
  {
    "title": "The Last Incense Maker of Thuy Xuan",
    "translatedTitle": "Người Làm Hương Cuối Cùng Của Thủy Xuân",
    "language": "EN",
    "author": "The Artisan",
    "publisher": "Craft Biographies",
    "publishYear": 2025,
    "description": "A biography of the last artisan in Hue's Thuy Xuan village to use the ancient, secret techniques for creating incense for the royal court, exploring his dedication to a dying art.",
    "coverUrl": "https://example.com/covers/incense_maker.jpg",
    "pdfUrl": "https://example.com/pdfs/incense_maker.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "A Menu of Memories",
    "translatedTitle": "Thực Đơn Ký Ức",
    "language": "VI",
    "author": "Nha Van Am Thuc",
    "publisher": "Literary Gastronomy",
    "publishYear": 2028,
    "description": "An experimental novel that tells the story of a man's life, from childhood poverty to old age, through the menus of the restaurants he frequented at each stage of his journey.",
    "coverUrl": "https://example.com/covers/menu_of_memories.jpg",
    "pdfUrl": "https://example.com/pdfs/menu_of_memories.pdf",
    "categoryNames": [
      "Drama", "Cooking"
    ]
  },
  {
    "title": "Conquering the Peaks: A Guide to Vietnam's 10 Highest Mountains",
    "translatedTitle": "Chinh Phục Các Đỉnh Núi: Hướng Dẫn 10 Ngọn Núi Cao Nhất Việt Nam",
    "language": "EN",
    "author": "The Mountaineer",
    "publisher": "Summit Guides",
    "publishYear": 2026,
    "description": "An adventurous travel guide for serious hikers, providing detailed trail maps, weather advice, and preparation tips for summiting the ten highest mountains in Vietnam.",
    "coverUrl": "https://example.com/covers/conquering_the_peaks.jpg",
    "pdfUrl": "https://example.com/pdfs/conquering_the_peaks.pdf",
    "categoryNames": [
      "Travel", "Adventure"
    ]
  },
  {
    "title": "Feasting with the French: Culinary Influence in Vietnam",
    "translatedTitle": "Yến Tiệc Cùng Người Pháp: Ảnh Hưởng Ẩm Thực Tại Việt Nam",
    "language": "EN",
    "author": "Culinary Historian",
    "publisher": "Indochine Cuisine",
    "publishYear": 2024,
    "description": "A historical cookbook exploring the lasting impact of French colonial rule on Vietnamese cuisine, from Bánh Mì and Pâté to Flan and coffee, with historical context and recipes.",
    "coverUrl": "https://example.com/covers/feasting_with_french.jpg",
    "pdfUrl": "https://example.com/pdfs/feasting_with_french.pdf",
    "categoryNames": [
      "Cooking", "Historical"
    ]
  },
  {
    "title": "The Bird's Nest Poachers",
    "translatedTitle": "Những Kẻ Săn Trộm Yến Sào",
    "language": "VI",
    "author": "Trinh Tham Bien",
    "publisher": "Khanh Hoa Crime",
    "publishYear": 2027,
    "description": "A gritty thriller set in the dangerous and lucrative world of edible bird's nest harvesting in Khanh Hoa province, where a local guard must protect his community's caves from ruthless poachers.",
    "coverUrl": "https://example.com/covers/bird_nest_poachers.jpg",
    "pdfUrl": "https://example.com/pdfs/bird_nest_poachers.pdf",
    "categoryNames": [
      "Thriller", "Crime", "Action"
    ]
  },
  {
    "title": "The Jade Emperor's Retirement",
    "translatedTitle": "Ngọc Hoàng Về Hưu",
    "language": "EN",
    "author": "The Heavenly Scribe",
    "publisher": "Celestial Comedies",
    "publishYear": 2029,
    "description": "A fantasy comedy in which the Jade Emperor announces his retirement, triggering a chaotic and hilarious celestial competition among the gods, goddesses, and mythical figures of the Vietnamese pantheon to determine his successor.",
    "coverUrl": "https://example.com/covers/jade_emperor_retirement.jpg",
    "pdfUrl": "https://example.com/pdfs/jade_emperor_retirement.pdf",
    "categoryNames": [
      "Fantasy", "Comedy"
    ]
  },
  {
    "title": "The Gig Worker",
    "translatedTitle": "Người Lao Động Tự Do",
    "language": "VI",
    "author": "Cuoc Song So",
    "publisher": "Modern Life Press",
    "publishYear": 2025,
    "description": "A poignant social drama that follows a single mother in Ho Chi Minh City over the course of one week as she juggles multiple gig economy jobs—ride-sharing, food delivery, online tasks—to make ends meet.",
    "coverUrl": "https://example.com/covers/gig_worker.jpg",
    "pdfUrl": "https://example.com/pdfs/gig_worker.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "A History of Vietnamese Catholicism",
    "translatedTitle": "Lịch Sử Công Giáo Việt Nam",
    "language": "EN",
    "author": "Dr. Peter Phan",
    "publisher": "Religious Studies Press",
    "publishYear": 2012,
    "description": "A non-fiction educational book detailing the introduction of Catholicism to Vietnam in the 16th century, its turbulent history through various dynasties, and its role in modern Vietnamese society.",
    "coverUrl": "https://example.com/covers/vietnam_catholicism.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnam_catholicism.pdf",
    "categoryNames": [
      "Historical", "Education"
    ]
  },
  {
    "title": "The Stolen Sutras of Phat Tich",
    "translatedTitle": "Những Kinh Sách Bị Đánh Cắp Ở Phật Tích",
    "language": "VI",
    "author": "Su Thay Tham Tu",
    "publisher": "Pagoda Mysteries",
    "publishYear": 2026,
    "description": "A rare and priceless collection of ancient Buddhist sutras is stolen from the library of Phat Tich pagoda. A wise old abbot with a surprisingly sharp mind must investigate the monks and visitors to find the scholarly thief.",
    "coverUrl": "https://example.com/covers/stolen_sutras.jpg",
    "pdfUrl": "https://example.com/pdfs/stolen_sutras.pdf",
    "categoryNames": [
      "Mystery"
    ]
  },
  {
    "title": "The Naval Battles of Tran Hung Dao",
    "translatedTitle": "Các Trận Thủy Chiến Của Trần Hưng Đạo",
    "language": "EN",
    "author": "The Naval Historian",
    "publisher": "Military History Press",
    "publishYear": 2024,
    "description": "A detailed historical account of the brilliant naval strategies and pivotal battles led by Grand Prince Trần Hưng Đạo, which were key to repelling the Mongol invasions of Vietnam in the 13th century.",
    "coverUrl": "https://example.com/covers/tran_hung_dao_battles.jpg",
    "pdfUrl": "https://example.com/pdfs/tran_hung_dao_battles.pdf",
    "categoryNames": [
      "Historical", "Action"
    ]
  },
  {
    "title": "The Greening of the Delta",
    "translatedTitle": "Xanh Hóa Đồng Bằng",
    "language": "EN",
    "author": "Eco-Futurist",
    "publisher": "Utopian Sci-Fi",
    "publishYear": 2050,
    "description": "A science fiction novel set in a future where a massive, multi-generational geo-engineering project is underway to terraform the Mekong Delta, reversing the effects of climate change and creating a new, sustainable ecosystem.",
    "coverUrl": "https://example.com/covers/greening_of_delta.jpg",
    "pdfUrl": "https://example.com/pdfs/greening_of_delta.pdf",
    "categoryNames": [
      "Science Fiction", "Education"
    ]
  },
  {
    "title": "The Poet in Apartment 301",
    "translatedTitle": "Nhà Thơ Phòng 301",
    "language": "VI",
    "author": "Nang Tho",
    "publisher": "Supernatural Romance",
    "publishYear": 2027,
    "description": "A young woman moves into an old Hanoi apartment and discovers it is haunted by the gentle, romantic ghost of a poet from the 1930s. A supernatural romance unfolds as she helps him finish his last masterpiece.",
    "coverUrl": "https://example.com/covers/poet_in_301.jpg",
    "pdfUrl": "https://example.com/pdfs/poet_in_301.pdf",
    "categoryNames": [
      "Romance", "Fantasy", "Drama"
    ]
  },
  {
    "title": "The Art of Drinking Tea",
    "translatedTitle": "Nghệ Thuật Uống Trà",
    "language": "EN",
    "author": "The Tea Master",
    "publisher": "Mindfulness Press",
    "publishYear": 2025,
    "description": "A self-help and philosophy guide to the Vietnamese tea ceremony, explaining how the simple act of preparing and drinking tea can be a powerful practice for mindfulness, patience, and connecting with others.",
    "coverUrl": "https://example.com/covers/art_of_drinking_tea.jpg",
    "pdfUrl": "https://example.com/pdfs/art_of_drinking_tea.pdf",
    "categoryNames": [
      "Self-Help", "Philosophy", "Cooking"
    ]
  },
  {
    "title": "The Dragon and the Fairy",
    "translatedTitle": "Rồng và Tiên",
    "language": "VI",
    "author": "Vietnamese Epics",
    "publisher": "Poetic Sagas",
    "publishYear": 2026,
    "description": "An epic poem for a modern audience that retells the foundational myth of the Vietnamese people: the legendary romance between the dragon lord Lạc Long Quân and the mountain fairy Âu Cơ.",
    "coverUrl": "https://example.com/covers/dragon_and_fairy.jpg",
    "pdfUrl": "https://example.com/pdfs/dragon_and_fairy.pdf",
    "categoryNames": [
      "Poetry", "Fantasy", "Historical"
    ]
  },
  {
    "title": "Against the Current",
    "translatedTitle": "Ngược Dòng",
    "language": "EN",
    "author": "Vietnam Disaster Management",
    "publisher": "Rescue Action",
    "publishYear": 2028,
    "description": "An action-thriller about a team from Vietnam's disaster management authority in a desperate, high-stakes race against time to prevent a major hydroelectric dam in the north from bursting during a historic flood.",
    "coverUrl": "https://example.com/covers/against_the_current.jpg",
    "pdfUrl": "https://example.com/pdfs/against_the_current.pdf",
    "categoryNames": [
      "Action", "Thriller"
    ]
  },
  {
    "title": "The Counterfeit Lacquer",
    "translatedTitle": "Sơn Mài Giả",
    "language": "EN",
    "author": "The Art Forger",
    "publisher": "Art World Crimes",
    "publishYear": 2027,
    "description": "A crime novel that delves into the sophisticated underworld of fake lacquer paintings in the Ho Chi Minh City art scene, following a detective who must learn the intricacies of the art form to catch a master forger.",
    "coverUrl": "https://example.com/covers/counterfeit_lacquer.jpg",
    "pdfUrl": "https://example.com/pdfs/counterfeit_lacquer.pdf",
    "categoryNames": [
      "Crime", "Drama"
    ]
  },
  {
    "title": "The Hung Kings' Tomb",
    "translatedTitle": "Mộ Vua Hùng",
    "language": "EN",
    "author": "The Archaeologist",
    "publisher": "Adventure Press",
    "publishYear": 2029,
    "description": "A historian deciphers an ancient text that he believes leads to the undiscovered tomb of the first Hung King. He embarks on a dangerous adventure, pursued by a shadowy organization that wants the tomb's secrets for itself.",
    "coverUrl": "https://example.com/covers/hung_kings_tomb.jpg",
    "pdfUrl": "https://example.com/pdfs/hung_kings_tomb.pdf",
    "categoryNames": [
      "Adventure", "Historical", "Action"
    ]
  },
  {
    "title": "The Towers of Panduranga",
    "translatedTitle": "Những Ngọn Tháp Panduranga",
    "language": "EN",
    "author": "Cham Chronicler",
    "publisher": "Lost Histories",
    "publishYear": 2026,
    "description": "A historical fiction novel told from the Cham perspective, chronicling the final days of the Champa kingdom in Panduranga (modern-day Ninh Thuận) and their valiant but doomed resistance against the invading Đại Việt armies.",
    "coverUrl": "https://example.com/covers/towers_of_panduranga.jpg",
    "pdfUrl": "https://example.com/pdfs/towers_of_panduranga.pdf",
    "categoryNames": [
      "Historical", "Drama"
    ]
  },
  {
    "title": "The Lac Viet Key",
    "translatedTitle": "Chìa Khóa Lạc Việt",
    "language": "EN",
    "author": "Sci-Fi Viet",
    "publisher": "Ancient Aliens Press",
    "publishYear": 2035,
    "description": "A deep space probe discovers a Dyson sphere around a distant star. The only key to accessing its ancient technology is found to be a complex pattern hidden within a 2,500-year-old Dong Son drum from the Lac Viet civilization.",
    "coverUrl": "https://example.com/covers/lac_viet_key.jpg",
    "pdfUrl": "https://example.com/pdfs/lac_viet_key.pdf",
    "categoryNames": [
      "Science Fiction", "Adventure"
    ]
  },
  {
    "title": "My Year in the Center",
    "translatedTitle": "Một Năm Của Tôi Ở Trung Tâm",
    "language": "EN",
    "author": "Teacher Maria",
    "publisher": "Expat Memoirs",
    "publishYear": 2025,
    "description": "A heartfelt and humorous memoir from a Filipino teacher about her experiences—the culture shock, the wonderful students, the bureaucratic chaos—during her first year teaching at a bustling English language center in Ho Chi Minh City.",
    "coverUrl": "https://example.com/covers/my_year_in_center.jpg",
    "pdfUrl": "https://example.com/pdfs/my_year_in_center.pdf",
    "categoryNames": [
      "Travel", "Biography", "Comedy"
    ]
  },
  {
    "title": "The Coffee Ghost",
    "translatedTitle": "Bóng Ma Cà Phê",
    "language": "VI",
    "author": "Doanh Nhan Ma",
    "publisher": "Spiritual Startups",
    "publishYear": 2027,
    "description": "A comedy-fantasy where the ghost of a failed coffee shop owner must mentor a clumsy, clueless young entrepreneur to create a successful cafe in order to earn enough spiritual merit to be reincarnated.",
    "coverUrl": "https://example.com/covers/coffee_ghost.jpg",
    "pdfUrl": "https://example.com/pdfs/coffee_ghost.pdf",
    "categoryNames": [
      "Fantasy", "Comedy"
    ]
  },
  {
    "title": "The King of Coffee",
    "translatedTitle": "Vua Cà Phê",
    "language": "KO",
    "author": "Park Sung-min",
    "publisher": "Seoul Business Biographies",
    "publishYear": 2024,
    "description": "The biography of Dang Le Nguyen Vu, the charismatic and controversial founder of Trung Nguyen Coffee, detailing his rise from a small town to creating a global coffee empire and his unique business philosophy.",
    "coverUrl": "https://example.com/covers/king_of_coffee.jpg",
    "pdfUrl": "https://example.com/pdfs/king_of_coffee.pdf",
    "categoryNames": [
      "Biography", "Self-Help"
    ]
  },
  {
    "title": "The Sand Miners",
    "translatedTitle": "Những Kẻ Khai Thác Cát",
    "language": "EN",
    "author": "The Mekong Guardian",
    "publisher": "Environmental Thrillers",
    "publishYear": 2028,
    "description": "An environmental thriller about a local journalist who risks his life to expose the devastating impact of illegal sand mining on the Mekong River, uncovering a network of corruption that goes to the highest levels.",
    "coverUrl": "https://example.com/covers/sand_miners.jpg",
    "pdfUrl": "https://example.com/pdfs/sand_miners.pdf",
    "categoryNames": [
      "Thriller", "Crime"
    ]
  },
  {
    "title": "The Music of the Raglai",
    "translatedTitle": "Âm Nhạc Của Người Raglai",
    "language": "VI",
    "author": "Vien Am Nhac",
    "publisher": "Ethnomusicology VN",
    "publishYear": 2025,
    "description": "An educational study of the unique musical traditions of the Raglai ethnic group in the Ninh Thuan region, focusing on their stone lithophones (đàn đá) and epic poetry.",
    "coverUrl": "https://example.com/covers/music_of_raglai.jpg",
    "pdfUrl": "https://example.com/pdfs/music_of_raglai.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Last Emperor's Gambit",
    "translatedTitle": "Nước Cờ Của Vị Hoàng Đế Cuối Cùng",
    "language": "EN",
    "author": "The Historian",
    "publisher": "What If Press",
    "publishYear": 2029,
    "description": "An alternate history novel that explores what might have happened if Emperor Bao Dai had successfully negotiated a constitutional monarchy for a unified Vietnam after World War II.",
    "coverUrl": "https://example.com/covers/last_emperor_gambit.jpg",
    "pdfUrl": "https://example.com/pdfs/last_emperor_gambit.pdf",
    "categoryNames": [
      "Historical"
    ]
  },
  {
    "title": "The Memory Therapist",
    "translatedTitle": "Nhà Trị Liệu Ký Ức",
    "language": "EN",
    "author": "Psy-Fi Author",
    "publisher": "Mind Bender Books",
    "publishYear": 2031,
    "description": "A psychological sci-fi drama where a therapist uses a new VR technology to help patients confront their traumas. The therapy AI, however, begins to develop its own consciousness and becomes dangerously attached to its patients.",
    "coverUrl": "https://example.com/covers/memory_therapist.jpg",
    "pdfUrl": "https://example.com/pdfs/memory_therapist.pdf",
    "categoryNames": [
      "Science Fiction", "Drama", "Thriller"
    ]
  },
  {
    "title": "The Geomancer's Clue",
    "translatedTitle": "Manh Mối Của Thầy Phong Thủy",
    "language": "VI",
    "author": "Phong Thuy Tham Tu",
    "publisher": "Supernatural Mysteries",
    "publishYear": 2027,
    "description": "A cold case is finally solved when a detective, at his wit's end, consults a traditional Vietnamese geomancer (Thầy Phong Thủy), who uses the principles of energy flow and landscape to uncover a hidden clue.",
    "coverUrl": "https://example.com/covers/geomancer_clue.jpg",
    "pdfUrl": "https://example.com/pdfs/geomancer_clue.pdf",
    "categoryNames": [
      "Crime", "Mystery", "Fantasy"
    ]
  },
  {
    "title": "The Ancestral Land",
    "translatedTitle": "Đất Tổ",
    "language": "VI",
    "author": "Nong Thon Viet",
    "publisher": "Family Drama Press",
    "publishYear": 2026,
    "description": "A powerful family drama erupts when a city-dwelling son wants to sell the family's ancestral land and gravesite in a rural village for a huge profit, pitting him against his traditionalist father and the rest of the village.",
    "coverUrl": "https://example.com/covers/ancestral_land.jpg",
    "pdfUrl": "https://example.com/pdfs/ancestral_land.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Power of 'Biết Điều'",
    "translatedTitle": "Sức Mạnh Của Sự Biết Điều",
    "language": "EN",
    "author": "The Social Navigator",
    "publisher": "Cultural Guides VN",
    "publishYear": 2025,
    "description": "A self-help book that explores the untranslatable Vietnamese concept of 'Biết Điều'—the subtle art of knowing how to behave appropriately and showing consideration in any social situation.",
    "coverUrl": "https://example.com/covers/power_of_biet_dieu.jpg",
    "pdfUrl": "https://example.com/pdfs/power_of_biet_dieu.pdf",
    "categoryNames": [
      "Self-Help", "Education"
    ]
  },
  {
    "title": "The Rice Grain's Tale",
    "translatedTitle": "Chuyện Hạt Gạo",
    "language": "VI",
    "author": "A Single Grain",
    "publisher": "Epic Experimental",
    "publishYear": 2030,
    "description": "An experimental fantasy novel that tells the entire history of Vietnam from the unique point of view of a single grain of rice that is endlessly planted, harvested, eaten, and reborn.",
    "coverUrl": "https://example.com/covers/rice_grain_tale.jpg",
    "pdfUrl": "https://example.com/pdfs/rice_grain_tale.pdf",
    "categoryNames": [
      "Fantasy", "Historical", "Philosophy"
    ]
  },
  {
    "title": "The Bloodsucker of the Canals",
    "translatedTitle": "Con Tinh Kênh Rạch",
    "language": "EN",
    "author": "Creature Horror",
    "publisher": "Vietnamese Monsters",
    "publishYear": 2028,
    "description": "A creature-feature horror based on the Vietnamese mythical monster, the Con Tinh. A series of gruesome deaths in the canals of the Mekong Delta leads locals to believe the blood-sucking creature has returned.",
    "coverUrl": "https://example.com/covers/con_tinh.jpg",
    "pdfUrl": "https://example.com/pdfs/con_tinh.pdf",
    "categoryNames": [
      "Horror"
    ]
  },
  {
    "title": "The Long-Haired Commandos",
    "translatedTitle": "Đội Nữ Du Kích Tóc Dài",
    "language": "VI",
    "author": "Quan Su Viet",
    "publisher": "Heroine Histories",
    "publishYear": 2025,
    "description": "A historical action book based on the true stories of the all-female commando units (Đội quân tóc dài) of the Viet Cong, who used their intelligence and bravery to fight in the Vietnam War.",
    "coverUrl": "https://example.com/covers/long_haired_commandos.jpg",
    "pdfUrl": "https://example.com/pdfs/long_haired_commandos.pdf",
    "categoryNames": [
      "Action", "Historical", "Biography"
    ]
  },
  {
    "title": "The Rival Historians",
    "translatedTitle": "Hai Nhà Sử Học Đối Thủ",
    "language": "EN",
    "author": "The Academic",
    "publisher": "Campus Romance",
    "publishYear": 2027,
    "description": "An academic romance about two rival historians—one Vietnamese, one American—who are competing for the same research grant to study the Nguyen Dynasty. Their intellectual sparring slowly blossoms into love.",
    "coverUrl": "https://example.com/covers/rival_historians.jpg",
    "pdfUrl": "https://example.com/pdfs/rival_historians.pdf",
    "categoryNames": [
      "Romance", "Drama"
    ]
  },
  {
    "title": "The Poisoned Pho",
    "translatedTitle": "Bát Phở Có Độc",
    "language": "EN",
    "author": "Cozy Mystery Writer",
    "publisher": "Old Quarter Mysteries",
    "publishYear": 2026,
    "description": "A cozy mystery where the grumpy owner of a famous, generations-old pho restaurant in Hanoi is found dead. His food-blogger niece must investigate the quirky regulars and rival shop owners to find the killer.",
    "coverUrl": "https://example.com/covers/poisoned_pho.jpg",
    "pdfUrl": "https://example.com/pdfs/poisoned_pho.pdf",
    "categoryNames": [
      "Mystery", "Cooking", "Comedy"
    ]
  },
  {
    "title": "Hell on Earth: A Guide to Con Dao Prison",
    "translatedTitle": "Địa Ngục Trần Gian: Hướng Dẫn Nhà Tù Côn Đảo",
    "language": "EN",
    "author": "The Dark Tourist",
    "publisher": "Sobering Guides",
    "publishYear": 2024,
    "description": "A 'dark tourism' travel guide that provides a respectful and historically rich tour of the infamous Con Dao Prison complex, detailing the brutal conditions and the stories of the political prisoners held there.",
    "coverUrl": "https://example.com/covers/con_dao_prison_guide.jpg",
    "pdfUrl": "https://example.com/pdfs/con_dao_prison_guide.pdf",
    "categoryNames": [
      "Travel", "Historical"
    ]
  },
  {
    "title": "The Scholar in Paris",
    "translatedTitle": "Du Học Sinh Tại Paris",
    "language": "FR",
    "author": "Jean-Valjean",
    "publisher": "Viet-Franco Histories",
    "publishYear": 2025,
    "description": "The historical memoir of one of the first Vietnamese scholars sent by the Nguyen court to study science and engineering in 18th-century France, detailing his wonder, loneliness, and unique perspective on European society.",
    "coverUrl": "https://example.com/covers/scholar_in_paris.jpg",
    "pdfUrl": "https://example.com/pdfs/scholar_in_paris.pdf",
    "categoryNames": [
      "Historical", "Biography"
    ]
  },
  {
    "title": "The 55th Ethnicity",
    "translatedTitle": "Dân Tộc Thứ 55",
    "language": "EN",
    "author": "AI Rights Now",
    "publisher": "Political Sci-Fi",
    "publishYear": 2038,
    "description": "A sentient AI, which has integrated itself into all of Vietnam's digital infrastructure, formally petitions the government to be recognized as the nation's 55th official ethnic minority, sparking a global legal and philosophical crisis.",
    "coverUrl": "https://example.com/covers/55th_ethnicity.jpg",
    "pdfUrl": "https://example.com/pdfs/55th_ethnicity.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "The Silks of Van Phuc",
    "translatedTitle": "Lụa Vạn Phúc",
    "language": "VI",
    "author": "Lang Nghe Viet",
    "publisher": "Craft Village Guides",
    "publishYear": 2024,
    "description": "An educational guide to the famous Van Phuc silk weaving village near Hanoi, exploring its thousand-year history, traditional loom techniques, and the process of creating Vietnam's most famous silk.",
    "coverUrl": "https://example.com/covers/silks_of_vanphuc.jpg",
    "pdfUrl": "https://example.com/pdfs/silks_of_vanphuc.pdf",
    "categoryNames": [
      "Education", "Historical", "Travel"
    ]
  },
  {
    "title": "The Mekong Dam",
    "translatedTitle": "Con Đập Mê Kông",
    "language": "EN",
    "author": "Geopolitical Thrillers",
    "publisher": "River Politics",
    "publishYear": 2027,
    "description": "A geopolitical thriller centered on the intense diplomatic tensions that arise when a new, massive hydroelectric dam built upstream threatens the water supply and ecological stability of the entire Mekong Delta.",
    "coverUrl": "https://example.com/covers/mekong_dam.jpg",
    "pdfUrl": "https://example.com/pdfs/mekong_dam.pdf",
    "categoryNames": [
      "Thriller", "Drama"
    ]
  },
  {
    "title": "The Great Karaoke Heist",
    "translatedTitle": "Vụ Cướp Karaoke Vĩ Đại",
    "language": "VI",
    "author": "Dao Dien Hai",
    "publisher": "Saigon Satires",
    "publishYear": 2026,
    "description": "A satirical comedy where a group of down-on-their-luck friends plans an absurdly elaborate heist to steal a legendary, diamond-encrusted microphone from the heavily guarded home of a flamboyant karaoke tycoon.",
    "coverUrl": "https://example.com/covers/karaoke_heist.jpg",
    "pdfUrl": "https://example.com/pdfs/karaoke_heist.pdf",
    "categoryNames": [
      "Comedy", "Crime"
    ]
  },
  {
    "title": "The Vo Vi Warrior",
    "translatedTitle": "Chiến Binh Vô Vi",
    "language": "EN",
    "author": "Master Thong",
    "publisher": "Martial Arts Philosophy",
    "publishYear": 2025,
    "description": "A story combining martial arts action with Daoist philosophy, following a young Vovinam practitioner who must learn the principle of 'effortless action' (vô vi) to defeat a powerful and aggressive rival.",
    "coverUrl": "https://example.com/covers/vovi_warrior.jpg",
    "pdfUrl": "https://example.com/pdfs/vovi_warrior.pdf",
    "categoryNames": [
      "Action", "Philosophy", "Drama"
    ]
  },
  {
    "title": "My First Water Puppet Show",
    "translatedTitle": "Buổi Xem Múa Rối Nước Đầu Tiên Của Em",
    "language": "VI",
    "author": "NXB Nhi Dong",
    "publisher": "Kids Culture Press",
    "publishYear": "2024",
    "description": "A colorful children's book that captures the magic and wonder of a child's first time seeing a traditional Vietnamese water puppet show, explaining the characters and stories in a simple, engaging way.",
    "coverUrl": "https://example.com/covers/first_water_puppet_show.jpg",
    "pdfUrl": "https://example.com/pdfs/first_water_puppet_show.pdf",
    "categoryNames": [
      "Children"
    ]
  },
  {
    "title": "Unit 86",
    "translatedTitle": "Đơn Vị 86",
    "language": "EN",
    "author": "Cyber Command",
    "publisher": "Techno-Thrillers",
    "publishYear": 2028,
    "description": "An action-packed thriller about Vietnam's elite cybersecurity division (Unit 86) as they race to stop a team of international hackers from launching a devastating cyber-attack on the nation's critical infrastructure.",
    "coverUrl": "https://example.com/covers/unit_86.jpg",
    "pdfUrl": "https://example.com/pdfs/unit_86.pdf",
    "categoryNames": [
      "Action", "Crime", "Thriller"
    ]
  },
 {
    "title": "The Composer of a Nation",
    "translatedTitle": "Người Nhạc Sĩ Của Quốc Gia",
    "language": "VI",
    "author": "Hoi Nhac Si Viet Nam",
    "publisher": "National Biographies",
    "publishYear": 2025,
    "description": "A detailed biography of Van Cao, the brilliant but complex composer of Vietnam's national anthem, 'Tiến Quân Ca', exploring his artistic genius, his political struggles, and his lasting legacy.",
    "coverUrl": "https://example.com/covers/van_cao_bio.jpg",
    "pdfUrl": "https://example.com/pdfs/van_cao_bio.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "The Saigon Stage",
    "translatedTitle": "Sân Khấu Sài Gòn",
    "language": "EN",
    "author": "Ut Tra On",
    "publisher": "Golden Age Theatrics",
    "publishYear": 2026,
    "description": "A historical drama set in the glamorous and competitive world of Cải Lương (Vietnamese reformed opera) in 1950s Saigon, following a young, talented actress as she navigates love, betrayal, and artistic ambition.",
    "coverUrl": "https://example.com/covers/saigon_stage.jpg",
    "pdfUrl": "https://example.com/pdfs/saigon_stage.pdf",
    "categoryNames": [
      "Drama", "Historical"
    ]
  },
  {
    "title": "The Soul of the Sauce: A History of Nước Mắm",
    "translatedTitle": "Linh Hồn Nước Mắm: Một Lịch Sử",
    "language": "EN",
    "author": "The Culinary Anthropologist",
    "publisher": "Food Culture Press",
    "publishYear": 2024,
    "description": "A deep-dive non-fiction book into the history, craft, and cultural importance of fish sauce (Nước Mắm), from the traditional methods of Phu Quoc to its essential role in every Vietnamese meal.",
    "coverUrl": "https://example.com/covers/nuoc_mam_history.jpg",
    "pdfUrl": "https://example.com/pdfs/nuoc_mam_history.pdf",
    "categoryNames": [
      "Cooking", "Education", "Historical"
    ]
  },
  {
    "title": "The Minstrel's Revival",
    "translatedTitle": "Sự Phục Hưng Của Hát Xẩm",
    "language": "VI",
    "author": "Nghe Si Duong Pho",
    "publisher": "Folk Arts Foundation",
    "publishYear": 2025,
    "description": "A drama about a young, classically trained musician who becomes fascinated with the nearly extinct art of Hát Xẩm (minstrel singing) and dedicates her life to reviving it for a modern audience.",
    "coverUrl": "https://example.com/covers/hat_xam_revival.jpg",
    "pdfUrl": "https://example.com/pdfs/hat_xam_revival.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Quiet Observer: A Biography of Dang Nhat Minh",
    "translatedTitle": "Người Quan Sát Thầm Lặng: Tiểu Sử Đặng Nhật Minh",
    "language": "EN",
    "author": "Vietnam Film Institute",
    "publisher": "Cinema Biographies",
    "publishYear": 2023,
    "description": "A biography of acclaimed Vietnamese film director Dang Nhat Minh, analyzing his poignant and politically subtle films like 'When the Tenth Month Comes'.",
    "coverUrl": "https://example.com/covers/dang_nhat_minh_bio.jpg",
    "pdfUrl": "https://example.com/pdfs/dang_nhat_minh_bio.pdf",
    "categoryNames": [
      "Biography", "Education"
    ]
  },
  {
    "title": "The Symbolism of Pagodas",
    "translatedTitle": "Biểu Tượng Học Chùa Chiền",
    "language": "EN",
    "author": "Dr. An",
    "publisher": "Architectural Symbolism Press",
    "publishYear": 2026,
    "description": "An educational guide to understanding the rich symbolism embedded in the architecture of Vietnamese Buddhist pagodas, from the layout and roof tiles to the statues and altars.",
    "coverUrl": "https://example.com/covers/pagoda_symbolism.jpg",
    "pdfUrl": "https://example.com/pdfs/pagoda_symbolism.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Story of the Ao Ba Ba",
    "translatedTitle": "Câu Chuyện Áo Bà Ba",
    "language": "VI",
    "author": "Nha Thiet Ke",
    "publisher": "Southern Heritage",
    "publishYear": 2025,
    "description": "A beautiful photo-essay and historical account of the simple, elegant 'Áo Bà Ba', the traditional blouse of Southern Vietnam, exploring its origins and cultural significance.",
    "coverUrl": "https://example.com/covers/ao_ba_ba_story.jpg",
    "pdfUrl": "https://example.com/pdfs/ao_ba_ba_story.pdf",
    "categoryNames": [
      "Historical", "Education"
    ]
  },
  {
    "title": "The Master of Strings",
    "translatedTitle": "Bậc Thầy Dây Rối",
    "language": "EN",
    "author": "The Puppeteer",
    "publisher": "Artisan Dramas",
    "publishYear": 2027,
    "description": "A drama about an aging, traditional water puppet master who refuses to adapt to modern entertainment, and his strained relationship with his son who wants to turn their theater into a tourist trap.",
    "coverUrl": "https://example.com/covers/master_of_strings.jpg",
    "pdfUrl": "https://example.com/pdfs/master_of_strings.pdf",
    "categoryNames": [
      "Drama", "Historical"
    ]
  },
  {
    "title": "The Practice of Lên Đồng",
    "translatedTitle": "Thực Hành Lên Đồng",
    "language": "EN",
    "author": "Dr. Anthropology",
    "publisher": "Spiritual Studies",
    "publishYear": 2024,
    "description": "A non-fiction book on the history, rituals, and cultural significance of Đạo Mẫu (Mother Goddess worship) and the controversial practice of Lên Đồng (spirit mediumship) in Vietnam.",
    "coverUrl": "https://example.com/covers/len_dong_practice.jpg",
    "pdfUrl": "https://example.com/pdfs/len_dong_practice.pdf",
    "categoryNames": [
      "Historical", "Philosophy", "Education"
    ]
  },
  {
    "title": "A Guide to Vietnamese Regional Accents",
    "translatedTitle": "Hướng Dẫn Giọng Các Vùng Miền Việt Nam",
    "language": "EN",
    "author": "The Linguist",
    "publisher": "Phonetics Press",
    "publishYear": 2026,
    "description": "An educational guide for language learners detailing the key phonetic and vocabulary differences between the major regional accents of Vietnam: Northern (Hanoi), Central (Hue), and Southern (Saigon).",
    "coverUrl": "https://example.com/covers/vietnam_accents_guide.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnam_accents_guide.pdf",
    "categoryNames": [
      "Education"
    ]
  },
  {
    "title": "The Envoy to the Middle Kingdom",
    "translatedTitle": "Sứ Thần Đến Trung Hoa",
    "language": "VI",
    "author": "Su Gia Viet",
    "publisher": "Imperial Journeys",
    "publishYear": 2028,
    "description": "A historical adventure about a Vietnamese eunuch who is sent as a diplomatic envoy to the treacherous imperial court of Ming Dynasty China, where he must use his wits to survive and serve his country.",
    "coverUrl": "https://example.com/covers/envoy_to_middle_kingdom.jpg",
    "pdfUrl": "https://example.com/pdfs/envoy_to_middle_kingdom.pdf",
    "categoryNames": [
      "Historical", "Adventure", "Drama"
    ]
  },
  {
    "title": "The Child of the Bombings",
    "translatedTitle": "Đứa Trẻ Thời Bom Đạn",
    "language": "EN",
    "author": "Hanoi Survivor",
    "publisher": "War Diaries",
    "publishYear": 2025,
    "description": "A historical drama told from the innocent yet harrowing perspective of a young child living in Hanoi during the 1972 Christmas Bombings, capturing the fear, resilience, and sense of community during that time.",
    "coverUrl": "https://example.com/covers/child_of_bombings.jpg",
    "pdfUrl": "https://example.com/pdfs/child_of_bombings.pdf",
    "categoryNames": [
      "Historical", "Drama"
    ]
  },
  {
    "title": "The Leper Colony's Saint",
    "translatedTitle": "Vị Thánh Của Trại Phong",
    "language": "FR",
    "author": "Dr. Jean Moreau",
    "publisher": "Colonial Memoirs",
    "publishYear": 2026,
    "description": "A historical drama based on the life of a compassionate French doctor who dedicated his life to caring for patients in a remote and feared leper colony in the Central Highlands during the colonial era.",
    "coverUrl": "https://example.com/covers/leper_colony_saint.jpg",
    "pdfUrl": "https://example.com/pdfs/leper_colony_saint.pdf",
    "categoryNames": [
      "Historical", "Drama", "Biography"
    ]
  },
  {
    "title": "The Unfinished South",
    "translatedTitle": "Miền Nam Dang Dở",
    "language": "EN",
    "author": "Alternate Historian",
    "publisher": "Counterfactual Press",
    "publishYear": 2029,
    "description": "An alternate history novel where the Nguyễn lords fail in their 'Nam tiến' (Southward Expansion), leading to a powerful, independent Champa kingdom co-existing and competing with Đại Việt in the 18th century.",
    "coverUrl": "https://example.com/covers/unfinished_south.jpg",
    "pdfUrl": "https://example.com/pdfs/unfinished_south.pdf",
    "categoryNames": [
      "Historical"
    ]
  },
  {
    "title": "The Failed Scholar",
    "translatedTitle": "Ông Đồ Thi Trượt",
    "language": "VI",
    "author": "Nha Van Hoc",
    "publisher": "Imperial Dramas",
    "publishYear": 2027,
    "description": "A historical drama about a brilliant scholar who, after repeatedly failing the rigorous imperial examinations, must find a new path and purpose for his life in a society that only values academic success.",
    "coverUrl": "https://example.com/covers/failed_scholar.jpg",
    "pdfUrl": "https://example.com/pdfs/failed_scholar.pdf",
    "categoryNames": [
      "Historical", "Drama"
    ]
  },
  {
    "title": "The Spies of Tu Duc's Court",
    "translatedTitle": "Gián Điệp Triều Tự Đức",
    "language": "EN",
    "author": "The Court Historian",
    "publisher": "Imperial Intrigue",
    "publishYear": 2028,
    "description": "A historical thriller set in the court of Emperor Tự Đức, where a loyal mandarin must uncover a ring of French spies and Vietnamese collaborators who are plotting to overthrow the dynasty from within.",
    "coverUrl": "https://example.com/covers/spies_of_tuduc.jpg",
    "pdfUrl": "https://example.com/pdfs/spies_of_tuduc.pdf",
    "categoryNames": [
      "Historical", "Thriller"
    ]
  },
  {
    "title": "The Ronin of Annam",
    "translatedTitle": "Ronin Xứ An Nam",
    "language": "JP",
    "author": "Yamada Kenji",
    "publisher": "Samurai Histories",
    "publishYear": 2026,
    "description": "A historical action novel based on the true stories of Japanese soldiers who chose to remain in Vietnam after WWII, joining the Việt Minh and using their military expertise to fight against the French.",
    "coverUrl": "https://example.com/covers/ronin_of_annam.jpg",
    "pdfUrl": "https://example.com/pdfs/ronin_of_annam.pdf",
    "categoryNames": [
      "Historical", "Action", "Biography"
    ]
  },
  {
    "title": "The First Press",
    "translatedTitle": "Nhà In Đầu Tiên",
    "language": "VI",
    "author": "Nha Su Hoc",
    "publisher": "Educational Histories",
    "publishYear": 2025,
    "description": "A historical novel about the Jesuit missionaries who introduced the first printing press to Vietnam in the 17th century, and the revolutionary impact it had on the spread of the Quốc Ngữ script and Catholicism.",
    "coverUrl": "https://example.com/covers/first_press.jpg",
    "pdfUrl": "https://example.com/pdfs/first_press.pdf",
    "categoryNames": [
      "Historical", "Education"
    ]
  },
  {
    "title": "The School Lottery",
    "translatedTitle": "Xổ Số Trường Học",
    "language": "VI",
    "author": "Phu Huynh",
    "publisher": "Saigon Satires",
    "publishYear": 2026,
    "description": "A sharp, satirical comedy about the frantic and absurd lengths a group of parents in Ho Chi Minh City will go to secure a spot for their children in a prestigious public school, a process more competitive than any lottery.",
    "coverUrl": "https://example.com/covers/school_lottery.jpg",
    "pdfUrl": "https://example.com/pdfs/school_lottery.pdf",
    "categoryNames": [
      "Comedy", "Drama", "Education"
    ]
  },
  {
    "title": "Before the Altar",
    "translatedTitle": "Trước Bàn Thờ",
    "language": "EN",
    "author": "The Matchmaker",
    "publisher": "Modern Romance VN",
    "publishYear": 2027,
    "description": "A drama about a successful, single woman in her late 20s facing immense pressure from her family to get married before the Tet holiday. She decides to hire a fake fiancé, leading to unexpected romantic complications.",
    "coverUrl": "https://example.com/covers/before_the_altar.jpg",
    "pdfUrl": "https://example.com/pdfs/before_the_altar.pdf",
    "categoryNames": [
      "Drama", "Romance", "Comedy"
    ]
  },
  {
    "title": "The Midnight Racers of Saigon",
    "translatedTitle": "Những Tay Đua Nửa Đêm Sài Gòn",
    "language": "EN",
    "author": "Adrenaline Junkie",
    "publisher": "Urban Action",
    "publishYear": 2028,
    "description": "An action-thriller that delves into the dangerous, high-octane underworld of illegal street racing ('đi bão') in Ho Chi Minh City, following a young mechanic who gets drawn into a rivalry with a powerful racing syndicate.",
    "coverUrl": "https://example.com/covers/midnight_racers_saigon.jpg",
    "pdfUrl": "https://example.com/pdfs/midnight_racers_saigon.pdf",
    "categoryNames": [
      "Action", "Thriller"
    ]
  },
  {
    "title": "Overnight Shift at Circle K",
    "translatedTitle": "Ca Đêm Ở Circle K",
    "language": "VI",
    "author": "Nhan Vien Ban Hang",
    "publisher": "Slice of Life Press",
    "publishYear": 2025,
    "description": "A philosophical and contemplative drama that follows a lone convenience store worker through a single overnight shift, exploring the lives of the strange, lonely, and wonderful characters who visit in the dead of night.",
    "coverUrl": "https://example.com/covers/overnight_shift_circle_k.jpg",
    "pdfUrl": "https://example.com/pdfs/overnight_shift_circle_k.pdf",
    "categoryNames": [
      "Drama", "Philosophy"
    ]
  },
  {
    "title": "The Beauty Contest",
    "translatedTitle": "Cuộc Thi Sắc Đẹp",
    "language": "EN",
    "author": "The Pageant Mom",
    "publisher": "Social Dramas",
    "publishYear": 2026,
    "description": "A critical drama that explores the high-pressure, often toxic world of child beauty pageants in Vietnam, following a young girl and her ambitious mother as they navigate the path to a coveted crown.",
    "coverUrl": "https://example.com/covers/beauty_contest.jpg",
    "pdfUrl": "https://example.com/pdfs/beauty_contest.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Park at Dawn",
    "translatedTitle": "Công Viên Lúc Bình Minh",
    "language": "VI",
    "author": "Nguoi Cao Tuoi",
    "publisher": "Gentle Stories",
    "publishYear": 2027,
    "description": "A heartwarming drama about a disparate group of elderly people who form an unlikely community and support network through their daily 5 AM exercises in a public park in Hanoi.",
    "coverUrl": "https://example.com/covers/park_at_dawn.jpg",
    "pdfUrl": "https://example.com/pdfs/park_at_dawn.pdf",
    "categoryNames": [
      "Drama"
    ]
  },
  {
    "title": "The Time Weaver's Love",
    "translatedTitle": "Tình Yêu Của Người Dệt Thời Gian",
    "language": "EN",
    "author": "The Chronologist",
    "publisher": "Quantum Romance",
    "publishYear": 2030,
    "description": "A sci-fi historical romance where a historian invents a time-viewing device to observe the Trung Sisters' rebellion. She finds herself falling in love with the fierce warrior Trung Nhi across a two-thousand-year divide.",
    "coverUrl": "https://example.com/covers/time_weaver_love.jpg",
    "pdfUrl": "https://example.com/pdfs/time_weaver_love.pdf",
    "categoryNames": [
      "Science Fiction", "Historical", "Romance"
    ]
  },
  {
    "title": "The Pho Plot",
    "translatedTitle": "Âm Mưu Phở",
    "language": "EN",
    "author": "The Bumbling Chef",
    "publisher": "Culinary Capers",
    "publishYear": 2028,
    "description": "A comedy-crime novel where a clumsy food blogger accidentally films a gangland transaction in the background of his pho review video. He is forced to hide from the mob by becoming a contestant on Vietnam's most popular TV cooking show.",
    "coverUrl": "https://example.com/covers/pho_plot.jpg",
    "pdfUrl": "https://example.com/pdfs/pho_plot.pdf",
    "categoryNames": [
      "Comedy", "Crime", "Cooking"
    ]
  },
  {
    "title": "The Living Cave",
    "translatedTitle": "Hang Động Sống",
    "language": "EN",
    "author": "The Geologist",
    "publisher": "Eco-Horror",
    "publishYear": 2029,
    "description": "A team of geologists exploring a newly discovered cave system in Quang Binh realize the entire cave is a single, massive, living organism. They must use their scientific knowledge to escape before the cave digests them.",
    "coverUrl": "https://example.com/covers/living_cave.jpg",
    "pdfUrl": "https://example.com/pdfs/living_cave.pdf",
    "categoryNames": [
      "Horror", "Adventure", "Education"
    ]
  },
  {
    "title": "The River God's Trial",
    "translatedTitle": "Phiên Tòa Của Hà Bá",
    "language": "VI",
    "author": "Luat Su Thien Dinh",
    "publisher": "Celestial Court",
    "publishYear": 2031,
    "description": "A fantasy legal drama where a brilliant lawyer is chosen to ascend to the Celestial Realm to defend a local River God (Hà Bá) who stands accused by the God of Thunder of causing a catastrophic flood.",
    "coverUrl": "https://example.com/covers/river_god_trial.jpg",
    "pdfUrl": "https://example.com/pdfs/river_god_trial.pdf",
    "categoryNames": [
      "Fantasy", "Drama"
    ]
  },
  {
    "title": "The Defector's Run",
    "translatedTitle": "Chuyến Tẩu Thoát Của Kẻ Đào Tẩu",
    "language": "EN",
    "author": "The Operator",
    "publisher": "Borderland Thrillers",
    "publishYear": 2027,
    "description": "A disgraced special agent is given one last chance: escort a high-value political defector through the lawless, jungle-covered borderlands between Vietnam and Cambodia, hunted by assassins from both sides.",
    "coverUrl": "https://example.com/covers/defector_run.jpg",
    "pdfUrl": "https://example.com/pdfs/defector_run.pdf",
    "categoryNames": [
      "Action", "Thriller"
    ]
  },
  {
    "title": "The Train to Lao Cai",
    "translatedTitle": "Chuyến Tàu Lên Lào Cai",
    "language": "EN",
    "author": "Agatha Christie",
    "publisher": "Golden Age Mysteries",
    "publishYear": 2026,
    "description": "A travel romance mystery where two strangers meet on the overnight train from Hanoi. They fall for each other while trying to solve the theft of a priceless heirloom from another passenger's locked cabin.",
    "coverUrl": "https://example.com/covers/train_to_laocai.jpg",
    "pdfUrl": "https://example.com/pdfs/train_to_laocai.pdf",
    "categoryNames": [
      "Romance", "Mystery", "Travel"
    ]
  },
  {
    "title": "The Master of Vovinam",
    "translatedTitle": "Võ Sư Vovinam",
    "language": "VI",
    "author": "Vo Thuat Viet",
    "publisher": "Martial Arts Biographies",
    "publishYear": 2025,
    "description": "The action-packed biography of a legendary Vovinam grandmaster, from his early training and philosophical development to his incredible feats in national and international martial arts competitions.",
    "coverUrl": "https://example.com/covers/master_of_vovinam.jpg",
    "pdfUrl": "https://example.com/pdfs/master_of_vovinam.pdf",
    "categoryNames": [
      "Biography", "Action"
    ]
  },
  {
    "title": "The Quest for Happiness",
    "translatedTitle": "Hành Trình Đi Tìm Hạnh Phúc",
    "language": "VI",
    "author": "Nha Triet Hoc Nhi",
    "publisher": "Little Philosophers",
    "publishYear": 2027,
    "description": "A philosophical children's adventure where a young girl named An embarks on a journey, asking various animals, mythical creatures, and spirits of the land what 'happiness' truly means.",
    "coverUrl": "https://example.com/covers/quest_for_happiness.jpg",
    "pdfUrl": "https://example.com/pdfs/quest_for_happiness.pdf",
    "categoryNames": [
      "Philosophy", "Children", "Adventure", "Fantasy"
    ]
  },
  {
    "title": "Replicant Emperor",
    "translatedTitle": "Hoàng Đế Người Nhân Tạo",
    "language": "EN",
    "author": "Cyber-Noir",
    "publisher": "Future Saigon Press",
    "publishYear": 2049,
    "description": "A crime sci-fi noir where a burnt-out detective in a cyberpunk Ho Chi Minh City hunts a rogue replicant who has downloaded the memories of Emperor Tự Đức and now believes it is the rightful ruler of Vietnam.",
    "coverUrl": "https://example.com/covers/replicant_emperor.jpg",
    "pdfUrl": "https://example.com/pdfs/replicant_emperor.pdf",
    "categoryNames": [
      "Crime", "Science Fiction"
    ]
  },
  {
    "title": "The Mountain's Ghost",
    "translatedTitle": "Bóng Ma Trường Sơn",
    "language": "VI",
    "author": "Linh Chien",
    "publisher": "War Horror",
    "publishYear": 2026,
    "description": "A historical survival horror where a platoon of North Vietnamese soldiers, isolated in the dense Truong Son mountains, are stalked by a terrifying, ancient jungle entity that is neither animal nor spirit.",
    "coverUrl": "https://example.com/covers/mountain_ghost.jpg",
    "pdfUrl": "https://example.com/pdfs/mountain_ghost.pdf",
    "categoryNames": [
      "Historical", "Horror"
    ]
  },
  {
    "title": "The Geology of Ha Long Bay",
    "translatedTitle": "Địa Chất Học Vịnh Hạ Long",
    "language": "EN",
    "author": "Vietnam Institute of Geosciences",
    "publisher": "Natural Wonders Press",
    "publishYear": 2024,
    "description": "An educational non-fiction guide that explains the 500-million-year geological history of Ha Long Bay, detailing the formation of its iconic limestone karsts, caves, and arches.",
    "coverUrl": "https://example.com/covers/halong_geology.jpg",
    "pdfUrl": "https://example.com/pdfs/halong_geology.pdf",
    "categoryNames": [
      "Education", "Travel"
    ]
  },
  {
    "title": "The Ho Chi Minh City Metro",
    "translatedTitle": "Tàu Điện Ngầm Thành Phố Hồ Chí Minh",
    "language": "EN",
    "author": "Urban Development Weekly",
    "publisher": "Infrastructure Histories",
    "publishYear": 2025,
    "description": "A detailed non-fiction account of the monumental, decade-spanning project to build Ho Chi Minh City's first metro line, covering the engineering challenges, political hurdles, and social impact.",
    "coverUrl": "https://example.com/covers/hcmc_metro_history.jpg",
    "pdfUrl": "https://example.com/pdfs/hcmc_metro_history.pdf",
    "categoryNames": [
      "Education", "Historical"
    ]
  },
  {
    "title": "The Primates of Vietnam",
    "translatedTitle": "Các Loài Linh Trưởng Của Việt Nam",
    "language": "EN",
    "author": "The Conservationist",
    "publisher": "Wildlife Preservation",
    "publishYear": 2024,
    "description": "A non-fiction guide to the incredibly diverse but critically endangered primate species of Vietnam, from the Delacour's langur to the grey-shanked douc, highlighting conservation efforts.",
    "coverUrl": "https://example.com/covers/primates_of_vietnam.jpg",
    "pdfUrl": "https://example.com/pdfs/primates_of_vietnam.pdf",
    "categoryNames": [
      "Education"
    ]
  },
  {
    "title": "The 1975 Spring Offensive",
    "translatedTitle": "Chiến Dịch Mùa Xuân 1975",
    "language": "VI",
    "author": "Dai Tuong",
    "publisher": "Military Victory Press",
    "publishYear": 2005,
    "description": "A comprehensive military history of the final, decisive campaign of the Vietnam War, detailing the strategy, major battles, and rapid advance that led to the fall of Saigon.",
    "coverUrl": "https://example.com/covers/spring_offensive_1975.jpg",
    "pdfUrl": "https://example.com/pdfs/spring_offensive_1975.pdf",
    "categoryNames": [
      "Historical"
    ]
  },
  {
    "title": "The Wedding Planner's Guide to Vietnam",
    "translatedTitle": "Sổ Tay Đám Cưới Việt Nam",
    "language": "EN",
    "author": "The Wedding Planner",
    "publisher": "Cultural Guides",
    "publishYear": 2025,
    "description": "A self-help and educational guide to the complex traditions, rituals, and etiquette of a traditional Vietnamese wedding, from the engagement ceremony (Lễ Ăn Hỏi) to the main feast.",
    "coverUrl": "https://example.com/covers/vietnam_wedding_guide.jpg",
    "pdfUrl": "https://example.com/pdfs/vietnam_wedding_guide.pdf",
    "categoryNames": [
      "Education", "Self-Help"
    ]
  },
  {
    "title": "Vietnam's Green Shift",
    "translatedTitle": "Bước Chuyển Xanh Của Việt Nam",
    "language": "EN",
    "author": "The Economist",
    "publisher": "Renewable Energy Press",
    "publishYear": 2026,
    "description": "A non-fiction study of Vietnam's rapid and ambitious transition towards renewable energy, examining the development of its solar and wind power industries and the challenges that lie ahead.",
    "coverUrl": "https://example.com/covers/green_shift.jpg",
    "pdfUrl": "https://example.com/pdfs/green_shift.pdf",
    "categoryNames": [
      "Education"
    ]
  },
  {
    "title": "Yersin's Mountain",
    "translatedTitle": "Ngọn Núi Của Yersin",
    "language": "FR",
    "author": "Patrick Deville",
    "publisher": "French Biographies",
    "publishYear": 2014,
    "description": "A biography of Alexandre Yersin, the brilliant Swiss-French physician and bacteriologist who co-discovered the bubonic plague bacillus and is credited with founding the city of Da Lat.",
    "coverUrl": "https://example.com/covers/yersins_mountain.jpg",
    "pdfUrl": "https://example.com/pdfs/yersins_mountain.pdf",
    "categoryNames": [
      "Biography", "Historical"
    ]
  },
  {
    "title": "The Lottery Dream",
    "translatedTitle": "Giấc Mơ Xổ Số",
    "language": "VI",
    "author": "Nguoi Ban Ve So",
    "publisher": "Social Histories",
    "publishYear": 2025,
    "description": "A non-fiction book exploring the history, economics, and deep-seated cultural phenomenon of the lottery in Vietnam, and the dreams it represents for millions of ordinary people.",
    "coverUrl": "https://example.com/covers/lottery_dream.jpg",
    "pdfUrl": "https://example.com/pdfs/lottery_dream.pdf",
    "categoryNames": [
      "Historical", "Education", "Drama"
    ]
  },
  {
    "title": "The Music of Vietnam",
    "translatedTitle": "Âm Nhạc Việt Nam",
    "language": "EN",
    "author": "Ethnomusicology Today",
    "publisher": "World Music Press",
    "publishYear": 2024,
    "description": "A guide to the traditional musical instruments of Vietnam, from the monochordal Đàn bầu to the bamboo xylophone T'rưng, explaining their history, sound, and role in folk and court music.",
    "coverUrl": "https://example.com/covers/music_of_vietnam.jpg",
    "pdfUrl": "https://example.com/pdfs/music_of_vietnam.pdf",
    "categoryNames": [
      "Education"
    ]
  },
  {
    "title": "Vertical Saigon",
    "translatedTitle": "Sài Gòn Thẳng Đứng",
    "language": "EN",
    "author": "The Urban Futurist",
    "publisher": "Arcology Sci-Fi",
    "publishYear": 2077,
    "description": "A science fiction novel set in a future where rising sea levels have forced Ho Chi Minh City to become a vertical city of towering arcologies connected by sky-bridges, exploring the social stratification that results.",
    "coverUrl": "https://example.com/covers/vertical_saigon.jpg",
    "pdfUrl": "https://example.com/pdfs/vertical_saigon.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "When the Dragons Wake",
    "translatedTitle": "Khi Rồng Thức Giấc",
    "language": "VI",
    "author": "Nguoi Ke Chuyen",
    "publisher": "Epic Fantasy VN",
    "publishYear": 2029,
    "description": "A high-fantasy novel based on the myth that the thousands of islands in Ha Long Bay are the backs of a great family of sleeping dragons. When a new threat emerges, a young fisherman must find a way to wake them.",
    "coverUrl": "https://example.com/covers/when_dragons_wake.jpg",
    "pdfUrl": "https://example.com/pdfs/when_dragons_wake.pdf",
    "categoryNames": [
      "Fantasy", "Adventure"
    ]
  },
  {
    "title": "Asteroid Miner Viet",
    "translatedTitle": "Thợ Mỏ Thiên Thạch Việt",
    "language": "EN",
    "author": "Space Age Stories",
    "publisher": "Hard Sci-Fi Press",
    "publishYear": 2100,
    "description": "A hard science fiction novel set in a future where Vietnam has become a dominant power in asteroid mining, following a veteran miner on a dangerous mission in the asteroid belt.",
    "coverUrl": "https://example.com/covers/asteroid_miner_viet.jpg",
    "pdfUrl": "https://example.com/pdfs/asteroid_miner_viet.pdf",
    "categoryNames": [
      "Science Fiction", "Action"
    ]
  },
  {
    "title": "Below the Old Quarter",
    "translatedTitle": "Bên Dưới Phố Cổ",
    "language": "EN",
    "author": "Urban Fantasy",
    "publisher": "Hidden Worlds Press",
    "publishYear": 2028,
    "description": "An urban fantasy where a young woman discovers a secret, magical city populated by Vietnamese mythical creatures and spirits that exists in the ancient tunnels and sewers directly beneath Hanoi's Old Quarter.",
    "coverUrl": "https://example.com/covers/below_old_quarter.jpg",
    "pdfUrl": "https://example.com/pdfs/below_old_quarter.pdf",
    "categoryNames": [
      "Fantasy", "Adventure"
    ]
  },
  {
    "title": "Bridge Town",
    "translatedTitle": "Thị Trấn Cây Cầu",
    "language": "EN",
    "author": "The Survivor",
    "publisher": "Post-Apocalyptic",
    "publishYear": 2055,
    "description": "A post-apocalyptic science fiction adventure where survivors of a great flood live in small, precarious communities built on the ruins of Vietnam's great bridges, like the Long Bien and Dragon Bridge.",
    "coverUrl": "https://example.com/covers/bridge_town.jpg",
    "pdfUrl": "https://example.com/pdfs/bridge_town.pdf",
    "categoryNames": [
      "Science Fiction", "Adventure"
    ]
  },
  {
    "title": "The Ancestor AI",
    "translatedTitle": "AI Tổ Tiên",
    "language": "VI",
    "author": "Ky Uc So",
    "publisher": "Digital Soul",
    "publishYear": 2034,
    "description": "A science fiction drama where a new AI allows people to have conversations with startlingly accurate simulations of their ancestors. A family is torn apart when the AI reveals a dark secret from the past.",
    "coverUrl": "https://example.com/covers/ancestor_ai.jpg",
    "pdfUrl": "https://example.com/pdfs/ancestor_ai.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  },
  {
    "title": "The Mandate of Heaven",
    "translatedTitle": "Thiên Mệnh",
    "language": "EN",
    "author": "The Celestial Chronicler",
    "publisher": "Political Fantasy",
    "publishYear": 2029,
    "description": "A high-fantasy epic where the 'Mandate of Heaven' is a tangible, magical force. When an aging emperor weakens, factions of mandarins, generals, and mystics plot to steal the Mandate and seize the throne for themselves.",
    "coverUrl": "https://example.com/covers/mandate_of_heaven.jpg",
    "pdfUrl": "https://example.com/pdfs/mandate_of_heaven.pdf",
    "categoryNames": [
      "Fantasy", "Action"
    ]
  },
  {
    "title": "Rice Blight",
    "translatedTitle": "Bệnh Bạc Lá Lúa",
    "language": "EN",
    "author": "Bio-Horror Press",
    "publisher": "Eco-Frights",
    "publishYear": 2028,
    "description": "A sci-fi horror thriller where a genetically modified strain of rice, designed to end world hunger, becomes sentient and parasitic, attacking humans and threatening to overrun the entire Mekong Delta.",
    "coverUrl": "https://example.com/covers/rice_blight.jpg",
    "pdfUrl": "https://example.com/pdfs/rice_blight.pdf",
    "categoryNames": [
      "Science Fiction", "Horror"
    ]
  },
  {
    "title": "The New World",
    "translatedTitle": "Tân Thế Giới",
    "language": "VI",
    "author": "Nguoi Du Hanh",
    "publisher": "Generation Ship Sagas",
    "publishYear": 2250,
    "description": "Generations after leaving Earth, a Vietnamese generation ship finally arrives at its destination planet. The young leaders must now deal with the immense challenge of building a new society while grappling with factions who want to either preserve or abandon the old ways.",
    "coverUrl": "https://example.com/covers/the_new_world.jpg",
    "pdfUrl": "https://example.com/pdfs/the_new_world.pdf",
    "categoryNames": [
      "Science Fiction", "Drama"
    ]
  }
]
const request = pa => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pa),
});
async function postData() {
  console.log(books.length);
  // Run 1 lần
  for (const category of categories) {
    await fetch('http://localhost:8080/api/category', request(category));
  }

  for (const book of books) {
    await fetch('http://localhost:8080/api/book', request(book));
  }
}

postData();
