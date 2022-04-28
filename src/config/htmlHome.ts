export const htmlHome = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Discordia - private api</title>
  <style>
    body,
    html {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      overflow: hidden;
      user-select: none;
    }
    img {
      position: fixed;
      inset: 0;
      z-index: -1;
      object-fit: cover;
    }
    main {
      display: grid;
      place-content: center;
      z-index: 1;
      height: 100vh;
    }
    h1,
    h2 {
      padding: 0;
      margin: 0;
    }
    h2, span {
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <main>
    <h1>Warning</h1>
    <h2>This page is only for developers verified</h2>
    <img src="https://i.giphy.com/media/FcqKy4Kj7XOK0hCW4g/giphy-downsized-medium.gif" alt="Empty" width="100%" height="100%">
    <span>Database for discordia of discord-clone</span>
  </main>
  <script>
    console.log('%c DETENTE!', 'color: #ff0000; font-size: 2rem')
    console.log('%c ESTAS EN PROPIEDAD PRIVADA', 'color: #bada55; font-size: 0.9rem')
    console.log('%c presiona ALT + F4 - para salir...', 'color: #bada55; font-size: 0.9rem')
  </script>
</body>
</html>
`
