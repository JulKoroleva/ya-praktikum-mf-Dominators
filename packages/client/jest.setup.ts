jest.mock('tsparticles', () => ({
  __esModule: true,
  loadFull: jest.fn(),
}));

jest.mock('@tsparticles/react', () => ({
  __esModule: true,
  default: jest.fn(),
  initParticlesEngine: jest.fn().mockImplementation(() => Promise.resolve()),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).__SERVER_PORT__ = process.env.SERVER_PORT;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).__EXTERNAL_SERVER_URL__ =
  process.env.EXTERNAL_SERVER_URL || 'http://localhost:3000';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).__INTERNAL_SERVER_URL__ =
  process.env.INTERNAL_SERVER_URL || 'http://localhost:3001';

export {};
