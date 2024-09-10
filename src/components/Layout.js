import { useState } from 'react';

import Header from '../components/partials/Header';
import Menu from '../components/partials/Menu';
import Footer from '../components/partials/Footer';
import Cart from '../components/cart/Cart';

const Layout = ({ children, shop, collections, products }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const handleMenu = () => setShowMenu((showMenu) => !showMenu);
    const handleCart = () => setShowCart(!showCart);

    // Get Cart quantity

    return (
        <>
            <Header
                shop={shop}
                collections={collections}
                products={products}
                handleMenu={handleMenu}
                handleCart={handleCart}
                showMenu={showMenu}
            />
            <Menu
                shop={shop}
                collections={collections}
                products={products}
                handleMenu={handleMenu}
                showMenu={showMenu}
            />
            <Cart showCart={showCart} handleCart={handleCart} />

            <main>{children}</main>

            <Footer shop={shop} collections={collections} products={products} />
        </>
    );
};

export default Layout;
