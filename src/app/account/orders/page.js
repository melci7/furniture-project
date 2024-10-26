import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Package, Calendar, DollarSign, MapPin } from "lucide-react"
import { getUserOrders, getOrderDetails } from "@/lib/userService"
import Image from "next/image"
import Link from "next/link"

export default async function Orders() {
  const session = await getServerSession(authOptions)

  const userId = session.user.id
  const orderIds = await getUserOrders(userId)
  const orders = await Promise.all(orderIds.map((id) => getOrderDetails(id)))

  return (
    <div className="max-w-2xl w-full lg:m-0 sm:m-auto lg:border border-[#dfdfdf] rounded-2xl lg:p-8">
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="w-full">
            <div className="lg:mb-6 mb-5">
              <h1 className="lg:text-3xl text-2xl font-semibold">Orders</h1>
              <p className="text-[#636363] lg:mt-2 mt-0.5 lg:text-base text-sm">
                View your order history
              </p>
            </div>
            <div className="lg:space-y-8 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-[#dfdfdf] rounded-lg lg:p-6 p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="font-semibold lg:text-base text-[15px] flex items-center">
                        <Package size={18} className="mr-2" /> Order{" "}
                        {order.id * 2880}
                      </span>
                      <span className="lg:text-sm text-xs text-[#636363] flex items-center mt-1 ">
                        <Calendar size={14} className="inline mr-2" />
                        {new Date(order.order_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-sm">Total</span>
                      <span className="lg:text-lg font-bold block">
                        $
                        {order.items
                          .reduce((total, item) => {
                            const itemTotal = item.price * item.quantity
                            if (itemTotal < 2000) {
                              return total + itemTotal * 1.1 + 199
                            }
                            return total + itemTotal
                          }, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md mb-4">
                    <h3 className="text-xs font-semibold mb-1 flex items-center text-gray-700">
                      <MapPin size={14} className="lg:mr-2 mr-1" /> Shipping
                      Address
                    </h3>
                    <p className="text-[13px] text-gray-600">
                      {order.shipping_address}
                    </p>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-semibold mb-2 text-sm lg:text-base">
                        Items:
                      </h3>
                      <ul className="space-y-4">
                        {order.items.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <Link
                              href={`/store/${item.product_id}`}
                              className="w-16 h-16 relative flex-shrink-0"
                            >
                              <Image
                                src={item.image}
                                alt={item.product_name}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-md"
                              />
                            </Link>
                            <div>
                              <Link
                                href={`/store/${item.product_id}`}
                                className="font-medium text-sm lg:text-base hover:underline"
                              >
                                {item.product_name}
                              </Link>
                              <p className="text-xs lg:text-sm text-[#636363]">
                                Quantity: {item.quantity}, Price: ${item.price}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-[#FFA500] text-[13px]">Processing</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
