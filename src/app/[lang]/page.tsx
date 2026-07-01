import { getDictionary } from "@/lib/dictionaries";
import { getLocalizedData } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Technologies } from "@/components/sections/Technologies";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "es");
  const data = await getLocalizedData(lang as "en" | "es");

  return (
    <>
      <Hero dict={dict} data={data.personal} />
      <About dict={dict} data={data.personal} />
      <Projects dict={dict} data={data.projects} />
      <Skills dict={dict} data={data.skills} />
      <Technologies dict={dict} />
      <Experience dict={dict} data={data.experience} />
      <Contact dict={dict} data={data.personal} />
    </>
  );
}
