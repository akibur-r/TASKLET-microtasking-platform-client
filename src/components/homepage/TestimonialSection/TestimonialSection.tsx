import { testimonials } from "@/assets/docs/testimonials";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import TestimonialCard from "@/components/shared/TestimonialCard/TestimonialCard";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TestimonialSection = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-4 space-y-8">
      <SectionHeader name="Testimonials" tagline="What our users are saying " />
      <main>
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </section>
  );
};

export default TestimonialSection;
