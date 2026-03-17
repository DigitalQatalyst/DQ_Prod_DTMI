/**
 * Supabase Client Configuration
 * Direct client for React app (no backend)
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get user by auth_user_id
 * TODO: update to use Supabase auth user id once Supabase auth is implemented
 */
export async function getUserByAuthId(authUserId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", authUserId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = not found, which is expected for new users
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

/**
 * Get user permissions
 */
export async function getUserPermissions(authUserId: string) {
  try {
    console.log("[Supabase] Fetching permissions for user:", authUserId);

    const { data, error } = await supabase.rpc("get_user_permissions", {
      p_auth_user_id: authUserId,
    });

    if (error) {
      console.error("[Supabase] Failed to fetch permissions:", error);
      return [];
    }

    console.log("[Supabase] Permissions fetched:", data?.length || 0);
    return data || [];
  } catch (error) {
    console.error("[Supabase] Error fetching permissions:", error);
    return [];
  }
}

/**
 * Check if user has permission
 */
export async function checkUserPermission(
  authUserId: string,
  resource: string,
  action: string,
): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc("check_user_permission", {
      p_auth_user_id: authUserId,
      p_resource: resource,
      p_action: action,
    });

    if (error) {
      console.error("Failed to check permission:", error);
      return false;
    }

    return data === true;
  } catch (error) {
    console.error("Error checking permission:", error);
    return false;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Record<string, unknown>,
) {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
}
