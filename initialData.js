const categories = [
  { name: "Hành động" },
  { name: "Phép thuật" },
  { name: "Phiêu lưu" },
  { name: "Lãng mạn" },
  { name: "Kinh điển" },
  { name: "Bí ẩn" },
  { name: "Giật gân" },
  { name: "Drama" },
  { name: "Kinh dị" },
  { name: "Hiện đại" },
  { name: "Kỳ ảo" },
  { name: "Khoa học viễn tưởng" },
  { name: "Lịch sử" },
  { name: "Lịch sử Việt Nam" },
  { name: "Chính kịch" },
  { name: "Hài kịch" },
  { name: "Tâm lý học" },
  { name: "Tội phạm" },
  { name: "Tiểu sử" },
  { name: "Phát triển bản thân" },
  { name: "Triết học" },
  { name: "Thơ ca" },
  { name: "Thiếu nhi" },
  { name: "Giáo dục" },
  { name: "Du lịch" },
  { name: "Nấu ăn" },
  { name: "Văn học nước ngoài" },
];

const books = [
  {
    title: "Harry Potter và Hòn đá Phù thủy",
    translatedTitle: "Harry Potter and the Philosopher's Stone",
    language: "VI",
    author: "J.K. Rowling",
    publisher: "",
    publishYear: 1997,
    description:
      "Harry Potter, một cậu bé mồ côi, phát hiện ra mình là một phù thủy vào sinh nhật lần thứ 11 và được mời nhập học tại Trường Phù thủy và Pháp sư Hogwarts. Tại đây, cậu kết bạn, học phép thuật và khám phá ra sự thật về cái chết của cha mẹ mình cũng như đối mặt với kẻ thù nguy hiểm nhất thế giới phù thủy, Chúa tể Voldemort.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_hon_da_phu_thuy.jpg",
    pdfUrl: "",
    categoryNames: ["Phép thuật", "Phiêu lưu", "Kỳ ảo", "Thiếu nhi"],
  },
  {
    title: "Harry Potter và Phòng chứa Bí mật",
    translatedTitle: "Harry Potter and the Chamber of Secrets",
    language: "VI",
    author: "J.K. Rowling",
    publisher: "",
    publishYear: 1998,
    description:
      "Trong năm học thứ hai tại Hogwarts, những cuộc tấn công bí ẩn bắt đầu xảy ra, khiến các học sinh bị hóa đá. Harry và những người bạn của mình phải khám phá ra bí mật về Phòng chứa Bí mật và con quái vật ẩn náu bên trong trước khi quá muộn.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_phong_chua_bi_mat.jpg",
    pdfUrl: "",
    categoryNames: ["Phép thuật", "Phiêu lưu", "Kỳ ảo", "Thiếu nhi"],
  },
  {
    title: "Harry Potter và Tên tù nhân ngục Azkaban",
    translatedTitle: "Harry Potter and the Prisoner of Azkaban",
    language: "VI",
    author: "J.K. Rowling",
    publisher: "",
    publishYear: 1999,
    description:
      "Năm thứ ba của Harry tại Hogwarts bị bao trùm bởi tin tức về một tên tù nhân nguy hiểm, Sirius Black, đã trốn thoát khỏi nhà tù Azkaban và được cho là đang săn lùng Harry. Cậu phải đối mặt với những giám ngục đáng sợ và khám phá ra sự thật gây sốc về quá khứ của gia đình mình.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_ten_tu_nhan_nguc_azkaban.jpg",
    pdfUrl: "",
    categoryNames: ["Phép thuật", "Phiêu lưu", "Kỳ ảo", "Thiếu nhi"],
  },
  {
    title: "Harry Potter và Chiếc cốc lửa",
    translatedTitle: "Harry Potter and the Goblet of Fire",
    language: "VI",
    author: "J.K. Rowling",
    publisher: "",
    publishYear: 2000,
    description:
      "Hogwarts đăng cai tổ chức cuộc thi Tam Pháp Thuật, một cuộc thi phép thuật đầy nguy hiểm giữa ba trường pháp thuật lớn nhất châu Âu. Dù chưa đủ tuổi, Harry bất ngờ được Chiếc cốc lửa chọn làm quán quân thứ tư, buộc cậu phải đối mặt với những thử thách chết người và chứng kiến sự trở lại của Chúa tể Voldemort.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_chiec_coc_lua.jpg",
    pdfUrl: "",
    categoryNames: ["Phép thuật", "Phiêu lưu", "Kỳ ảo", "Thiếu nhi"],
  },
  {
    title: "Harry Potter và Hội Phượng hoàng",
    translatedTitle: "Harry Potter and the Order of the Phoenix",
    language: "VI",
    author: "J.K. Rowling",
    publisher: "",
    publishYear: 2003,
    description:
      "Khi Bộ Pháp thuật từ chối tin vào sự trở lại của Voldemort, Harry và các bạn phải bí mật thành lập 'Đoàn quân Dumbledore' để tự học cách phòng chống Nghệ thuật Hắc ám. Cậu phải đối mặt với sự kiểm soát hà khắc tại Hogwarts và nhận ra tầm quan trọng của tình bạn và lòng trung thành trong cuộc chiến chống lại cái ác.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_hoi_phuong_hoang.jpg",
    pdfUrl: "",
    categoryNames: ["Phép thuật", "Phiêu lưu", "Kỳ ảo", "Thiếu nhi"],
  },
  {
    title: "Harry Potter và Hoàng tử lai",
    translatedTitle: "Harry Potter and the Half-Blood Prince",
    language: "VI",
    author: "J.K. Rowling",
    publisher: "",
    publishYear: 2005,
    description:
      "Trong năm học thứ sáu, Harry khám phá quá khứ đen tối của Voldemort thông qua những ký ức của thầy Dumbledore để tìm ra chìa khóa tiêu diệt hắn. Cùng lúc đó, cậu tìm thấy một cuốn sách Độc dược cũ thuộc về một người tự xưng là 'Hoàng tử lai', giúp cậu đạt được thành công chưa từng có nhưng cũng dẫn cậu đến những bí mật nguy hiểm.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_hoang_tu_lai.jpg",
    pdfUrl: "",
    categoryNames: ["Phép thuật", "Phiêu lưu", "Kỳ ảo", "Thiếu nhi"],
  },
  {
    title: "Harry Potter và Bảo bối Tử thần",
    translatedTitle: "Harry Potter and the Deathly Hallows",
    language: "VI",
    author: "J.K. Rowling",
    publisher: "",
    publishYear: 2007,
    description:
      "Harry, Ron và Hermione bắt đầu cuộc hành trình đầy nguy hiểm để tìm và phá hủy các Trường sinh linh giá của Voldemort. Không còn sự bảo vệ của các giáo sư tại Hogwarts, bộ ba phải dựa vào nhau hơn bao giờ hết để hoàn thành nhiệm vụ và đối mặt với trận chiến cuối cùng định đoạt số phận của thế giới phù thủy.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_bao_boi_tu_than.jpg",
    pdfUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_potter_va_bao_boi_tu_than.pdf",
    categoryNames: ["Phép thuật", "Phiêu lưu", "Kỳ ảo", "Thiếu nhi"],
  },
  {
    title: "Mắt biếc",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publisher: "",
    publishYear: 1990,
    description:
      "Câu chuyện xoay quanh mối tình đơn phương của Ngạn dành cho Hà Lan, cô bạn từ thuở nhỏ có đôi mắt biếc hút hồn. Tình yêu của Ngạn lớn dần theo năm tháng, trải qua bao biến cố của cuộc đời, từ làng quê Đo Đo yên bình đến chốn thành thị phồn hoa. Dù Hà Lan sa ngã và có con với người khác, tình yêu Ngạn dành cho cô vẫn không thay đổi, một tình yêu chung thủy, day dứt và đầy ám ảnh.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Mat_biec.jpg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Drama", "Thiếu nhi"],
  },
  {
    title: "Cho tôi xin một vé đi tuổi thơ",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 2008,
    description:
      'Tác phẩm là một chuyến tàu quay ngược thời gian, đưa độc giả trở về với thế giới tuổi thơ trong trẻo và đầy ắp những trò nghịch ngợm. Qua lời kể của cu Mùi, câu chuyện về nhóm bạn gồm nó, Tí sún, Tủn và Hải cò hiện lên sống động với những suy nghĩ ngô nghê, những trò chơi tự tạo và cả những triết lý "người lớn" rất riêng của con trẻ.',
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Cho_toi_xin_mot_ve_di_tuoi_tho.jpg",
    pdfUrl: "",
    categoryNames: ["Hài kịch", "Thiếu nhi", "Phiêu lưu"],
  },
  {
    title: "Tôi thấy hoa vàng trên cỏ xanh",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 2010,
    description:
      "Câu chuyện kể về cuộc sống ở một làng quê nghèo ven biển miền Trung vào cuối những năm 1980, xoay quanh hai anh em Thiều và Tường. Tác phẩm là một bức tranh dung dị về tuổi thơ với những rung động đầu đời, tình anh em, những đố kỵ, hối hận và cả những câu chuyện cổ tích diệu kỳ giữa đời thường.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Toi_thay_hoa_vang_tren_co_xanh.jpg",
    pdfUrl: "",
    categoryNames: ["Drama", "Thiếu nhi", "Lãng mạn"],
  },
  {
    title: "Cô gái đến từ hôm qua",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 1989,
    description:
      "Truyện kể về anh chàng Thư, một nam sinh mơ mộng, đang tìm cách chinh phục cô bạn cùng lớp xinh đẹp Việt An. Song song với câu chuyện tình yêu học trò hiện tại là những ký ức ngọt ngào về cô bé Tiểu Li, người bạn hàng xóm thuở ấu thơ mà Thư hay bắt nạt. Một sự thật bất ngờ được hé lộ, kết nối quá khứ và hiện tại một cách đầy thú vị.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Co_gai_den_tu_hom_qua.jpg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Thiếu nhi", "Hài kịch"],
  },
  {
    title: "Chúc một ngày tốt lành",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 2014,
    description:
      'Một câu chuyện độc đáo và hài hước về cuộc sống của người và vật ở một làng quê. Mọi chuyện bắt đầu khi gia đình cậu bé Cu quyết định "dạy ngoại ngữ" cho đàn heo. Từ đó, những tình huống dở khóc dở cười liên tiếp xảy ra, mang đến cho độc giả những tiếng cười sảng khoái và cả những suy ngẫm nhẹ nhàng về sự khác biệt trong cách nhìn của trẻ con và người lớn.',
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Chuc_mot_ngay_tot_lanh.jpg",
    pdfUrl: "",
    categoryNames: ["Hài kịch", "Thiếu nhi", "Kỳ ảo"],
  },
  {
    title: "Có hai con mèo ngồi bên cửa sổ",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 2012,
    description:
      "Tác phẩm là một câu chuyện đồng thoại đáng yêu về tình bạn kỳ lạ giữa mèo Gấu và chuột Tí Hon, hai loài vốn là kẻ thù. Bên cạnh đó là câu chuyện tình lãng mạn nhưng cũng đầy trắc trở của mèo Gấu với nàng mèo tam thể Áo Hoa. Cuốn sách gửi gắm thông điệp rằng tình yêu thương có thể xóa nhòa mọi khoảng cách và tạo nên những điều phi thường.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Co_hai_con_meo_ngoi_ben_cua_so.jpg",
    pdfUrl: "",
    categoryNames: ["Kỳ ảo", "Thiếu nhi", "Lãng mạn"],
  },
  {
    title: "Ngồi khóc trên cây",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 2013,
    description:
      "Câu chuyện tình yêu trong sáng nhưng đầy trắc trở giữa Đông, một chàng sinh viên thành thị về quê nghỉ hè, và Rùa, cô bé mồ côi hoang dã, có tâm hồn thuần khiết và tình yêu mãnh liệt với thiên nhiên. Tác phẩm lấy bối cảnh làng quê thơ mộng, mang đến cho người đọc những cảm xúc sâu lắng về tình yêu, sự sống và niềm hy vọng.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Ngoi_khoc_tren_cay.jpeg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Drama", "Thiếu nhi"],
  },
  {
    title: "Đi qua hoa cúc",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 1995,
    description:
      "Một câu chuyện buồn man mác về những rung động đầu đời và sự nuối tiếc. Cậu học trò Trường lên thành phố học, bỏ lại sau lưng cô bé hàng xóm tên Diệp cùng lời hứa sẽ trở về. Dòng đời và những cám dỗ nơi thành thị đã khiến cậu lãng quên lời hứa năm xưa, để rồi khi quay lại, tất cả chỉ còn là sự lỡ làng và day dứt.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Di_qua_hoa_cuc.jpg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Drama", "Thiếu nhi"],
  },
  {
    title: "Bong bóng lên trời",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 1991,
    description:
      "Câu chuyện cảm động về tình bạn giữa Thường, cậu bé bán kẹo kéo, và Tài Khôn, cô bé bán bong bóng. Hai đứa trẻ với hoàn cảnh khó khăn đã phải sớm bươn chải mưu sinh. Dù cuộc sống vất vả, chúng vẫn giữ được sự trong trẻo, lạc quan và những ước mơ hồn nhiên, đẹp đẽ như những chùm bong bóng bay cao.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Bong_bong_len_troi.jpg",
    pdfUrl: "",
    categoryNames: ["Drama", "Thiếu nhi", "Phiêu lưu"],
  },
  {
    title: "Ngày xưa có một chuyện tình",
    translatedTitle: "",
    language: "VI",
    author: "Nguyễn Nhật Ánh",
    publishYear: 2016,
    description:
      "Câu chuyện xoay quanh mối tình tay ba đầy trắc trở giữa ba người bạn thân từ thuở nhỏ: Vinh, Phúc và Miền. Vinh thầm yêu Miền, nhưng Miền lại dành tình cảm cho Phúc. Khi biến cố xảy ra, Miền mang thai với Phúc và bị bỏ rơi, Vinh đã đứng ra nhận lấy trách nhiệm, cưới Miền và làm cha của đứa bé. Tác phẩm là một câu chuyện sâu sắc về tình yêu, tình bạn, sự hy sinh và quá trình trưởng thành đầy day dứt.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Ngay_xua_co_mot_chuyen_tinh.jpg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Drama", "Thiếu nhi"],
  },
  {
    title: "Chuyện con mèo dạy hải âu bay",
    translatedTitle: "The Story of a Seagull and the Cat Who Taught Her to Fly",
    language: "VI",
    author: "Luis Sepúlveda",
    publisher: "",
    publishYear: 1996,
    description:
      "Cô hải âu Kengah, trong lúc hấp hối vì vướng phải váng dầu, đã rơi xuống ban công nhà chú mèo mun Zorba và đẻ ra quả trứng cuối cùng. Trước khi chết, cô bắt Zorba hứa ba điều: không ăn quả trứng, chăm sóc cho đến khi trứng nở, và dạy cho hải âu con bay. Zorba, cùng với những người bạn mèo ở bến cảng Hamburg, đã cùng nhau thực hiện lời hứa danh dự, nuôi nấng cô hải âu nhỏ Lucky và đối mặt với thử thách khó khăn nhất: dạy cho một con chim cách để bay.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Chuyen_con_meo_day_hai_au_bay.jpeg",
    pdfUrl: "",
    categoryNames: ["Thiếu nhi", "Kỳ ảo", "Phiêu lưu"],
  },
  {
    title: "Dế Mèn phiêu lưu ký",
    translatedTitle: "Diary of a Cricket",
    language: "VI",
    author: "Tô Hoài",
    publisher: "",
    publishYear: 1941,
    description:
      "Tác phẩm kể về cuộc hành trình đầy phiêu lưu của chú Dế Mèn. Ban đầu, Mèn là một chàng dế trẻ tuổi kiêu căng, hung hăng, đã gây ra cái chết oan uổng cho Dế Choắt. Sau bài học đắt giá đó, Mèn bắt đầu chuyến du ngoạn của mình, đi qua nhiều vùng đất, gặp gỡ nhiều loài vật và trải qua vô số thử thách. Qua mỗi chặng đường, Dế Mèn dần trưởng thành, học được nhiều bài học về tình bạn, lòng dũng cảm và ý nghĩa của cuộc sống.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/De_men_phieu_luu_ky.jpg",
    pdfUrl: "",
    categoryNames: ["Thiếu nhi", "Phiêu lưu", "Kỳ ảo"],
  },
  {
    title: "Việt Nam Sử Lược",
    translatedTitle: "",
    language: "VI",
    author: "Trần Trọng Kim",
    publisher: "",
    publishYear: 1920,
    description:
      "Là bộ thông sử viết bằng chữ quốc ngữ đầu tiên của Việt Nam, được soạn theo phương pháp hiện đại, thoát ly khỏi lối chép sử biên niên truyền thống. Sách trình bày các diễn biến lịch sử thành một câu chuyện liên tục, hấp dẫn, chú trọng đến mối liên hệ nhân quả và các khía cạnh đời sống xã hội, phong tục, tín ngưỡng của người dân. Đây được coi là một tác phẩm kinh điển, súc tích, dễ hiểu và khách quan.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Viet_Nam_su_luoc.jpg",
    pdfUrl: "",
    categoryNames: ["Lịch sử", "Lịch sử Việt Nam"],
  },
  {
    title: "Đại Việt Sử Ký Toàn Thư",
    translatedTitle: "",
    language: "VI",
    author: "Nhiều tác giả",
    publisher: "",
    publishYear: 1697,
    description:
      "Là bộ quốc sử danh tiếng và là một di sản quý báu của dân tộc Việt Nam. Đây được coi là bộ sử cái, có giá trị nhiều mặt, gắn liền với tên tuổi của các nhà sử học nổi tiếng như Lê Văn Hưu, Phan Phu Tiên, Ngô Sĩ Liên, Phạm Công Trứ, Lê Hy. Bản in xưa nhất được phát hiện là bản Nội các quan bản năm 1697.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Dai_Viet_su_ky_toan_thu.jpg",
    pdfUrl: "",
    categoryNames: ["Lịch sử", "Lịch sử Việt Nam"],
  },
  {
    title: "Lịch sử Việt Nam từ nguồn gốc đến cuối thế kỷ XIX",
    translatedTitle: "",
    language: "VI",
    author: "Đào Duy Anh",
    publisher: "",
    publishYear: 1958,
    description:
      "Một trong những công trình lớn đó là bộ sách Lịch sử Việt Nam từ nguồn gốc đến cuối thế kỷ XIX gồm hai quyển Thượng và Hạ, xuất bản lần đầu năm 1958. Không chỉ là tài liệu tham khảo quan trọng giới thiệu một cách hệ thống về lịch sử đất nước từ khởi thủy tới thế kỷ XIX, bộ sách đã được sử dụng làm giáo trình đào tạo đại học chuyên ngành lịch sử, góp phần làm nên nhiều tên tuổi lớn cho ngành sử học nước nhà như Giáo sư Phan Huy Lê, Giáo sư Trần Quốc Vượng,...",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Lich_su_Viet_Nam_tu_nguon_goc_den_the_ky_XIX.jpg",
    pdfUrl: "",
    categoryNames: ["Lịch sử", "Lịch sử Việt Nam"],
  },
  {
    title: "Tâm lý người An Nam",
    translatedTitle: "Psychologie du Peuple annamite",
    language: "VI",
    author: "Paul Giran",
    publisher: "",
    publishYear: 1904,
    description:
      "Một công trình nghiên cứu của Paul Giran, một quan chức cai trị thuộc địa Pháp, được xuất bản lần đầu năm 1904. Cuốn sách được viết nhằm phục vụ cho công cuộc thực dân của Pháp, thông qua việc phân tích tâm lý của người An Nam để giúp chính quyền mẫu quốc duy trì sự hiện diện và cai trị tại Đông Dương một cách hiệu quả hơn.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Tam_ly_nguoi_An_Nam.jpg",
    pdfUrl: "",
    categoryNames: ["Lịch sử", "Tâm lý học", "Lịch sử Việt Nam"],
  },
  {
    title: "Bên nhau trọn đời",
    translatedTitle: "My Sunshine",
    language: "VI",
    author: "Cố Mạn",
    publisher: "",
    publishYear: 2005,
    description:
      "Câu chuyện tình yêu đầy trắc trở của Hà Dĩ Thâm và Triệu Mặc Sênh. Họ yêu nhau từ thời đại học nhưng vì hiểu lầm mà xa cách bảy năm. Khi gặp lại, Dĩ Thâm vẫn không thể quên được Mặc Sênh và quyết tâm theo đuổi cô một lần nữa. Tác phẩm là một minh chứng cho tình yêu chung thủy, vượt qua mọi khoảng cách thời gian và thử thách của cuộc sống.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Ben_nhau_tron_doi.jpg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Drama", "Hiện đại"],
  },
  {
    title: "Kiêu hãnh và định kiến",
    translatedTitle: "Pride and Prejudice",
    language: "VI",
    author: "Jane Austen",
    publisher: "",
    publishYear: 1813,
    description:
      "Một tác phẩm kinh điển của văn học Anh, kể về mối tình giữa Elizabeth Bennet, một cô gái thông minh, sắc sảo, và ngài Darcy, một quý tộc giàu có nhưng kiêu ngạo. Ban đầu, họ có những định kiến không tốt về nhau, nhưng qua nhiều biến cố, họ dần nhận ra sai lầm của mình và tìm thấy tình yêu đích thực. Cuốn sách là một bức tranh xã hội sâu sắc về tầng lớp quý tộc Anh thế kỷ 19.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Kieu_hanh_va_dinh_kien.jpeg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Kinh điển", "Drama", "Lịch sử"],
  },
  {
    title: "Rừng Na Uy",
    translatedTitle: "Norwegian Wood",
    language: "VI",
    author: "Haruki Murakami",
    publisher: "",
    publishYear: 1987,
    description:
      "Lấy bối cảnh Tokyo những năm 1960, câu chuyện là những hồi tưởng của Toru Watanabe về tuổi trẻ, tình yêu đầu đời đầy day dứt với Naoko và mối quan hệ phức tạp với Midori. Tác phẩm không chỉ là một câu chuyện tình yêu mà còn là sự chiêm nghiệm sâu sắc về sự mất mát, nỗi cô đơn, và hành trình trưởng thành của những người trẻ tuổi.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Rung_na_uy.jpeg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Drama", "Triết học", "Văn học nước ngoài"],
  },
  {
    title: "Anh có thích nước Mỹ không?",
    translatedTitle: "So Young",
    language: "VI",
    author: "Tân Di Ổ",
    publisher: "",
    publishYear: 2007,
    description:
      "Câu chuyện kể về Trịnh Vy, một cô gái mạnh mẽ, cá tính và hành trình theo đuổi tình yêu của mình với Trần Hiếu Chính thời đại học. Tình yêu của họ trải qua nhiều sóng gió, từ những ngày tháng ngọt ngào đến khi phải đối mặt với thực tế phũ phàng của cuộc sống. Tác phẩm khắc họa một cách chân thực về tuổi thanh xuân, về những lựa chọn và sự nuối tiếc.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Anh_co_thich_nuoc_my_khong.jpeg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Drama"],
  },
  {
    title: "Khi lỗi thuộc về những vì sao",
    translatedTitle: "The Fault in Our Stars",
    language: "VI",
    author: "John Green",
    publisher: "",
    publishYear: 2012,
    description:
      "Một câu chuyện tình yêu cảm động và bi thương giữa Hazel Grace, một cô gái 16 tuổi mắc bệnh ung thư, và Augustus Waters, một chàng trai lạc quan mà cô gặp trong một hội nhóm hỗ trợ bệnh nhân. Họ cùng nhau chia sẻ những suy ngẫm về sự sống, cái chết và tìm thấy tình yêu vô hạn trong một khoảng thời gian hữu hạn. Cuốn sách vừa hài hước, vừa đau lòng, để lại ấn tượng sâu sắc cho người đọc.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Khi_loi_thuoc_ve_nhung_vi_sao.jpeg",
    pdfUrl: "",
    categoryNames: ["Lãng mạn", "Drama", "Hiện đại"],
  },
  {
    title: "Bố già",
    translatedTitle: "The Godfather",
    language: "VI",
    author: "Mario Puzo",
    publisher: "",
    publishYear: 1969,
    description:
      "Xoay quanh gia đình tội phạm Corleone, một trong những gia tộc Mafia quyền lực nhất ở New York. Câu chuyện tập trung vào Don Vito Corleone, người đứng đầu gia tộc, và sự chuyển mình của con trai út Michael Corleone từ một người ngoài cuộc không muốn dính líu đến thế giới ngầm trở thành một ông trùm Mafia tàn nhẫn và đầy mưu lược. Tác phẩm là một bức tranh hoành tráng về quyền lực, gia đình, sự trung thành và phản bội trong thế giới tội phạm có tổ chức.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Bo_gia.jpg",
    pdfUrl: "",
    categoryNames: ["Kinh điển", "Drama", "Tội phạm"],
  },
  {
    title: "Truyện cổ Andersen",
    translatedTitle: "",
    language: "VI",
    author: "Hans Christian Andersen",
    publisher: "",
    publishYear: 1838,
    description:
      "Rồi tôi mơ màng ngủ thiếp đi dưới cây thông vì mệt và vì hơi nóng của những cây nến tỏa ra. Và giữa lúc mơ mơ màng màng như thế tôi nhìn thấy Andersen khi ông để rơi bông hồng. Từ đó, bao giờ tôi cũng hình dung ông giống như trong giấc mơ êm ái đó. Tất nhiên, lúc đó tôi còn chưa biết cả nghĩa đen và nghĩa bóng những truyện cổ tích khác mà chỉ người lớn mới có thể hiểu hết ý nghĩa của nó.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Truyen_co_tich_andersen.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Thiếu nhi",
      "Giáo dục",
      "Kinh điển",
      "Phép thuật",
      "Phiêu lưu",
      "Bí ẩn",
      "Kỳ ảo",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Mật mã Da Vinci",
    translatedTitle: "The Da Vinci Code",
    language: "VI",
    author: "Dan Brown",
    publisher: "",
    publishYear: 2003,
    description:
      "Nhà biểu tượng học Robert Langdon bị cuốn vào một cuộc truy lùng kho báu và giải mã những bí ẩn cổ xưa sau một vụ án mạng tại bảo tàng Louvre. Cuốn sách là một cuộc rượt đuổi nghẹt thở khắp châu Âu, kết hợp giữa hành động, lịch sử và các thuyết âm mưu.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Mat_ma_da_vinci.jpg",
    pdfUrl: "",
    categoryNames: ["Hành động", "Bí ẩn", "Giật gân", "Văn học nước ngoài"],
  },
  {
    title: "Sự im lặng của bầy cừu",
    translatedTitle: "The Silence of the Lambs",
    language: "VI",
    author: "Thomas Harris",
    publisher: "",
    publishYear: 1988,
    description:
      "Nữ thực tập sinh FBI Clarice Starling phải tìm kiếm sự giúp đỡ từ Hannibal Lecter, một bác sĩ tâm thần kiêm kẻ ăn thịt người, để bắt một kẻ giết người hàng loạt khác. Một cuộc đấu trí căng thẳng, đầy hành động và kinh dị tâm lý.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Su_im_lang_cua_bay_cuu.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Hành động",
      "Giật gân",
      "Tội phạm",
      "Kinh dị",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Giết con chim nhại",
    translatedTitle: "To Kill a Mockingbird",
    language: "VI",
    author: "Harper Lee",
    publisher: "",
    publishYear: 1960,
    description:
      "Những diễn biến căng thẳng trong phiên tòa xử án một người đàn ông da đen bị buộc tội oan và những hành động dũng cảm bảo vệ công lý của luật sư Atticus Finch đã tạo nên những cao trào đầy kịch tính.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Giet_con_chim_nhai.jpeg",
    pdfUrl: "",
    categoryNames: ["Kinh điển", "Chính kịch", "Văn học nước ngoài"],
  },
  {
    title: "Cuốn theo chiều gió",
    translatedTitle: "Gone with the Wind",
    language: "VI",
    author: "Margaret Mitchell",
    publisher: "",
    publishYear: 1936,
    description:
      "Bản tình ca bi tráng và mãnh liệt của Scarlett O'Hara và Rhett Butler trong bối cảnh Nội chiến Hoa Kỳ. Một câu chuyện về tình yêu, chiến tranh, sự mất mát và ý chí sinh tồn phi thường.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Cuon_theo_chieu_gio.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Lãng mạn",
      "Kinh điển",
      "Chính kịch",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Chiến tranh và hòa bình",
    translatedTitle: "War and Peace",
    language: "VI",
    author: "Lev Tolstoy",
    publisher: "",
    publishYear: 1869,
    description:
      "Một trong những tiểu thuyết vĩ đại nhất mọi thời đại, khắc họa xã hội Nga trong thời kỳ Napoléon. Tác phẩm là một bức tranh toàn cảnh về chiến tranh, tình yêu, gia đình và những triết lý sâu sắc về cuộc đời.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Chien_tranh_va_hoa_binh.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Kinh điển",
      "Chính kịch",
      "Triết học",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "1984",
    translatedTitle: "Nineteen Eighty-Four",
    language: "VI",
    author: "George Orwell",
    publisher: "",
    publishYear: 1949,
    description:
      "Một tác phẩm kinh điển về một xã hội tương lai bị kiểm soát toàn trị, nơi tư tưởng tự do bị đàn áp. Cuốn sách là lời cảnh tỉnh sâu sắc về chủ nghĩa độc tài và tầm quan trọng của sự thật.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/1984.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Kinh điển",
      "Khoa học viễn tưởng",
      "Chính kịch",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Bá tước Monte Cristo",
    translatedTitle: "The Count of Monte Cristo",
    language: "VI",
    author: "Alexandre Dumas",
    publisher: "",
    publishYear: 1844,
    description:
      "Câu chuyện kinh điển về sự phản bội và báo thù. Edmond Dantès, một thủy thủ trẻ, bị hãm hại và giam cầm. Sau khi vượt ngục và tìm được kho báu, anh trở lại để thực hiện kế hoạch trả thù công phu.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Ba_tuoc_monte_cristo.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Kinh điển",
      "Phiêu lưu",
      "Chính kịch",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Sherlock Holmes",
    translatedTitle: "Sherlock Holmes",
    language: "VI",
    author: "Arthur Conan Doyle",
    publisher: "",
    publishYear: 1887,
    description:
      "Tuyển tập những vụ án kinh điển của vị thám tử lừng danh Sherlock Holmes. Mỗi câu chuyện là một màn trình diễn của khả năng suy luận logic và óc quan sát phi thường.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Sherlock_holmes.jpg",
    pdfUrl: "",
    categoryNames: ["Bí ẩn", "Kinh điển", "Tội phạm", "Văn học nước ngoài"],
  },
  {
    title: "Cô gái có hình xăm rồng",
    translatedTitle: "The Girl with the Dragon Tattoo",
    language: "VI",
    author: "Stieg Larsson",
    publisher: "",
    publishYear: 2005,
    description:
      "Nhà báo Mikael Blomkvist và nữ hacker Lisbeth Salander cùng nhau điều tra một vụ mất tích bí ẩn đã xảy ra 40 năm trước. Một cuốn tiểu thuyết trinh thám đen tối, phức tạp và lôi cuốn.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Co_gai_co_hinh_xam_rong.jpeg",
    pdfUrl: "",
    categoryNames: ["Bí ẩn", "Tội phạm", "Giật gân", "Văn học nước ngoài"],
  },
  {
    title: "Cô gái mất tích",
    translatedTitle: "Gone Girl",
    language: "VI",
    author: "Gillian Flynn",
    publisher: "",
    publishYear: 2012,
    description:
      "Vào ngày kỷ niệm 5 năm ngày cưới, Amy Dunne đột ngột biến mất và chồng cô trở thành nghi phạm chính. Một cuốn tiểu thuyết tâm lý giật gân với những cú twist ngoạn mục, đào sâu vào mặt tối của hôn nhân.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Co_gai_mat_tich.png",
    pdfUrl: "",
    categoryNames: ["Giật gân", "Bí ẩn", "Tâm lý học", "Văn học nước ngoài"],
  },
  {
    title: "Trước khi nhắm mắt",
    translatedTitle: "Before I Go to Sleep",
    language: "VI",
    author: "S. J. Watson",
    publisher: "",
    publishYear: 2011,
    description:
      "Christine Lucas bị mất trí nhớ sau một tai nạn, mỗi ngày thức dậy cô đều không nhớ gì về quá khứ. Một câu chuyện hồi hộp và ám ảnh về việc đi tìm sự thật.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Truoc_khi_nham_mat.jpeg",
    pdfUrl: "",
    categoryNames: ["Giật gân", "Tâm lý học", "Bí ẩn", "Văn học nước ngoài"],
  },
  {
    title: "Bệnh nhân câm lặng",
    translatedTitle: "The Silent Patient",
    language: "VI",
    author: "Alex Michaelides",
    publisher: "",
    publishYear: 2019,
    description:
      "Nữ họa sĩ nổi tiếng Alicia Berenson bắn chết chồng và sau đó không nói một lời nào nữa. Nhà trị liệu tâm lý Theo Faber quyết tâm làm cho cô nói ra sự thật. Một cú twist cuối cùng sẽ khiến bạn choáng váng.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Benh_nhan_cam_lang.jpeg",
    pdfUrl: "",
    categoryNames: ["Giật gân", "Tâm lý học", "Bí ẩn", "Văn học nước ngoài"],
  },
  {
    title: "Nó",
    translatedTitle: "It",
    language: "VI",
    author: "Stephen King",
    publisher: "",
    publishYear: 1986,
    description:
      "Tại thị trấn Derry, một thực thể tà ác cổ xưa đội lốt gã hề Pennywise chuyên săn lùng trẻ em. Một nhóm bạn phải đối mặt với nỗi sợ hãi lớn nhất của mình để tiêu diệt nó.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/No.jpeg",
    pdfUrl: "",
    categoryNames: ["Kinh dị", "Kỳ ảo", "Giật gân", "Văn học nước ngoài"],
  },
  {
    title: "Dracula",
    translatedTitle: "Dracula",
    language: "VI",
    author: "Bram Stoker",
    publisher: "",
    publishYear: 1897,
    description:
      "Cuốn tiểu thuyết kinh điển đã định hình nên hình tượng ma cà rồng. Câu chuyện về bá tước Dracula và nỗ lực ngăn chặn hắn gieo rắc lời nguyền của mình sang London.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Dracula.jpeg",
    pdfUrl: "",
    categoryNames: ["Kinh dị", "Kinh điển", "Kỳ ảo", "Văn học nước ngoài"],
  },
  {
    title: "Frankenstein",
    translatedTitle: "Frankenstein",
    language: "VI",
    author: "Mary Shelley",
    publisher: "",
    publishYear: 1818,
    description:
      "Nhà khoa học Victor Frankenstein tạo ra một sinh vật sống từ các bộ phận cơ thể người chết, nhưng kinh hoàng trước tạo vật của mình và ruồng bỏ nó. Một câu chuyện kinh dị triết lý về sự sáng tạo và trách nhiệm.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Frankenstein.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Kinh dị",
      "Kinh điển",
      "Khoa học viễn tưởng",
      "Triết học",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Cuộc đời của Pi",
    translatedTitle: "Life of Pi",
    language: "VI",
    author: "Yann Martel",
    publisher: "",
    publishYear: 2001,
    description:
      "Cậu bé người Ấn Độ Pi Patel sống sót sau một vụ đắm tàu và lênh đênh trên Thái Bình Dương cùng một con hổ Bengal. Một câu chuyện phi thường về niềm tin, sự sống còn và sức mạnh của kể chuyện.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Cuoc_doi_cua_pi.png",
    pdfUrl: "",
    categoryNames: ["Hiện đại", "Kỳ ảo", "Triết học", "Văn học nước ngoài"],
  },
  {
    title: "Người đua diều",
    translatedTitle: "The Kite Runner",
    language: "VI",
    author: "Khaled Hosseini",
    publisher: "",
    publishYear: 2003,
    description:
      "Một câu chuyện cảm động về tình bạn, sự phản bội và chuộc lỗi, lấy bối cảnh Afghanistan từ thời quân chủ đến chế độ Taliban. Một bức tranh đầy đau thương nhưng cũng rất nhân văn.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Nguoi_dua_dieu.jpeg",
    pdfUrl: "",
    categoryNames: ["Hiện đại", "Chính kịch", "Văn học nước ngoài"],
  },
  {
    title: "Chúa tể những chiếc nhẫn",
    translatedTitle: "The Lord of the Rings",
    language: "VI",
    author: "J.R.R. Tolkien",
    publisher: "",
    publishYear: 1954,
    description:
      "Bộ tiểu thuyết kỳ ảo kinh điển về hành trình của người Hobbit Frodo Baggins nhằm phá hủy Chiếc nhẫn quyền lực để cứu Trung Địa khỏi Chúa tể hắc ám Sauron.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Chua_te_nhung_chiec_nhan.jpeg",
    pdfUrl: "",
    categoryNames: ["Kỳ ảo", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Trăm năm cô đơn",
    translatedTitle: "One Hundred Years of Solitude",
    language: "VI",
    author: "Gabriel García Márquez",
    publisher: "",
    publishYear: 1967,
    description:
      "Câu chuyện về bảy thế hệ của dòng họ Buendía tại ngôi làng Macondo hư cấu. Tác phẩm là đỉnh cao của chủ nghĩa hiện thực huyền ảo, nơi thực và ảo đan xen.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Tram_nam_co_don.jpeg",
    pdfUrl: "",
    categoryNames: ["Kỳ ảo", "Kinh điển", "Chính kịch", "Văn học nước ngoài"],
  },
  {
    title: "Xứ Cát",
    translatedTitle: "Dune",
    language: "VI",
    author: "Frank Herbert",
    publisher: "",
    publishYear: 1965,
    description:
      "Một thiên sử thi khoa học viễn tưởng phức tạp về chính trị, tôn giáo và quyền lực, lấy bối cảnh trên hành tinh sa mạc Arrakis, nguồn duy nhất của 'hương dược'.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Xu_cat.jpeg",
    pdfUrl: "",
    categoryNames: ["Khoa học viễn tưởng", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Kẻ trộm sách",
    translatedTitle: "The Book Thief",
    language: "VI",
    author: "Markus Zusak",
    publisher: "",
    publishYear: 2005,
    description:
      "Việc Thần Chết là người kể chuyện đã mang đến một yếu tố siêu thực độc đáo cho câu chuyện cảm động về cô bé Liesel Meminger trong thời kỳ Đức Quốc xã.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Ke_trom_sach.jpeg",
    pdfUrl: "",
    categoryNames: ["Chính kịch", "Kỳ ảo", "Văn học nước ngoài"],
  },
  {
    title: "Những người khốn khổ",
    translatedTitle: "Les Misérables",
    language: "VI",
    author: "Victor Hugo",
    publisher: "",
    publishYear: 1862,
    description:
      "Câu chuyện bi tráng về cuộc đời của Jean Valjean, một cựu tù khổ sai, và cuộc truy đuổi của viên thanh tra Javert. Tác phẩm khám phá các chủ đề về công lý, tình yêu và sự cứu chuộc.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Nhung_nguoi_khon_kho.jpeg",
    pdfUrl: "",
    categoryNames: ["Chính kịch", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Anh em nhà Karamazov",
    translatedTitle: "The Brothers Karamazov",
    language: "VI",
    author: "Fyodor Dostoevsky",
    publisher: "",
    publishYear: 1880,
    description:
      "Một cuốn tiểu thuyết triết học sâu sắc xoay quanh vụ giết cha và ba người con trai. Tác phẩm đào sâu vào các vấn đề về đức tin, lý trí và đạo đức.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Anh_em_nha_karamazov.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Chính kịch",
      "Kinh điển",
      "Triết học",
      "Tâm lý học",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Don Quijote - Nhà quý tộc tài ba xứ Mancha",
    translatedTitle: "Don Quixote",
    language: "VI",
    author: "Miguel de Cervantes",
    publisher: "",
    publishYear: 1605,
    description:
      "Câu chuyện hài hước về một nhà quý tộc nghèo đọc quá nhiều truyện hiệp sĩ đến mức mất trí và quyết định trở thành một hiệp sĩ lang thang, tạo ra vô số tình huống dở khóc dở cười.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Don_quijote_nha_quy_toc_tai_ba_xu_mancha.jpeg",
    pdfUrl: "",
    categoryNames: ["Hài kịch", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Bắt trẻ đồng xanh",
    translatedTitle: "The Catcher in the Rye",
    language: "VI",
    author: "J. D. Salinger",
    publisher: "",
    publishYear: 1951,
    description:
      "Những lời châm biếm, cay độc của nhân vật chính Holden Caulfield về xã hội 'giả tạo' của người lớn tạo nên những khoảnh khắc hài hước đen tối.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Bat_tre_dong_xanh.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Hài kịch",
      "Kinh điển",
      "Chính kịch",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Nhật ký tiểu thư Jones",
    translatedTitle: "Bridget Jones's Diary",
    language: "VI",
    author: "Helen Fielding",
    publisher: "",
    publishYear: 1996,
    description:
      "Cuốn nhật ký hài hước của Bridget Jones, một phụ nữ độc thân ở London, ghi lại những nỗ lực của cô để cải thiện bản thân, tìm kiếm tình yêu và đối phó với những tình huống trớ trêu.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Nhat_ky_tieu_thu_jones.jpg",
    pdfUrl: "",
    categoryNames: ["Hài kịch", "Lãng mạn", "Hiện đại", "Văn học nước ngoài"],
  },
  {
    title: "Đi tìm lẽ sống",
    translatedTitle: "Man's Search for Meaning",
    language: "VI",
    author: "Viktor Frankl",
    publisher: "",
    publishYear: 1946,
    description:
      "Nhà tâm thần học Viktor Frankl kể lại trải nghiệm của ông trong các trại tập trung và phát triển liệu pháp tâm lý của mình: tìm kiếm ý nghĩa cuộc sống ngay cả trong những hoàn cảnh đau khổ nhất.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Di_tim_le_song.jpg",
    pdfUrl: "",
    categoryNames: ["Tâm lý học", "Triết học", "Tiểu sử", "Văn học nước ngoài"],
  },
  {
    title: "Tội ác và hình phạt",
    translatedTitle: "Crime and Punishment",
    language: "VI",
    author: "Fyodor Dostoevsky",
    publisher: "",
    publishYear: 1866,
    description:
      "Một nghiên cứu tâm lý sâu sắc về chàng sinh viên nghèo Raskolnikov, người đã giết một bà chủ tiệm cầm đồ. Cuốn sách là một cuộc đấu tranh nội tâm dữ dội giữa tội lỗi và sự cứu rỗi.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Toi_ac_va_hinh_phat.jpg",
    pdfUrl: "",
    categoryNames: [
      "Tâm lý học",
      "Kinh điển",
      "Triết học",
      "Tội phạm",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Tư duy nhanh và chậm",
    translatedTitle: "Thinking, Fast and Slow",
    language: "VI",
    author: "Daniel Kahneman",
    publisher: "",
    publishYear: 2011,
    description:
      "Nhà tâm lý học đoạt giải Nobel Daniel Kahneman giải thích hai hệ thống tư duy của con người: hệ thống nhanh, trực quan và cảm tính; và hệ thống chậm, có chủ ý và logic.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Tu_duy_nhanh_va_cham.jpg",
    pdfUrl: "",
    categoryNames: ["Tâm lý học", "Phát triển bản thân", "Văn học nước ngoài"],
  },
  {
    title: "Án mạng trên sông Nile",
    translatedTitle: "Death on the Nile",
    language: "VI",
    author: "Agatha Christie",
    publisher: "",
    publishYear: 1937,
    description:
      "Trong một chuyến du ngoạn trên sông Nile, một nữ thừa kế giàu có bị sát hại. Thám tử Hercule Poirot phải tìm ra hung thủ giữa một nhóm nghi phạm đầy động cơ.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/An_mang_tren_song_nile.jpg",
    pdfUrl: "",
    categoryNames: ["Tội phạm", "Bí ẩn", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Máu lạnh",
    translatedTitle: "In Cold Blood",
    language: "VI",
    author: "Truman Capote",
    publisher: "",
    publishYear: 1966,
    description:
      "Một tác phẩm phi hư cấu đột phá, kể lại vụ giết hại dã man một gia đình nông dân ở Kansas. Capote đã tái tạo lại vụ án một cách chi tiết, tạo ra thể loại 'tiểu thuyết phi hư cấu'.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Mau_lanh.jpg",
    pdfUrl: "",
    categoryNames: ["Tội phạm", "Tiểu sử", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Nhật ký Anne Frank",
    translatedTitle: "The Diary of a Young Girl",
    language: "VI",
    author: "Anne Frank",
    publisher: "",
    publishYear: 1947,
    description:
      "Cuốn nhật ký cảm động của Anne Frank, một cô bé người Do Thái, ghi lại cuộc sống của cô và gia đình trong hai năm lẩn trốn Đức Quốc xã. Một chứng tích lịch sử đầy sức mạnh.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Nhat_ky_anne_frank.jpeg",
    pdfUrl: "",
    categoryNames: ["Tiểu sử", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Steve Jobs",
    translatedTitle: "Steve Jobs",
    language: "VI",
    author: "Walter Isaacson",
    publisher: "",
    publishYear: 2011,
    description:
      "Cuốn tiểu sử chính thức và duy nhất về cuộc đời của người đồng sáng lập Apple, Steve Jobs. Cuốn sách khắc họa một chân dung đầy đủ về một thiên tài sáng tạo phức tạp.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Steve_jobs.jpeg",
    pdfUrl: "",
    categoryNames: ["Tiểu sử", "Văn học nước ngoài"],
  },
  {
    title: "Educated: Hồi ký",
    translatedTitle: "Educated: A Memoir",
    language: "VI",
    author: "Tara Westover",
    publisher: "",
    publishYear: 2018,
    description:
      "Hồi ký phi thường của Tara Westover, người lớn lên trong một gia đình theo chủ nghĩa sinh tồn và không được đến trường. Một câu chuyện truyền cảm hứng về sức mạnh của giáo dục.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Educated_hoi_ky.jpeg",
    pdfUrl: "",
    categoryNames: ["Tiểu sử", "Giáo dục", "Chính kịch", "Văn học nước ngoài"],
  },
  {
    title: "Đắc nhân tâm",
    translatedTitle: "How to Win Friends and Influence People",
    language: "VI",
    author: "Dale Carnegie",
    publisher: "",
    publishYear: 1936,
    description:
      "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử. Với những nguyên tắc đơn giản và thực tế, tác phẩm đã giúp hàng triệu người cải thiện các mối quan hệ và thành công.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Dac_nhan_tam.jpg",
    pdfUrl: "",
    categoryNames: ["Phát triển bản thân", "Tâm lý học", "Văn học nước ngoài"],
  },
  {
    title: "7 thói quen của bạn trẻ thành đạt",
    translatedTitle: "The 7 Habits of Highly Effective People",
    language: "VI",
    author: "Stephen R. Covey",
    publisher: "",
    publishYear: 1989,
    description:
      "Một cuốn sách mang tính cách mạng, đưa ra một phương pháp tiếp cận toàn diện để giải quyết các vấn đề cá nhân và nghề nghiệp. 7 thói quen này là một khuôn khổ để xây dựng tính hiệu quả cá nhân.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/7_thoi_quen_cua_ban_tre_thanh_dat.jpg",
    pdfUrl: "",
    categoryNames: ["Phát triển bản thân", "Tâm lý học", "Văn học nước ngoài"],
  },
  {
    title: "Nhà giả kim",
    translatedTitle: "The Alchemist",
    language: "VI",
    author: "Paulo Coelho",
    publisher: "",
    publishYear: 1988,
    description:
      "Câu chuyện ngụ ngôn đầy triết lý về chàng chăn cừu Santiago và hành trình đi tìm kho báu. Tác phẩm là một thông điệp ý nghĩa về việc theo đuổi ước mơ và lắng nghe tiếng gọi của trái tim.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Nha_gia_kim.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Phát triển bản thân",
      "Triết học",
      "Kỳ ảo",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Thế giới của Sophie",
    translatedTitle: "Sophie's World",
    language: "VI",
    author: "Jostein Gaarder",
    publisher: "",
    publishYear: 1991,
    description:
      "Một cuốn tiểu thuyết độc đáo lồng ghép lịch sử triết học phương Tây. Cô bé Sophie nhận được những lá thư bí ẩn, đưa cô vào một cuộc hành trình khám phá các nhà tư tưởng vĩ đại.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/The_gioi_cua_sophie.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Triết học",
      "Bí ẩn",
      "Thiếu nhi",
      "Giáo dục",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Hoàng tử bé",
    translatedTitle: "The Little Prince",
    language: "VI",
    author: "Antoine de Saint-Exupéry",
    publisher: "",
    publishYear: 1943,
    description:
      "Một câu chuyện thiếu nhi kinh điển nhưng chứa đựng những bài học triết lý sâu sắc dành cho người lớn. Cuộc gặp gỡ giữa một phi công và một hoàng tử bé là một cuộc đối thoại về tình bạn, tình yêu và bản chất của cuộc sống.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Hoang_tu_be.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Triết học",
      "Thiếu nhi",
      "Kinh điển",
      "Kỳ ảo",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Walden - một mình trong rừng",
    translatedTitle: "Walden; or, Life in the Woods",
    language: "VI",
    author: "Henry David Thoreau",
    publisher: "",
    publishYear: 1854,
    description:
      "Cuốn sách ghi lại hai năm tác giả sống tối giản và tự cung tự cấp trong một túp lều bên hồ Walden. Tác phẩm là một bài suy ngẫm sâu sắc về thiên nhiên, xã hội và sự tự lực.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Walden_mot_minh_trong_rung.jpg",
    pdfUrl: "",
    categoryNames: ["Triết học", "Tiểu sử", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Truyện Kiều",
    translatedTitle: "The Tale of Kieu",
    language: "VI",
    author: "Nguyễn Du",
    publisher: "",
    publishYear: 1820,
    description:
      "Kiệt tác của văn học Việt Nam, kể về cuộc đời 15 năm lưu lạc đầy đau khổ của Thúy Kiều. Tác phẩm là một truyện thơ lục bát với ngôn ngữ và nghệ thuật đỉnh cao.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Truyen_kieu.jpg",
    pdfUrl: "",
    categoryNames: ["Thơ ca", "Kinh điển", "Chính kịch", "Lãng mạn"],
  },
  {
    title: "Lá cỏ",
    translatedTitle: "Leaves of Grass",
    language: "EN",
    author: "Walt Whitman",
    publisher: "",
    publishYear: 1855,
    description:
      "Một tập thơ kinh điển của văn học Mỹ, tôn vinh thiên nhiên, dân chủ và tinh thần con người. Whitman đã liên tục sửa đổi và mở rộng tập thơ này trong suốt cuộc đời mình.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/La_co.png",
    pdfUrl: "",
    categoryNames: ["Thơ ca", "Kinh điển", "Triết học", "Văn học nước ngoài"],
  },
  {
    title: "Thần khúc",
    translatedTitle: "Divine Comedy",
    language: "VI",
    author: "Dante Alighieri",
    publisher: "",
    publishYear: 1320,
    description:
      "Một trường ca vĩ đại của Ý, mô tả hành trình của Dante qua ba cõi giới bên kia: Địa ngục, Luyện ngục và Thiên đường. Tác phẩm là một kiệt tác về mặt tưởng tượng, thần học và thi ca.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Than_khuc.jpg",
    pdfUrl: "",
    categoryNames: [
      "Thơ ca",
      "Kinh điển",
      "Triết học",
      "Kỳ ảo",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Alice ở xứ sở thần tiên",
    translatedTitle: "Alice's Adventures in Wonderland",
    language: "VI",
    author: "Lewis Carroll",
    publisher: "",
    publishYear: 1865,
    description:
      "Cô bé Alice chui qua một hang thỏ và lạc vào một thế giới kỳ lạ với những sinh vật và logic phi thường. Một câu chuyện kinh điển đầy trí tưởng tượng.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Alice_o_xu_so_than_tien.jpg",
    pdfUrl: "",
    categoryNames: ["Thiếu nhi", "Kỳ ảo", "Kinh điển", "Văn học nước ngoài"],
  },
  {
    title: "Lược sử loài người",
    translatedTitle: "Sapiens: A Brief History of Humankind",
    language: "VI",
    author: "Yuval Noah Harari",
    publisher: "",
    publishYear: 2011,
    description:
      "Một cuốn sách đầy tham vọng, tóm tắt toàn bộ lịch sử loài người từ thời kỳ đồ đá đến thế kỷ 21. Tác phẩm đưa ra những góc nhìn mới mẻ và đầy khiêu khích.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Luoc_su_loai_nguoi.jpeg",
    pdfUrl: "",
    categoryNames: ["Giáo dục", "Triết học", "Văn học nước ngoài"],
  },
  {
    title: "Tôi tài giỏi, bạn cũng thế!",
    translatedTitle: "I Am Gifted, So Are You!",
    language: "VI",
    author: "Adam Khoo",
    publisher: "",
    publishYear: 1998,
    description:
      "Cuốn sách cung cấp những phương pháp và kỹ năng học tập hiệu quả dành cho học sinh, sinh viên. Một cuốn cẩm nang học tập được nhiều thế hệ yêu thích.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Toi_tai_gioi_ban_cung_the.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Giáo dục",
      "Phát triển bản thân",
      "Tâm lý học",
      "Văn học nước ngoài",
    ],
  },
  {
    title: "Xách ba lô lên và đi",
    translatedTitle: "",
    language: "VI",
    author: "Huyền Chip",
    publisher: "",
    publishYear: 2013,
    description:
      "Cuốn nhật ký hành trình của một cô gái trẻ Việt Nam đi vòng quanh thế giới với một ngân sách eo hẹp. Tác phẩm đã truyền cảm hứng cho rất nhiều bạn trẻ dám ước mơ và khám phá.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Xach_balo_len_va_di.jpeg",
    pdfUrl: "",
    categoryNames: ["Du lịch", "Tiểu sử"],
  },
  {
    title: "Mặn béo chua nóng",
    translatedTitle:
      "Salt, Fat, Acid, Heat: Mastering the Elements of Good Cooking",
    language: "VI",
    author: "Samin Nosrat",
    publisher: "",
    publishYear: 2017,
    description:
      "Một cuốn sách nấu ăn mang tính cách mạng, tập trung vào bốn yếu tố cơ bản để tạo nên món ăn ngon. Tác phẩm giúp người đọc hiểu được 'tại sao' đằng sau mỗi kỹ thuật nấu nướng.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Man_beo_chua_nong.jpg",
    pdfUrl: "",
    categoryNames: ["Nấu ăn", "Giáo dục", "Văn học nước ngoài"],
  },
  {
    title: "Ông già và biển cả",
    translatedTitle: "The Old Man and the Sea",
    language: "VI",
    author: "Ernest Hemingway",
    publisher: "",
    publishYear: 1952,
    description:
      "Câu chuyện ngụ ngôn về cuộc đấu tranh kiên cường của ông lão đánh cá Santiago với một con cá kiếm khổng lồ. Một tác phẩm ngắn gọn nhưng đầy ý nghĩa về phẩm giá và lòng dũng cảm.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Ong_gia_va_bien_ca.jpeg",
    pdfUrl: "",
    categoryNames: [
      "Văn học nước ngoài",
      "Kinh điển",
      "Chính kịch",
      "Triết học",
    ],
  },
  {
    title: "Kafka bên bờ biển",
    translatedTitle: "Kafka on the Shore",
    language: "VI",
    author: "Haruki Murakami",
    publisher: "",
    publishYear: 2002,
    description:
      "Hai câu chuyện song song về cậu bé 15 tuổi Kafka Tamura bỏ nhà đi và ông lão Nakata có khả năng nói chuyện với mèo. Một cuốn tiểu thuyết phức tạp, kỳ ảo và đầy chất thơ.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Kafka_ben_bo_bien.jpeg",
    pdfUrl: "",
    categoryNames: ["Văn học nước ngoài", "Hiện đại", "Kỳ ảo", "Bí ẩn"],
  },
  {
    title: "Tên của đóa hồng",
    translatedTitle: "The Name of the Rose",
    language: "VI",
    author: "Umberto Eco",
    publisher: "",
    publishYear: 1980,
    description:
      "Lấy bối cảnh một tu viện Ý vào thế kỷ 14, tu sĩ William xứ Baskerville điều tra một loạt cái chết bí ẩn. Một cuốn tiểu thuyết trinh thám lịch sử phức tạp, kết hợp giữa triết học, thần học và ký hiệu học.",
    coverUrl:
      "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Ten_cua_doa_hong.jpg",
    pdfUrl: "",
    categoryNames: ["Văn học nước ngoài", "Kinh điển", "Bí ẩn"],
  },
];
const subscription = [
  {
    name: "PRO",
    maxBorrowNumbers: 100,
    maxBorrowDays: 30,
    duration: 30,
    price: 99000,
  },
  {
    name: "MAX",
    maxBorrowNumbers: 1000,
    maxBorrowDays: 90,
    duration: 90,
    price: 199000,
  },
];

const request = (body, token = null) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  body: JSON.stringify(body),
});
async function postData() {
  console.log(books.length);
  // Run 1 lần
  const response = await fetch(
    "http://localhost:8080/api/auth/login",
    request({
      identifier: "admin",
      password: "admin",
    })
  );
  const data = await response.json();
  const token = data.result.token;
  console.log("token:", token);
  for (const sub of subscription) {
    await fetch("http://localhost:8080/api/subscription-plan", request(sub, token));
  }
  for (const category of categories) {
    await fetch("http://localhost:8080/api/category", request(category, token));
  }

  for (const book of books) {
    await fetch("http://localhost:8080/api/book", request(book, token));
  }
}

postData();
