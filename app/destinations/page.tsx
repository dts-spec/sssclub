import { Destinations } from "@/components/sections/Destinations";

export const metadata = {
  title: "Destinations — Sail, Supper & Soul Club",
  description:
    "Five waters, one boat. Marina Del Rey, Catalina, Baja, Vancouver Island.",
};

export default function DestinationsPage() {
  return (
    <div className="pt-20">
      <Destinations />
    </div>
  );
}
