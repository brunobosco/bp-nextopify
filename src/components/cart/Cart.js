import { useCart } from './CartContext';
import Button from '../system/Button';

const Cart = ({ showCart, handleCart }) => {
    const { cart, cartRemoveItem, cartUpdateQuantity } = useCart();

    // Handle potential null cart data
    const isEmptyCart = !cart || !cart.lines || cart.lines.edges.length === 0;

    // Extract product information for cleaner rendering
    const renderProduct = (line) => (
        <li key={line.node.id} className="cart_content_list_item">
            <div className="cart_content_list_item_heading">
                <div className="cart_content_list_item_heading_title">
                    <h4>{line.node.merchandise.title}</h4>
                    <p>x{line.node.quantity}</p>
                </div>
                <div className="cart_content_list_item_heading_price">
                    <span>
                        {line.node.merchandise.priceV2.amount}{' '}
                        {line.node.merchandise.priceV2.currencyCode}
                    </span>
                </div>
            </div>
            <button onClick={() => cartRemoveItem(line.node.id)}>Remove</button>
            <button onClick={() => cartUpdateQuantity(line.node.id, line.node.quantity + 1)}>
                +
            </button>
            <button onClick={() => cartUpdateQuantity(line.node.id, line.node.quantity - 1)}>
                -
            </button>
            <h5>
                {line.node.merchandise.priceV2.amount * line.node.quantity}{' '}
                {line.node.merchandise.priceV2.currencyCode}
            </h5>
        </li>
    );

    return (
        <div
            className="cart"
            style={{ transform: showCart ? 'translateX(0)' : 'translateX(100%)' }}
        >
            <div className="cart_wrapper">
                <div className="cart_header">
                    <div class name="cart_header_title">
                        <h2>Your Cart</h2>
                        <span>({cart?.totalQuantity === 0 ? 0 : cart?.totalQuantity})</span>
                    </div>
                    <Button field="Close" size="small" fill={false} onClick={handleCart} />
                </div>

                {isEmptyCart ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className="cart_content">
                        <ul className="cart_content_list">{cart.lines.edges.map(renderProduct)}</ul>
                    </div>
                )}

                <div className="cart_footer">
                    <div className="cart_footer_wrapper">
                        <div className="cart_footer_total">
                            <h5>Total</h5>
                            <h4>
                                {cart?.cost?.totalAmount.amount}{' '}
                                {cart?.cost?.totalAmount.currencyCode}
                            </h4>
                        </div>

                        <Button
                            field="Checkout"
                            size="big"
                            fill={true}
                            disabled={isEmptyCart} // Disable checkout button if cart is empty
                            onClick={handleCart}
                            url={cart?.checkoutUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
