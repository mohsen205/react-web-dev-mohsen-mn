import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getCategoryListBySlug } from "@/services/category";
import { ProductInt } from "@/types/product";
import Card from "@/components/custom-ui/Card";

const Products = () => {
  const { slug } = Route.useParams();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["category-list", slug],
    queryFn: () => getCategoryListBySlug(slug),
    enabled: !!slug,
  });

  if (isError) {
    return "Error: ";
  }

  if (isLoading) {
    return "Loading category list";
  }

  return (
    <div className="container mx-auto">
      <main>
        <div className="grid grid-cols-12">
          <div className="col-span-3">sidebar</div>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export const Route = createFileRoute("/products/$slug")({
  component: Products,
});
