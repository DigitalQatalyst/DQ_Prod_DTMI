import { useState, useEffect } from 'react'
import { mapApiItemToDetailProps } from '../utils/mediaMappers'
export interface MediaItemResult {
  item: any | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
}
/**
 * Hook for fetching a single media item by slug
 */
export function useMediaItem({ slug }: { slug: string }): MediaItemResult {
  const [item, setItem] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const fetchItem = async () => {
    try {
      setIsLoading(true)
      setError(null)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      // No fallback data - item not found
      throw new Error(`Item with slug "${slug}" not found`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred while fetching the item'),
      )
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (slug) {
      fetchItem()
    }
  }, [slug])
  const refetch = () => {
    fetchItem()
  }
  return {
    item,
    isLoading,
    error,
    refetch,
  }
}
