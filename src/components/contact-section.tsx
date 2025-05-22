
import { ContactForm } from "@/components/contact-form";
import { MoroccanPattern } from "@/components/ui/pattern";

export function ContactSection() {
  return (
    <section className="py-20 relative" id="contact">
      <MoroccanPattern variant="subtle" color="#1A5F7A" />
      
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <span className="bg-morocco-blue/10 text-morocco-blue font-medium py-1 px-3 rounded-full text-sm mb-4 inline-block">
            Contactez-nous
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-morocco-deep-blue">Besoin de plus d'informations?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions sur Buildora? Notre équipe est là pour vous aider et vous accompagner dans votre projet de construction.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-morocco-deep-blue mb-4">Nos coordonnées</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-morocco-blue/10 p-2 rounded mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-morocco-blue">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-morocco-deep-blue">Téléphone</h4>
                    <p className="text-gray-600">+212 522 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-morocco-blue/10 p-2 rounded mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-morocco-blue">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-morocco-deep-blue">Email</h4>
                    <p className="text-gray-600">contact@buildora.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-morocco-blue/10 p-2 rounded mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-morocco-blue">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-morocco-deep-blue">Adresse</h4>
                    <p className="text-gray-600">123 Avenue Mohammed V, Casablanca, Maroc</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-morocco-deep-blue mb-4">Suivez-nous</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-morocco-blue/10 hover:bg-morocco-blue/20 text-morocco-blue p-2 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-morocco-blue/10 hover:bg-morocco-blue/20 text-morocco-blue p-2 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="bg-morocco-blue/10 hover:bg-morocco-blue/20 text-morocco-blue p-2 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-morocco-blue/10 hover:bg-morocco-blue/20 text-morocco-blue p-2 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-morocco-deep-blue text-white p-6 md:p-8 rounded-lg shadow-md hidden md:block">
              <h3 className="text-xl font-bold mb-4">Heures d'ouverture</h3>
              <ul className="space-y-2">
                <li className="flex justify-between pb-2 border-b border-white/10">
                  <span>Lundi - Vendredi</span>
                  <span>09:00 - 18:00</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-white/10">
                  <span>Samedi</span>
                  <span>09:00 - 14:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
