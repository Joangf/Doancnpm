package com.cnpm.eLibrary_service.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils; // Thêm cái này nếu cần inject biến private

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class FileServiceTest {

    @InjectMocks
    private FileServiceImpl fileService;

    // JUnit 5 sẽ tự tạo một folder tạm thời cho mỗi test case và xóa đi sau khi chạy xong
    @TempDir
    Path tempDir;

    @Test
    void saveFile_Success() throws IOException {
        // GIVEN
        // Giả lập một file upload từ client
        String fileName = "test-image.jpg";
        String content = "Hello World Content";
        MockMultipartFile multipartFile = new MockMultipartFile(
                "file",
                fileName,
                "image/jpeg",
                content.getBytes()
        );

        String subDir = "books";

        // QUAN TRỌNG:
        // Vì trong code FileServiceImpl bạn đang hardcode đường dẫn "uploads/" + subDir
        // Điều này sẽ tạo folder "uploads" ngay tại thư mục project khi chạy test -> Làm rác project.
        //
        // Để test sạch sẽ mà không phải sửa code gốc quá nhiều (nếu bạn không dùng biến cấu hình),
        // ta chấp nhận việc nó tạo file thật nhưng ta sẽ kiểm tra xem file đó có tồn tại không và xóa nó đi.
        //
        // Tuy nhiên, cách tốt nhất là refactor service để nhận "root path" từ biến môi trường.
        // Ở đây mình sẽ test theo logic hiện tại của bạn:

        // WHEN
        String resultPath = fileService.saveFile(multipartFile, subDir);

        // THEN
        assertNotNull(resultPath);
        assertTrue(resultPath.contains(fileName)); // Tên file trả về phải chứa tên gốc
        assertTrue(resultPath.contains(subDir));   // Phải chứa subDir

        // Kiểm tra file có thực sự được tạo ra không
        File savedFile = new File(resultPath);
        assertTrue(savedFile.exists());
        assertTrue(savedFile.isFile());

        // Dọn dẹp (Xóa file vừa tạo để không làm rác project)
        // Vì FileServiceImpl lưu vào "uploads/...", ta cần xóa nó đi
        Files.deleteIfExists(savedFile.toPath());
        // Cố gắng xóa thư mục cha nếu rỗng (Optional)
        savedFile.getParentFile().delete();
    }
}