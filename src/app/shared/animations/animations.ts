import { animate, group, query, style } from '@angular/animations';

export const fadeIn = [
  style({ opacity: 0 }),
  animate('0.4s ease', style({ opacity: 1 })),
];

export const fadeOut = [animate('0.4s ease', style({ opacity: 0 }))];

export const fade = group([query(':enter', fadeIn), query(':leave', fadeOut)]);

export const slideInRight = [
  style({ transform: 'translateX(100%)' }),
  animate('0.4s ease'),
];

export const slideInLeft = [
  style({ transform: 'translateX(-100%)' }),
  animate('0.4s ease'),
];

export const slideOutRight = [
  animate('0.4s ease', style({ transform: 'translateX(100%)' })),
];

export const slideOutLeft = [
  animate('0.4s ease', style({ transform: 'translateX(-100%)' })),
];

export const slideToRight = group([
  query(':enter', slideInRight),
  query(':leave', slideOutLeft),
]);

export const slideToLeft = group([
  query(':enter', slideInLeft),
  query(':leave', slideOutRight),
]);
