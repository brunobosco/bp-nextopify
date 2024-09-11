import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    apiVersion: '2024-04',
});

//?-----> Partials
export async function getShopInfo() {
    const shopInfoQuery = `
    query getShopInfo {
      shop {
        name
      }
    }
  `;

    try {
        const { data, errors, extensions } = await client.request(shopInfoQuery);

        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching shop info:', error);
        return null;
    }
}

//?-----> Products
export async function getAllProducts() {
    const allProductsQuery = `
      query getSingleProducts($prodNum: Int, $imageNum: Int) {
        products(first: $prodNum) {
          edges {
            node {
              id
              handle
              title
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              images(first: $imageNum ) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

    try {
        const { data, errors, extensions } = await client.request(allProductsQuery, {
            variables: {
                prodNum: 20,
                imageNum: 1,
            },
        });

        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function getSingleProduct(handle) {
    const singleProductQuery = `
      query getSingleProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          description
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    `;

    try {
        const { data, errors, extensions } = await client.request(singleProductQuery, {
            variables: {
                handle: handle,
            },
        });

        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

//?-----> Collections
export async function getAllCollections(handle) {
    const allCollectionsQuery = `
      query getAllCollections($collectionNum: Int) {
        collections(first: $collectionNum) {
          edges {
            node {
              handle
              title
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    `;

    try {
        const { data, errors, extensions } = await client.request(allCollectionsQuery, {
            variables: {
                handle: handle,
                collectionNum: 10,
            },
        });

        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching collection:', error);
        return null;
    }
}

export async function getSingleCollection(handle) {
    const singleCollectionQuery = `
      query getSingleCollection($handle: String!, $productNum: Int, $imageNum: Int) {
        collection(handle: $handle) {
          id
          title
          description
          image {
            url
            altText
            width
            height
          }
          products(first: $productNum) {
            edges {
              node {
                id
                handle
                title
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                images(first: $imageNum ) {
                  edges {
                    node {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
                priceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }     
              }
            }
          }
        }
      }
    `;

    try {
        const { data, errors, extensions } = await client.request(singleCollectionQuery, {
            variables: {
                handle: handle,
                productNum: 20,
                imageNum: 1,
            },
        });

        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching collection:', error);
        return null;
    }
}

//?-----> Cart (Query and Mutations)
export async function getCart(cartId) {
    const getCartQuery = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

    try {
        const { data, errors } = await client.request(getCartQuery, {
            variables: {
                cartId: cartId,
            },
        });
        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }
        return data.cart;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
    }
}

export async function cartCreate() {
    const createCartMutation = `
      mutation cartCreate {
        cartCreate {
          cart {
            id
            checkoutUrl
            totalQuantity
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `;

    try {
        const { data, errors } = await client.request(createCartMutation);
        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }
        return data.cartCreate.cart;
    } catch (error) {
        console.error('Error creating cart:', error);
        return null;
    }
}

export async function cartLinesRemove(cartId, lineIds) {
    const removeToCartMutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

    try {
        const { data, errors } = await client.request(removeToCartMutation, {
            variables: {
                cartId: cartId,
                lineIds: [lineIds],
            },
        });

        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }

        return data.cartLinesRemove.cart;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return null;
    }
}

export async function cartLinesAdd(cartId, productId, quantity) {
    const addToCartMutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `;

    try {
        const { data, errors } = await client.request(addToCartMutation, {
            variables: {
                cartId: cartId,
                lines: [
                    {
                        merchandiseId: productId,
                        quantity: quantity,
                    },
                ],
            },
        });
        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }
        return data.cartLinesAdd.cart;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return null;
    }
}

export async function cartLinesUpdate(cartId, lineItemId, quantity) {
    console.log({ cartId, lineItemId, quantity });

    const cartLinesUpdateMutation = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `;

    try {
        const { data, errors } = await client.request(cartLinesUpdateMutation, {
            variables: {
                cartId: cartId,
                lines: [
                    {
                        id: lineItemId,
                        quantity: quantity,
                    },
                ],
            },
        });

        if (errors) {
            console.error('GraphQL errors:', errors);
            return null;
        }

        return data.cartLinesUpdate.cart;
    } catch (error) {
        console.error('Error updating item quantity:', error);
        return null;
    }
}
