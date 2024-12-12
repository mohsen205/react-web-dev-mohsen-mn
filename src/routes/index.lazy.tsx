import Card from "@/components/custom-ui/Card";
import Error from "@/components/custom-ui/Error";
import FilterSidebar from "@/components/custom-ui/FilterSidebar";
import Loading from "@/components/custom-ui/Loading";
import NotData from "@/components/custom-ui/NotData";
import Pagination from "@/components/custom-ui/Pagination";
import { getProductsList } from "@/services/product";
import { FilterInt } from "@/types/filter";
import { ProductInt } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const Index = () => {
  const [pagination, setPagination] = useState<{ limit: number; skip: number }>(
    {
      limit: 10,
      skip: 0,
    }
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isLoading, isError, data } = useQuery({
    queryKey: ["products-list", pagination.skip, pagination.limit, searchQuery],
    queryFn: () =>
      getProductsList({
        skip: pagination.skip,
        limit: pagination.limit,
        q: searchQuery,
      }),
  });

  const onFilterChange = (filters: FilterInt) => {
    if (filters.q) {
      setSearchQuery(filters.q);
    }
  };

  return (
    <div className="container mx-auto">
      <main>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <FilterSidebar onFilterChange={onFilterChange} />
          </div>

          {isError && <Error />}
          {isLoading && <Loading />}
          <>
            {!isLoading && !isError && data.products.length !== 0 ? (
              <div className="col-span-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {data.products.map((product: ProductInt) => (
                    <Card
                      id={product.id}
                      key={product.id}
                      title={product.title}
                      category={product.category}
                      images={product.images}
                      price={product.price}
                      discountPercentage={product.discountPercentage}
                    />
                  ))}
                </div>
                <div>
                  <Pagination
                    setPagination={setPagination}
                    limit={data.limit}
                    skip={data.skip}
                    total={data.total}
                  />
                </div>
              </div>
            ) : (
              <div className="col-span-9">
                <NotData searchKey={searchQuery} />
              </div>
            )}
          </>
        </div>
      </main>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
