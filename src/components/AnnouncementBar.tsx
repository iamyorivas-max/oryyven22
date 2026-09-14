import { announcement } from "@/data/site";

export function AnnouncementBar() {
  return (
    <div className="bg-bordeaux text-white">
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[10px] font-medium tracking-[0.18em] sm:text-[11px]">
        {announcement}
      </p>
    </div>
  );
}
