import { partnersList } from "@/assets/docs/partnersList";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";

const OurPartners = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-4 space-y-8">
      <SectionHeader name="Our Partners" />

      <main className="flex flex-wrap gap-6 justify-center items-center">
        {partnersList.map((partner: { name: string; image_url: string }) => (
          <div className="h-12 md:h-14 lg:h-18 p-2 lg:p-4">
            <img
              src={partner.image_url}
              className="h-full grayscale-25 hover:grayscale-0"
              alt={partner.name}
            />
          </div>
        ))}
      </main>
    </section>
  );
};

export default OurPartners;
