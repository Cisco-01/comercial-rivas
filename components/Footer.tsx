import Link from "next/link";
import HelpFooter from "./HelpFooter";
import { ClockIcon, EnvelopeIcon } from "@sanity/icons";
import { MapPinIcon, PhoneIcon } from "lucide-react";

function Footer() {
  return (
    <footer className="bottom-0 text-black">
      <div className="px-4 pb-4 backdrop-blur-3xl">
        <hr className="border-[1.5px] border-zinc-100 my-10 w-11/12 md:w-10/12 mx-auto" />
        <div className="flex flex-col text-xs md:text-sm md:flex-row md:flex-wrap justify-center items-center text-center gap-2 text-neutral-500 cursor-default">
          {/*<div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/grupoial-logo2.png"
                className="w-14 md:w-20 hover:scale-105 transition ease-in-out duration-300"
                width={2000}
                height={2000}
                alt="Grupo Ial logo"
              />
            </div>
          </div>*/}
          <p className="mt-2 sm:mt-4 px-8">
            <EnvelopeIcon className="h-7 w-7 mx-auto hover:text-neutral-600 hover:scale-95" />
            soporte@comercialrivas.com
          </p>

          <p className="mt-2 sm:mt-4 px-8">
            <PhoneIcon className="h-7 w-7 mx-auto hover:text-neutral-600 hover:scale-95" />
            +51 966 123 456
          </p>
          <p className="mt-2 sm:mt-4 px-8">
            <ClockIcon className="h-7 w-7 mx-auto hover:text-neutral-600 hover:scale-95" />
            Lun a Sab 08:00 am - 07:00 pm
          </p>
          <Link href="/" passHref className="mt-2 sm:mt-4 px-8">
            <MapPinIcon className="h-7 w-7 mx-auto hover:text-orange-600 hover:scale-95 hover:cursor-pointer" />
            Ubícanos en nuestras diferentes tiendas.
          </Link>
        </div>
        {/*<MetodoPago />*/}
        <HelpFooter />
        <hr className="border-[1.5px] border-zinc-100 my-10 w-11/12 md:w-10/12 mx-auto" />
        <div className="text-xs mb-8 text-center text-blue-500">
          <span>&copy; {new Date().getFullYear()} COMERCIAL RIVAS</span>
          <br />
          <span>Todos los derechos reservados</span>
        </div>
        <div className="flex justify-center space-x-6 text-xs">
          <Link
            href="/"
            className="text-slate-400 hover:text-orange-400 transition-colors"
          >
            Política de Privacidad
          </Link>
          <a
            href="/"
            className="text-slate-400 hover:text-orange-400 transition-colors"
          >
            Términos de Servicio
          </a>
        </div>
        {/*<BtnWspHelp />*/}
      </div>
    </footer>
  );
}

export default Footer;
