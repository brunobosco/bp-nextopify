import { getShopInfo, getAllProducts, getAllCollections } from '../utils/shopify';
import Layout from '@/components/Layout';

import stylesPage from '../styles/pages/Page.module.scss';
const Contact = ({ shop, products, collections }) => {
    return (
        <Layout shop={shop} products={products} collections={collections}>
            <section className={stylesPage.page_hero}>
                <h1>Contact Page</h1>
            </section>
        </Layout>
    );
};

export async function getStaticProps() {
    try {
        const { shop } = await getShopInfo();
        const { products } = await getAllProducts();
        const { collections } = await getAllCollections();

        return {
            props: {
                products: products,
                collections: collections,
                shop: shop,
            },
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            props: {
                products: [],
                collections: [],
                shop: [],
            },
        };
    }
}

export default Contact;
