
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-morocco-deep-blue">Contactez-nous</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions sur Buildora? Notre équipe est là pour vous aider et vous accompagner dans votre projet.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
