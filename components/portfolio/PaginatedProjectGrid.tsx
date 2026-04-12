"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/portfolio";
import { DEFAULT_PAGE_SIZE, getTotalPages, slicePageItems, type PageSize } from "@/lib/pagination";
import { cn } from "@/lib/utils";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { ProjectCard } from "./ProjectCard";

interface PaginatedProjectGridProps {
  projects: Project[];
  gridClassName?: string;
  className?: string;
}

export function PaginatedProjectGrid({
  projects,
  gridClassName,
  className,
}: PaginatedProjectGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(DEFAULT_PAGE_SIZE);

  const totalPages = useMemo(
    () => getTotalPages(projects.length, pageSize),
    [projects.length, pageSize],
  );

  const visibleProjects = useMemo(
    () => slicePageItems(projects, currentPage, pageSize),
    [projects, currentPage, pageSize],
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  return (
    <div className={cn("space-y-6", className)}>
      <PaginationControls
        totalItems={projects.length}
        currentPage={currentPage}
        pageSize={pageSize}
        itemLabel="projects"
        onPageChange={setCurrentPage}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setCurrentPage(1);
        }}
      />

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", gridClassName)}>
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
