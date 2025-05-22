
import { Star } from "lucide-react";
import { MoroccanPattern } from "@/components/ui/pattern";

const testimonials = [
  {
    id: 1,
    quote: "Buildora a transformé notre façon de gérer nos chantiers. L'interface est intuitive et l'équipe est beaucoup plus efficace.",
    author: "Mohammed Alami",
    position: "Directeur de Projet, Casablanca Building Co.",
    rating: 5,
  },
  {
    id: 2,
    quote: "La synchronisation mobile nous permet de rester connectés même sur le terrain. Un outil essentiel pour nos équipes.",
    author: "Leila Benali",
    position: "Chef de Chantier, Atlas Construction",
    rating: 5,
  },
  {
    id: 3,
    quote: "Les rapports automatisés nous font gagner un temps précieux et améliorent notre communication avec les clients.",
    author: "Karim Tazi",
    position: "PDG, Marrakech Development",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 bg-morocco-blue text-white">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce que nos clients <span className="text-morocco-gold">disent</span>
          </h2>
          <p className="text-lg opacity-80">
            Découvrez pourquoi les professionnels de la construction font confiance à Buildora pour leurs projets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:transform hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? "text-morocco-gold fill-morocco-gold" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm opacity-70">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MoroccanPattern className="opacity-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
