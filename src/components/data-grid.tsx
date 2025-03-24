"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";

interface Column<T> {
  header: string;
  accessorKey: keyof T | ((row: T) => any);
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
}

export default function DataGrid<T>({
  data,
  columns,
  searchable = true,
  pagination = true,
  pageSize = 10,
  className = "",
}: DataGridProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | ((row: T) => any) | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Update filtered data when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = data.filter((item) => {
        return Object.values(item).some((value) => {
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(lowercasedSearch);
        });
      });
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, data]);

  // Sort data when sort config changes
  useEffect(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key && sortConfig.direction) {
      sortableData.sort((a, b) => {
        let aValue =
          typeof sortConfig.key === "function"
            ? sortConfig.key(a)
            : a[sortConfig.key as keyof T];
        let bValue =
          typeof sortConfig.key === "function"
            ? sortConfig.key(b)
            : b[sortConfig.key as keyof T];

        if (aValue === null || aValue === undefined) aValue = "";
        if (bValue === null || bValue === undefined) bValue = "";

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortConfig.direction === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
            ? 1
            : -1;
      });
    }
    setFilteredData(sortableData);
  }, [sortConfig]);

  // Update paginated data when filtered data or current page changes
  useEffect(() => {
    if (pagination) {
      const totalPages = Math.ceil(filteredData.length / pageSize);
      setTotalPages(totalPages || 1);

      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      setPaginatedData(filteredData.slice(start, end));
    } else {
      setPaginatedData(filteredData);
    }
  }, [filteredData, currentPage, pagination, pageSize]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    let direction: "asc" | "desc" | null = "asc";

    if (sortConfig.key === column.accessorKey) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({
      key: direction ? column.accessorKey : null,
      direction,
    });
  };

  const getCellValue = (row: T, column: Column<T>) => {
    if (column.cell) {
      return column.cell(row);
    }

    const value =
      typeof column.accessorKey === "function"
        ? column.accessorKey(row)
        : row[column.accessorKey as keyof T];

    return value as React.ReactNode;
  };

  return (
    <div className={className}>
      {searchable && (
        <div className="mb-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cerca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={
                    column.sortable ? "cursor-pointer select-none" : ""
                  }
                  onClick={() => column.sortable && handleSort(column)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable &&
                      sortConfig.key === column.accessorKey && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nessun risultato trovato
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {getCellValue(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Pagina {currentPage} di {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Select
              value={currentPage.toString()}
              onValueChange={(value) => setCurrentPage(parseInt(value))}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder={currentPage.toString()} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <SelectItem key={page} value={page.toString()}>
                      {page}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
