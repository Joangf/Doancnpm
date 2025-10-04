package com.cnpm.eLibrary_service.es_mapper;

import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.es_document.BookEs;
import org.springframework.stereotype.Component;

public interface BookEsMapper {
    public BookEs toBookEs(Book book);
}
