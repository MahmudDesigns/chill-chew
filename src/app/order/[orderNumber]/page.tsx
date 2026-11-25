import type { Metadata } from "next";
import { OrderTracker } from "@/components/OrderTracker";

export const metadata: Metadata = {
  title: "Order status",
  description: "Live status for your Chill & Chew order.",
  robots: { index: false, follow: false },
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  return <OrderTracker number={decodeURIComponent(orderNumber)} />;
}
