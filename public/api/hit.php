<?php
/**
 * Registro nativo de visitas. Guarda en data/hits.json.
 * Se llama como imagen: <img src="./api/hit.php?p=/">
 */
header('Content-Type: image/gif');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$dir = dirname(__DIR__) . '/data';
$file = $dir . '/hits.json';

$p = isset($_GET['p']) ? preg_replace('/[^a-zA-Z0-9_\-\/\.]/', '', $_GET['p']) : '';
if ($p === '') {
    echo base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    exit;
}

if (!is_dir($dir)) {
    @mkdir($dir, 0755, true);
}

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

$data[$p] = ($data[$p] ?? 0) + 1;

$fp = @fopen($file, 'c+');
if ($fp && flock($fp, LOCK_EX)) {
    ftruncate($fp, 0);
    fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
    flock($fp, LOCK_UN);
    fclose($fp);
}

echo base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
