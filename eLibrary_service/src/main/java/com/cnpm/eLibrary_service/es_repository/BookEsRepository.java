package com.cnpm.eLibrary_service.es_repository;

import com.cnpm.eLibrary_service.es_document.BookEs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookEsRepository extends ElasticsearchRepository<BookEs, String> {
    @Query("""
    {
      "bool": {
        "should": [
          {
            "multi_match": {
              "query": "?0",
              "fields": ["title^3", "translatedTitle^2", "author^2", "description", "publisher"],
              "type": "best_fields",
              "fuzziness": "AUTO",
              "operator": "and"
            }
          },
          {
            "multi_match": {
              "query": "?0",
              "fields": ["title^3", "translatedTitle^2", "author^2", "description", "publisher"],
              "type": "bool_prefix",
              "operator": "and"
            }
          }
        ],
        "minimum_should_match": 1,
        "filter": {
          "terms": { "categoryIds": ?1 }
        }
      }
    }
    """)
    Page<BookEs> searchByKeywordAndCategories(String keyword, List<Long> categoryIds, Pageable pageable);

    @Query("""
    {
      "bool": {
        "should": [
          {
            "multi_match": {
              "query": "?0",
              "fields": ["title^3", "translatedTitle^2", "author^2", "description", "publisher"],
              "type": "best_fields",
              "fuzziness": "AUTO",
              "operator": "and"
            }
          },
          {
            "multi_match": {
              "query": "?0",
              "fields": ["title^3", "translatedTitle^2", "author^2", "description", "publisher"],
              "type": "bool_prefix",
              "operator": "and"
            }
          }
        ],
        "minimum_should_match": 1
      }
    }
    """)
    Page<BookEs> searchByKeyword(String keyword, Pageable pageable);

}
