import burgerClassico from '@/assets/burger-classico.jpg';
import burgerBacon from '@/assets/burger-bacon.jpg';
import batataFrita from '@/assets/batata-frita.jpg';
import milkshake from '@/assets/milkshake.jpg';
import { MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: 'burger-1',
    name: 'Smash Clássico',
    description: 'Blend bovino 150g, queijo cheddar, cebola caramelizada, picles e molho especial',
    price: 32.90,
    image: burgerClassico,
    category: 'burgers',
    popular: true,
  },
  {
    id: 'burger-2',
    name: 'Bacon Monster',
    description: 'Duplo smash 300g, bacon crocante, queijo cheddar duplo, cebola roxa e BBQ',
    price: 45.90,
    image: burgerBacon,
    category: 'burgers',
    popular: true,
  },
  {
    id: 'burger-3',
    name: 'Veggie Burger',
    description: 'Hambúrguer de grão de bico, queijo muçarela, alface, tomate e maionese verde',
    price: 29.90,
    image: burgerClassico,
    category: 'burgers',
  },
  {
    id: 'burger-4',
    name: 'Texas BBQ',
    description: 'Smash 180g, onion rings, bacon, cheddar e molho barbecue defumado',
    price: 39.90,
    image: burgerBacon,
    category: 'burgers',
  },
  {
    id: 'burger-5',
    name: 'Cheese Salada',
    description: 'Smash 150g, queijo prato, alface americana, tomate e maionese da casa',
    price: 28.90,
    image: burgerClassico,
    category: 'burgers',
  },
  // Sides
  {
    id: 'side-1',
    name: 'Batata Frita',
    description: 'Porção generosa de batatas fritas crocantes com sal e orégano',
    price: 18.90,
    image: batataFrita,
    category: 'sides',
    popular: true,
  },
  {
    id: 'side-2',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados e fritos, acompanha molho especial',
    price: 22.90,
    image: batataFrita,
    category: 'sides',
  },
  {
    id: 'side-3',
    name: 'Batata Cheddar Bacon',
    description: 'Batata frita coberta com cheddar cremoso e bacon crocante',
    price: 28.90,
    image: batataFrita,
    category: 'sides',
  },
  // Drinks
  {
    id: 'drink-1',
    name: 'Refrigerante Lata',
    description: 'Coca-Cola, Guaraná ou Sprite - 350ml',
    price: 7.90,
    image: milkshake,
    category: 'drinks',
  },
  {
    id: 'drink-2',
    name: 'Milkshake',
    description: 'Chocolate, Morango ou Ovomaltine - 400ml',
    price: 19.90,
    image: milkshake,
    category: 'drinks',
    popular: true,
  },
  {
    id: 'drink-3',
    name: 'Suco Natural',
    description: 'Laranja, Limão ou Maracujá - 300ml',
    price: 12.90,
    image: milkshake,
    category: 'drinks',
  },
  // Desserts
  {
    id: 'dessert-1',
    name: 'Brownie com Sorvete',
    description: 'Brownie quentinho com sorvete de creme e calda de chocolate',
    price: 24.90,
    image: milkshake,
    category: 'desserts',
  },
  {
    id: 'dessert-2',
    name: 'Petit Gateau',
    description: 'Bolinho de chocolate com recheio cremoso e sorvete de baunilha',
    price: 26.90,
    image: milkshake,
    category: 'desserts',
  },
];

export const categories = [
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'sides', name: 'Acompanhamentos', icon: '🍟' },
  { id: 'drinks', name: 'Bebidas', icon: '🥤' },
  { id: 'desserts', name: 'Sobremesas', icon: '🍫' },
] as const;
