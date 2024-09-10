import { useEffect, useRef } from 'react';
import Link from 'next/link';
import GSAP from 'gsap';

import pages from '@/utils/routing';
const Header = ({ shop, handleMenu, showMenu, handleCart }) => {
    const element = useRef();
    const tl = useRef();

    useEffect(() => {
        const ctx = GSAP.context(
            (self) => {
                const navMenu = self.selector('.navigation_menu_container');

                tl.current = GSAP.timeline({ defaults: { ease: 'expo.inOut' } });
                tl.current.to(navMenu, {
                    duration: 0.8,
                    y: '-55%',
                });
            },
            [element]
        );

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        showMenu ? tl.current.play() : tl.current.reverse();
    }, [showMenu]);

    // Get Item from Cart

    return (
        <header className="header">
            <div className="header_wrapper">
                <div className="header_navigation">
                    <div className="navigation_menu" onClick={handleMenu} ref={element}>
                        <div className="navigation_menu_container">
                            <div className="navigation_menu_container_item">
                                <span>Menu</span>
                                <svg
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line x1="5" y1="12" x2="25" y2="12" />
                                    <line x1="5" y1="17" x2="25" y2="17" />
                                </svg>
                            </div>

                            <div className="navigation_menu_container_item">
                                <span>Close</span>
                                <svg
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line x1="8.35355" y1="7.64645" x2="22.4957" y2="21.7886" />
                                    <line x1="7.64645" y1="21.6464" x2="21.7886" y2="7.50431" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="header_navigation_pages">
                        {pages.map((page, index) => (
                            <Link key={index} href={page.path}>
                                <span>{page.name}</span>
                            </Link>
                        ))}
                    </div>
                    {/* <div className="header_navigation_collections">
                        {collections.edges?.map((collection, index) => (
                            <Link
                                key={index}
                                href="/collection/[handle]"
                                as={`/collection/${collection.node.handle}`}
                            >
                                <span>{collection.node.title}</span>
                            </Link>
                        ))}
                    </div> */}
                </div>

                <Link href="/" className="header_logo">
                    <h4>{shop?.name}</h4>
                </Link>

                <div className="header_side">
                    <div className="header_cart">
                        <button onClick={handleCart}>Cart</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
