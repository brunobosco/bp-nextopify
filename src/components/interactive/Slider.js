import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss/pagination';

import CollectionItem from '@/components/system/CollectionItem';
import ProductItem from '@/components/system/ProductItem';

const SliderButton = ({ className, direction }) => {
    const swiper = useSwiper();

    return (
        <button
            className={className}
            onClick={() => (direction === 'left' ? swiper.slidePrev() : swiper.slideNext())}
        >
            {direction === 'left' ? '←' : '→'}
        </button>
    );
};

const Slider = ({ query, data, styles, slidesPerView }) => {
    return (
        <div className="slider">
            <Swiper
                className="slider_wrapper"
                modules={[Navigation, Pagination]}
                spaceBetween={'auto'}
                slidesPerView={slidesPerView}
                pagination={{
                    clickable: true,
                    dynamicBullets: false,
                }}
                breakpoints={{
                    500: {
                        spaceBetween: 16,
                    },
                }}
            >
                {data?.map((item, index) => (
                    <SwiperSlide key={index} className="slider_container_slide">
                        {query === 'collections' && (
                            <CollectionItem key={index} collection={item} styles={styles} />
                        )}
                        {query === 'products' && (
                            <ProductItem
                                key={index}
                                product={item}
                                styles={styles}
                                imgSize={'big'}
                            />
                        )}
                    </SwiperSlide>
                ))}

                <div className="slider_extra">
                    <SliderButton className="swiper-button-prev" direction="left" />
                    <SliderButton className="swiper-button-next" direction="right" />
                </div>
            </Swiper>
        </div>
    );
};

export default Slider;
