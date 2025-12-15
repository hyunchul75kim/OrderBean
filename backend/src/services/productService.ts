export const productService = {
  getAllProducts: async () => {
    // TODO: 상품 목록 조회 로직 구현
    return [];
  },
  getProductById: async (id: string) => {
    // TODO: 상품 조회 로직 구현
    return null;
  },
  createProduct: async (productData: any) => {
    // TODO: 상품 생성 로직 구현
    return { id: 'product-1' };
  },
  updateProduct: async (id: string, productData: any) => {
    // TODO: 상품 수정 로직 구현
    return { id };
  },
  deleteProduct: async (id: string) => {
    // TODO: 상품 삭제 로직 구현
    return true;
  },
};

