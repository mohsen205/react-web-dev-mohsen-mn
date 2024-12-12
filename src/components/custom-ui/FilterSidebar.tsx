import { FC, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCategoryList } from "@/services/category";
import { CategoryInt } from "@/types/category";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

export interface FilterInt {
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  categories?: string;
  q?: string;
}

const FilterSidebar: FC<{ onFilterChange: (filters: FilterInt) => void }> = ({
  onFilterChange,
}) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["categories-list"],
    queryFn: getCategoryList,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onFilterChange({ q: searchQuery });
  };

  const handleCheckboxChange = (slug: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(slug)) {
        return prevSelected.filter((category) => category !== slug);
      } else {
        return [...prevSelected, slug];
      }
    });
  };

  const applyFilters = () => {
    const filters: FilterInt = {
      categories: selectedCategories.join(","),
    };
    onFilterChange(filters);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Filters</h2>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="category">
          <AccordionTrigger>Filter by Categories</AccordionTrigger>
          <AccordionContent>
            {isLoading && "Loading"}
            {isError && "Error"}
            {!isLoading &&
              !isError &&
              data.map((category: CategoryInt) => (
                <div>
                  <div className="items-top flex space-x-2 mt-3">
                    <Checkbox
                      id={category.slug}
                      value={category.slug}
                      onChange={() => handleCheckboxChange(category.slug)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={category.slug}>{category.name}</Label>
                    </div>
                  </div>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Filter by Price</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="mt-4">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
