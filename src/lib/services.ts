import { createServerSupabaseClient } from "./supabase/server";
import { Course } from "./types";

type DashboardErrorCode = "SUPABASE_CONFIG" | "SUPABASE_QUERY" | "UNKNOWN";

export class DashboardDataError extends Error {
  code: DashboardErrorCode;
  cause?: unknown;

  constructor(message: string, code: DashboardErrorCode, cause?: unknown) {
    super(message);
    this.name = "DashboardDataError";
    this.code = code;
    this.cause = cause;
  }
}

function toDashboardError(error: unknown): DashboardDataError {
  if (error instanceof DashboardDataError) {
    return error;
  }

  if (error instanceof Error) {
    return new DashboardDataError(error.message, "UNKNOWN", error);
  }

  return new DashboardDataError("An unexpected error occurred", "UNKNOWN", error);
}

export async function fetchCourses(): Promise<Course[]> {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new DashboardDataError(
        `Failed to load courses: ${error.message}`,
        "SUPABASE_QUERY",
        error
      );
    }

    return data ?? [];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Missing Supabase credentials")) {
      throw new DashboardDataError(
        "Supabase is not configured correctly.",
        "SUPABASE_CONFIG",
        error
      );
    }

    throw toDashboardError(error);
  }
}
