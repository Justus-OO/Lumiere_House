export default function FilmCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] w-full bg-gray-200 mb-6" />
      <div className="h-4 w-1/3 bg-gray-200 mb-2" />
      <div className="h-8 w-3/4 bg-gray-200" />
    </div>
  );
}