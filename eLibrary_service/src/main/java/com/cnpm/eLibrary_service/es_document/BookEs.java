package com.cnpm.eLibrary_service.es_document;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Set;

@Document(indexName = "books")
@Data
public class BookEs {
    @Id
    private String id;

    // 🔎 Full-text search
    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String translatedTitle;

    @Field(type = FieldType.Text)
    private String author;

    @Field(type = FieldType.Text)
    private String publisher;

    @Field(type = FieldType.Text)
    private String description;

    // 🔎 Filter
    @Field(type = FieldType.Keyword)
    private String language;

    @Field(type = FieldType.Integer)
    private Integer publishYear;

    @Field(type = FieldType.Keyword)
    private Set<Long> categoryIds;

    // 🔎 Không search, chỉ lưu reference
    @Field(type = FieldType.Keyword, index = false)
    private String coverUrl;

    @Field(type = FieldType.Keyword, index = false)
    private String pdfUrl;
}