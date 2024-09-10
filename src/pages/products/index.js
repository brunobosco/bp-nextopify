import { getShopInfo, getAllCollections, getAllProducts } from '../../utils/shopify';

import Layout from '@/components/Layout';
import ProductItem from '@/components/system/ProductItem';
import CollectionItem from '@/components/system/CollectionItem';

import styleProducts from '../../styles/components/Products.module.scss';
import styleCollections from '../../styles/components/Collections.module.scss';

const ProductsPage = ({ shop, products, collections, cartAddItem }) => {
    return (
        <Layout shop={shop} products={products} collections={collections} cartAddItem={cartAddItem}>
            <div className={styleProducts.products}>
                <div className={styleProducts.products_wrapper}>
                    {/* Collections */}
                    <section className={styleCollections.collections}>
                        <div className={styleCollections.collections_wrapper}>
                            <h1 className={styleCollections.collection_title}>Collections Page</h1>

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
                    <section className={styleProducts.products_container}>
                        {products.edges?.map((product, index) => (
                            <ProductItem
                                key={index}
                                product={product}
                                styles={styleProducts}
                                cartAddItem={cartAddItem}
                            />
                        ))}
                    </section>
                </div>
            </div>
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
                shop: shop,
                products: products,
                collections: collections,
            },
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            props: {
                shop: [],
                products: [],
                collections: [],
            },
        };
    }
}

export default ProductsPage;
