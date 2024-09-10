import { CartProvider } from '@/components/cart/CartContext';

import '../styles/global.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <CartProvider>
            <Component {...pageProps} />
        </CartProvider>
    );
};

export default MyApp;
