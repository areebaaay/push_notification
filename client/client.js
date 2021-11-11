const publicVapidKey =
  'BPMrvWDxlTMJJ3A-EHBp0zI_yujvwrM-NvOqK1TuHMqpqRGTbWd1eyEYGBEnxM04zUQq4S22qOB00_sFI8O-vNo';

// Register service worker, Register push, Send push ( send notification )
// scope is the url where the service worker is going to apply
const send = async () => {
  // Registring service worker
  console.log('Registring service worker');
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/',
  });
  console.log('Service worker registered');

  // Register push
  console.log('Registring push');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });
  console.log('Push registered');

  // Send push notification
  console.log('Sending push notification');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  });
  console.log('Push sent');
};

// Check for service worker
// navigator is the api for the browser itself
if ('serviceWorker' in navigator) {
  send().catch((err) => console.error(err));
}
