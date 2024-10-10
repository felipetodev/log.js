import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Playground } from "~/components/playground";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "lab.js 🧪" },
    { name: "description", content: "A beautiful playground for JavaScript and TypeScript" },
  ];
};

export default function App() {
  return (
    <main className="relative h-screen w-screen">
      <Header />
      <Playground />
      <Footer />
    </main>
  );
}