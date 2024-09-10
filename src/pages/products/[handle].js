import {
    getShopInfo,
    getAllProducts,
    getSingleProduct,
    getAllCollections,
} from '../../utils/shopify';
import Image from 'next/image';
import Layout from '@/components/Layout';

import styleProducts from '../../styles/components/Products.module.scss';

const Product = ({ shop, product, collections }) => {
    return (
        <Layout shop={shop} collections={collections}>
            <div className={styleProducts.container}>
                <h1>{product.title}</h1>
                <p>{product.description}</p>

                <figure className={styleProducts.product_figure}>
                    <Image
                        className={styleProducts.product_image}
                        src={product.featuredImage.url}
                        alt={product.featuredImage.alt}
                        width={product.featuredImage.width}
                        height={product.featuredImage.height}
                    />
                </figure>

                <div className={styleProducts.product_price}>
                    <span>{product.priceRange.maxVariantPrice.amount}</span>
                    <span>{product.priceRange.maxVariantPrice.currencyCode}</span>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const { products } = await getAllProducts();

    const paths = products.edges?.map((product) => ({
        params: { handle: product.node.handle },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    try {
        const { shop } = await getShopInfo();
        const { product } = await getSingleProduct(params.handle);
        const { collections } = await getAllCollections();

        return {
            props: {
                shop: shop,
                product: product,
                collections: collections,
            },
        };
    } catch (error) {
        console.error('Error fetching the single product:', error);
        return {
            props: {
                shop: [],
                product: [],
                collections: [],
            },
        };
    }
}

export default Product;
