import { toast } from "sonner"

export function useToast() {
  return {
    toast: (options: any) => toast(options.title || options.message || "", {
      description: options.description,
      duration: options.duration || 5000,
    })
  }
}
