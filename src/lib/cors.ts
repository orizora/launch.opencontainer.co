import { NextResponse } from 'next/server';

// İzinli köken ortamdan gelir. Tanımsızsa hiçbir CORS başlığı eklenmez ve
// yanıtlar yalnız aynı kökene açık kalır; koda gömülü varsayılan yok.
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_CORS_ORIGIN;

// Tek köken yansıtılır (asla '*'); böylece Allow-Credentials ile uyumlu kalır.
// Başlık ve metot listesi, bu yardımcıyı kullanan rotaların ihtiyacıyla sınırlı.
const CORS_HEADERS: Record<string, string> = ALLOWED_ORIGIN
  ? {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    }
  : {};

/** Verilen yanıta CORS başlıklarını ekler (başarı ve hata yollarında kullan). */
export function addCorsHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    response.headers.set(key, value);
  }

  return response;
}

/** Preflight (OPTIONS) için 204 ve CORS başlıklarını döndürür. */
export function corsPreflight(): NextResponse {
  return new NextResponse(null, { status: 204, headers: { ...CORS_HEADERS } });
}
