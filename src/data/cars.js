const cars = [
  {
    id: 1,
    name: "Toyota AE86 Trueno",
    manufacturer: "Toyota",
    year: 1983,
    generation: "AE86",
    engine: "4A-GEU 1.6L I4",
    horsepower: "128 л.с.",
    torque: "149 Н·м",
    description: "Легендарный автомобиль, ставший культовым благодаря аниме 'Initial D'.",
    features: ["Популяризован аниме Initial D", "Идеальный для дрифта", "Выдвижные фары"],
    rating: 9.5,
    image: "/images/car1.jpg", // Локальное изображение
    category: "Спортивный автомобиль",
    price: "$25,000 - $60,000",
    topSpeed: "200 км/ч",
    acceleration: "8.5 сек (0-100 км/ч)"
  },
  {
    id: 2,
    name: "Nissan Skyline GT-R R34",
    manufacturer: "Nissan",
    year: 1999,
    generation: "R34",
    engine: "RB26DETT 2.6L Twin-Turbo I6",
    horsepower: "280 л.с.",
    torque: "392 Н·м",
    description: "Икона японского автомобилестроения, известная как 'Годзилла'.",
    features: ["Прозвище 'Годзилла'", "Система полного привода ATTESA E-TS"],
    rating: 9.7,
    image: "/images/car2.jpg", // Локальное изображение
    category: "Спортивный автомобиль",
    price: "$80,000 - $150,000",
    topSpeed: "250 км/ч",
    acceleration: "4.9 сек (0-100 км/ч)"
  },
  {
    id: 3,
    name: "Toyota Supra A80",
    manufacturer: "Toyota",
    year: 1993,
    generation: "MK4",
    engine: "2JZ-GTE 3.0L Twin-Turbo I6",
    horsepower: "320 л.с.",
    torque: "427 Н·м",
    description: "Символ 90-х, прославившийся благодаря фильму 'Форсаж'.",
    features: ["Легендарный двигатель 2JZ-GTE", "Популяризован фильмом 'Форсаж'"],
    rating: 9.6,
    image: "/images/car3.jpg", // Локальное изображение
    category: "Спорт-купе",
    price: "$40,000 - $100,000",
    topSpeed: "250 км/ч",
    acceleration: "4.6 сек (0-100 км/ч)"
  },
  {
    id: 4,
    name: "Mazda RX-7 FD",
    manufacturer: "Mazda",
    year: 1992,
    generation: "FD",
    engine: "13B-REW 1.3L Twin-Rotor Twin-Turbo",
    horsepower: "252 л.с.",
    torque: "294 Н·м",
    description: "Автомобиль с роторным двигателем Ванкеля.",
    features: ["Роторный двигатель Ванкеля", "Идеальное распределение веса"],
    rating: 9.4,
    image: "/images/car4.jpg", // Локальное изображение
    category: "Спорт-купе",
    price: "$30,000 - $70,000",
    topSpeed: "250 км/ч",
    acceleration: "5.3 сек (0-100 км/ч)"
  },
  {
    id: 5,
    name: "Honda NSX",
    manufacturer: "Honda",
    year: 1990,
    generation: "Первое поколение",
    engine: "C30A 3.0L V6",
    horsepower: "270 л.с.",
    torque: "284 Н·м",
    description: "Первый японский суперкар.",
    features: ["Разработан с участием Айртона Сенны", "Алюминиевый кузов"],
    rating: 9.3,
    image: "/images/car5.jpg", // Локальное изображение
    category: "Суперкар",
    price: "$60,000 - $120,000",
    topSpeed: "260 км/ч",
    acceleration: "5.7 сек (0-100 км/ч)"
  },
  {
    id: 6,
    name: "Subaru Impreza WRX STI 22B",
    manufacturer: "Subaru",
    year: 1998,
    generation: "GC8",
    engine: "EJ22 2.2L Turbo Boxer-4",
    horsepower: "280 л.с.",
    torque: "362 Н·м",
    description: "Ограниченная серия раллийного автомобиля.",
    features: ["Ограниченный тираж (424 экз.)", "Полный привод Symmetrical AWD"],
    rating: 9.2,
    image: "/images/car6.jpg", // Локальное изображение
    category: "Раллийный автомобиль",
    price: "$250,000 - $400,000",
    topSpeed: "240 км/ч",
    acceleration: "4.7 сек (0-100 км/ч)"
  }
];

export default cars;