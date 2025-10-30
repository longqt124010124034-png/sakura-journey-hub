export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          description: string
          id: string
          language: string
          mission: string
          title: string
          updated_at: string | null
        }
        Insert: {
          description: string
          id?: string
          language: string
          mission: string
          title: string
          updated_at?: string | null
        }
        Update: {
          description?: string
          id?: string
          language?: string
          mission?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          capacity: number
          code: string
          created_at: string | null
          description_en: string | null
          description_jp: string | null
          description_vn: string
          duration: string
          highlights_en: string[] | null
          highlights_jp: string[] | null
          highlights_vn: string[]
          id: string
          is_active: boolean | null
          level: string
          material: string
          name_en: string | null
          name_jp: string | null
          name_vn: string
          updated_at: string | null
        }
        Insert: {
          capacity: number
          code: string
          created_at?: string | null
          description_en?: string | null
          description_jp?: string | null
          description_vn: string
          duration: string
          highlights_en?: string[] | null
          highlights_jp?: string[] | null
          highlights_vn: string[]
          id?: string
          is_active?: boolean | null
          level: string
          material: string
          name_en?: string | null
          name_jp?: string | null
          name_vn: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number
          code?: string
          created_at?: string | null
          description_en?: string | null
          description_jp?: string | null
          description_vn?: string
          duration?: string
          highlights_en?: string[] | null
          highlights_jp?: string[] | null
          highlights_vn?: string[]
          id?: string
          is_active?: boolean | null
          level?: string
          material?: string
          name_en?: string | null
          name_jp?: string | null
          name_vn?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer_en: string | null
          answer_jp: string | null
          answer_vn: string
          category: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          question_en: string | null
          question_jp: string | null
          question_vn: string
          updated_at: string | null
        }
        Insert: {
          answer_en?: string | null
          answer_jp?: string | null
          answer_vn: string
          category?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          question_en?: string | null
          question_jp?: string | null
          question_vn: string
          updated_at?: string | null
        }
        Update: {
          answer_en?: string | null
          answer_jp?: string | null
          answer_vn?: string
          category?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          question_en?: string | null
          question_jp?: string | null
          question_vn?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_jp: string | null
          description_vn: string | null
          display_order: number | null
          features_en: string[] | null
          features_jp: string[] | null
          features_vn: string[]
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name_en: string | null
          name_jp: string | null
          name_vn: string
          period_en: string | null
          period_jp: string | null
          period_vn: string
          price: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_jp?: string | null
          description_vn?: string | null
          display_order?: number | null
          features_en?: string[] | null
          features_jp?: string[] | null
          features_vn: string[]
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name_en?: string | null
          name_jp?: string | null
          name_vn: string
          period_en?: string | null
          period_jp?: string | null
          period_vn: string
          price: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_jp?: string | null
          description_vn?: string | null
          display_order?: number | null
          features_en?: string[] | null
          features_jp?: string[] | null
          features_vn?: string[]
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name_en?: string | null
          name_jp?: string | null
          name_vn?: string
          period_en?: string | null
          period_jp?: string | null
          period_vn?: string
          price?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_jp: string | null
          description_vn: string
          display_order: number | null
          experience: string
          id: string
          image_url: string | null
          is_active: boolean | null
          name_en: string | null
          name_jp: string | null
          name_vn: string
          rating: number | null
          role_en: string | null
          role_jp: string | null
          role_vn: string
          specialties_en: string[] | null
          specialties_jp: string[] | null
          specialties_vn: string[]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_jp?: string | null
          description_vn: string
          display_order?: number | null
          experience: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name_en?: string | null
          name_jp?: string | null
          name_vn: string
          rating?: number | null
          role_en?: string | null
          role_jp?: string | null
          role_vn: string
          specialties_en?: string[] | null
          specialties_jp?: string[] | null
          specialties_vn: string[]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_jp?: string | null
          description_vn?: string
          display_order?: number | null
          experience?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name_en?: string | null
          name_jp?: string | null
          name_vn?: string
          rating?: number | null
          role_en?: string | null
          role_jp?: string | null
          role_vn?: string
          specialties_en?: string[] | null
          specialties_jp?: string[] | null
          specialties_vn?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
