import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [{
  id: "1",
  name: "Product One",
  description: "This is product one",
  price: 29.99,
}, {
  id: "2",
  name: "Product Two",
  description: "This is product two",
  price: 19.99,
}, {
  id: "3",
  name: "Product Three",
  description: "This is product three",
  price: 39.99,
}, {
  id: "4",
  name: "Product Four",
  description: "This is product four",
  price: 49.99,
}];

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  let product: Product | undefined = products.find((a) => a.id === params.id);
  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "No result found",
    };
  }
};

const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  }
};

const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  let product: Product | undefined = products.find((a) => a.id === params.id);
  if (product) {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data",
      };
    } else {
      const updateProduct: {
        name?: string;
        description?: string;
        price?: number;
      } = body.value;
      products = products.map((p) =>
        p.id === params.id ? { ...p, ...updateProduct } : p
      );

      response.status = 200;
      response.body = {
        success: true,
        data: products,
      };
    }
  } else {
    response.status = 400;
    response.body = {
      success: false,
      message: "Not result found",
    };
  }
};

const deleteProduct = (
  { params, response }: { params: any; response: any },
) => {
  products = products.filter((a) => a.id !== params.id);
  response.status = 200;
  response.body = {
    success: true,
    message: "Product removed",
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
