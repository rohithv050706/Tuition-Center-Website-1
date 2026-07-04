import { db } from "@/db";
import { galleryImages } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function GalleryPage() {
  const images = await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-2">Gallery</h1>
      <p className="text-stone-500 mb-8">Glimpses of our center, classrooms, and events.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="rounded-xl overflow-hidden border border-stone-100 shadow-sm">
            <img src={img.imageUrl} alt={img.title || "Gallery image"} className="w-full h-48 object-cover" />
            {img.title && <p className="text-sm text-stone-600 p-3">{img.title}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
