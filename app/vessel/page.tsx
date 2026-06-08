import { Vessel } from "@/components/sections/Vessel";

export const metadata = {
  title: "The Vessel — Sail, Supper & Soul Club",
  description: "A 51-foot Lagoon catamaran, cared for like home.",
};

export default function VesselPage() {
  return (
    <div className="pt-20">
      <Vessel />
      {/* TODO: Add detailed deck plan, specifications PDF, full gallery */}
    </div>
  );
}
