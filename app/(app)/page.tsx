import { redirect } from "next/navigation";

/**
 * Root of the app group: send users to Today as the main entry point.
 */
export default function AppHomePage() {
  redirect("/today");
}
