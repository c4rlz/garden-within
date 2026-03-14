import { redirect } from "next/navigation";

/**
 * Site root: go straight into the app at Today.
 */
export default function HomePage() {
  redirect("/today");
}
