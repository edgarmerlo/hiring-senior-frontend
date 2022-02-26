import '@testing-library/jest-dom/extend-expect';
import preloadAll from 'jest-next-dynamic';

beforeAll(async () => {
  await preloadAll();
});

// For next/image
process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ['images.example.com'],
    path: '/_next/image',
    loader: 'default',
  },
};

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      prefetch: () => null,
      push: () => null,
      replace: () => null,
      withRouter: () => null,
    };
  },
}));


global.window = Object.create(window);
const url = 'http://localhost';
Object.defineProperty(window, 'location', {
  value: {
    pathname: url,
    assign: jest.fn(),
  },
  writable: true,
});

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
