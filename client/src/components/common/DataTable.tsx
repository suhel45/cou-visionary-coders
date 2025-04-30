// DataTable.tsx
import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
  error: string | null;
  searchPlaceholder?: string;
  searchFields?: string[];
  itemsPerPage?: number;
  onRetry?: () => void;
  expandableField?: string;
  expandableThreshold?: number;
  renderStats?: (filteredCount: number) => React.ReactNode;
  emptyStateMessage?: string;
  emptyStateIcon?: React.ReactNode;
  showPagination?: boolean;
}

function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  return keys.reduce(
    (o, key) => (o && o[key] !== undefined ? o[key] : ''),
    obj,
  );
}

const safeToString = (value: any): string => {
  if (value === null || value === undefined) return '';
  return String(value);
};

const safeToLowerCase = (value: any): string => {
  return safeToString(value).toLowerCase();
};

export function DataTable<T>({
  data,
  columns,
  isLoading,
  error,
  searchPlaceholder = 'Search...',
  searchFields = [],
  itemsPerPage = 10,
  onRetry,
  expandableField,
  expandableThreshold = 80,
  renderStats,
  emptyStateMessage = 'No data found',
  emptyStateIcon,
  showPagination = true,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  useEffect(() => {
    // Reset page when data changes
    setCurrentPage(1);
  }, [data]);

  useEffect(() => {
    // Reset page when search term changes
    setCurrentPage(1);
  }, [searchTerm]);

  const handleRowExpand = (idx: number) => {
    if (expandedRows.includes(idx)) {
      setExpandedRows(expandedRows.filter((rowIdx) => rowIdx !== idx));
    } else {
      setExpandedRows([...expandedRows, idx]);
    }
  };

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (dataArray: T[]) => {
    if (!sortConfig) return dataArray;

    return [...dataArray].sort((a, b) => {
      const aValue = safeToString(getNestedValue(a, sortConfig.key));
      const bValue = safeToString(getNestedValue(b, sortConfig.key));

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;

    return searchFields.some((field) => {
      const value = getNestedValue(item, field);
      return safeToLowerCase(value).includes(searchTerm.toLowerCase());
    });
  });

  const sortedData = getSortedData(filteredData);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));

  // Make sure currentPage is valid (between 1 and totalPages)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  // Only paginate if pagination is enabled
  const displayData = showPagination
    ? sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : sortedData;

  const renderSkeleton = () => (
    <tbody className="bg-white divide-y divide-gray-200">
      {[...Array(5)].map((_, idx) => (
        <tr key={idx}>
          {columns.map((column, colIdx) => (
            <td key={colIdx} className="px-6 py-4">
              <div
                className={`h-4 bg-gray-200 rounded animate-pulse ${column.width || 'w-full'}`}
              ></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          {renderSkeleton()}
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <div className="mb-4 text-red-500 font-medium">{error}</div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats summary if provided - pass the filtered count */}
      {renderStats && renderStats(filteredData.length)}

      {filteredData.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-md shadow">
          {emptyStateIcon || null}
          <p className="text-gray-500">{emptyStateMessage}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, idx) => (
                    <th
                      key={idx}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                      onClick={() => column.sortable && requestSort(column.key)}
                    >
                      <div className="flex items-center">
                        {column.header}
                        {sortConfig?.key === column.key && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayData.map((item, idx) => {
                  const actualIdx = showPagination
                    ? (currentPage - 1) * itemsPerPage + idx
                    : idx;
                  const isExpanded = expandedRows.includes(actualIdx);

                  // Check if we have an expandable field and if it should be truncated
                  const expandableContent = expandableField
                    ? getNestedValue(item, expandableField)
                    : null;
                  const shouldTruncate =
                    expandableContent &&
                    expandableContent.length > expandableThreshold;

                  return (
                    <tr key={actualIdx} className="hover:bg-gray-50">
                      {columns.map((column, colIdx) => {
                        // Check if this column contains the expandable field
                        const isExpandableColumn =
                          expandableField && column.key === expandableField;

                        if (isExpandableColumn && shouldTruncate) {
                          return (
                            <td
                              key={colIdx}
                              className="px-6 py-4 whitespace-normal"
                            >
                              {!isExpanded ? (
                                <>
                                  <p>
                                    {expandableContent.substring(
                                      0,
                                      expandableThreshold,
                                    )}
                                    ...
                                  </p>
                                  <button
                                    onClick={() => handleRowExpand(actualIdx)}
                                    className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                                  >
                                    Show more
                                  </button>
                                </>
                              ) : (
                                <>
                                  <p>{expandableContent}</p>
                                  <button
                                    onClick={() => handleRowExpand(actualIdx)}
                                    className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                                  >
                                    Show less
                                  </button>
                                </>
                              )}
                            </td>
                          );
                        }

                        // Regular column rendering
                        return (
                          <td
                            key={colIdx}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {column.render
                              ? column.render(item)
                              : safeToString(getNestedValue(item, column.key))}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination controls - only show if pagination is enabled */}
          {showPagination && (
            <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
              <div>
                Showing{' '}
                {filteredData.length > 0
                  ? (currentPage - 1) * itemsPerPage + 1
                  : 0}{' '}
                to {Math.min(currentPage * itemsPerPage, filteredData.length)}{' '}
                of {filteredData.length} entries
              </div>
              {totalPages > 1 && (
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    Previous
                  </button>
                  <div className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
