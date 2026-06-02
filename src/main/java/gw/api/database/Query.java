package gw.api.database;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;

/**
 * Stub for Guidewire's Query API.
 * Provides a fluent interface for querying Guidewire entities.
 *
 * @param <T> the entity type being queried
 */
public class Query<T> {

    private final Class<T> entityType;

    private Query(Class<T> entityType) {
        this.entityType = entityType;
    }

    @SuppressWarnings("unchecked")
    public static <T> Query<T> make(Class<T> entityType) {
        return new Query<>(entityType);
    }

    @SuppressWarnings("unchecked")
    public static <T> Query<T> make(Object entityType) {
        return new Query<>((Class<T>) Object.class);
    }

    public Query<T> compare(String field, Object operator, Object value) {
        return this;
    }

    public QueryResult<T> select() {
        return new QueryResult<>();
    }

    public static class QueryResult<T> implements Iterable<T> {

        private final List<T> results = new ArrayList<>();

        public T getAtMostOneRow() {
            return results.isEmpty() ? null : results.get(0);
        }

        public int getCount() {
            return results.size();
        }

        public void eachWithIndex(BiConsumer<T, Integer> action) {
            for (int i = 0; i < results.size(); i++) {
                action.accept(results.get(i), i);
            }
        }

        @Override
        public java.util.Iterator<T> iterator() {
            return results.iterator();
        }
    }
}
