import { useCart } from '../cart/CartContext';
import Image from 'next/image';
import Link from 'next/link';

import Button from './Button';

const ProductItem = ({ product, styles, imgSize }) => {
    const handle = product.node.handle;
    const title = product.node.title;
    const image = product.node.images.edges[0];
    const price = {
        amount: product.node.priceRange.maxVariantPrice.amount,
        currency: product.node.priceRange.maxVariantPrice.currencyCode,
    };

    const { cartAddItem } = useCart();

    return (
        <div className={styles.products_item}>
            <Link href="/products/[handle]" as={`/products/${handle}`}>
                <figure
                    className={
                        imgSize === 'small'
                            ? styles.products_figure_small
                            : styles.products_figure_big
                    }
                >
                    <Image
                        className={styles.products_image}
                        src={image.node.url}
                        alt={image.node.alt}
                        width={image.node.width}
                        height={image.node.height}
                    />
                </figure>
            </Link>

            <div className={styles.products_price}>
                <span>{price.amount}</span>
                <span>{price.currency}</span>
            </div>

            <h5 className={styles.products_title}>{title}</h5>

            <Button
                field="Add to cart"
                size="big"
                fill={false}
                onClick={() => {
                    cartAddItem(product.node.variants?.edges[0].node.id);
                }}
            />
        </div>
    );
};

export default ProductItem;
