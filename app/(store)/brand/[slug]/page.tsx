import ProductsViewSearched from "@/components/ProductsViewSearched";
import { getProductByBrand } from "@/sanity/lib/products/getProductByBrand";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "@sanity/icons";
import { getAllBrands } from "@/sanity/lib/brands/getAllBrands";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import BlackFridayBanner from "@/components/BlackFridayBanner";

async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const products = await getProductByBrand(slug);
  const brands = await getAllBrands();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="hover:text-gray-700 flex items-center space-x-1"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Inicio</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="border-2 px-1 rounded hover:bg-orange-200">
                  Marcas
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="bg-white/80 backdrop-blur border border-orange-200 shadow-lg rounded-lg"
                >
                  {brands.map((brand, index) => {
                    const key = brand.slug?.current || `brand-${index}`;
                    return (
                      <DropdownMenuItem key={key}>
                        <BreadcrumbLink
                          key={`${key}-link`} // extra seguridad
                          href={`/brand/${brand.slug?.current}`}
                          className="text-gray-600 font-thin tracking-wide uppercase hover:text-gray-900"
                        >
                          {brand.name}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {slug === "llantas-y-aros-universal" && <BlackFridayBanner />}
        <div className="text-3xl md:text-4xl font-bold m-6 text-center">
          Colección de {/* Mostrar el logo de la marca */}
          {(() => {
            const brand = brands.find((b) => b.slug?.current === slug);
            if (brand?.logo) {
              return (
                <div className="flex justify-center my-3">
                  <Image
                    src={imageUrl(brand.logo).url()}
                    alt={brand.name ?? "Product image"}
                    width={180}
                    height={90}
                    className="object-contain"
                    priority
                  />
                </div>
              );
            }
            return (
              <>
                {slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </>
            );
          })()}
        </div>

        <ProductsViewSearched products={products} />
      </div>
    </div>
  );
}

export default BrandPage;
