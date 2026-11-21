
import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Android',
    description: 'Telefone igezweho ifite camera nziza na battery imara igihe.',
    price: 85000,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    category: 'Electronics',
    stock: 20,
    commission: 10,
    featured: true,
    available: true
  },
  {
    id: '2',
    name: 'Laptop Computer',
    description: 'Laptop nziza yo kwigiraho no gukoreraho.',
    price: 350000,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    category: 'Electronics',
    stock: 10,
    commission: 10,
    featured: true,
    available: true
  },
  {
    id: '3',
    name: 'Inkweto z’abagabo',
    description: 'Inkweto nziza kandi zikomeye zo kwambara buri munsi.',
    price: 25000,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'Fashion',
    stock: 30,
    commission: 10,
    featured: false,
    available: true
  },
  {
    id: '4',
    name: 'Isakoshi y’abagore',
    description: 'Isakoshi nziza kandi igezweho.',
    price: 18000,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    category: 'Fashion',
    stock: 15,
    commission: 10,
    featured: false,
    available: true
  },
  {
    id: '5',
    name: 'Headphones Bluetooth',
    description: 'Ecouteurs zifite amajwi meza kandi zikoresha Bluetooth.',
    price: 15000,
    image: 'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg',
    category: 'Electronics',
    stock: 25,
    commission: 10,
    featured: true,
    available: true
  },
  {
    id: '6',
    name: 'Isaha yo ku kuboko',
    description: 'Isaha nziza igezweho.',
    price: 12000,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    category: 'Accessories',
    stock: 20,
    commission: 10,
    featured: false,
    available: true
  }
];
