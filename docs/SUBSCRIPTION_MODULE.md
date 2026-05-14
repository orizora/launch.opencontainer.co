# Subscription Modülü

> Abonelik yönetimi, abonelik planları, ödeme callback/webhook işlemleri ve kullanıcı abonelik operasyonları için endpoint'ler.

---

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Panel Endpoint'leri](#panel-endpointleri)
  - [Subscription Plan (Abonelik Planı) Yönetimi](#subscription-plan-abonelik-planı-yönetimi)
    - [GET /api/v2/panel/subscription-plans](#get-apiv2panelsubscription-plans)
    - [POST /api/v2/panel/subscription-plans](#post-apiv2panelsubscription-plans)
    - [GET /api/v2/panel/subscription-plans/{uuid}](#get-apiv2panelsubscription-plansuuid)
    - [PUT /api/v2/panel/subscription-plans/{uuid}](#put-apiv2panelsubscription-plansuuid)
    - [DELETE /api/v2/panel/subscription-plans/{uuid}](#delete-apiv2panelsubscription-plansuuid)
    - [DELETE /api/v2/panel/subscription-plans/bulk](#delete-apiv2panelsubscription-plansbulk)
    - [PATCH /api/v2/panel/subscription-plans/{uuid}/status](#patch-apiv2panelsubscription-plansuuidstatus)
    - [PATCH /api/v2/panel/subscription-plans/sortable](#patch-apiv2panelsubscription-planssortable)
  - [Subscription (Abonelik) Yönetimi](#subscription-abonelik-yönetimi)
    - [GET /api/v2/panel/subscriptions](#get-apiv2panelsubscriptions)
    - [POST /api/v2/panel/subscriptions](#post-apiv2panelsubscriptions)
    - [GET /api/v2/panel/subscriptions/{uuid}](#get-apiv2panelsubscriptionsuuid)
    - [GET /api/v2/panel/subscriptions/users/{userUuid}](#get-apiv2panelsubscriptionsusersuseruuid)
    - [PATCH /api/v2/panel/subscriptions/{uuid}/status](#patch-apiv2panelsubscriptionsuuidstatus)
    - [POST /api/v2/panel/subscriptions/{uuid}/extend](#post-apiv2panelsubscriptionsuuidextend)
    - [POST /api/v2/panel/subscriptions/{uuid}/cancel](#post-apiv2panelsubscriptionsuuidcancel)
- [Web Endpoint'leri](#web-endpointleri)
  - [Subscription Plan (Public)](#subscription-plan-public)
    - [GET /api/v2/web/subscription-plans](#get-apiv2websubscription-plans)
    - [GET /api/v2/web/subscription-plans/{slug}](#get-apiv2websubscription-plansslug)
  - [User Subscriptions (Kullanıcı Abonelikleri)](#user-subscriptions-kullanıcı-abonelikleri)
    - [GET /api/v2/web/subscriptions](#get-apiv2websubscriptions)
    - [POST /api/v2/web/subscriptions/initialize](#post-apiv2websubscriptionsinitialize)
    - [GET /api/v2/web/subscriptions/current](#get-apiv2websubscriptionscurrent)
    - [GET /api/v2/web/subscriptions/{uuid}](#get-apiv2websubscriptionsuuid)
    - [POST /api/v2/web/subscriptions/{uuid}/cancel](#post-apiv2websubscriptionsuuidcancel)
    - [POST /api/v2/web/subscriptions/{uuid}/renew](#post-apiv2websubscriptionsuuidrenew)
  - [Callback & Webhook Routes](#callback--webhook-routes)
    - [Genel Callback/Webhook](#genel-callbackwebhook)
    - [PayTR Callback/Webhook](#paytr-callbackwebhook)
    - [Stripe Callback/Webhook](#stripe-callbackwebhook)
    - [Iyzico Callback/Webhook](#iyzico-callbackwebhook)
- [Response Alanları](#response-alanları)
  - [SubscriptionPlanResource](#subscriptionplanresource)
  - [SubscriptionResource](#subscriptionresource)
- [Enum Değerleri](#enum-değerleri)
  - [SubscriptionStatusEnum](#subscriptionstatusenum)
  - [PlanChangeTypeEnum](#planchangetypeenum)
- [Notlar](#notlar)

---

## Genel Bakış

| Bilgi | Değer |
|-------|-------|
| **Prefix** | Panel: `/api/v2/panel/`, Web: `/api/v2/web/` |
| **Auth** | Panel: `auth:api` gerektirir, Web: Endpoint'e göre değişir |
| **Rate Limit** | Panel: 60 istek/dakika, Web: 120 istek/dakika |
| **Collection wrapperKey** | `subscription_plans`, `subscriptions` |

---

## Panel Endpoint'leri

### Subscription Plan (Abonelik Planı) Yönetimi

#### `GET /api/v2/panel/subscription-plans`

Tüm abonelik planlarını listeler (admin).

**Auth:** Gerektirir (`auth:api`)

**Query Parameters:**

| Parametre | Tip | Zorunlu | Açıklama | Default |
|-----------|-----|---------|----------|---------|
| `search` | string | Hayır | Plan adında arama | - |
| `is_active` | boolean | Hayır | Durum filtresi | - |
| `sort_by` | string | Hayır | Sıralama alanı | `order` |
| `sort_order` | string | Hayır | Sıralama yönü (asc/desc) | `asc` |
| `per_page` | integer | Hayır | Sayfa başı kayıt | `15` |

**Response:** `200 OK`

```json
{
  "data": {
    "subscription_plans": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Basic Plan",
        "slug": "basic-plan",
        "description": "Temel özellikler içeren ekonomik plan",
        "price": 99.99,
        "currency": "TRY",
        "default_currency": "TRY",
        "prices": {
          "TRY": 99.99,
          "USD": 3.50,
          "EUR": 3.20
        },
        "pricing_summary": "₺99.99/ay",
        "duration_days": 30,
        "duration_label": "Aylık",
        "features": [
          "5 ürün yayınlama",
          "Temel destek",
          "Dashboard erişimi"
        ],
        "is_popular": false,
        "badge_text": null,
        "is_active": true,
        "sort_order": 1,
        "created_at": "2025-01-15T10:30:00+00:00",
        "updated_at": "2025-01-20T14:00:00+00:00"
      },
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Premium Plan",
        "slug": "premium-plan",
        "description": "Gelişmiş özellikler ve öncelikli destek",
        "price": 299.99,
        "currency": "TRY",
        "default_currency": "TRY",
        "prices": {
          "TRY": 299.99,
          "USD": 10.50,
          "EUR": 9.80
        },
        "pricing_summary": "₺299.99/ay",
        "duration_days": 30,
        "duration_label": "Aylık",
        "features": [
          "Sınırsız ürün",
          "Öncelikli destek",
          "Analiz araçları",
          "API erişimi"
        ],
        "is_popular": true,
        "badge_text": "En Popüler",
        "is_active": true,
        "sort_order": 2,
        "created_at": "2025-01-15T10:30:00+00:00",
        "updated_at": "2025-01-20T14:00:00+00:00"
      }
    ],
    "meta": {
      "current_page": 1,
      "from": 1,
      "last_page": 1,
      "per_page": 15,
      "to": 2,
      "total": 2
    }
  },
  "message": "İşlem başarılı"
}
```

---

#### `POST /api/v2/panel/subscription-plans`

Yeni abonelik planı oluşturur.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Request Body:**

```json
{
  "name": "Enterprise Plan",
  "slug": "enterprise-plan",
  "description": "Kurumsal çözümler için özel plan",
  "price": 999.99,
  "default_currency": "TRY",
  "duration": 30,
  "order": 3,
  "features": [
    "Sınırsız ürün",
    "7/24 destek",
    "Özel entegrasyon",
    "Eğitim desteği"
  ],
  "status": "active",
  "is_popular": false,
  "badge_text": "Kurumsal"
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `name` | string | Evet | Plan adı | `required\|string\|max:255` |
| `slug` | string | Hayır | URL slug (otomatik üretilir) | `nullable\|string\|max:255\|unique:subscription_plans,slug` |
| `description` | string | Hayır | Plan açıklaması | `nullable\|string` |
| `price` | number | Evet | Fiyat | `required\|numeric\|min:0` |
| `default_currency` | string | Evet | Para birimi kodu (ISO 4217) | `required\|string\|size:3` |
| `duration` | integer | Evet | Süre (gün) | `required\|integer\|min:1` |
| `order` | integer | Hayır | Sıra numarası | `nullable\|integer\|min:0` |
| `features` | array | Hayır | Özellikler listesi | `nullable\|array` |
| `status` | string | Hayır | Durum (active, inactive) | `nullable\|in:active,inactive` |
| `is_popular` | boolean | Hayır | Popüler mi? | `boolean` |
| `badge_text` | string | Hayır | Rozet metni | `nullable\|string\|max:50` |

**Response:** `201 Created`

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Enterprise Plan",
    "slug": "enterprise-plan",
    "description": "Kurumsal çözümler için özel plan",
    "price": 999.99,
    "currency": "TRY",
    "default_currency": "TRY",
    "prices": {
      "TRY": 999.99,
      "USD": 35.00,
      "EUR": 32.50
    },
    "pricing_summary": "₺999.99/ay",
    "duration_days": 30,
    "duration_label": "Aylık",
    "features": [
      "Sınırsız ürün",
      "7/24 destek",
      "Özel entegrasyon",
      "Eğitim desteği"
    ],
    "is_popular": false,
    "badge_text": "Kurumsal",
    "is_active": true,
    "sort_order": 3,
    "created_at": "2025-02-05T10:30:00+00:00",
    "updated_at": "2025-02-05T10:30:00+00:00"
  },
  "message": "Abonelik planı oluşturuldu"
}
```

---

#### `GET /api/v2/panel/subscription-plans/{uuid}`

Belirli bir abonelik planının detaylarını getirir.

**Auth:** Gerektirir (`auth:api`)

**Response:** `200 OK`

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Basic Plan",
    "slug": "basic-plan",
    "description": "Temel özellikler içeren ekonomik plan",
    "price": 99.99,
    "currency": "TRY",
    "default_currency": "TRY",
    "prices": {
      "TRY": 99.99,
      "USD": 3.50,
      "EUR": 3.20
    },
    "pricing_summary": "₺99.99/ay",
    "duration_days": 30,
    "duration_label": "Aylık",
    "features": [
      "5 ürün yayınlama",
      "Temel destek",
      "Dashboard erişimi"
    ],
    "is_popular": false,
    "badge_text": null,
    "is_active": true,
    "sort_order": 1,
    "created_at": "2025-01-15T10:30:00+00:00",
    "updated_at": "2025-01-20T14:00:00+00:00"
  },
  "message": "İşlem başarılı"
}
```

**Hata Durumları:**

| Durum | Kod | Mesaj |
|-------|-----|-------|
| Plan bulunamadı | 404 | Abonelik planı bulunamadı |

---

#### `PUT /api/v2/panel/subscription-plans/{uuid}`

Abonelik planını günceller.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Request Body:**

```json
{
  "name": "Basic Plan - Güncellenmiş",
  "price": 129.99,
  "features": [
    "10 ürün yayınlama",
    "Temel destek",
    "Dashboard erişimi",
    "E-posta bildirimleri"
  ],
  "is_popular": true
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `name` | string | Hayır | Plan adı | `sometimes\|string\|max:255` |
| `slug` | string | Hayır | URL slug | `sometimes\|string\|max:255\|unique:subscription_plans,slug,{planId},id` |
| `description` | string | Hayır | Plan açıklaması | `nullable\|string` |
| `price` | number | Hayır | Fiyat | `sometimes\|numeric\|min:0` |
| `default_currency` | string | Hayır | Para birimi kodu | `sometimes\|string\|size:3` |
| `duration` | integer | Hayır | Süre (gün) | `sometimes\|integer\|min:1` |
| `order` | integer | Hayır | Sıra numarası | `nullable\|integer\|min:0` |
| `features` | array | Hayır | Özellikler listesi | `nullable\|array` |
| `status` | string | Hayır | Durum | `nullable\|in:active,inactive` |
| `is_popular` | boolean | Hayır | Popüler mi? | `boolean` |
| `badge_text` | string | Hayır | Rozet metni | `nullable\|string\|max:50` |

**Response:** `200 OK`

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Basic Plan - Güncellenmiş",
    "slug": "basic-plan",
    "description": "Temel özellikler içeren ekonomik plan",
    "price": 129.99,
    "currency": "TRY",
    "default_currency": "TRY",
    "prices": {
      "TRY": 129.99,
      "USD": 4.55,
      "EUR": 4.20
    },
    "pricing_summary": "₺129.99/ay",
    "duration_days": 30,
    "duration_label": "Aylık",
    "features": [
      "10 ürün yayınlama",
      "Temel destek",
      "Dashboard erişimi",
      "E-posta bildirimleri"
    ],
    "is_popular": true,
    "badge_text": null,
    "is_active": true,
    "sort_order": 1,
    "created_at": "2025-01-15T10:30:00+00:00",
    "updated_at": "2025-02-05T11:00:00+00:00"
  },
  "message": "Abonelik planı güncellendi"
}
```

---

#### `DELETE /api/v2/panel/subscription-plans/{uuid}`

Abonelik planını siler.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Response:** `200 OK`

```json
{
  "data": null,
  "message": "Abonelik planı silindi"
}
```

**Hata Durumları:**

| Durum | Kod | Mesaj |
|-------|-----|-------|
| Plan bulunamadı | 404 | Abonelik planı bulunamadı |
| Aktif abonelik var | 422 | Bu planda aktif abonelikler bulunmaktadır |

**Not:** Aktif abonelikleri olan planlar silinemez.

---

#### `DELETE /api/v2/panel/subscription-plans/bulk`

Toplu olarak abonelik planlarını siler.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Request Body:**

```json
{
  "uuids": [
    "550e8400-e29b-41d4-a716-446655440000",
    "550e8400-e29b-41d4-a716-446655440001",
    "550e8400-e29b-41d4-a716-446655440002"
  ]
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `uuids` | array | Evet | Silinecek plan UUID'leri | `required\|array` |
| `uuids.*` | string | Evet | UUID | `uuid` |

**Response:** `200 OK`

```json
{
  "data": {
    "deleted_count": 2,
    "skipped_count": 1
  },
  "message": "2 abonelik planı silindi"
}
```

**Hata Durumları:**

| Durum | Kod | Mesaj |
|-------|-----|-------|
| Hiçbir plan bulunamadı | 404 | Abonelik planı bulunamadı |
| Tümü aktif abonelikli | 422 | 3 plan aktif abonelik içerdiği için silinemedi |

**Not:** Aktif abonelikleri olan planlar atlanır (skipped_count).

---

#### `PATCH /api/v2/panel/subscription-plans/{uuid}/status`

Abonelik planının durumunu günceller.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Request Body:**

```json
{
  "status": "inactive"
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `status` | string | Evet | Durum (active, inactive) | `required\|string\|in:active,inactive` |

**Response:** `200 OK`

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Basic Plan",
    "slug": "basic-plan",
    "description": "Temel özellikler içeren ekonomik plan",
    "price": 99.99,
    "currency": "TRY",
    "default_currency": "TRY",
    "prices": {
      "TRY": 99.99,
      "USD": 3.50,
      "EUR": 3.20
    },
    "pricing_summary": "₺99.99/ay",
    "duration_days": 30,
    "duration_label": "Aylık",
    "features": [
      "5 ürün yayınlama",
      "Temel destek",
      "Dashboard erişimi"
    ],
    "is_popular": false,
    "badge_text": null,
    "is_active": false,
    "sort_order": 1,
    "created_at": "2025-01-15T10:30:00+00:00",
    "updated_at": "2025-02-05T11:30:00+00:00"
  },
  "message": "Abonelik planı durumu güncellendi"
}
```

---

#### `PATCH /api/v2/panel/subscription-plans/sortable`

Abonelik planlarının sırasını günceller.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Request Body:**

```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "sort_order": 1
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "sort_order": 2
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "sort_order": 3
    }
  ]
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `items` | array | Evet | Sıralama verileri | `required\|array` |
| `items.*.id` | string | Evet | Plan UUID | `required\|exists:subscription_plans,id` |
| `items.*.sort_order` | integer | Evet | Sıra numarası | `required\|integer\|min:0` |

**Response:** `200 OK`

```json
{
  "data": null,
  "message": "Abonelik planları sıralandı"
}
```

---

### Subscription (Abonelik) Yönetimi

#### `GET /api/v2/panel/subscriptions`

Tüm abonelikleri listeler (admin).

**Auth:** Gerektirir (`auth:api`)

**Query Parameters:**

| Parametre | Tip | Zorunlu | Açıklama | Default |
|-----------|-----|---------|----------|---------|
| `search` | string | Hayır | Kullanıcı adı/e-posta araması | - |
| `status` | string | Hayır | Durum filtresi | - |
| `plan_id` | string | Hayır | Plan UUID filtresi | - |
| `sort_by` | string | Hayır | Sıralama alanı | `created_at` |
| `sort_order` | string | Hayır | Sıralama yönü (asc/desc) | `desc` |
| `per_page` | integer | Hayır | Sayfa başı kayıt | `15` |

**Response:** `200 OK`

```json
{
  "data": {
    "subscriptions": [
      {
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "status": "active",
        "starts_at": "2025-01-15T00:00:00+00:00",
        "ends_at": "2025-02-15T00:00:00+00:00",
        "cancelled_at": null,
        "is_active": true,
        "days_remaining": 10,
        "created_at": "2025-01-15T10:30:00+00:00",
        "plan": {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "name": "Basic Plan",
          "slug": "basic-plan",
          "price": 99.99,
          "currency": "TRY",
          "duration_days": 30
        },
        "user": {
          "id": "770e8400-e29b-41d4-a716-446655440000",
          "full_name": "Ahmet Yılmaz",
          "email": "ahmet@example.com"
        },
        "payments_count": 1
      }
    ],
    "meta": {
      "current_page": 1,
      "from": 1,
      "last_page": 5,
      "per_page": 15,
      "to": 15,
      "total": 73
    }
  },
  "message": "İşlem başarılı"
}
```

---

#### `POST /api/v2/panel/subscriptions`

Manuel olarak kullanıcıya abonelik atar (admin).

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Request Body:**

```json
{
  "user_uuid": "770e8400-e29b-41d4-a716-446655440000",
  "plan_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "starts_at": "2025-02-05T00:00:00+00:00",
  "ends_at": "2025-03-05T00:00:00+00:00",
  "reason": "Promosyon kampanyası kapsamında ücretsiz 1 ay"
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `user_uuid` | string | Evet | Kullanıcı UUID | `required\|string\|exists:users,id` |
| `plan_uuid` | string | Evet | Plan UUID | `required\|string\|exists:subscription_plans,id` |
| `starts_at` | string | Hayır | Başlangıç tarihi | `nullable\|date` |
| `ends_at` | string | Hayır | Bitiş tarihi | `nullable\|date\|after:starts_at` |
| `days` | integer | Hayır | Süre (gün) | `nullable\|integer\|min:1\|max:365` |
| `reason` | string | Evet | Sebep | `required\|string\|max:500` |

**Response:** `201 Created`

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440010",
    "status": "active",
    "starts_at": "2025-02-05T00:00:00+00:00",
    "ends_at": "2025-03-05T00:00:00+00:00",
    "cancelled_at": null,
    "is_active": true,
    "days_remaining": 28,
    "created_at": "2025-02-05T12:00:00+00:00",
    "plan": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Basic Plan",
      "slug": "basic-plan",
      "price": 99.99,
      "currency": "TRY",
      "duration_days": 30
    },
    "user": {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "full_name": "Ahmet Yılmaz",
      "email": "ahmet@example.com"
    }
  },
  "message": "Abonelik oluşturuldu"
}
```

---

#### `GET /api/v2/panel/subscriptions/{uuid}`

Belirli bir aboneliğin detaylarını getirir.

**Auth:** Gerektirir (`auth:api`)

**Response:** `200 OK`

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "status": "active",
    "starts_at": "2025-01-15T00:00:00+00:00",
    "ends_at": "2025-02-15T00:00:00+00:00",
    "cancelled_at": null,
    "is_active": true,
    "days_remaining": 10,
    "created_at": "2025-01-15T10:30:00+00:00",
    "plan": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Basic Plan",
      "slug": "basic-plan",
      "price": 99.99,
      "currency": "TRY",
      "duration_days": 30
    },
    "user": {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "full_name": "Ahmet Yılmaz",
      "email": "ahmet@example.com"
    },
    "payments_count": 1
  },
  "message": "İşlem başarılı"
}
```

**Hata Durumları:**

| Durum | Kod | Mesaj |
|-------|-----|-------|
| Abonelik bulunamadı | 404 | Abonelik bulunamadı |

---

#### `GET /api/v2/panel/subscriptions/users/{userUuid}`

Belirli bir kullanıcının tüm aboneliklerini listeler.

**Auth:** Gerektirir (`auth:api`)

**Query Parameters:**

| Parametre | Tip | Zorunlu | Açıklama | Default |
|-----------|-----|---------|----------|---------|
| `status` | string | Hayır | Durum filtresi | - |
| `plan_id` | string | Hayır | Plan UUID filtresi | - |
| `sort_by` | string | Hayır | Sıralama alanı | `created_at` |
| `sort_order` | string | Hayır | Sıralama yönü | `desc` |
| `per_page` | integer | Hayır | Sayfa başı kayıt | `15` |

**Response:** `200 OK` (Yukarıdaki GET subscriptions ile aynı yapı)

---

#### `PATCH /api/v2/panel/subscriptions/{uuid}/status`

Abonelik durumunu günceller.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Request Body:**

```json
{
  "status": "canceled",
  "reason": "Kullanıcı talebi üzerine iptal edildi"
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `status` | string | Evet | Durum | `required\|in:active,pending,canceled,expired,trialing,grace_period` |
| `reason` | string | Hayır | Sebep | `nullable\|string\|max:500` |

**Response:** `200 OK`

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "status": "canceled",
    "starts_at": "2025-01-15T00:00:00+00:00",
    "ends_at": "2025-02-15T00:00:00+00:00",
    "cancelled_at": "2025-02-05T12:00:00+00:00",
    "is_active": false,
    "days_remaining": 0,
    "created_at": "2025-01-15T10:30:00+00:00",
    "plan": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Basic Plan",
      "slug": "basic-plan",
      "price": 99.99,
      "currency": "TRY",
      "duration_days": 30
    },
    "user": {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "full_name": "Ahmet Yılmaz",
      "email": "ahmet@example.com"
    }
  },
  "message": "Abonelik durumu güncellendi"
}
```

---

#### `POST /api/v2/panel/subscriptions/{uuid}/extend`

Abonelik süresini uzatır.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Request Body:**

```json
{
  "days": 30,
  "reason": "Hizmet kesintisi telafisi"
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `days` | integer | Evet | Uzatılacak gün sayısı | `required\|integer\|min:1\|max:365` |
| `reason` | string | Evet | Uzatma sebebi | `required\|string\|max:500` |

**Response:** `200 OK`

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "status": "active",
    "starts_at": "2025-01-15T00:00:00+00:00",
    "ends_at": "2025-03-17T00:00:00+00:00",
    "cancelled_at": null,
    "is_active": true,
    "days_remaining": 40,
    "created_at": "2025-01-15T10:30:00+00:00",
    "plan": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Basic Plan",
      "slug": "basic-plan",
      "price": 99.99,
      "currency": "TRY",
      "duration_days": 30
    },
    "user": {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "full_name": "Ahmet Yılmaz",
      "email": "ahmet@example.com"
    }
  },
  "message": "Abonelik süresi uzatıldı"
}
```

---

#### `POST /api/v2/panel/subscriptions/{uuid}/cancel`

Aboneliği iptal eder.

**Auth:** Gerektirir (`auth:api`) - Admin/SuperAdmin rolü

**Response:** `200 OK`

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "status": "canceled",
    "starts_at": "2025-01-15T00:00:00+00:00",
    "ends_at": "2025-02-15T00:00:00+00:00",
    "cancelled_at": "2025-02-05T12:30:00+00:00",
    "is_active": false,
    "days_remaining": 0,
    "created_at": "2025-01-15T10:30:00+00:00",
    "plan": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Basic Plan",
      "slug": "basic-plan",
      "price": 99.99,
      "currency": "TRY",
      "duration_days": 30
    },
    "user": {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "full_name": "Ahmet Yılmaz",
      "email": "ahmet@example.com"
    }
  },
  "message": "Abonelik iptal edildi"
}
```

---

## Web Endpoint'leri

### Subscription Plan (Public)

#### `GET /api/v2/web/subscription-plans`

Aktif abonelik planlarını listeler (herkese açık).

**Auth:** Gerektirmez

**Response:** `200 OK`

```json
{
  "data": [
    {
      "name": "Basic Plan",
      "slug": "basic-plan",
      "description": "Temel özellikler içeren ekonomik plan",
      "price": 99.99,
      "currency": "TRY",
      "default_currency": "TRY",
      "prices": {
        "TRY": 99.99,
        "USD": 3.50,
        "EUR": 3.20
      },
      "pricing_summary": "₺99.99/ay",
      "duration_days": 30,
      "duration_label": "Aylık",
      "features": [
        "5 ürün yayınlama",
        "Temel destek",
        "Dashboard erişimi"
      ],
      "is_popular": false,
      "badge_text": null
    },
    {
      "name": "Premium Plan",
      "slug": "premium-plan",
      "description": "Gelişmiş özellikler ve öncelikli destek",
      "price": 299.99,
      "currency": "TRY",
      "default_currency": "TRY",
      "prices": {
        "TRY": 299.99,
        "USD": 10.50,
        "EUR": 9.80
      },
      "pricing_summary": "₺299.99/ay",
      "duration_days": 30,
      "duration_label": "Aylık",
      "features": [
        "Sınırsız ürün",
        "Öncelikli destek",
        "Analiz araçları",
        "API erişimi"
      ],
      "is_popular": true,
      "badge_text": "En Popüler"
    }
  ],
  "message": "İşlem başarılı"
}
```

**Not:** Web endpoint'lerinde `id`, `is_active`, `sort_order`, `created_at`, `updated_at` alanları döndürülmez.

---

#### `GET /api/v2/web/subscription-plans/{slug}`

Belirli bir abonelik planının detaylarını getirir (slug ile).

**Auth:** Gerektirmez

**Response:** `200 OK`

```json
{
  "data": {
    "name": "Premium Plan",
    "slug": "premium-plan",
    "description": "Gelişmiş özellikler ve öncelikli destek",
    "price": 299.99,
    "currency": "TRY",
    "default_currency": "TRY",
    "prices": {
      "TRY": 299.99,
      "USD": 10.50,
      "EUR": 9.80
    },
    "pricing_summary": "₺299.99/ay",
    "duration_days": 30,
    "duration_label": "Aylık",
    "features": [
      "Sınırsız ürün",
      "Öncelikli destek",
      "Analiz araçları",
      "API erişimi"
    ],
    "is_popular": true,
    "badge_text": "En Popüler"
  },
  "message": "İşlem başarılı"
}
```

**Hata Durumları:**

| Durum | Kod | Mesaj |
|-------|-----|-------|
| Plan bulunamadı | 404 | Abonelik planı bulunamadı |

---

### User Subscriptions (Kullanıcı Abonelikleri)

#### `GET /api/v2/web/subscriptions`

Giriş yapmış kullanıcının tüm aboneliklerini listeler.

**Auth:** Gerektirir (`auth:api`)

**Response:** `200 OK`

```json
{
  "data": {
    "subscriptions": [
      {
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "status": "active",
        "starts_at": "2025-01-15T00:00:00+00:00",
        "ends_at": "2025-02-15T00:00:00+00:00",
        "cancelled_at": null,
        "is_active": true,
        "days_remaining": 10,
        "created_at": "2025-01-15T10:30:00+00:00"
      }
    ]
  },
  "message": "İşlem başarılı"
}
```

---

#### `POST /api/v2/web/subscriptions/initialize`

Abonelik başlatır ve ödeme sürecini başlatır.

**Auth:** Gerektirir (`auth:api`)

**Request Body:**

```json
{
  "subscription_plan_id": "550e8400-e29b-41d4-a716-446655440000",
  "payment_method": "credit_card",
  "auto_renewal": true,
  "coupon_code": "SUMMER2025",
  "accept_terms": true
}
```

| Alan | Tip | Zorunlu | Açıklama | Validasyon |
|------|-----|---------|----------|------------|
| `subscription_plan_id` | string | Evet | Plan UUID | `required\|uuid\|exists:subscription_plans,id` |
| `payment_method` | string | Hayır | Ödeme yöntemi | `nullable\|in:credit_card,bank_transfer,paypal,iyzico,paytr,stripe` |
| `auto_renewal` | boolean | Hayır | Otomatik yenileme | `nullable\|boolean` |
| `coupon_code` | string | Hayır | Kupon kodu | `nullable\|string\|max:20\|exists:coupons,code` |
| `accept_terms` | boolean | Evet | Şartları kabul | `required\|accepted` |

**Response:** `200 OK`

```json
{
  "data": {
    "subscription_id": "660e8400-e29b-41d4-a716-446655440020",
    "payment_url": "https://payment-gateway.com/checkout/abc123",
    "payment_token": "abc123def456",
    "expires_at": "2025-02-05T13:00:00+00:00"
  },
  "message": "Abonelik başlatıldı. Ödeme sayfasına yönlendiriliyorsunuz"
}
```

**Hata Durumları:**

| Durum | Kod | Mesaj |
|-------|-----|-------|
| Kullanıcı giriş yapmamış | 401 | Yetkisiz erişim |
| Plan bulunamadı | 404 | Abonelik planı bulunamadı |
| Şartlar kabul edilmemiş | 422 | Kullanım şartlarını kabul etmelisiniz |

---

#### `GET /api/v2/web/subscriptions/current`

Giriş yapmış kullanıcının aktif aboneliğini getirir.

**Auth:** Gerektirir (`auth:api`)

**Response:** `200 OK`

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "status": "active",
    "starts_at": "2025-01-15T00:00:00+00:00",
    "ends_at": "2025-02-15T00:00:00+00:00",
    "cancelled_at": null,
    "is_active": true,
    "days_remaining": 10,
    "created_at": "2025-01-15T10:30:00+00:00",
    "plan": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Basic Plan",
      "slug": "basic-plan",
      "price": 99.99,
      "currency": "TRY",
      "duration_days": 30
    }
  },
  "message": "İşlem başarılı"
}
```

**Aktif abonelik yoksa:**

```json
{
  "data": null,
  "message": "Aktif aboneliğiniz bulunmamaktadır"
}
```

---

#### `GET /api/v2/web/subscriptions/{uuid}`

Belirli bir aboneliğin detaylarını getirir (sadece kendi abonelikleri).

**Auth:** Gerektirir (`auth:api`)

**Response:** `200 OK`

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "status": "active",
    "starts_at": "2025-01-15T00:00:00+00:00",
    "ends_at": "2025-02-15T00:00:00+00:00",
    "cancelled_at": null,
    "is_active": true,
    "days_remaining": 10,
    "created_at": "2025-01-15T10:30:00+00:00",
    "plan": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Basic Plan",
      "slug": "basic-plan",
      "price": 99.99,
      "currency": "TRY",
      "duration_days": 30
    },
    "payments_count": 1
  },
  "message": "İşlem başarılı"
}
```

**Hata Durumları:**

| Durum | Kod | Mesaj |
|-------|-----|-------|
| Abonelik bulunamadı | 404 | Abonelik bulunamadı |

---

#### `POST /api/v2/web/subscriptions/{uuid}/cancel`

Aboneliği iptal eder (sadece aktif abonelikler).

**Auth:** Gerektirir (`auth:api`)

**Response:** `200 OK`

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "status": "canceled",
    "starts_at": "2025-01-15T00:00:00+00:00",
    "ends_at": "2025-02-15T00:00:00+00:00",
    "cancelled_at": "2025-02-05T13:00:00+00:00",
    "is_active": false,
    "days_remaining": 0,
    "created_at": "2025-01-15T10:30:00+00:00",
    "plan": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Basic Plan",
      "slug": "basic-plan",
      "price": 99.99,
      "currency": "TRY",
      "duration_days": 30
    }
  },
  "message": "Abonelik iptal edildi"
}
```

**Hata Durumları:**

| Durum | Kod | Mesaj |
|-------|-----|-------|
| Abonelik bulunamadı | 404 | Abonelik bulunamadı |
| Abonelik aktif değil | 422 | Bu abonelik iptal edilemez |

---

#### `POST /api/v2/web/subscriptions/{uuid}/renew`

Aboneliği yeniler (süresi dolan veya grace period'daki abonelikler için).

**Auth:** Gerektirir (`auth:api`)

**Response:** `200 OK`

```json
{
  "data": {
    "subscription_id": "660e8400-e29b-41d4-a716-446655440000",
    "payment_url": "https://payment-gateway.com/checkout/xyz789",
    "payment_token": "xyz789ghi012",
    "expires_at": "2025-02-05T14:00:00+00:00"
  },
  "message": "Abonelik yenileme işlemi başlatıldı"
}
```

---

### Callback & Webhook Routes

#### Genel Callback/Webhook

**`ANY /api/v2/web/subscriptions/callback`**

Genel ödeme callback endpoint'i.

**Auth:** Gerektirmez

**Query Parameters:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `token` | string | Evet | Ödeme token'ı |

**Response:** Redirect (Frontend success/failure sayfasına yönlendirir)

---

**`POST /api/v2/web/subscriptions/webhook`**

Genel ödeme webhook endpoint'i.

**Auth:** Gerektirmez

**Response:** `200 OK` veya `202 Accepted`

---

#### PayTR Callback/Webhook

**`ANY /api/v2/web/subscriptions/paytr/callback`**

PayTR ödeme callback endpoint'i.

**Auth:** Gerektirmez

**Query Parameters:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `token` | string | Evet | PayTR ödeme token'ı |

**Response:** Redirect

---

**`POST /api/v2/web/subscriptions/paytr/webhook`**

PayTR webhook endpoint'i.

**Auth:** Gerektirmez

**Response:** `200 OK` (PayTR: `OK` metni döner)

---

#### Stripe Callback/Webhook

**`ANY /api/v2/web/subscriptions/stripe/callback`**

Stripe ödeme callback endpoint'i.

**Auth:** Gerektirmez

**Query Parameters:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `session_id` | string | Evet | Stripe session ID |

**Response:** Redirect

---

**`POST /api/v2/web/subscriptions/stripe/webhook`**

Stripe webhook endpoint'i.

**Auth:** Gerektirmez

**Headers:**

| Header | Açıklama |
|--------|----------|
| `Stripe-Signature` | Webhook imzası |

**Response:** `200 OK`

---

#### Iyzico Callback/Webhook

**`ANY /api/v2/web/subscriptions/iyzico/callback`**

Iyzico ödeme callback endpoint'i.

**Auth:** Gerektirmez

**Middleware:** `iyzico.ip.whitelist` (IP whitelist kontrolü)

**Query Parameters:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `token` | string | Evet | Iyzico ödeme token'ı |

**Response:** Redirect

---

**`POST /api/v2/web/subscriptions/iyzico/webhook`**

Iyzico webhook endpoint'i.

**Auth:** Gerektirmez

**Middleware:** `iyzico.ip.whitelist` (IP whitelist kontrolü)

**Response:** `200 OK`

**Not:** Iyzico webhook ve callback endpoint'leri IP whitelist kontrolü ile korunmaktadır. Sadece Iyzico sunucularından gelen istekler kabul edilir.

---

## Response Alanları

### SubscriptionPlanResource

| Alan | Tip | Açıklama | Panel | Web |
|------|-----|----------|-------|-----|
| `id` | string | UUID | ✓ | ✗ |
| `name` | string | Plan adı | ✓ | ✓ |
| `slug` | string | URL slug | ✓ | ✓ |
| `description` | string\|null | Plan açıklaması | ✓ | ✓ |
| `price` | number | Varsayılan para biriminde fiyat | ✓ | ✓ |
| `currency` | string | Varsayılan para birimi (ISO 4217) | ✓ | ✓ |
| `default_currency` | string | Varsayılan para birimi | ✓ | ✓ |
| `prices` | object | Tüm para birimlerinde fiyatlar | ✓ | ✓ |
| `pricing_summary` | string | Fiyat özeti (₺99.99/ay) | ✓ | ✓ |
| `duration_days` | integer | Süre (gün) | ✓ | ✓ |
| `duration_label` | string | Süre etiketi (Aylık, Yıllık) | ✓ | ✓ |
| `features` | array | Özellikler listesi | ✓ | ✓ |
| `is_popular` | boolean | Popüler mi? | ✓ | ✓ |
| `badge_text` | string\|null | Rozet metni | ✓ | ✓ |
| `is_active` | boolean | Aktif mi? | ✓ | ✗ |
| `sort_order` | integer | Sıra numarası | ✓ | ✗ |
| `created_at` | string | Oluşturulma tarihi (ISO 8601) | ✓ | ✗ |
| `updated_at` | string | Güncellenme tarihi (ISO 8601) | ✓ | ✗ |

---

### SubscriptionResource

| Alan | Tip | Açıklama | Panel | Web |
|------|-----|----------|-------|-----|
| `id` | string | UUID | ✓ | ✓ |
| `status` | string | Durum (SubscriptionStatusEnum) | ✓ | ✓ |
| `starts_at` | string | Başlangıç tarihi (ISO 8601) | ✓ | ✓ |
| `ends_at` | string | Bitiş tarihi (ISO 8601) | ✓ | ✓ |
| `cancelled_at` | string\|null | İptal tarihi (ISO 8601) | ✓ | ✓ |
| `is_active` | boolean | Aktif mi? | ✓ | ✓ |
| `days_remaining` | integer | Kalan gün sayısı | ✓ | ✓ |
| `created_at` | string | Oluşturulma tarihi (ISO 8601) | ✓ | ✓ |
| `plan` | object\|null | Plan bilgileri (relation) | ✓ | ✓ |
| `plan.id` | string | Plan UUID | ✓ | ✓ |
| `plan.name` | string | Plan adı | ✓ | ✓ |
| `plan.slug` | string | Plan slug | ✓ | ✓ |
| `plan.price` | number | Plan fiyatı | ✓ | ✓ |
| `plan.currency` | string | Para birimi | ✓ | ✓ |
| `plan.duration_days` | integer | Plan süresi | ✓ | ✓ |
| `user` | object\|null | Kullanıcı bilgileri (relation) | ✓ | ✗ |
| `user.id` | string | Kullanıcı UUID | ✓ | ✗ |
| `user.full_name` | string | Ad Soyad | ✓ | ✗ |
| `user.email` | string | E-posta | ✓ | ✗ |
| `payments_count` | integer\|null | Ödeme sayısı (whenCounted) | ✓ | ✓ |

---

## Enum Değerleri

### SubscriptionStatusEnum

Abonelik durumları:

| Case | Value | Açıklama |
|------|-------|----------|
| `Active` | `active` | Aktif abonelik |
| `Pending` | `pending` | Bekleyen abonelik (ödeme bekleniyor) |
| `Canceled` | `canceled` | İptal edilmiş abonelik |
| `Expired` | `expired` | Süresi dolmuş abonelik |
| `Trialing` | `trialing` | Deneme süresi |
| `GracePeriod` | `grace_period` | Ek süre (grace period) |

**Default:** `pending`

**Helper Method'lar:**

- `isUsable()`: Abonelik kullanılabilir mi? (active, trialing, canceled, grace_period)
- `isTrial()`: Deneme süresi mi?
- `isGracePeriod()`: Grace period mi?
- `requiresRenewal()`: Yenileme gerektiriyor mu? (grace_period, expired)
- `isActive()`: Aktif durum mu?
- `isTerminated()`: Sonlanmış durum mu? (canceled, expired)

---

### PlanChangeTypeEnum

Plan değişiklik türleri:

| Case | Value | Açıklama |
|------|-------|----------|
| `Upgrade` | `upgrade` | Plan yükseltme |
| `Downgrade` | `downgrade` | Plan düşürme |
| `Renewal` | `renewal` | Plan yenileme |
| `Switch` | `switch` | Plan değiştirme |

**Default:** `upgrade`

**Helper Method'lar:**

- `isUpgrade()`: Yükseltme mi?
- `isDowngrade()`: Düşürme mi?
- `requiresPayment()`: Ödeme gerektiriyor mu? (sadece upgrade)
- `requiresCredit()`: Kredi/iade gerektiriyor mu? (sadece downgrade)
- `isRenewal()`: Yenileme mi?

---

## Notlar

### Genel Kurallar

1. **Panel endpoint'leri** admin/superadmin rolü gerektirir
2. **Web endpoint'leri** kullanıcı authentication'ı gerektirir (callback/webhook hariç)
3. **Callback/Webhook** endpoint'leri authentication gerektirmez
4. **Iyzico** callback/webhook'ları IP whitelist kontrolü ile korunmaktadır

### Collection wrapperKey

- **SubscriptionPlanCollection:** `subscription_plans`
- **SubscriptionCollection:** `subscriptions`

### Özellikler

- **Multi-currency support:** Planlar birden fazla para biriminde fiyatlandırılabilir
- **Auto-renewal:** Abonelikler otomatik olarak yenilenebilir
- **Grace period:** Ödeme başarısız olduğunda kullanıcıya ek süre verilebilir
- **Trial period:** Deneme süresi desteği
- **Coupon support:** İndirim kuponları kullanılabilir
- **Activity logging:** Tüm admin işlemleri loglanır (ActivityHelper)
- **Sortable plans:** Planlar sürükle-bırak ile sıralanabilir
- **Bulk operations:** Toplu plan silme işlemi
- **Manual subscription:** Admin manuel abonelik atayabilir

### Webhook & Callback Akışı

1. Kullanıcı abonelik başlatır (`POST /initialize`)
2. Ödeme gateway'ine yönlendirilir (`payment_url`)
3. Ödeme tamamlandığında gateway callback URL'ini çağırır
4. Callback handler token'ı doğrular ve frontend'e redirect eder
5. Gateway webhook URL'ini asenkron olarak çağırır
6. Webhook handler aboneliği aktifleştirir ve ödeme kaydını oluşturur

### Güvenlik

- **IP Whitelist:** Iyzico callback/webhook'ları IP kontrolü ile korunur
- **Token validation:** Callback'lerde token doğrulaması yapılır
- **Signature verification:** Stripe webhook'ları imza kontrolü ile doğrulanır
- **Authorization:** Panel endpoint'leri admin kontrolü ile korunur
- **User ownership:** Web endpoint'lerinde kullanıcı kendi kayıtlarına erişebilir

### Pagination

Tüm liste endpoint'leri sayfalama destekler:

- **Default per_page:** 15
- **Meta alanları:** current_page, from, last_page, per_page, to, total

### Rate Limiting

- **Panel:** 60 istek/dakika
- **Web:** 120 istek/dakika
- **Callback/Webhook:** Rate limit yok

### Cache

Repository pattern kullanılarak cache yönetimi yapılır. Detaylar için `SubscriptionPlanRepository` ve `SubscriptionRepository` sınıflarına bakınız.
