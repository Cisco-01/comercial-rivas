import { imageUrl } from "@/lib/imageUrl";
import { getAllBrands } from "@/sanity/lib/brands/getAllBrands";
import { ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

async function MarcasWall() {
  const brands = await getAllBrands();
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 to-blue-50 text-center mx-3 p-3 rounded-lg outline-2 outline-orange-600 shadow-lg shadow-white mt-20">
      {/*<div className="container mx-auto px-4 py-4">
        <div className="flex justify-center">
          <Image
            src="/images/grupoial-logo.png"
            className="w-32 md:w-44 mb-4 mx-auto"
            width={2000}
            height={2000}
            alt="Grupo Ial logo"
          />
        </div>
      </div>*/}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Líderes en el mercado peruano
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Encuentra marcas reconocidas, ofertas especiales y soluciones para todo.
        </p>
      </div>
      {/* Corporate Sales CTA 
      <div
        className="bg-[url(/images/commercial-vehicle-on-mountain-road.jpg)] bg-no-repeat bg-center bg-cover rounded-2xl p-4 md:p-12 text-center text-white mb-16"
        data-aos="fade-up"
        data-aos-offset="100"
        data-aos-easing="ease-in-sine"
      >
        <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-2xl backdrop-blur-2xl">
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ventas Corporativas
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Soluciones personalizadas para empresas. Descubre nuestros servicios
            especializados y obtén las mejores condiciones comerciales.
          </p>
          <Link href="/ventas-corporativas">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 md:text-lg rounded-full font-semibold transition-all duration-300 hover:scale-105 flex w-fit mx-auto"
            >
              Explorar Servicios
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>*/}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 uppercase">
          Principales Marcas
        </h2>
        <h3 className="text-red-500 text-lg font-medium mb-6 uppercase">
          de reconocimiento mundial
        </h3>
        <p className="text-sm md:text-base max-w-4xl mx-auto mb-8">
          Ofrecemos productos de alta calidad de las marcas más confiables del
          mercado, garantizando satisfacción y rendimiento.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-8 items-center justify-center">
            {brands.map((item) => (
              <Link
                href={`/brand/${item.name?.toLowerCase().replace(/\s/g, "-")}`}
                passHref
                key={item._id}
                className="gap-4 items-center justify-center grid hover:bg-black/25 dark:hover:bg-black/25 transition ease-in-out duration-300 rounded-lg p-4 text-gray-700 dark:text-gray-200 font-semibold hover:scale-105"
                data-aos="flip-right"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
              >
                {item?.logo ? (
                  <Image
                    src={imageUrl(item?.logo).url()}
                    alt={item?.name ?? "Logo de la marca"}
                    title={item?.name ?? "Logo de la marca"}
                    className="w-44 md:w-36 h-12 md:h-20 object-contain hover:scale-110 transition ease-in-out duration-500"
                    width={2000}
                    height={2000}
                  />
                ) : (
                  item?.name
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarcasWall;
