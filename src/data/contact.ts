/* Single source for SRV Associates contact details (Contact page). */

export const CONTACT = {
  /** Where website enquiries are sent. Also used by the home CTA and footer. */
  email: 'info@srvassociate.in',
  phoneDisplay: '+91 95736 60701',
  phoneHref: 'tel:+919573660701',
  addressLines: ['13-460/a, Parvathinagar, Sector 2', 'Healthcity, Arilova', 'Visakhapatnam, Andhra Pradesh', 'PIN: 530040'],
  addressQuery: '13-460/a, Parvathinagar, Sector 2, Healthcity, Arilova, Visakhapatnam, Andhra Pradesh 530040',
  hours: [
    { days: 'Monday – Saturday', time: '9:00 AM – 6:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
};

export const MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONTACT.addressQuery);

export const MAPS_EMBED_URL =
  'https://www.google.com/maps?output=embed&q=' + encodeURIComponent(CONTACT.addressQuery);
