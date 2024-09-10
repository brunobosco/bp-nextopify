import { getShopInfo, getSingleCollection, getAllCollections } from '../../utils/shopify';
import Image from 'next/image';
import ProductItem from '@/components/system/ProductItem';

import styleCollections from '../../styles/components/Collections.module.scss';
import styleProducts from '../../styles/components/Products.module.scss';

import Layout from '@/components/Layout';

const Collection = ({ shop, collections, collection }) => {
    return (
        <Layout shop={shop} collections={collections}>
            <div className={styleCollections.collections}>
                <div className={styleCollections.collections_wrapper}>
                    <section className={styleCollections.s_collection_hero}>
                        <div className={styleCollections.s_collection_hero_container}>
                            <div className={styleCollections.s_collection_hero_heading}>
                                <h1>{collection?.title}</h1>
                                <p>{collection?.description}</p>
                            </div>

                            <figure className={styleCollections.s_collection_hero_figure}>
                                <Image
                                    className={styleCollections.s_collection_hero_image}
                                    src={collection.image?.url}
                                    alt={collection.image?.alt}
                                    width={collection.image?.width}
                                    height={collection.image?.height}
                                />
                            </figure>
                        </div>
                    </section>

                    <section className={styleCollections.s_collection_products}>
                        <div className={styleCollections.s_collection_products_container}>
                            {collection.products.edges?.map((product, index) => (
                                <ProductItem
                                    key={index}
                                    product={product}
                                    imgSize={'large'}
                                    styles={styleProducts}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const { collections } = await getAllCollections();

    const paths = collections.edges?.map((collection) => ({
        params: { handle: collection.node.handle },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    try {
        const { shop } = await getShopInfo();
        const { collection } = await getSingleCollection(params.handle);
        const { collections } = await getAllCollections();

        return {
            props: {
                shop: shop,
                collection: collection,
                collections: collections,
            },
        };
    } catch (error) {
        console.error('Error fetching the single collection:', error);
        return {
            props: {
                shop: [],
                collection: [],
                collections: [],
            },
        };
    }
}

export default Collection;
