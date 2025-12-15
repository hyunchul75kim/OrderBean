export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  acidity: number; // 산미 (1-5)
  bitterness: number; // 쓴맛 (1-5)
  nuttiness: number; // 고소함 (1-5)
  milkCompatible: boolean; // 우유 호환 여부
  createdAt: Date;
  updatedAt: Date;
}

