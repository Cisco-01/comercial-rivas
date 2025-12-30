import Link from "next/link";

function HelpFooter() {
  const messageAsesoria = `Buen día, estoy interesad@ en una asesoria personalizada.`;
  const whatsappLinkAsesoria = `https://api.whatsapp.com/send?phone=51926798469&text=${encodeURIComponent(
    messageAsesoria
  )}`;
  const messageImportacion = `Buen día, estoy interesad@ en comprar sus productos.`;
  const whatsappLinkImportacion = `https://api.whatsapp.com/send?phone=51926798469&text=${encodeURIComponent(
    messageImportacion
  )}`;
  return (
    <footer className="text-stone-700 py-10 text-start">
      <div className="container mx-auto px-4 justify-center items-center text-center">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mb-8 md:mb-0">
            <h3 className="text-md font-semibold mb-2">Nuestros servicios</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-zinc-400 hover:text-neutral-500 text-sm">
                    Asesoría Personalizada
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-zinc-400 hover:text-neutral-500 text-sm">
                    Importación de productos
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-2">Soporte</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/"
                className="block text-slate-400 hover:text-blue-400 transition-colors"
              >
                Contáctanos
              </Link>
              <Link
                href="/"
                className="block text-slate-400 hover:text-blue-400 transition-colors"
              >
                Soporte Técnico
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HelpFooter;
