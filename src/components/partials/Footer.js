import Link from 'next/link';

import pages from '../../utils/routing';

const Header = ({ shop, collections, products }) => {
    return (
        <section className="footer">
            <div className="footer_separator"></div>
            <div className="footer_wrapper">
                <div className="footer_row">
                    <div className="footer_row_col">
                        <h3>{shop?.name}</h3>
                        <p>
                            A community-driven brand focused on empowering developers and designers
                            to create modern and efficient websites.
                        </p>
                    </div>

                    <ul className="footer_row_col">
                        {pages.map((page, index) => (
                            <li key={index} className="menu_row_pages_item">
                                <Link key={index} href={page.path}>
                                    <h4>{page.name}</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <ul className="footer_row_col">
                        <li>
                            <Link href="/products">
                                <h4>All Products</h4>
                            </Link>
                        </li>
                        {collections.edges?.map((collection, index) => (
                            <li key={index} className="menu_row_pages_item">
                                <Link
                                    key={index}
                                    href="/collections/[handle]"
                                    as={`/collections/${collection.node.handle}`}
                                >
                                    <h4>{collection.node.title}</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* <div className="footer_row_col">
                        <div className="footer_row_col_container">
                            {footer.data.social.map((item, index) => (
                                <Icon key={index} data={item} />
                            ))}
                        </div>
                    </div> */}
                </div>

                <div className="footer_row">
                    <div className="footer_row_col">
                        <span>©2023 - We Are Digital Makers</span>
                    </div>

                    <div className="footer_row_col">
                        <span>All screenshots © of their respective owners</span>
                    </div>

                    <div className="footer_row_col">
                        <span>Design & Development:</span>
                        <Link
                            href="https://brunobosco.com/"
                            target="_blank"
                            className="hover hover--link"
                        >
                            Bruno Bosco
                        </Link>
                    </div>

                    <div className="footer_row_col">
                        <h3>&uarr;</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
