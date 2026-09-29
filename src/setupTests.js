import '@testing-library/jest-dom';

// Mock swiper/react and swiper/modules for Jest environment
jest.mock(
  'swiper/react',
  () => ({
    Swiper: ({ children }) => <div data-testid="swiper-mock">{children}</div>,
    SwiperSlide: ({ children }) => <div data-testid="swiper-slide-mock">{children}</div>,
  }),
  { virtual: true }
);

jest.mock(
  'swiper/modules',
  () => ({
    Navigation: () => null,
    Pagination: () => null,
    Autoplay: () => null,
    EffectCoverflow: () => null,
  }),
  { virtual: true }
);

jest.mock(
  'swiper/css',
  () => ({}),
  { virtual: true }
);
jest.mock(
  'swiper/css/navigation',
  () => ({}),
  { virtual: true }
);
jest.mock(
  'swiper/css/pagination',
  () => ({}),
  { virtual: true }
);
jest.mock(
  'swiper/css/effect-coverflow',
  () => ({}),
  { virtual: true }
);
