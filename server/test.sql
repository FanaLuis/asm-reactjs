-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 31, 2023 lúc 05:07 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `decs` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`id`, `title`, `decs`, `price`, `image`) VALUES
(7, 'Cơn Lốc Quản Trị - Ba Trụ Cột Của Văn Hóa Doanh Nghiệp', 'Cơn Lốc Quản Trị - Ba Trụ Cột Của Văn Hóa Doanh Nghiệp  Doanh nghiệp nào cũng có lúc gặp phải những vấn đề không nhất thiết mang tính kỹ thuật, như sự thiếu vắng động lực, hoặc tinh thần tương tác và làm việc nhóm thấp, thậm chí là mâu thuẫn giữa các thàn', 126000, 'https://cdn0.fahasa.com/media/catalog/product/c/o/con-loc-quan-tri---bia-1.jpg'),
(9, 'Thị Kiến - The Shining', 'Thị Kiến - The Shining  “Hiển nhiên là một kiệt tác, có lẽ là câu chuyện siêu nhiên xuất sắc nhất trong vòng một trăm năm.” ― Peter Straub  “Với tư cách một người kể chuyện, ông xứng đáng ở cùng hàng với Dickens.” ― The Times  “King sáng tạo ra một thế gi', 229, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935235234000.jpg'),
(10, 'Fairy Tale', 'Fairy Tale  \'Fairy Tale is vintage, timeless King, a transporting, terrifying treat\' - Guardian  \'A blazing flash of creativity . . . King\'s best book in over a decade\' - Esquire  Legendary storyteller Stephen King goes into the deepest well of his imagin', 442, 'https://cdn0.fahasa.com/media/catalog/product/9/7/9781399705417.jpg'),
(11, 'Misery - Chiếc Máy Đánh Chữ Đẫm Máu Ở Vùng Núi Tuyết', 'Tiểu thuyết gia bán chạy nhất Paul Sheldon nghĩ rằng cuối cùng anh cũng gói lại được loạt truyện Misery của mình. Ở một nước đi có phần gây tranh cãi trong sự nghiệp, anh vừa để nhân vật chính nổi tiếng của loạt truyện lãng mạn ấy phải chết. Nhưng anh khô', 231, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936066692953.jpg'),
(12, '[Phiên chợ sách cũ] The Outsider', 'Sản phẩm có tình trạng chất lượng tương đương 80% so với hàng mới.  Lưu ý: Các sản phẩm thuộc \'Phiên chợ sách cũ\' sẽ không được áp dụng chính sách đổi trả của Fahasa.com  NEW YORK TIMES BESTSELLER  An unspeakable crime. A confounding investigation. At a t', 323, 'https://cdn0.fahasa.com/media/catalog/product/9/7/9781501180989_thanh_ly.jpg'),
(13, 'Stephen King - Chuyện Nghề Viết', 'Stephen King - Chuyện Nghề Viết  On Writing: A Memoir of the Craft là hồi ký, đồng thời cũng là những chia sẻ tổng quát về nghề viết lách của một trong những tác giả bán chạy nhất mọi thời đại – Stephen King. Cuốn sách tuyệt vời này mang đến cái nhìn sâu ', 197, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936066695848.jpg'),
(14, 'Sách Giáo Khoa Bộ Lớp 12 - Sách Bài Học (Bộ 14 Cuốn) (2023) + 2 Bao Sách TP', 'Sách Giáo Khoa Bộ Lớp 12 - Sách Bài Học (Bộ 14 Cuốn) (2023) + 2 Bao Sách TP  Bao Gồm:  - Sách Giáo Khoa Bộ Lớp 12 - Sách Bài Học (Bộ 14 Cuốn) (2023)  - 2 Cuộn Bao Sách Nylon TP (10 Tờ/Cuộn)  STT	Tên sản phẩm 1	Giáo dục Quốc phòng - An ninh 12 2	Giải tích ', 194, 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-3300000027449-1901011410903.jpg'),
(15, 'Sách Giáo Khoa Bộ Lớp 3 - Chân Trời Sáng Tạo - Sách Bài Học (Bộ 12 Cuốn) (Mỹ Thuật Bản 2) (2023)', 'Sách Giáo Khoa Bộ Lớp 3 - Chân Trời Sáng Tạo - Sách Bài Học (Bộ 12 Cuốn) (Mỹ Thuật Bản 2) (2023)', 178, 'https://cdn0.fahasa.com/media/catalog/product/z/3/z3593262720502_b307d728758bf594787cc59ec01e01af_1.jpg');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
