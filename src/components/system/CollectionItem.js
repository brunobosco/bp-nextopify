import Link from 'next/link';
import Image from 'next/image';

const CollectionItem = ({ collection, styles }) => {
    const handle = collection.node.handle;
    const title = collection.node.title;
    const image = collection.node.image;

    return (
        <div className={styles.collections_items_container}>
            <Link href="/collections/[handle]" as={`/collections/${handle}`}>
                <figure className={styles.collections_items_figure}>
                    <Image
                        className={styles.collections_items_image}
                        src={image?.url}
                        alt={image?.alt}
                        width={image?.width}
                        height={image?.height}
                    />
                </figure>
            </Link>

            <h5 className={styles.collections_items_title}>{title}</h5>
        </div>
    );
};

export default CollectionItem;
