// app.config.ts
export default defineAppConfig({
  hotelInfo: {
    name: 'Cemal',
    email: 'info@cemalalacati.com',
    phone: '+90 533 499 24 30',
    address: 'Alaçatı Mah. 12096 Sok. No:4, 35930 Çeşme/İzmir',
    siteUrl: 'https://cemalalacati.com',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317.557025133015!2d26.37030907200127!3d38.28112574778881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bb7920b5ff376d%3A0xa911332b9bcf26ac!2zQ2VtYWwgQWxhw6dhdMSx!5e1!3m2!1str!2str!4v1778039704881!5m2!1str!2str',
  }, // <--- Eksik olan ve her şeyi bozan parantez buradaydı!

  commonFeatures: ['wifi', 'tv', 'ac', 'heating', 'coffee', 'kettle', 'hairdryer', 'shower', 'minibar'],

  socials: [
    { name: 'Instagram', icon: 'ph:instagram-logo-light', url: 'https://instagram.com/cemalalacati', username: '@cemalalacati' },
    { name: 'WhatsApp', icon: 'ph:whatsapp-logo-light', url: 'https://wa.me/905334992430', username: '+90 533 499 24 30' },
    { name: 'TripAdvisor', icon: 'simple-icons:tripadvisor', url: 'https://www.tripadvisor.com/Hotel_Review-g1024116-d21223319-Reviews-Cemal_Alacati_Butik_Hotel-Alacati_Cesme_Izmir_Province_Turkish_Aegean_Coast.html', username: 'Cemal Alaçatı Hotel' }
  ],
})
