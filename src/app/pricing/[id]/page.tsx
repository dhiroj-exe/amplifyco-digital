import { getPackageById, pricingData } from "@/lib/pricing";
import { notFound } from "next/navigation";
import PackageDetailClient from "./PackageDetailClient";

export async function generateStaticParams() {
  const allPackages = [
    ...pricingData.socialMedia,
    ...pricingData.webDevelopment,
    ...pricingData.oneTime
  ];
  return allPackages.map((pkg) => ({
    id: pkg.id,
  }));
}

export default async function PackageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = getPackageById(id);

  if (!pkg) {
    notFound();
  }

  return <PackageDetailClient pkg={pkg} />;
}
