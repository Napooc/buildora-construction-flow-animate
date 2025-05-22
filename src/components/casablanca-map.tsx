
import { useEffect, useRef } from 'react';

export function CasablancaMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a map element the first time the component mounts
    const createMap = () => {
      if (!mapRef.current) return;
      
      // Create iframe with Google Maps embed
      const iframe = document.createElement('iframe');
      iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72691557759!2d-7.669344007394117!3d33.57240330528919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1653062269572!5m2!1sen!2sus";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "0";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      
      // Clear previous content and append iframe
      if (mapRef.current.firstChild) {
        mapRef.current.removeChild(mapRef.current.firstChild);
      }
      mapRef.current.appendChild(iframe);
    };

    createMap();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg border-4 border-white">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-t from-morocco-deep-blue/20 to-transparent" />
    </div>
  );
}
