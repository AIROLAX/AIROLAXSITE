<?php
/**
 * Analytics nativo — vista sencilla de visitas.
 * Abre: https://tudominio.com/analytics.php?k=TU_CLAVE
 * Cambia la clave abajo.
 */
$CLAVE = 'airolax2025'; // Cambia por tu clave secreta

$key = isset($_GET['k']) ? $_GET['k'] : '';
if ($key !== $CLAVE) {
    header('HTTP/1.0 404 Not Found');
    echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>404</title></head><body><p>No encontrado.</p></body></html>';
    exit;
}

$dir = __DIR__ . '/data';
$file = $dir . '/hits.json';
$data = [];
if (file_exists($file)) {
    $raw = @file_get_contents($file);
    if ($raw !== false) {
        $dec = json_decode($raw, true);
        if (is_array($dec)) {
            $data = $dec;
        }
    }
}

arsort($data, SORT_NUMERIC);
$total = array_sum($data);
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Estadísticas — AIROLAX</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e5e5e5; min-height: 100vh; padding: 24px; }
    h1 { font-size: 1.5rem; margin-bottom: 8px; font-weight: 600; }
    .sub { color: #888; font-size: 0.9rem; margin-bottom: 24px; }
    .card { background: #141414; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #222; }
    .big { font-size: 2.5rem; font-weight: 700; color: #fff; }
    .row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #222; }
    .row:last-child { border-bottom: 0; }
    .page { color: #ccc; }
    .num { font-weight: 600; color: #fff; }
    a { color: #6b9fff; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Estadísticas</h1>
    <p class="sub">Visitas registradas en este sitio (analytics nativo)</p>
    <p class="big"><?php echo number_format($total); ?></p>
    <p class="sub">Total de vistas</p>
  </div>
  <div class="card">
    <h2 style="font-size: 1.1rem; margin-bottom: 12px;">Por página</h2>
    <?php if (empty($data)): ?>
      <p class="sub">Aún no hay visitas registradas.</p>
    <?php else: ?>
      <?php foreach ($data as $page => $count): ?>
        <div class="row">
          <span class="page"><?php echo htmlspecialchars($page); ?></span>
          <span class="num"><?php echo number_format($count); ?></span>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
  <p class="sub"><a href="?k=<?php echo htmlspecialchars($key); ?>">Actualizar</a></p>
</body>
</html>
