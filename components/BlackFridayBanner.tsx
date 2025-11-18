import { COUPON_CODES } from "@/sanity/lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.LANZAP);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 my-2 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
              {sale.title}
            </h2>
            {/*<Image
              src="/images/UNIVERSAL-Ico1.jpg"
              className="w-24 h-24 ml-2"
              width={2000}
              height={2000}
              alt={sale.title!}
            />*/}
          </div>
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
            {sale.description}
          </p>

          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300 text-center">
              <span className="font-bold text-base sm:text-xl">
                Usa el código:{" "}
                <span className="text-red-600">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-xl">
                para un {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;
