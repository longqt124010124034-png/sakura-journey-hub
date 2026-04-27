import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

export type Branding = {
  logo_url?: string | null
  favicon_url?: string | null
  center_name_vn?: string | null
  center_name_jp?: string | null
  center_name_en?: string | null
}

export function useBranding() {
  const [branding, setBranding] = useState<Branding>({})

  useEffect(() => {
    let mounted = true
    supabase
      .from('footer_settings')
      .select('logo_url, favicon_url, center_name_vn, center_name_jp, center_name_en')
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (mounted && data) setBranding(data)
      })
    return () => {
      mounted = false
    }
  }, [])

  // Update favicon link in <head> when favicon_url changes
  useEffect(() => {
    if (!branding.favicon_url) return
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = branding.favicon_url
  }, [branding.favicon_url])

  return branding
}