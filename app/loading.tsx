import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading amazing products...</p>
      </div>
    </div>
  )
}
