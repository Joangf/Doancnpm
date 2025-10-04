package com.cnpm.eLibrary_service.es_repository;

import com.cnpm.eLibrary_service.es_document.BookEs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookEsRepository extends ElasticsearchRepository<BookEs, String> {
}
