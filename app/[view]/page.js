import { notFound } from "next/navigation";
import View from "../../components/Views";
const NAMES = ["work", "stack", "about", "lab"];
export const dynamicParams = false;
export function generateStaticParams() { return NAMES.map((view) => ({ view })); }
export default function Page({ params }) { if (!NAMES.includes(params.view)) notFound(); return <View name={params.view} />; }
