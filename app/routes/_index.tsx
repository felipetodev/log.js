import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Playground } from "~/components/playground";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "log.js 🧪" },
    { name: "description", content: "A beautiful web playground for JavaScript and TypeScript" },
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