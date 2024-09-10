import { getShopInfo, getAllProducts, getAllCollections } from '../utils/shopify';

import Layout from '@/components/Layout';
import CollectionItem from '@/components/system/CollectionItem';
import Slider from '@/components/interactive/Slider';

import stylesPage from '../styles/pages/Page.module.scss';
import styleProducts from '../styles/components/Products.module.scss';
import styleCollections from '../styles/components/Collections.module.scss';

const Home = ({ shop, products, collections, children }) => {
    console.log(children);

    return (
        <Layout shop={shop} products={products} collections={collections}>
            <section className={stylesPage.page_hero}>
                <h1>Hero Page</h1>
            </section>

            {/* Collections */}
            <section className={styleCollections.collections}>
                <div className={styleCollections.collections_wrapper}>
                    <h1 className={styleCollections.collections_title}>Collections Page</h1>

                    <div className={styleCollections.collections_items}>
                        {collections.edges?.map((collection, index) => (
                            <CollectionItem
                                key={index}
                                collection={collection}
                                styles={styleCollections}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className={styleProducts.products}>
                <div className={styleProducts.products_wrapper}>
                    <h1>Products Page</h1>

                    <Slider
                        query={'products'}
                        data={products.edges}
                        styles={styleProducts}
                        slidesPerView={1}
                    />
                </div>
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

export default Home;
