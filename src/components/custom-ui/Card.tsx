import { ProductInt } from "@/types/product";
import { FC } from "react";
import { Card as ShadcnCard, CardHeader, CardContent } from "../ui/card";
import { Link } from "@tanstack/react-router";

type ProductProps = Pick<
  ProductInt,
  "title" | "category" | "price" | "discountPercentage" | "images" | "id"
>;

const Card: FC<ProductProps> = ({
  title,
  category,
  price,
  discountPercentage,
  images,
  id,
}) => {
  return (
    <ShadcnCard className="rounded-none shadow-none border">
      <CardHeader>
        <img src={images[0]} alt={title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent>
        <Link to={`/product/${id}`} className="text-lg block">
          {title}
        </Link>
        <Link
          to={`/products/${category}`}
          className="text-sm text-gray-500 uppercase"
        >
          {category}
        </Link>
        <p className="text-xl ">${price.toFixed(2)}</p>
        {discountPercentage > 0 && (
          <p className="text-green-900 font-semibold text-sm">
            {discountPercentage}% Off
          </p>
        )}
      </CardContent>
    </ShadcnCard>
  );
};

export default Card;
