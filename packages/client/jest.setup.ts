jest.mock('tsparticles', () => ({
  __esModule: true,
  loadFull: jest.fn(),
}));

jest.mock('@tsparticles/react', () => ({
  __esModule: true,
  default: jest.fn(),
  initParticlesEngine: jest.fn().mockImplementation(() => Promise.resolve()),
}));

export {};
