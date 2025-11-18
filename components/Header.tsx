"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, { quantity }) => total + quantity, 0)
  );

  /*const createClerkPassKey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  };*/
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2 sticky top-0 bg-white/50 z-50 backdrop-blur shadow-md rounded-b-lg">
      {/* Fila Superior */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto md:mx-0 uppercase"
        >
          Comercial Rivas
          {/*<Image
            src="/images/UNIVERSAL-P1.png"
            className="w-32"
            width={2000}
            height={2000}
            alt=""
          />*/}
        </Link>

        <Form
          action="/search"
          className="w-full md:w-auto md:flex-1 md:mx-4 mt-2 md:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Buscar Productos"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border w-full max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 md:mt-0 flex-1 sm:flex-none w-full justify-start md:w-auto">
          <Link
            href="/cart"
            className="relative flex flex-1 justify-evenly sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex
            items-center justify-center text-xs"
            >
              {itemCount}
            </span>
            <span>Carrito</span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex flex-1 relative justify-evenly sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span className="text-center">Pedidos</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2 ml-auto right-0">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {/* Crear llave maestra - Pro Plan
            user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPassKey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
              >
                Crear llave de acceso
              </button>
            )*/}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
