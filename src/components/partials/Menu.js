import Link from 'next/link';
import { useRef, useEffect } from 'react';
import GSAP from 'gsap';

import pages from '@/utils/routing';

// import Newsletter from '@/components/system/Newsletter';
// import Icon from '@/components//system/Icon';

const Menu = ({ showMenu, handleMenu, shop, collections, products }) => {
    const element = useRef();
    const tl = useRef();

    useEffect(() => {
        const ctx = GSAP.context((self) => {
            const menuWrapper = self.selector('.menu_wrapper');

            const menuItems = self.selector('.menu_row_pages > li'),
                menuCat = self.selector('.menu_row_categories > li'),
                menuNewsTitle = self.selector('.menu_news_title');

            tl.current = GSAP.timeline({ defaults: { ease: 'expo.inOut' } });

            tl.current
                .set(element.current, {
                    pointerEvents: 'auto',
                })
                .to(menuWrapper, {
                    duration: 0.8,
                    autoAlpha: 1,
                })
                .from(
                    [menuItems, menuCat],
                    {
                        duration: 0.8,
                        autoAlpha: 0,
                        stagger: 0.016,
                    },
                    0
                );
        }, element);

        return () => ctx.revert();
    }, []); //------> Only when component(menu in this case) MOUNTS!

    useEffect(() => {
        showMenu ? tl.current.play() : tl.current.reverse();
    }, [showMenu]);

    return (
        <section className="menu" ref={element}>
            <div className="menu_wrapper">
                <div className="menu_row">
                    <ul className="menu_row_pages">
                        {pages.map((page, index) => (
                            <li key={index} className="menu_row_pages_item">
                                <Link key={index} href={page.path} onClick={handleMenu}>
                                    <h4>{page.name}</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <ul className="menu_row_categories">
                        <li>
                            <Link href="/products" onClick={handleMenu}>
                                <h4>All Products</h4>
                            </Link>
                        </li>
                        {collections.edges?.map((collection, index) => (
                            <li key={index} className="menu_row_pages_item">
                                <Link
                                    key={index}
                                    href="/collections/[handle]"
                                    as={`/collections/${collection.node.handle}`}
                                    onClick={handleMenu}
                                >
                                    <h4>{collection.node.title}</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* <ul className="menu_row_social">
                        {menu.data?.social.map((item, index) => (
                            <Icon key={index} data={item} />
                        ))}
                    </ul> */}
                </div>
            </div>
        </section>
    );
};

export default Menu;
