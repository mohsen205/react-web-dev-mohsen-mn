import Error from "@/components/custom-ui/Error";
import Loading from "@/components/custom-ui/Loading";
import { getProductById } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const Product = () => {
  const { id } = Route.useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <div className="product-details">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <img src={data.thumbnail} alt={data.title} className="w-full h-auto" />
        <p className="mt-4">{data.description}</p>
        <p className="mt-2 text-lg font-semibold">Price: ${data.price}</p>
        <p className="mt-2">Category: {data.category}</p>
        <p className="mt-2">Brand: {data.brand}</p>
        <p className="mt-2">Rating: {data.rating} / 5</p>
        <p className="mt-2">Stock: {data.stock} available</p>
        <p className="mt-2">Discount: {data.discountPercentage}%</p>
        <h2 className="mt-4 text-xl">Images</h2>
        <div className="image-gallery">
          {data.images.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-1/4 h-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/product/$id")({
  component: Product,
});
