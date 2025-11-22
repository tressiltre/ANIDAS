import { useToast as useSonnerToast } from "sonner"

export function useToast() {
  const { toast } = useSonnerToast()
  return {
    toast: (options: any) => toast(options.title || options.message || "", {
      description: options.description,
      duration: options.duration || 5000,
    })
  }
}
