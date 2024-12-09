export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then(registration => {
          console.log(
            'ServiceWorker успешно зарегистрирован, область видимости: ',
            registration.scope,
          );
        })
        .catch(error => {
          console.log('ServiceWorker регистрация не удалась : ', error);
        });
    });
  }
}
