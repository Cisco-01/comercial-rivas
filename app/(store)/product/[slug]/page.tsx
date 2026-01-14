import AddToBasketButton from "@/components/AddToBasketButton";
import {
  TagIcon,
} from "@/components/DescriptionIcons";
import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 60; // Revalidate every 60 seconds

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock =
    !Array.isArray(product) && product.stock != null && product.stock <= 0;

  const listedDescription = () => {
    const icons = [TagIcon];

    return (
      <div className="flex flex-col gap-x-4 gap-y-4 mb-6 items-start">
        {!Array.isArray(product) &&
          Array.isArray(product.description) &&
          icons.map((Icon, index) => (
            <div key={index} className="flex items-center">
              <div>
                <Icon />
              </div>
              <div className="prose max-w-none ml-2">
                {product.description && (
                  <PortableText value={[product.description[index]]} />
                )}
              </div>
            </div>
          ))}
      </div>
    );
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {!Array.isArray(product) && product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-white font-bold text-lg">Sin stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          {!Array.isArray(product) && (
            <h1 className="text-3xl font-bold mb-4 break-all max-w-2xl">
              {product.name}
            </h1>
          )}

          {listedDescription()}

          <div className="text-2xl font-semibold flex gap-x-8">
            {!Array.isArray(product) && product.price !== null ? (
              <>S/{product.price.toFixed(2)}</>
            ) : null}

            {!Array.isArray(product) && (
              <AddToBasketButton
                product={product as unknown as Product}
                disabled={isOutOfStock}
              />
            )}
          </div>
          {/* Tabla de especificaciones */}
          <div className="mt-10 sm:row-start-3 sm:col-start-1 md:col-start-3 w-full md:w-auto">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              INFORMACIÓN ADICIONAL
            </h3>
            {!Array.isArray(product) && (
              <div className="grid grid-cols-1 md:gap-4">
                {/* Grupo 1 */}
                <table className=" divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Campo
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {/* Marca */}
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">
                        Marca
                      </td>
                      <td className="px-4 py-2">
                        {product.brand?.logo ? (
                          <Image
                            src={imageUrl(product.brand.logo).url()}
                            alt={product.brand?.name ?? "Logo de la marca"}
                            title={product.brand?.name ?? "Logo de la marca"}
                            className="w-44 h-full object-contain"
                            width={2000}
                            height={2000}
                          />
                        ) : (
                          product.brand?.name
                        )}
                      </td>
                    </tr>

                    {/* Modelo */}
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">
                        Modelo
                      </td>
                      <td className="px-4 py-2">{product.model?.name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
